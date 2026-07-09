/**
 * cargo-tools map-link resolver — Cloudflare Worker
 *
 * Static pages (GitHub Pages) can't expand shortened map links because reading a
 * cross-origin redirect target or page HTML is blocked by CORS. This tiny Worker
 * runs server-side, follows the redirect, extracts coordinates, and returns them
 * as JSON with permissive CORS headers so the browser can consume the result.
 *
 * Usage:  GET https://<worker>/?url=<encoded map link>
 * Returns: { "lat": 36.6387243, "lon": -86.5710137, "source": "google" }
 *          or 4xx with { "error": "..." }
 *
 * Deploy:
 *   1. Install wrangler:  npm i -g wrangler   (or use `npx wrangler`)
 *   2. From worker/:      wrangler deploy
 *   3. Copy the printed https://cargo-map-resolver.<you>.workers.dev URL
 *      into PROXY_URL in assets/js/location-update.js
 */

// Only these hosts may be fetched — keeps the Worker from being used as an
// open proxy for arbitrary URLs.
const ALLOWED_HOSTS = [
  'maps.app.goo.gl',
  'goo.gl',
  'maps.apple',
  'maps.apple.com',
  'maps.google.com',
  'www.google.com',
  'google.com',
];

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

function hostAllowed(host) {
  return ALLOWED_HOSTS.some(h => host === h || host.endsWith('.' + h));
}

// Google encodes coordinates several ways in its expanded URLs.
function coordsFromUrl(url) {
  const patterns = [
    /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
    /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/,
    /[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/,
    /\/@(-?\d+\.\d+),(-?\d+\.\d+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return { lat: parseFloat(m[1]), lon: parseFloat(m[2]) };
  }
  return null;
}

// Apple place pages embed coordinates in a few shapes: Open-Graph-style meta
// tags, a `center=LAT,LON` query, or a `"center":{"lat":…,"lng":…}` JSON blob.
function coordsFromHtml(html) {
  const meta = (() => {
    const lat = html.match(/place:location:latitude"\s+content="(-?\d+\.\d+)"/);
    const lon = html.match(/place:location:longitude"\s+content="(-?\d+\.\d+)"/);
    return lat && lon ? { lat: +lat[1], lon: +lon[1] } : null;
  })();
  if (meta) return meta;

  const json = html.match(/"center":\{"lat":(-?\d+\.\d+),"lng":(-?\d+\.\d+)\}/);
  if (json) return { lat: +json[1], lon: +json[2] };

  const q = html.match(/[?&]center=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (q) return { lat: +q[1], lon: +q[2] };

  return null;
}

async function handle(request) {
  const params = new URL(request.url).searchParams;

  // ?rev=lat,lon — reverse-geocode coordinates to a place name.
  const rev = params.get('rev');
  if (rev) {
    const m = rev.match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
    if (!m) return json({ error: 'bad rev param' }, 400);
    const lat = +m[1], lon = +m[2];
    const text = await reverseGeocode(lat, lon);
    return json({ lat, lon, text });
  }

  // ?q=free text — forward-geocode a ZIP / city,state / place to coords + name.
  const q = params.get('q');
  if (q) {
    const coords = await forwardGeocode(q);
    if (!coords) return json({ error: 'not found' }, 404);
    const text = await reverseGeocode(coords.lat, coords.lon);
    return json({ lat: coords.lat, lon: coords.lon, text });
  }

  // ?url=map link — expand a shortened/place link to coords + name.
  const target = params.get('url');
  if (!target) return json({ error: 'missing url/rev/q param' }, 400);

  let parsed;
  try {
    parsed = new URL(target);
  } catch {
    return json({ error: 'invalid url' }, 400);
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return json({ error: 'unsupported protocol' }, 400);
  }
  if (!hostAllowed(parsed.hostname)) {
    return json({ error: 'host not allowed' }, 403);
  }

  let resp;
  try {
    resp = await fetch(target, {
      redirect: 'follow',
      headers: {
        // A minimal UA is enough for Google: it follows the goo.gl redirect
        // straight to the maps URL (a full Safari UA gets served a
        // non-redirecting interstitial instead).
        // NOTE: Apple returns 403 to Cloudflare's datacenter IPs regardless of
        // headers, so maps.apple/p/ place links can't be resolved here.
        'User-Agent': 'Mozilla/5.0',
        'Accept-Language': 'en',
      },
    });
  } catch (e) {
    return json({ error: 'fetch failed: ' + e.message }, 502);
  }

  const finalUrl = resp.url || target;

  // Try the (post-redirect) URL first — cheapest, covers Google links.
  let coords = coordsFromUrl(finalUrl);
  let source = coords ? 'url' : null;

  // Otherwise read the HTML body — covers Apple place pages (when reachable).
  if (!coords) {
    const html = await resp.text();
    coords = coordsFromUrl(html) || coordsFromHtml(html);
    source = coords ? 'html' : null;
  }

  if (!coords) return json({ error: 'no coordinates found', finalUrl }, 422);
  if (!Number.isFinite(coords.lat) || !Number.isFinite(coords.lon)) {
    return json({ error: 'bad coordinates', finalUrl }, 422);
  }

  // Reverse-geocode server-side. The browser can't call Nominatim reliably
  // (it blocks cross-origin/headless requests), so we return a ready-to-show
  // place name too. Best-effort: coords alone are still useful for the map.
  const text = await reverseGeocode(coords.lat, coords.lon);

  return json({ lat: coords.lat, lon: coords.lon, text, finalUrl, source });
}

function formatLocation(city, state, zip) {
  let loc = '';
  if (city && state) loc = `${city}, ${state}`;
  else if (city) loc = city;
  else if (state) loc = state;
  if (zip && loc) loc += ` ${zip}`;
  else if (zip) loc = zip;
  return loc;
}

function stateAbbr(a) {
  const iso = a['ISO3166-2-lvl4'];
  if (iso) return iso.split('-').pop();
  const st = a.state || '';
  return st.length === 2 ? st : '';
}

// Nominatim's usage policy requires an identifying User-Agent.
const NOMINATIM_HEADERS = {
  'User-Agent': 'cargo-tools-map-resolver (pavel@ursaexpress.com)',
  'Accept-Language': 'en',
};

async function forwardGeocode(query) {
  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}` +
        `&format=json&countrycodes=us&limit=1&addressdetails=1`,
      { headers: NOMINATIM_HEADERS }
    );
    if (!r.ok) return null;
    const results = await r.json();
    if (!results.length) return null;
    const lat = parseFloat(results[0].lat), lon = parseFloat(results[0].lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    return { lat, lon };
  } catch {
    return null;
  }
}

async function reverseGeocode(lat, lon) {
  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      { headers: NOMINATIM_HEADERS }
    );
    if (!r.ok) return null;
    const d = await r.json();
    const a = d.address || {};
    const city = a.city || a.town || a.village || a.county || '';
    let zip = a.postcode ? a.postcode.split('-')[0] : '';
    // The team message must always end with a ZIP. If OSM has none for this
    // point, fall back to the nearest US ZIP (Census ZCTA).
    if (!zip) zip = await nearestZip(lat, lon);
    return formatLocation(city, stateAbbr(a), zip) || null;
  } catch {
    return null;
  }
}

// Coordinates → nearest US ZIP via the keyless US Census geocoder.
async function nearestZip(lat, lon) {
  try {
    const r = await fetch(
      'https://geocoding.geo.census.gov/geocoder/geographies/coordinates' +
        `?x=${lon}&y=${lat}&benchmark=Public_AR_Current&vintage=Current_Current` +
        '&layers=all&format=json',
      { headers: { 'User-Agent': NOMINATIM_HEADERS['User-Agent'] } }
    );
    if (!r.ok) return '';
    const d = await r.json();
    const geos = (d.result && d.result.geographies) || {};
    const zcta = geos['2020 Census ZIP Code Tabulation Areas'];
    if (zcta && zcta.length) return zcta[0].ZCTA5 || zcta[0].BASENAME || '';
    return '';
  } catch {
    return '';
  }
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }
    if (request.method !== 'GET') {
      return json({ error: 'method not allowed' }, 405);
    }
    return handle(request);
  },
};
