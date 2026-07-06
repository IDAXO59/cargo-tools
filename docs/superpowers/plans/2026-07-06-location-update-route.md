# Location Update Route Fields Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add optional Start and End location fields to the location-update tool so the mini map shows a full Start → Current → End route with per-role markers and a connecting line, while the copied team message keeps showing only the Current location.

**Architecture:** `assets/js/location-update.js`'s geocoding core (`resolve`, `reverseGeocode`, `forwardGeocode`, `lookupZip`) is refactored to return `{ text, coords }` per call instead of writing to a shared `lastCoords` variable, because Start/Current/End now resolve concurrently. `location-update.html` gains two more label+textarea blocks (Start, End) and the Go button moves below all three fields (was inline with the single field). `showMiniMap` is replaced by `showRouteMap`, which places up to three markers (gray Start, primary-color pulsing Current, green End) and a dashed polyline connecting whichever of them resolved to a position.

**Tech Stack:** Vanilla JS (no framework, no bundler, no `package.json`), static HTML/CSS. No test runner exists in this repo — pure-logic steps are verified with inline `node -e` scripts (consistent with how the short-link/precise-pin bug fix earlier in this project was verified); DOM/SVG-rendering steps are verified manually in a browser via a local static server.

## Global Constraints

- No build step, no `package.json`, no test framework — this is a static site served as-is (e.g. via GitHub Pages). Do not introduce one.
- Keep the copied chat message exactly `Hi, team! Current location: {current}` — Start/End text never appears in it (per spec).
- Current location field stays required (shake animation on empty submit, unchanged). Start and End are optional.
- One "Go" button resolves all three fields; no per-field submit buttons.
- State highlighting (`.map-state-active`) applies only to Current's resolved state, never Start's or End's.
- Preserve existing behavior for the Current field's short-link error message and its bbox-center fallback positioning when only an address string (no coordinates) is available (e.g. Apple Maps `address=` links).
- Follow existing code style in `assets/js/location-update.js`: plain `function`/`async function` declarations, no semicolon-free style, 4-space indent.

---

### Task 1: Refactor geocoding core to return `{ text, coords }`

**Files:**
- Modify: `assets/js/location-update.js:9-10` (remove `lastCoords` declaration), `:53-86` (`reverseGeocode`, `forwardGeocode`, `lookupZip`), `:102-134` (`resolve`)

**Interfaces:**
- Consumes: `formatLocation(city, state, zip)`, `stateAbbr(a)`, `extractCoords(val)` — unchanged, still pure helpers.
- Produces: `resolve(raw)` now returns `Promise<{ text: string, coords: {lat:number, lon:number} | null } | null>` (`null` only for empty/whitespace input), or throws `Error('SHORT_LINK')` for unexpandable short Maps links. This is what Task 3 consumes.

- [ ] **Step 1: Remove the shared `lastCoords` variable**

In `assets/js/location-update.js`, delete line 10 (`let lastCoords   = null;`) so only `currentLang` remains:

```javascript
let currentLang  = 'en';
```

- [ ] **Step 2: Rewrite `reverseGeocode` to return text only (coords are already known by the caller)**

Replace the existing `reverseGeocode` function (lines ~53-66) with:

```javascript
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
```

- [ ] **Step 3: Rewrite `forwardGeocode` and `lookupZip` to return `{ text, coords }`**

Replace `forwardGeocode` (lines ~68-77) with:

```javascript
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
```

Replace `lookupZip` (lines ~79-86) with:

```javascript
async function lookupZip(zip) {
    const r = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (!r.ok) throw new Error('ZIP not found');
    const d = await r.json();
    const p = d.places[0];
    const coords = { lat: parseFloat(p.latitude), lon: parseFloat(p.longitude) };
    const text = formatLocation(p['place name'], p['state abbreviation'], zip);
    return { text, coords };
}
```

- [ ] **Step 4: Rewrite `resolve` to return `{ text, coords }`**

Replace `resolve` (lines ~102-134) with:

```javascript
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
```

- [ ] **Step 5: Verify the refactor with a Node script**

Node has no DOM, but every function touched here is pure or only uses `fetch`/`URL`, both available as Node 18+ globals. `fetch` is stubbed so the test never hits the real network (a sandboxed/offline environment would otherwise fail the Google-link assertion, which exercises the `reverseGeocode` branch). Write it to a scratch file with a quoted heredoc (so `` ` `` and `$` inside the script are never touched by the shell), then run it:

```bash
cat > /tmp/verify-resolve.mjs <<'SCRIPT_EOF'
import assert from 'node:assert';

globalThis.fetch = async (url) => {
    if (String(url).includes('nominatim.openstreetmap.org/reverse')) {
        return { ok: true, json: async () => ({ address: { city: 'New York', 'ISO3166-2-lvl4': 'US-NY', postcode: '10001' } }) };
    }
    throw new Error('Unexpected fetch in this test: ' + url);
};

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

async function resolve(raw) {
    const val = raw.trim();
    if (!val) return null;

    const isMapsLink = /maps\.apple\.com|maps\.google\.com|goo\.gl\/maps|google\.com\/maps|maps\.app\.goo\.gl/i.test(val);

    if (isMapsLink) {
        try {
            const u = new URL(val);
            const addr = u.searchParams.get('address') || u.searchParams.get('addr');
            if (addr) return { text: decodeURIComponent(addr).replace(/\+/g, ' '), coords: null };
        } catch (_) {}

        const coords = extractCoords(val);
        if (coords) {
            const text = await reverseGeocode(coords.lat, coords.lon);
            return { text, coords };
        }

        throw new Error('SHORT_LINK');
    }

    if (/^\d{5}$/.test(val)) {
        return await lookupZip(val);
    }

    try {
        return await forwardGeocode(val);
    } catch (_) {
        return { text: val, coords: null };
    }
}

// Apple Maps address param — no geocoding, no coords
const a = await resolve('https://maps.apple.com/?address=350+5th+Ave,+New+York,+NY+10118&ll=40.748441,-73.985664');
assert.strictEqual(a.text, '350 5th Ave, New York, NY 10118');
assert.strictEqual(a.coords, null);

// Short link throws SHORT_LINK, not a generic error
await assert.rejects(() => resolve('https://maps.app.goo.gl/xyzASDF'), /SHORT_LINK/);
await assert.rejects(() => resolve('https://goo.gl/maps/1a2b3c4d5e'), /SHORT_LINK/);

// Google place link with !3d!4d picks the precise pin, not the /@ viewport center
const g = await resolve('https://www.google.com/maps/place/X/@40.7484405,-73.9878531,17z/data=!3m1!4b1!8m2!3d40.7484405!4d-73.9856644');
assert.strictEqual(g.coords.lat, 40.7484405);
assert.strictEqual(g.coords.lon, -73.9856644);

// Empty input returns null, not throw
assert.strictEqual(await resolve('   '), null);

console.log('All resolve() checks passed');
SCRIPT_EOF
node /tmp/verify-resolve.mjs
rm /tmp/verify-resolve.mjs
```

Expected output: `All resolve() checks passed` with no assertion errors. Note this step does not hit the network — none of the asserted branches call `fetch`.

- [ ] **Step 6: Commit**

```bash
git add assets/js/location-update.js
git commit -m "$(cat <<'EOF'
Refactor location-update geocoding to return {text, coords} per call

lastCoords was a single shared variable set as a side effect of the
last resolve() call. Start/Current/End now resolve concurrently, so
each needs its own coordinate pair returned directly instead of
racing to overwrite a shared global.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Add Start/End fields to HTML and CSS

**Files:**
- Modify: `location-update.html:38-47` (input card markup)
- Modify: `assets/css/location-update.css:49-91` (input card / button layout), and the `:root` token blocks at lines 2-3

**Interfaces:**
- Produces: DOM elements `#startInput`, `#locInput` (unchanged id, now the "Current location" field), `#endInput`, each a `<textarea class="loc-input">`; a `<button id="generateBtn">` no longer inside `.input-row`. Task 3 and Task 4 read these ids and rely on the class names below.
- Produces: CSS custom properties `--route-start` (dark: `#9ca3af`, light: `#64748b`) for the Start marker color; End marker reuses the existing `--success` token; Current marker keeps using `var(--primary)` as today.

- [ ] **Step 1: Add the two new color tokens**

In `assets/css/location-update.css`, update lines 2-3:

```css
:root[data-theme="dark"]  { --input-bg: #0f0d0b; --on-primary: #1a1205; --success: #4ade80; --route-start: #9ca3af; }
:root[data-theme="light"] { --input-bg: #eef0f5; --on-primary: #1a1205; --success: #16a34a; --route-start: #64748b; }
```

- [ ] **Step 2: Restyle the input card for three stacked fields and a full-width button**

Replace the `.input-row` rule and the `.btn-generate` block (lines 55-57 and 82-91) with:

```css
.field-group {
    display: flex; flex-direction: column; gap: 6px;
}

.btn-generate {
    width: 100%; height: 44px; padding: 0 20px;
    background: var(--primary); color: var(--on-primary);
    border: none; border-radius: 10px; cursor: pointer;
    font-family: inherit; font-size: 0.875rem; font-weight: 700;
    transition: opacity 0.15s, transform 0.1s;
}
.btn-generate:hover { opacity: 0.88; }
.btn-generate:active { transform: scale(0.97); }
.btn-generate:disabled { opacity: 0.5; cursor: default; }
```

Leave `.field-label`, `.loc-input`, `.loc-input.shake`, and the `@keyframes shake` rule as-is — they're reused by all three fields unchanged.

- [ ] **Step 3: Add marker/route CSS for the mini map**

Below the existing `/* ── Mini map ── */` block in the same file, add:

```css
#miniMap svg polyline.route-line {
    fill: none; stroke: rgba(255,179,24,0.5);
    stroke-width: 2; stroke-dasharray: 6 4;
}
```

- [ ] **Step 4: Update the HTML markup**

In `location-update.html`, replace the `<div class="input-card">...</div>` block (lines 39-47) with:

```html
    <div class="input-card">
      <div class="field-group">
        <label class="field-label" for="startInput" data-i18n="startLabel">Start (optional)</label>
        <textarea id="startInput" class="loc-input" rows="1"
          placeholder="Start (optional)"
          autocomplete="off" spellcheck="false"></textarea>
      </div>

      <div class="field-group">
        <label class="field-label" for="locInput" data-i18n="inputLabel">ZIP, City/State, or Maps link</label>
        <textarea id="locInput" class="loc-input" rows="2"
          placeholder="ZIP, City/State, or Maps link"
          autocomplete="off" spellcheck="false"></textarea>
      </div>

      <div class="field-group">
        <label class="field-label" for="endInput" data-i18n="endLabel">End (optional)</label>
        <textarea id="endInput" class="loc-input" rows="1"
          placeholder="End (optional)"
          autocomplete="off" spellcheck="false"></textarea>
      </div>

      <button class="btn-generate" id="generateBtn" data-i18n="generateBtn">Go</button>
    </div>
```

- [ ] **Step 5: Verify markup and styles manually**

```bash
python3 -m http.server 8080 --directory /Users/dvocean/WebstormProjects/cargo-tools
```

Open `http://localhost:8080/location-update.html` in a browser. Expected: three labeled textareas stacked vertically (Start, then the original "ZIP, City/State, or Maps link" field, then End), followed by a full-width orange "Go" button below all three. No JS errors in the console (the JS wiring update comes in Task 3, so the button will not yet do anything useful — clicking it should not throw). Stop the server with Ctrl+C when done.

- [ ] **Step 6: Commit**

```bash
git add location-update.html assets/css/location-update.css
git commit -m "$(cat <<'EOF'
Add Start/End location fields to location-update layout

Stacks three labeled fields (Start, Current, End) with a full-width
Go button below them, replacing the old single-field + inline-button
row. JS wiring for the new fields follows in a separate commit.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Wire `generate()` to resolve all three fields

**Files:**
- Modify: `assets/js/location-update.js:4-32` (`T` i18n table, `applyLang`), `:224-290` (`generate`, keydown wiring in the init IIFE)

**Interfaces:**
- Consumes: `resolve(raw)` from Task 1 (`{ text, coords } | null`, or throws `Error('SHORT_LINK')`); DOM ids `startInput`, `locInput`, `endInput`, `generateBtn` from Task 2.
- Produces: `resolveOptionalField(raw)` → `Promise<{text, coords} | null>` (never throws); `resolveCurrentField(raw)` → `Promise<{ result: {text, coords}, resolved: boolean }>` (never throws). Task 4's `showRouteMap({start, current, end})` consumes the `start`/`current`/`end` values built here (each `{text, coords} | null`).

- [ ] **Step 1: Add Start/End labels to the i18n table**

Replace the `T` object (lines 4-7) with:

```javascript
const T = {
    en: { inputLabel: 'ZIP, City/State, or Maps link', startLabel: 'Start (optional)', endLabel: 'End (optional)', generateBtn: 'Go', copyBtn: 'Copy', copiedBtn: '✓ Copied' },
    ru: { inputLabel: 'ZIP, Город/Штат или ссылка Maps', startLabel: 'Старт (опционально)', endLabel: 'Конечная точка (опционально)', generateBtn: 'Go', copyBtn: 'Копировать', copiedBtn: '✓ Скопировано' },
};
```

- [ ] **Step 2: Apply the new labels in `applyLang`**

In `applyLang` (around line 20-29), add two lines after the existing `inputLabel` line:

```javascript
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
```

- [ ] **Step 3: Add the two field-resolution helpers**

Add these two functions directly above `async function generate()`:

```javascript
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
                ? 'Не удалось развернуть короткую ссылку — вставьте полную ссылку на карту'
                : "Can't expand shortened map link — please paste the full map link")
            : raw;
        return { result: { text, coords: null }, resolved: false };
    }
}
```

- [ ] **Step 4: Rewrite `generate()` to resolve all three fields**

Replace the existing `generate` function (lines ~224-252) with:

```javascript
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
```

Note: `showRouteMap` is defined in Task 4; this task will leave the file temporarily calling an undefined function, which is fine since Task 4 is the next commit in this same plan.

- [ ] **Step 5: Wire Enter-to-submit on the new fields**

In the init IIFE at the bottom of the file, find:

```javascript
    document.getElementById('locInput').addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generate(); }
    });
```

Replace it with:

```javascript
    ['startInput', 'locInput', 'endInput'].forEach(function (id) {
        document.getElementById(id).addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generate(); }
        });
    });
```

- [ ] **Step 6: Verify the i18n and helper logic with an inline Node script**

```bash
node -e "
const assert = require('assert');
let currentLang = 'en';

async function resolveOptionalField(raw, resolve) {
    if (!raw || !raw.trim()) return null;
    try { return await resolve(raw); } catch (_) { return null; }
}

async function resolveCurrentField(raw, resolve) {
    try {
        const result = await resolve(raw);
        return { result, resolved: true };
    } catch (err) {
        const text = err.message === 'SHORT_LINK' ? 'SHORT-LINK-MSG' : raw;
        return { result: { text, coords: null }, resolved: false };
    }
}

async function main() {
  // empty optional field -> null, no throw
  assert.strictEqual(await resolveOptionalField('   ', async () => { throw new Error('should not be called'); }), null);

  // optional field that throws SHORT_LINK -> null (silently skipped, no marker)
  assert.strictEqual(await resolveOptionalField('https://goo.gl/maps/x', async () => { throw new Error('SHORT_LINK'); }), null);

  // optional field that resolves -> passthrough
  const ok = await resolveOptionalField('10001', async () => ({ text: 'New York, NY 10001', coords: { lat: 1, lon: 2 } }));
  assert.deepStrictEqual(ok, { text: 'New York, NY 10001', coords: { lat: 1, lon: 2 } });

  // current field SHORT_LINK -> resolved:false, friendly text, no coords
  const cur = await resolveCurrentField('https://goo.gl/maps/x', async () => { throw new Error('SHORT_LINK'); });
  assert.strictEqual(cur.resolved, false);
  assert.strictEqual(cur.result.text, 'SHORT-LINK-MSG');
  assert.strictEqual(cur.result.coords, null);

  console.log('All field-resolution checks passed');
}
main();
"
```

Expected output: `All field-resolution checks passed`.

- [ ] **Step 7: Commit**

```bash
git add assets/js/location-update.js
git commit -m "$(cat <<'EOF'
Resolve Start/Current/End fields in parallel on Go

Current keeps its existing required/short-link/error behavior; Start
and End resolve independently and silently contribute nothing when
they fail, so one bad optional field never blocks the others or the
chat message.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Replace `showMiniMap` with multi-point `showRouteMap`

**Files:**
- Modify: `assets/js/location-update.js:136-220` (`showMiniMap` → `showRouteMap`)

**Interfaces:**
- Consumes: `latLonToSvg(lat, lon)` (unchanged, from Task 1's untouched section); the `{start, current, end}` object built in Task 3's `generate()`, where each value is `{text, coords} | null`.
- Produces: `showRouteMap({start, current, end})`, called from `generate()` (already wired in Task 3).

- [ ] **Step 1: Replace `showMiniMap` with `showRouteMap`**

Replace the whole `showMiniMap` function (from `async function showMiniMap(location) {` through its closing `}`, lines ~156-220) with:

```javascript
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
```

- [ ] **Step 2: Verify no leftover references to the old function or `lastCoords`**

```bash
grep -n "showMiniMap\|lastCoords" assets/js/location-update.js
```

Expected: no output (empty). If `showMiniMap` still appears, it means a call site was missed — check `generate()` from Task 3 calls `showRouteMap`, not `showMiniMap`.

- [ ] **Step 3: Manual end-to-end verification in the browser**

```bash
python3 -m http.server 8080 --directory /Users/dvocean/WebstormProjects/cargo-tools
```

Open `http://localhost:8080/location-update.html`. Run through these cases (each is a distinct scenario from the spec):

1. **Current only** (leave Start/End blank): enter `10001`, click Go. Expected: result text shows `Hi, team! Current location: New York, NY 10001` (or similar), map shows a single pulsing primary-color dot, no line, NY state highlighted.
2. **All three filled**: Start = `90001`, Current = `10001`, End = `60601`. Expected: three colored dots (gray, pulsing primary, green) connected by a dashed line in that order, only NY (Current's state) highlighted.
3. **Short link in an optional field**: Start = `https://goo.gl/maps/abc123`, Current = `10001`, End blank. Expected: no error shown anywhere, no gray dot for Start, current dot still renders normally — Go button and message are unaffected by the bad Start value.
4. **Short link in Current**: Current = `https://goo.gl/maps/abc123`, Start/End blank. Expected: result text shows the "can't expand shortened map link" message, no map panel is shown (no point has coords).
5. **Apple Maps address-only link in Current**: Current = `https://maps.apple.com/?address=1+Infinite+Loop,+Cupertino,+CA+95014`. Expected: result text shows the address, map shows one dot approximately centered on California (bbox fallback), CA highlighted.

Stop the server with Ctrl+C when done. If any scenario doesn't match, fix the relevant step above before committing.

- [ ] **Step 4: Commit**

```bash
git add assets/js/location-update.js
git commit -m "$(cat <<'EOF'
Render Start/Current/End as a route on the mini map

Replaces the single-pin showMiniMap with showRouteMap, which places
a marker per resolved point (gray Start, pulsing Current, green End)
and a dashed line connecting them in route order. Points without
coordinates fall back to their state's bbox center, same as the
existing Apple Maps address-only behavior; unresolved points are
simply omitted rather than blocking the others.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
