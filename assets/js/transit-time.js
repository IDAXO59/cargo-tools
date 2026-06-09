// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULTS = {
    speed:    50,   // mph
    shift:    11,   // hours
    cont:     8,    // hours
    breakMin: 30,   // minutes
    fuelMi:   500,  // miles
    fuelMin:  30,   // minutes
    rest:     10,   // hours
};

function getParams() {
    return {
        speed:    clamp(parseFloat(document.getElementById('p-speed').value),   10, 120) || DEFAULTS.speed,
        shift:    clamp(parseFloat(document.getElementById('p-shift').value),    1,  24) || DEFAULTS.shift,
        cont:     clamp(parseFloat(document.getElementById('p-cont').value),     1,  24) || DEFAULTS.cont,
        breakMin: clamp(parseFloat(document.getElementById('p-break').value),   10, 120) || DEFAULTS.breakMin,
        fuelMi:   clamp(parseFloat(document.getElementById('p-fuel-mi').value), 100,2000) || DEFAULTS.fuelMi,
        fuelMin:  clamp(parseFloat(document.getElementById('p-fuel-min').value),  5, 120) || DEFAULTS.fuelMin,
        rest:     clamp(parseFloat(document.getElementById('p-rest').value),     1,  24) || DEFAULTS.rest,
    };
}

function clamp(v, min, max) { return isNaN(v) ? NaN : Math.min(max, Math.max(min, v)); }

function resetParams() {
    document.getElementById('p-speed').value    = DEFAULTS.speed;
    document.getElementById('p-shift').value    = DEFAULTS.shift;
    document.getElementById('p-cont').value     = DEFAULTS.cont;
    document.getElementById('p-break').value    = DEFAULTS.breakMin;
    document.getElementById('p-fuel-mi').value  = DEFAULTS.fuelMi;
    document.getElementById('p-fuel-min').value = DEFAULTS.fuelMin;
    document.getElementById('p-rest').value     = DEFAULTS.rest;
    updateModifiedState();
}

function updateModifiedState() {
    const p = getParams();
    const checks = [
        [p.speed,    DEFAULTS.speed,    'p-speed'],
        [p.shift,    DEFAULTS.shift,    'p-shift'],
        [p.cont,     DEFAULTS.cont,     'p-cont'],
        [p.breakMin, DEFAULTS.breakMin, 'p-break'],
        [p.fuelMi,   DEFAULTS.fuelMi,   'p-fuel-mi'],
        [p.fuelMin,  DEFAULTS.fuelMin,  'p-fuel-min'],
        [p.rest,     DEFAULTS.rest,     'p-rest'],
    ];
    let anyModified = false;
    checks.forEach(([val, def, id]) => {
        const modified = Math.abs(val - def) > 0.001;
        document.getElementById(id).classList.toggle('modified', modified);
        if (modified) anyModified = true;
    });
    document.getElementById('modifiedDot').classList.toggle('visible', anyModified);

    // Show stale hint only when results are showing AND params differ from last calculation
    const resultsVisible = document.getElementById('results').classList.contains('show');
    let stale = false;
    if (resultsVisible && _calcParams) {
        stale = Object.keys(DEFAULTS).some(k => Math.abs((p[k] ?? 0) - (_calcParams[k] ?? 0)) > 0.001);
    }
    document.getElementById('staleHint').classList.toggle('show', stale);
}

// ── i18n ─────────────────────────────────────────────────────────────────────

const STRINGS = {
    en: {
        backLabel:      'Main',
        pageTitle:      'Transit Time',
        pageSubtitle:   'Drive time with HOS logbook rules',
        originLabel:    'Origin ZIP',
        destLabel:      'Destination ZIP',
        calcBtn:        'Calculate Transit Time',
        paramsTitle:    'Parameters',
        paramsReset:    '↺ Reset to defaults',
        paramSpeed:     'Avg. Speed',
        paramShift:     'Max shift',
        paramCont:      'Cont. limit',
        paramBreak:     'Break',
        paramFuelEvery: 'Fuel every',
        paramFuelDur:   'Fuel stop',
        paramRest:      'HOS rest',
        unitMph:        'mph',
        unitH:          'h',
        unitMin:        'min',
        unitMi:         'mi',
        staleHint:      'Parameters changed',
        staleRecalc:    'Recalculate →',
        loadingZip:     'Looking up ZIP codes…',
        loadingRoute:   'Calculating road distance…',
        roadMiles:      n => `${n.toLocaleString()} road miles`,
        statWheelTime:  '🚗 Wheel Time',
        statElapsed:    '⏱️ Total Elapsed',
        statRests:      '🛏️ HOS Rests',
        statFuel:       '⛽ Fuel Stops',
        deliveryLabel:  'Estimated Delivery Window',
        deliveryVal:    s => `Ready in ~${s}`,
        timelineHeader: 'Step-by-Step Timeline',
        helpTitle:      'How Transit Time Works',
        helpDesc:       'Calculates realistic drive time using FMCSA Hours of Service (HOS) rules.',
        helpHow:        'How to use',
        helpStep1:      'Enter 5-digit origin and destination ZIP codes',
        helpStep2:      'Coordinates fetched from Zippopotam.us, road distance from OSRM',
        helpStep3:      'Average speed of 50 mph applied to total road miles',
        helpStep4:      'After 8h continuous driving → mandatory 30-min break',
        helpStep5:      'After 11h driving in a shift → 10h HOS rest period',
        helpStep6:      'Every 500 miles → 30-min fuel stop (also resets continuous counter)',
        helpStep7:      'All parameters can be adjusted in the Parameters section',
        tl_drive:       h => `Drive ${h}`,
        tl_driveSub:    n => `${n.toLocaleString()} miles`,
        tl_rest:        h => `${h} HOS rest`,
        tl_restSub:     'Mandatory logbook off-duty period',
        tl_fuel:        m => `Fuel stop — ${m}`,
        tl_fuelSub:     'Resets continuous driving counter',
        tl_brk:         m => `Break — ${m}`,
        tl_brkSub:      'Continuous driving limit reached',
        tl_done:        'Delivered',
        days:           n => n === 1 ? '1 day' : `${n} days`,
        hours:          n => `${n}h`,
        mins:           n => `${n}min`,
        switchLang:     'Переключить на русский',
        switchToLight:  'Switch to light theme',
        switchToDark:   'Switch to dark theme',
        errOrigin:      'Enter a valid 5-digit origin ZIP code.',
        errDest:        'Enter a valid 5-digit destination ZIP code.',
        errSame:        'Origin and destination ZIP codes must be different.',
        errClose:       'These locations are too close to calculate transit time.',
        errRoute:       'No drivable route found between these locations.',
    },
    ru: {
        backLabel:      'Main',
        pageTitle:      'Время в пути',
        pageSubtitle:   'Расчёт по нормам HOS (путевой лист)',
        originLabel:    'ZIP отправления',
        destLabel:      'ZIP назначения',
        calcBtn:        'Рассчитать время в пути',
        paramsTitle:    'Параметры',
        paramsReset:    '↺ Сбросить',
        paramSpeed:     'Средняя скорость',
        paramShift:     'Макс. смена',
        paramCont:      'Лимит непрерыв.',
        paramBreak:     'Перерыв',
        paramFuelEvery: 'Заправка каждые',
        paramFuelDur:   'Остановка',
        paramRest:      'Отдых HOS',
        unitMph:        'м/ч',
        unitH:          'ч',
        unitMin:        'мин',
        unitMi:         'ми',
        staleHint:      'Параметры изменены',
        staleRecalc:    'Пересчитать →',
        loadingZip:     'Поиск ZIP-кодов…',
        loadingRoute:   'Расчёт дорожного расстояния…',
        roadMiles:      n => `${n.toLocaleString()} миль по дороге`,
        statWheelTime:  '🚗 Время за рулём',
        statElapsed:    '⏱️ Общее время',
        statRests:      '🛏️ Отдых HOS',
        statFuel:       '⛽ Заправки',
        deliveryLabel:  'Ожидаемое время доставки',
        deliveryVal:    s => `Готово через ~${s}`,
        timelineHeader: 'Пошаговый маршрут',
        helpTitle:      'Как работает расчёт',
        helpDesc:       'Расчёт реального времени в пути по нормам FMCSA Hours of Service (HOS).',
        helpHow:        'Как пользоваться',
        helpStep1:      'Введите 5-значные ZIP-коды отправления и назначения',
        helpStep2:      'Координаты из Zippopotam.us, дорожное расстояние из OSRM',
        helpStep3:      'Средняя скорость 50 м/ч применяется к дорожному расстоянию',
        helpStep4:      'После 8ч непрерывного вождения → обязательный перерыв 30 мин',
        helpStep5:      'После 11ч вождения за смену → обязательный отдых 10ч (HOS)',
        helpStep6:      'Каждые 500 миль → заправка 30 мин (сбрасывает непрерывное вождение)',
        helpStep7:      'Все параметры можно изменить в разделе «Параметры»',
        tl_drive:       h => `Езда ${h}`,
        tl_driveSub:    n => `${n.toLocaleString()} миль`,
        tl_rest:        h => `Отдых ${h} (HOS)`,
        tl_restSub:     'Обязательный перерыв по путевому листу',
        tl_fuel:        m => `Заправка — ${m}`,
        tl_fuelSub:     'Сброс счётчика непрерывного вождения',
        tl_brk:         m => `Перерыв — ${m}`,
        tl_brkSub:      'Достигнут лимит непрерывного вождения',
        tl_done:        'Доставлено',
        days:           n => `${n} дн.`,
        hours:          n => `${n}ч`,
        mins:           n => `${n}мин`,
        switchLang:     'Switch to English',
        switchToLight:  'Светлая тема',
        switchToDark:   'Тёмная тема',
        errOrigin:      'Введите корректный 5-значный ZIP-код отправления.',
        errDest:        'Введите корректный 5-значный ZIP-код назначения.',
        errSame:        'ZIP-коды отправления и назначения должны быть разными.',
        errClose:       'Точки слишком близко для расчёта времени в пути.',
        errRoute:       'Маршрут между этими точками не найден.',
    },
};

let currentLang = 'en';

function t(key, arg) {
    const val = STRINGS[currentLang][key] ?? STRINGS.en[key] ?? key;
    return typeof val === 'function' ? val(arg) : val;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const v = STRINGS[currentLang][el.dataset.i18n];
        if (typeof v === 'string') el.textContent = v;
    });
    const langBtn = document.getElementById('langBtn');
    langBtn.textContent = currentLang === 'en' ? 'RU' : 'EN';
    langBtn.title = t('switchLang');

    const isDark = document.documentElement.dataset.theme === 'dark';
    document.getElementById('themeBtn').title = isDark ? t('switchToLight') : t('switchToDark');

    document.getElementById('zip-origin').placeholder = currentLang === 'ru' ? 'напр. 60601' : 'e.g. 60601';
    document.getElementById('zip-dest').placeholder   = currentLang === 'ru' ? 'напр. 75201' : 'e.g. 75201';

    // Re-render dynamic result text if visible
    if (_cache && document.getElementById('results').classList.contains('show')) {
        renderResults(_cache.miles, _cache.origin, _cache.dest, _cache.params);
    }
}

function toggleLang() {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    document.documentElement.lang = currentLang;
    try { localStorage.setItem('transit-lang', currentLang); } catch(e) {}
    applyTranslations();
}

// ── Theme ─────────────────────────────────────────────────────────────────────

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('transit-theme', theme); } catch(e) {}
    document.getElementById('themeBtn').title =
        theme === 'dark' ? t('switchToLight') : t('switchToDark');
}
function toggleTheme() {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
}

// ── Help ──────────────────────────────────────────────────────────────────────
function openHelp()  { document.getElementById('helpOverlay').classList.add('open'); }
function closeHelp() { document.getElementById('helpOverlay').classList.remove('open'); }

// ── Formatting ────────────────────────────────────────────────────────────────

function fmtH(h) {
    const hrs  = Math.floor(h);
    const mins = Math.round((h - hrs) * 60);
    if (hrs === 0) return t('mins', mins);
    if (mins === 0) return t('hours', hrs);
    return `${t('hours', hrs)} ${t('mins', mins)}`;
}

function fmtElapsed(h) {
    const days = Math.floor(h / 24);
    const rem  = h % 24;
    const hrs  = Math.floor(rem);
    const mins = Math.round((rem - hrs) * 60);
    const parts = [];
    if (days > 0) parts.push(t('days', days));
    if (hrs  > 0) parts.push(t('hours', hrs));
    if (mins > 0) parts.push(t('mins', mins));
    return parts.length ? parts.join(' ') : t('mins', 1);
}

// ── HOS Simulation ────────────────────────────────────────────────────────────

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

// ── API ───────────────────────────────────────────────────────────────────────

async function timed(url, ms = 12000) {
    const ctrl = new AbortController();
    const tid  = setTimeout(() => ctrl.abort(), ms);
    try {
        const r = await fetch(url, { signal: ctrl.signal });
        clearTimeout(tid); return r;
    } catch (e) {
        clearTimeout(tid);
        if (e.name === 'AbortError') throw new Error('Request timed out — please try again.');
        throw e;
    }
}

async function lookupZip(zip) {
    const r = await timed(`https://api.zippopotam.us/us/${zip}`);
    if (r.status === 404) throw new Error(`ZIP ${zip} not found.`);
    if (!r.ok) throw new Error(`ZIP ${zip} lookup failed (HTTP ${r.status}).`);
    const d = await r.json();
    if (!d.places || !d.places.length) throw new Error(`ZIP ${zip} not found.`);
    const p = d.places[0];
    return { lat: parseFloat(p.latitude), lng: parseFloat(p.longitude), city: p['place name'], state: p['state abbreviation'] };
}

async function fetchRoadMiles(o, d) {
    const url = `https://router.project-osrm.org/route/v1/driving/${o.lng},${o.lat};${d.lng},${d.lat}?overview=false`;
    const r   = await timed(url);
    if (!r.ok) throw new Error(t('errRoute'));
    const data = await r.json();
    if (data.code !== 'Ok' || !data.routes?.length) throw new Error(t('errRoute'));
    return data.routes[0].distance / 1609.344;
}

// ── UI ────────────────────────────────────────────────────────────────────────

function showMsg(text, type = 'error') {
    const box = document.getElementById('msgBox');
    if (type === 'loading') box.innerHTML = `<div class="spinner"></div>${text}`;
    else box.textContent = text;
    box.className = `msg ${type} show`;
    document.getElementById('results').classList.remove('show');
    document.getElementById('staleHint').classList.remove('show');
}

function hideMsg() { document.getElementById('msgBox').className = 'msg'; }

function checkZipValid() {
    const oVal = document.getElementById('zip-origin').value;
    const dVal = document.getElementById('zip-dest').value;
    document.getElementById('zip-origin').classList.toggle('valid', /^\d{5}$/.test(oVal));
    document.getElementById('zip-dest').classList.toggle('valid', /^\d{5}$/.test(dVal));
}

function renderTimeline(steps) {
    const list = document.getElementById('tlList');
    list.innerHTML = '';
    const dots = { drive:'▶', rest:'Z', fuel:'F', brk:'B', done:'✓' };

    steps.forEach((step, idx) => {
        const last = idx === steps.length - 1;
        let name = '', sub = '';
        switch (step.type) {
            case 'drive': name = t('tl_drive', fmtH(step.hours));   sub = t('tl_driveSub', Math.round(step.miles)); break;
            case 'rest':  name = t('tl_rest',  fmtH(step.hours));   sub = t('tl_restSub'); break;
            case 'fuel':  name = t('tl_fuel',  fmtH(step.hours));   sub = t('tl_fuelSub'); break;
            case 'brk':   name = t('tl_brk',   fmtH(step.hours));   sub = t('tl_brkSub');  break;
            case 'done':  name = t('tl_done'); break;
        }
        const item = document.createElement('div');
        item.className = 'tl-item';
        item.innerHTML = `
      <div class="tl-track">
        <div class="tl-dot ${step.type}">${dots[step.type]}</div>
        ${!last ? '<div class="tl-line"></div>' : ''}
      </div>
      <div class="tl-body">
        <div class="tl-name">${name}</div>
        ${sub ? `<div class="tl-sub">${sub}</div>` : ''}
      </div>`;
        item.style.animationDelay = (idx * 0.06) + 's';
        list.appendChild(item);
    });
}

function renderResults(miles, origin, dest, params) {
    const { totalDrive, totalElapsed, hosRests, fuelStops, steps } = simulateTrip(miles, params);

    document.getElementById('routeLabel').textContent =
        `${origin.city}, ${origin.state} → ${dest.city}, ${dest.state}`;
    document.getElementById('routeSub').textContent    = t('roadMiles', Math.round(miles));
    document.getElementById('statDrive').textContent   = fmtH(totalDrive);
    document.getElementById('statElapsed').textContent = fmtElapsed(totalElapsed);
    document.getElementById('statRests').textContent   = hosRests  || '—';
    document.getElementById('statFuel').textContent    = fuelStops || '—';
    document.getElementById('deliveryVal').textContent = t('deliveryVal', fmtElapsed(totalElapsed));
    renderTimeline(steps);
    document.getElementById('results').classList.add('show');
}

// ── Route cache (skip re-fetching when only params changed) ───────────────────

let _cache      = null; // { originZip, destZip, miles, origin, dest, params }
let _calcParams = null; // params used in the last successful render

// ── Main calculate ────────────────────────────────────────────────────────────

async function calculate() {
    const originVal = document.getElementById('zip-origin').value.trim();
    const destVal   = document.getElementById('zip-dest').value.trim();

    if (!/^\d{5}$/.test(originVal)) { showMsg(t('errOrigin')); return; }
    if (!/^\d{5}$/.test(destVal))   { showMsg(t('errDest'));   return; }
    if (originVal === destVal)       { showMsg(t('errSame'));   return; }

    const params = getParams();
    const btn    = document.getElementById('calcBtn');
    btn.disabled = true;

    try {
        let miles, origin, dest;

        // Reuse cached route if ZIPs haven't changed
        if (_cache && _cache.originZip === originVal && _cache.destZip === destVal) {
            ({ miles, origin, dest } = _cache);
            hideMsg();
        } else {
            showMsg(t('loadingZip'), 'loading');
            [origin, dest] = await Promise.all([lookupZip(originVal), lookupZip(destVal)]);

            showMsg(t('loadingRoute'), 'loading');
            miles = await fetchRoadMiles(origin, dest);

            if (miles < 1) { showMsg(t('errClose')); return; }
            _cache = { originZip: originVal, destZip: destVal, miles, origin, dest };
        }

        hideMsg();
        _cache.params = params;
        _calcParams = { ...params };
        renderResults(miles, origin, dest, params);

        // Hide stale hint after successful recalculate
        document.getElementById('staleHint').classList.remove('show');

    } catch (err) {
        showMsg(err.message || t('errRoute'));
    } finally {
        btn.disabled = false;
    }
}

// ── Init ──────────────────────────────────────────────────────────────────────

(function init() {
    // Theme
    let savedTheme = 'dark';
    try {
        const s = localStorage.getItem('transit-theme');
        if (s) savedTheme = s;
        else if (matchMedia('(prefers-color-scheme: light)').matches) savedTheme = 'light';
    } catch(e) {}
    applyTheme(savedTheme);

    // Language
    try {
        const s = localStorage.getItem('transit-lang');
        if (s === 'ru' || s === 'en') currentLang = s;
    } catch(e) {}
    document.documentElement.lang = currentLang;
    applyTranslations();

    // Buttons
    document.getElementById('calcBtn').addEventListener('click', calculate);
    document.getElementById('recalcBtn').addEventListener('click', calculate);
    document.getElementById('themeBtn').addEventListener('click', toggleTheme);
    document.getElementById('langBtn').addEventListener('click', toggleLang);
    document.getElementById('helpBtn').addEventListener('click', openHelp);
    document.getElementById('helpClose').addEventListener('click', closeHelp);
    document.getElementById('helpOverlay').addEventListener('click', e => {
        if (e.target === e.currentTarget) closeHelp();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeHelp(); });

    document.getElementById('resetParams').addEventListener('click', resetParams);

    // Parameters panel toggle
    const toggle = document.getElementById('paramsToggle');
    const body   = document.getElementById('paramsBody');
    toggle.addEventListener('click', () => {
        const open = body.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open);
    });

    // Watch param inputs for changes
    document.querySelectorAll('.param-input').forEach(el => {
        el.addEventListener('input', updateModifiedState);
    });

    // ZIP input: digits only
    ['zip-origin', 'zip-dest'].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener('input', () => {
            el.value = el.value.replace(/\D/g, '').slice(0, 5);
            checkZipValid();
            // Invalidate cache when ZIPs change
            _cache = null;
            document.getElementById('staleHint').classList.remove('show');
        });
    });

    document.getElementById('zip-origin').addEventListener('keydown', e => {
        if (e.key === 'Enter') document.getElementById('zip-dest').focus();
    });
    document.getElementById('zip-dest').addEventListener('keydown', e => {
        if (e.key === 'Enter') calculate();
    });
})();