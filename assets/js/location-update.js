const LS_THEME = 'ursa-theme';
const LS_LANG  = 'ursa-lang';

const T = {
    en: { inputLabel: 'ZIP, City/State, or Maps link', generateBtn: 'Go', copyBtn: 'Copy', copiedBtn: '✓ Copied' },
    ru: { inputLabel: 'ZIP, Город/Штат или ссылка Maps', generateBtn: 'Go', copyBtn: 'Копировать', copiedBtn: '✓ Скопировано' },
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
    document.querySelector('[data-i18n="generateBtn"]').textContent = d.generateBtn;
    document.querySelector('[data-i18n="copyBtn"]').textContent     = d.copyBtn;
    document.getElementById('locInput').placeholder = d.inputLabel;
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

    const isMapsLink = /maps\.apple\.com|maps\.google\.com|goo\.gl\/maps|google\.com\/maps|maps\.app\.goo\.gl/i.test(val);

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

        // Shortened links (goo.gl/maps, maps.app.goo.gl) redirect server-side —
        // a static page can't follow them due to CORS, so ask for the expanded link.
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

async function showMiniMap(location) {
    await (window._mapSvgReady || Promise.resolve());
    const panel     = document.getElementById('miniMap');
    const sourceSvg = document.querySelector('.map-bg svg');
    if (!sourceSvg) { panel.hidden = true; return; }

    const stateMatch = location.match(/,\s*([A-Z]{2})(?:[,\s]|$)/);
    const stateCode  = stateMatch ? stateMatch[1] : null;

    panel.innerHTML = '';
    const svg = sourceSvg.cloneNode(true);
    svg.removeAttribute('style');
    panel.appendChild(svg);

    if (stateCode) {
        const sp = svg.querySelector(`#${stateCode}`);
        if (sp) sp.classList.add('map-state-active');
    }

    // Dot position: prefer exact lat/lon, fallback to state bbox center
    let dotX, dotY;
    if (lastCoords) {
        const p = latLonToSvg(lastCoords.lat, lastCoords.lon);
        dotX = p.x; dotY = p.y;
    } else if (stateCode) {
        const sp = sourceSvg.querySelector(`#${stateCode}`);
        if (sp) {
            const bb = sp.getBBox();
            if (bb.width > 0) {
                dotX = bb.x + bb.width / 2;
                dotY = bb.y + bb.height / 2;
            }
        }
    }

    if (dotX !== undefined) {
        const ns = 'http://www.w3.org/2000/svg';

        const pulse = document.createElementNS(ns, 'circle');
        pulse.setAttribute('cx', dotX); pulse.setAttribute('cy', dotY);
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

        const dot = document.createElementNS(ns, 'circle');
        dot.setAttribute('cx', dotX); dot.setAttribute('cy', dotY);
        dot.setAttribute('r', '5');
        dot.setAttribute('fill', 'var(--primary)');
        dot.setAttribute('stroke', 'var(--on-primary)');
        dot.setAttribute('stroke-width', '1.5');
        svg.appendChild(dot);
    }

    panel.hidden = false;
}

/* ── UI ── */

async function generate() {
    const input = document.getElementById('locInput');
    const raw   = input.value.trim();
    if (!raw) {
        input.classList.remove('shake');
        void input.offsetWidth;
        input.classList.add('shake');
        return;
    }

    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.classList.add('loading');

    lastCoords = null;
    let location = raw;
    let resolved = false;
    try {
        location = (await resolve(raw)) || raw;
        resolved = true;
    } catch (err) {
        location = err.message === 'SHORT_LINK'
            ? (currentLang === 'ru'
                ? 'Не удалось развернуть короткую ссылку — вставьте полную ссылку на карту'
                : "Can't expand shortened map link — please paste the full map link")
            : raw;
    }

    btn.disabled = false;
    btn.classList.remove('loading');

    document.getElementById('resultText').textContent = `Hi, team! Current location: ${location}`;
    document.getElementById('copyBtn').disabled = false;
    if (resolved) showMiniMap(location);
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

    document.getElementById('locInput').addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generate(); }
    });
    document.getElementById('locInput').addEventListener('animationend', function () {
        this.classList.remove('shake');
    });
})();
