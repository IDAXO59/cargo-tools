const LS_THEME = 'ursa-theme';
const LS_LANG  = 'ursa-lang';

// Cloudflare Worker that expands shortened map links (goo.gl, maps.apple/p/…)
// into coordinates — the browser can't follow those redirects itself (CORS).
// Deploy worker/ and paste its https://…workers.dev URL here. Leave empty to
// fall back to asking the user for the full link. See worker/README.md.
const PROXY_URL = 'https://cargo-map-resolver.2x2gcn2sdr.workers.dev';

const T = {
    en: { inputLabel: 'ZIP, City/State, or Maps link', startLabel: 'Start (optional)', endLabel: 'End (optional)', generateBtn: 'Go', copyBtn: 'Copy', copiedBtn: '✓ Copied' },
    ru: { inputLabel: 'ZIP, Город/Штат или ссылка Maps', startLabel: 'Старт (опционально)', endLabel: 'Конечная точка (опционально)', generateBtn: 'Go', copyBtn: 'Копировать', copiedBtn: '✓ Скопировано' },
};

let currentLang  = 'en';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(LS_THEME, theme);
}
function toggleTheme() {
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

function applyLang(lang) {
    currentLang = lang;
    const d = T[lang] || T.en;
    document.querySelector('[data-i18n="inputLabel"]').textContent  = d.inputLabel;
    document.querySelector('[data-i18n="startLabel"]').textContent  = d.startLabel;
    document.querySelector('[data-i18n="endLabel"]').textContent    = d.endLabel;
    document.querySelector('[data-i18n="generateBtn"]').textContent = d.generateBtn;
    document.querySelector('[data-i18n="copyBtn"]').textContent     = d.copyBtn;
    document.getElementById('locInput').placeholder   = d.inputLabel;
    document.getElementById('startInput').placeholder = d.startLabel;
    document.getElementById('endInput').placeholder   = d.endLabel;
    document.getElementById('langBtn').textContent  = lang === 'en' ? 'RU' : 'EN';
    localStorage.setItem(LS_LANG, lang);
}
function toggleLang() {
    applyLang(localStorage.getItem(LS_LANG) === 'ru' ? 'en' : 'ru');
}

/* ── Geocoding helpers ── */

function formatLocation(city, state, zip) {
    let loc = '';
    if (city && state) loc = `${city}, ${state}`;
    else if (city)     loc = city;
    else if (state)    loc = state;
    if (zip && loc)    loc += ` ${zip}`;
    else if (zip)      loc = zip;
    return loc;
}

function stateAbbr(a) {
    const iso = a['ISO3166-2-lvl4'];
    if (iso) return iso.split('-').pop();
    const st = a.state || '';
    return st.length === 2 ? st : '';
}

async function reverseGeocode(lat, lon) {
    const r = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        { headers: { 'Accept-Language': 'en' } }
    );
    if (!r.ok) throw new Error('Nominatim error');
    const d = await r.json();
    const a = d.address || {};
    const city  = a.city || a.town || a.village || a.county || '';
    const state = stateAbbr(a);
    const zip   = a.postcode ? a.postcode.split('-')[0] : '';
    return formatLocation(city, state, zip);
}

async function forwardGeocode(query) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&countrycodes=us&limit=1&addressdetails=1`;
    const r = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    if (!r.ok) throw new Error('Nominatim search error');
    const results = await r.json();
    if (!results.length) throw new Error('Not found');
    const coords = { lat: parseFloat(results[0].lat), lon: parseFloat(results[0].lon) };
    const text = await reverseGeocode(coords.lat, coords.lon);
    return { text, coords };
}

async function lookupZip(zip) {
    const r = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (!r.ok) throw new Error('ZIP not found');
    const d = await r.json();
    const p = d.places[0];
    const coords = { lat: parseFloat(p.latitude), lon: parseFloat(p.longitude) };
    const text = formatLocation(p['place name'], p['state abbreviation'], zip);
    return { text, coords };
}

async function resolveViaProxy(link) {
    if (!PROXY_URL) return null;
    try {
        const r = await fetch(`${PROXY_URL}?url=${encodeURIComponent(link)}`);
        if (!r.ok) return null;
        const d = await r.json();
        if (Number.isFinite(d.lat) && Number.isFinite(d.lon)) {
            return { lat: d.lat, lon: d.lon, text: d.text || null };
        }
    } catch (_) {}
    return null;
}

function extractCoords(val) {
    const patterns = [
        /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
        /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/,
        /[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/,
        /\/@(-?\d+\.\d+),(-?\d+\.\d+)/,
    ];
    for (const p of patterns) {
        const m = val.match(p);
        if (m) return { lat: parseFloat(m[1]), lon: parseFloat(m[2]) };
    }
    return null;
}

async function resolve(raw) {
    const val = raw.trim();
    if (!val) return null;

    const isMapsLink = /maps\.apple|maps\.google\.com|goo\.gl\/maps|google\.com\/maps|maps\.app\.goo\.gl/i.test(val);

    if (isMapsLink) {
        // Apple Maps address param → use directly without geocoding
        try {
            const u = new URL(val);
            const addr = u.searchParams.get('address') || u.searchParams.get('addr');
            if (addr) return { text: decodeURIComponent(addr).replace(/\+/g, ' '), coords: null };
        } catch (_) {}

        // Coordinate-based reverse geocoding
        const coords = extractCoords(val);
        if (coords) {
            const text = await reverseGeocode(coords.lat, coords.lon);
            return { text, coords };
        }

        // Shortened / place links (goo.gl, maps.app.goo.gl, maps.apple/p/…)
        // redirect server-side; a static page can't follow them due to CORS.
        // Resolve via the Worker, then reverse-geocode to a readable place.
        const proxied = await resolveViaProxy(val);
        if (proxied) {
            // The Worker reverse-geocodes server-side (the browser can't reach
            // Nominatim reliably); fall back to coords if it returned no name.
            const coords = { lat: proxied.lat, lon: proxied.lon };
            const text = proxied.text || `${proxied.lat}, ${proxied.lon}`;
            return { text, coords };
        }

        // No proxy configured / proxy failed — ask for the expanded link.
        throw new Error('SHORT_LINK');
    }

    // Plain ZIP
    if (/^\d{5}$/.test(val)) {
        return await lookupZip(val);
    }

    // City name / free text — forward geocode, fallback to raw text
    try {
        return await forwardGeocode(val);
    } catch (_) {
        return { text: val, coords: null };
    }
}

/* ── Mini map ── */

// Albers equal-area conic projection calibrated to the 1000×589 SVG viewBox
// Calibration anchors from SVG path data:
//   MT/ID/Canada tripoint (309.09, 52.88) ≈ 49°N 116°W
//   MT/ND/Canada corner  (465.66, 72.97) ≈ 49°N 104°W
//   Southern TX tip      (574, 537)      ≈ 26°N 97.5°W
function latLonToSvg(lat, lon) {
    const D  = Math.PI / 180;
    const n  = (Math.sin(29.5 * D) + Math.sin(45.5 * D)) / 2;
    const C  = Math.cos(29.5 * D) ** 2 + 2 * n * Math.sin(29.5 * D);
    const r0 = Math.sqrt(C - 2 * n * Math.sin(37.5 * D)) / n;
    const lam0 = -96 * D;
    const r  = Math.sqrt(C - 2 * n * Math.sin(lat * D)) / n;
    const t  = n * (lon * D - lam0);
    const ax = r * Math.sin(t);
    const ay = r0 - r * Math.cos(t);
    return { x: 1137 * ax + 571, y: -1130 * ay + 308 };
}

function pointPosition(sourceSvg, data) {
    if (!data) return null;
    if (data.coords) return latLonToSvg(data.coords.lat, data.coords.lon);
    if (!data.text) return null;
    const m = data.text.match(/,\s*([A-Z]{2})(?:[,\s]|$)/);
    if (!m) return null;
    const sp = sourceSvg.querySelector(`#${m[1]}`);
    if (!sp) return null;
    const bb = sp.getBBox();
    if (bb.width === 0) return null;
    return { x: bb.x + bb.width / 2, y: bb.y + bb.height / 2 };
}

async function showRouteMap({ start, current, end }) {
    await (window._mapSvgReady || Promise.resolve());
    const panel     = document.getElementById('miniMap');
    const sourceSvg = document.querySelector('.map-bg svg');
    if (!sourceSvg) { panel.hidden = true; return; }

    const roles = [
        { role: 'start',   data: start,   color: 'var(--route-start)' },
        { role: 'current', data: current, color: 'var(--primary)' },
        { role: 'end',     data: end,     color: 'var(--success)' },
    ];
    const positioned = roles
        .map(r => ({ ...r, pos: pointPosition(sourceSvg, r.data) }))
        .filter(r => r.pos);

    if (!positioned.length) { panel.hidden = true; return; }

    panel.innerHTML = '';
    const svg = sourceSvg.cloneNode(true);
    svg.removeAttribute('style');
    panel.appendChild(svg);

    const stateMatch = current && current.text && current.text.match(/,\s*([A-Z]{2})(?:[,\s]|$)/);
    const stateCode  = stateMatch ? stateMatch[1] : null;
    if (stateCode) {
        const sp = svg.querySelector(`#${stateCode}`);
        if (sp) sp.classList.add('map-state-active');
    }

    const ns = 'http://www.w3.org/2000/svg';

    if (positioned.length > 1) {
        const line = document.createElementNS(ns, 'polyline');
        line.setAttribute('class', 'route-line');
        line.setAttribute('points', positioned.map(p => `${p.pos.x},${p.pos.y}`).join(' '));
        svg.appendChild(line);
    }

    positioned.forEach(p => {
        if (p.role === 'current') {
            const pulse = document.createElementNS(ns, 'circle');
            pulse.setAttribute('cx', p.pos.x); pulse.setAttribute('cy', p.pos.y);
            pulse.setAttribute('r', '5'); pulse.setAttribute('fill', 'none');
            pulse.setAttribute('stroke', 'rgba(255,179,24,0.75)');
            pulse.setAttribute('stroke-width', '1.5');
            const aR = document.createElementNS(ns, 'animate');
            aR.setAttribute('attributeName', 'r'); aR.setAttribute('from', '5');
            aR.setAttribute('to', '22'); aR.setAttribute('dur', '1.8s');
            aR.setAttribute('repeatCount', 'indefinite');
            const aO = document.createElementNS(ns, 'animate');
            aO.setAttribute('attributeName', 'opacity'); aO.setAttribute('from', '0.8');
            aO.setAttribute('to', '0'); aO.setAttribute('dur', '1.8s');
            aO.setAttribute('repeatCount', 'indefinite');
            pulse.append(aR, aO);
            svg.appendChild(pulse);
        }

        const dot = document.createElementNS(ns, 'circle');
        dot.setAttribute('cx', p.pos.x); dot.setAttribute('cy', p.pos.y);
        dot.setAttribute('r', '5');
        dot.setAttribute('fill', p.color);
        dot.setAttribute('stroke', 'var(--on-primary)');
        dot.setAttribute('stroke-width', '1.5');
        svg.appendChild(dot);
    });

    panel.hidden = false;
}

/* ── UI ── */

async function resolveOptionalField(raw) {
    if (!raw || !raw.trim()) return null;
    try {
        return await resolve(raw);
    } catch (_) {
        return null;
    }
}

async function resolveCurrentField(raw) {
    try {
        const result = await resolve(raw);
        return { result, resolved: true };
    } catch (err) {
        const text = err.message === 'SHORT_LINK'
            ? (currentLang === 'ru'
                ? 'Не удалось определить место по этой ссылке. Пришлите ссылку Google Maps или поделитесь геопозицией (в Apple Maps: «Поделиться» → «Поделиться геопозицией»).'
                : "Couldn't get a location from this link. Please send a Google Maps link, or share your position (Apple Maps: Share → Share My Location).")
            : raw;
        return { result: { text, coords: null }, resolved: false };
    }
}

async function generate() {
    const startEl   = document.getElementById('startInput');
    const currentEl = document.getElementById('locInput');
    const endEl     = document.getElementById('endInput');

    const raw = currentEl.value.trim();
    if (!raw) {
        currentEl.classList.remove('shake');
        void currentEl.offsetWidth;
        currentEl.classList.add('shake');
        return;
    }

    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.classList.add('loading');

    const [startResult, currentOutcome, endResult] = await Promise.all([
        resolveOptionalField(startEl.value),
        resolveCurrentField(raw),
        resolveOptionalField(endEl.value),
    ]);

    btn.disabled = false;
    btn.classList.remove('loading');

    const location = currentOutcome.result.text;
    document.getElementById('resultText').textContent = `Hi, team! Current location: ${location}`;
    document.getElementById('copyBtn').disabled = false;

    showRouteMap({
        start:   startResult,
        current: currentOutcome.resolved ? currentOutcome.result : null,
        end:     endResult,
    });
}

function copyResult() {
    const text = document.getElementById('resultText').innerText;
    const btn  = document.getElementById('copyBtn');
    const span = btn.querySelector('span');
    const d    = T[currentLang] || T.en;
    const orig = d.copyBtn;

    const ok    = () => { span.textContent = d.copiedBtn; btn.classList.add('ok'); };
    const reset = () => { span.textContent = orig; btn.classList.remove('ok'); setTimeout(() => {}, 0); };

    navigator.clipboard.writeText(text).then(ok).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); ok(); } catch (_) {}
        document.body.removeChild(ta);
    });
    setTimeout(reset, 1500);
}

/* ── Init ── */
(function () {
    applyTheme(localStorage.getItem(LS_THEME) || 'dark');
    applyLang(localStorage.getItem(LS_LANG)   || 'en');

    document.getElementById('generateBtn').addEventListener('click', generate);
    document.getElementById('copyBtn').addEventListener('click', copyResult);
    document.getElementById('themeBtn').addEventListener('click', toggleTheme);
    document.getElementById('langBtn').addEventListener('click', toggleLang);

    ['startInput', 'locInput', 'endInput'].forEach(function (id) {
        document.getElementById(id).addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generate(); }
        });
    });
    document.getElementById('locInput').addEventListener('animationend', function () {
        this.classList.remove('shake');
    });
})();
