/**
 * Shared HOS (Hours of Service) drive-time engine.
 * Used by transit-time and location-update. Exposes window.HOS.
 */
(function (global) {
    'use strict';

    // fetch() with an abort timeout.
    async function timed(url, ms = 12000) {
        const ctrl = new AbortController();
        const tid  = setTimeout(() => ctrl.abort(), ms);
        try {
            const r = await fetch(url, { signal: ctrl.signal });
            clearTimeout(tid);
            return r;
        } catch (e) {
            clearTimeout(tid);
            if (e.name === 'AbortError') throw new Error('Request timed out — please try again.');
            throw e;
        }
    }

    // Road driving distance (miles) between two points. Each point may use
    // { lat, lon } or { lat, lng }. Throws Error with code 'ROUTE' on failure.
    async function fetchRoadMiles(a, b) {
        const ax = a.lon != null ? a.lon : a.lng;
        const bx = b.lon != null ? b.lon : b.lng;
        const url = `https://router.project-osrm.org/route/v1/driving/${ax},${a.lat};${bx},${b.lat}?overview=false`;
        const r = await timed(url);
        if (!r.ok) throw Object.assign(new Error('ROUTE'), { code: 'ROUTE' });
        const data = await r.json();
        if (data.code !== 'Ok' || !data.routes || !data.routes.length) {
            throw Object.assign(new Error('ROUTE'), { code: 'ROUTE' });
        }
        return data.routes[0].distance / 1609.344;
    }

    // Simulate driving `totalMiles` under HOS + fuel rules. Pure function.
    // params: { speed, shift, cont, breakMin, fuelMi, fuelMin, rest }
    function simulateTrip(totalMiles, params) {
        const SPEED      = params.speed;
        const SHIFT_MAX  = params.shift;
        const CONT_MAX   = params.cont;
        const BREAK_DUR  = params.breakMin / 60;
        const FUEL_EVERY = params.fuelMi;
        const FUEL_DUR   = params.fuelMin / 60;
        const REST_DUR   = params.rest;
        const EPS        = 1e-4;

        let remaining = totalMiles, shiftH = 0, contH = 0, milesFuel = 0;
        let totalDrive = 0, totalElapsed = 0, hosRests = 0, fuelStops = 0;
        const steps = [];

        for (let i = 0; i < 5000 && remaining > EPS; i++) {
            const tBreak  = CONT_MAX - contH;
            const tFuel   = (FUEL_EVERY - milesFuel) / SPEED;
            const tHOS    = SHIFT_MAX - shiftH;
            const tFinish = remaining / SPEED;

            const drive  = Math.min(tBreak, tFuel, tHOS, tFinish);
            const dMiles = drive * SPEED;

            remaining    -= dMiles;
            totalDrive   += drive;
            totalElapsed += drive;
            shiftH       += drive;
            contH        += drive;
            milesFuel    += dMiles;

            steps.push({ type: 'drive', hours: drive, miles: dMiles });
            if (remaining <= EPS) break;

            if (shiftH + EPS >= SHIFT_MAX) {
                hosRests++;
                totalElapsed += REST_DUR;
                shiftH = 0; contH = 0;
                steps.push({ type: 'rest', hours: REST_DUR });
            } else if (milesFuel + EPS >= FUEL_EVERY) {
                fuelStops++;
                totalElapsed += FUEL_DUR;
                milesFuel = 0; contH = 0;
                steps.push({ type: 'fuel', hours: FUEL_DUR });
            } else {
                totalElapsed += BREAK_DUR;
                contH = 0;
                steps.push({ type: 'brk', hours: BREAK_DUR });
            }
        }

        steps.push({ type: 'done' });
        return { totalDrive, totalElapsed, hosRests, fuelStops, steps };
    }

    global.HOS = { timed, fetchRoadMiles, simulateTrip };
})(window);
