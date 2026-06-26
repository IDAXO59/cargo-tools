const LS_THEME = 'ursa-theme';
const LS_LANG  = 'ursa-lang';

const T = {
    en: { inputLabel: 'ZIP, City/State, or Maps link', generateBtn: 'Generate', copyBtn: 'Copy', copiedBtn: '✓ Copied' },
    ru: { inputLabel: 'ZIP, Город/Штат или ссылка Maps', generateBtn: 'Создать', copyBtn: 'Копировать', copiedBtn: '✓ Скопировано' },
};

let currentLang = 'en';

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
    return a.state || '';
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
    const a = results[0].address || {};
    const city  = a.city || a.town || a.village || a.county || '';
    const state = stateAbbr(a);
    const zip   = a.postcode ? a.postcode.split('-')[0] : '';
    const loc   = formatLocation(city, state, zip);
    if (!loc) throw new Error('Empty result');
    return loc;
}

async function lookupZip(zip) {
    const r = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (!r.ok) throw new Error('ZIP not found');
    const d = await r.json();
    const p = d.places[0];
    return formatLocation(p['place name'], p['state abbreviation'], zip);
}

function extractCoords(val) {
    const patterns = [
        /\/@(-?\d+\.\d+),(-?\d+\.\d+)/,
        /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/,
        /[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/,
        /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
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

    const isMapsLink = /maps\.apple\.com|maps\.google\.com|goo\.gl\/maps|google\.com\/maps/i.test(val);

    if (isMapsLink) {
        // Apple Maps address param → use directly without geocoding
        try {
            const u = new URL(val);
            const addr = u.searchParams.get('address') || u.searchParams.get('addr');
            if (addr) return decodeURIComponent(addr).replace(/\+/g, ' ');
        } catch (_) {}

        // Coordinate-based reverse geocoding
        const coords = extractCoords(val);
        if (coords) {
            return await reverseGeocode(coords.lat, coords.lon);
        }
    }

    // Plain ZIP
    if (/^\d{5}$/.test(val)) {
        return await lookupZip(val);
    }

    // City name / free text — forward geocode, fallback to raw text
    try {
        return await forwardGeocode(val);
    } catch (_) {
        return val;
    }
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

    let location = raw;
    try {
        location = (await resolve(raw)) || raw;
    } catch (_) {
        location = raw;
    }

    btn.disabled = false;
    btn.classList.remove('loading');

    const msg = `Hi, team! Current location: ${location}`;
    document.getElementById('resultText').textContent = msg;
    document.getElementById('resultCard').hidden = false;
}

function copyResult() {
    const text = document.getElementById('resultText').textContent;
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
