# Location-Update ETA / Drive-Time Calculator — Design

**Date:** 2026-07-09
**Page:** `location-update.html`

## Goal

Add a "how much is left to drive" calculator to the location-update page that
accounts for speed, HOS rest/sleep, and fuel stops. It shows **route progress**:
the whole trip (Start→End), the part already driven (Start→Current), and what
remains (Current→End). Styled like `transit-time`.

## 1. Architecture — shared HOS module

Extract the reusable engine from `transit-time.js` into a new
`assets/js/hos.js` exposing a global `window.HOS`:

- `HOS.simulateTrip(miles, params) → { totalDrive, totalElapsed, hosRests, fuelStops, steps }`
  — pure HOS + fuel simulation (moved verbatim from transit-time).
- `HOS.fetchRoadMiles(a, b) → miles` — OSRM driving distance between two points.
  Accepts `{lat, lon}` **or** `{lat, lng}` (reads `p.lon ?? p.lng`) so both pages
  work. On failure throws an error with `code === 'ROUTE'`; timeouts throw via a
  private `timed()` helper.

`transit-time.js` is refactored to call `HOS.simulateTrip` / `HOS.fetchRoadMiles`
and its local copies are removed. Its remaining `timed`/`lookupZip` stay. The
error catch maps `err.code === 'ROUTE'` → `t('errRoute')` to preserve messages.
Both HTML pages add `<script src="assets/js/hos.js"></script>` **before** their
page script. transit-time is covered by a before/after browser test.

## 2. UI on location-update (transit-time style)

Below the existing result card, a new **"Time on the road"** card:

- **Parameters** (3 adjustable groups, 4 inputs): Speed (mph), Rest/sleep (h),
  Fuel every (mi), Fuel stop (min). Fixed HOS limits: shift 11 h, continuous 8 h
  → 30-min break, 11 h drive → rest. Defaults: 50 / 10 / 500 / 30.
- **"Calculate time"** button.
- **Results** (stat tiles like transit-time):
  - **Remaining** (Current→End): 🚗 driving time · ⏱️ total elapsed (incl.
    rests/fuel) · 🛏️ HOS rests · ⛽ fuel stops · road miles · **Arrival ≈** clock
    (now + total elapsed, local time; shows +Nd if it crosses days).
  - **Progress** bar: `traveled / (traveled + remaining)` percent — shown only
    when Start is provided, with Traveled and Total drive-time below it.

## 3. Calculation flow (on "Calculate")

1. Read params (clamped) + fixed HOS values.
2. Resolve points by reusing `resolve()` → coords. **Current and End required**;
   Start optional. Resolve fresh each click (inputs may have changed).
3. OSRM distances: Current→End always; Start→Current and Start→End if Start set.
   (Run in parallel.)
4. `HOS.simulateTrip` per segment → render results.

## 4. Errors & i18n

- Missing End → "Enter the End point". Point won't resolve → "Couldn't resolve
  the route points". OSRM fails → "Couldn't get the road distance — try again".
- All labels/buttons/tiles/errors bilingual via the existing `data-i18n` loop.
  The loop is hardened to only assign **string** values (function-valued keys
  like `roadMiles`/arrival are used programmatically, never via `data-i18n`).
- New number formatters `fmtHours` / `fmtElapsed` in location-update.js
  (bilingual h/min, days for long elapsed).

## 5. Testing

- **transit-time regression:** browser test (ZIP→ZIP) before and after the
  refactor; identical drive time / rests / fuel.
- **location-update:** Start/Current/End as ZIPs → Calculate → verify remaining
  time, HOS rests, fuel stops, and progress. Cases: no Start (remaining only),
  empty End (error), typo (error).

## Out of scope

- No step-by-step timeline on this page (kept compact).
- No coordinate caching from the Go flow (resolve fresh).
- Apple `/p/` place links still can't be resolved (unchanged limitation).
