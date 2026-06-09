
    // =========================
    // i18n
    // =========================
    const I18N = {
    en: {
    appTitle: 'Cargo Spacer',
    appDesc: 'Verify if your cargo fits in the truck – visually and by the numbers.',
    chooseTruckType: '1. Choose truck type',
    truckCargoSpace: 'Truck Cargo Space',
    cargoItems: 'Cargo Items',
    units: 'Units:',
    length: 'Length',
    width: 'Width',
    height: 'Height',
    maxPayload: 'Max Payload ({0})',
    weightUnit: 'Weight unit:',
    weightPerUnit: 'Weight per unit ({0})',
    quantity: 'Quantity',
    addAnotherCargo: 'Add another cargo type',
    checkCargoFit: 'Check Cargo Fit',
    randomSampleTitle: 'Fill with random sample (guaranteed to fit)',
    reset: 'Reset',
    resetTitle: 'Clear all fields',
    atLeastOneCargo: 'At least one cargo required',
    remove: 'Remove',
    duplicate: 'Duplicate',
    copySuffix: 'copy',
    cargoBase: 'Cargo',
    stackable: 'Stackable',
    stackableHint: 'Allow placing other items on top',
    rotatable: 'Rotatable',
    rotatableHint: 'Allow rotating horizontally (swap L ↔ W)',
    loadDirection: 'Load:',
    towardCab: '← Toward cab',
    towardDoors: 'Toward doors →',
    bulkhead: 'Bulkhead',
    bulkheadHint: 'Wall between driver cab and cargo area',

    allUnitsFit: 'All {0} units fit! {1}% of volume used.',
    cargoDoesNotFit: 'Cargo does <strong>not</strong> fit ({0} of {1} units placed).',

    volumeUsed: 'Volume Used',
    payloadUsed: 'Payload Used',
    cargoTypes: 'Cargo Types',
    totalUnits: 'Total Units',
    totalWeight: 'Total Weight',

    cargoCol: 'Cargo',
    dimensionsCol: 'Dimensions ({0})',
    qtyCol: 'Qty',
    placedCol: 'Placed',
    weightCol: 'Weight',
    dashEmpty: '–',

    visualization: '3D Visualization',
    vizHint: '(drag to rotate · scroll to zoom)',
    truckBody: 'Truck Body',
    unitsPlacedLabel: '{0} of {1} units placed',
    vizTruncated: 'Showing first {0} of {1} units (limit reached)',

    enterTruckDims: 'Please enter all truck dimensions.',
    enterCargoDims: 'Please enter at least one cargo with all dimensions and quantity ≥ 1.',

    warnExceedsTruck: '"{0}" exceeds truck {1} – single unit doesn\'t fit.',
    warnOnlyFit: '"{0}": only {1} of {2} unit(s) fit – not enough space in the truck.',
    warnVolumeExceeds: 'Total cargo volume exceeds truck capacity ({0}%).',
    warnWeightExceeds: 'Total weight {0} {2} exceeds payload {1} {2}.',
    warnNonStackable: '"{0}" marked non-stackable – packed as single layer.',
    warnWheelWellOverlap: '{0} unit(s) overlap with wheel wells – highlighted in orange.',

    dim_length: 'length',
    dim_width: 'width',
    dim_height: 'height',

    sprinterName: 'Sprinter / Cargo Van',
    sprinterDesc: 'Mercedes Sprinter, Ford Transit',
    smallStraightName: 'Small Straight Truck',
    smallStraightDesc: '16–20 ft box truck',
    largeStraightName: 'Large Straight Truck',
    largeStraightDesc: '24–26 ft box truck',
    customName: 'Custom',
    customDesc: 'Enter your own dimensions',
    customDims: 'Custom dimensions',
    payloadLabel: '{0} {1} payload',
    setPayload: 'Set your own payload',

    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    switchLang: 'Switch language',

    placeholder_l: 'e.g. 150',
    placeholder_w: 'e.g. 55',
    placeholder_h: 'e.g. 72',
    placeholder_payload: 'e.g. 4000',
    placeholder_tare: 'e.g. 0',
    placeholder_lbs: 'lbs',

    helpTitle: 'Cargo Spacer',
    helpDesc: 'Verify if your cargo fits in the truck – visually and by the numbers.',
    helpHow: 'How to use',
    helpStep1: 'Pick a truck – choose a preset (Sprinter, Small / Large Straight) or set custom dimensions.',
    helpStep2: 'Add cargo items – enter length, width, height, weight, and quantity for each piece.',
    helpStep3: 'Switch units anytime – feet / inches / meters / cm and lbs / kg.',
    helpStep4: 'Check fit – visual layout shows how items pack, plus pass/fail by volume and weight.',
    helpStep5: 'Auto-saved – state is kept in your browser; close and come back later.',
},
    ru: {
    appTitle: 'Cargo Spacer',
    appDesc: 'Проверьте, поместится ли груз в кузов – визуально и по цифрам.',
    chooseTruckType: '1. Выберите тип машины',
    truckCargoSpace: 'Грузовое пространство',
    cargoItems: 'Грузы',
    units: 'Единицы:',
    length: 'Длина',
    width: 'Ширина',
    height: 'Высота',
    maxPayload: 'Грузоподъёмность ({0})',
    weightUnit: 'Ед. веса:',
    weightPerUnit: 'Вес единицы ({0})',
    quantity: 'Количество',
    addAnotherCargo: 'Добавить ещё тип груза',
    checkCargoFit: 'Проверить размещение',
    randomSampleTitle: 'Заполнить случайными значениями (груз влезет)',
    reset: 'Сбросить',
    resetTitle: 'Очистить все поля',
    atLeastOneCargo: 'Нужен хотя бы один груз',
    remove: 'Удалить',
    duplicate: 'Дублировать',
    copySuffix: 'копия',
    cargoBase: 'Груз',
    stackable: 'Штабелируемый',
    stackableHint: 'Разрешить класть сверху другой груз',
    rotatable: 'Поворачиваемый',
    rotatableHint: 'Разрешить поворот по горизонтали (L ↔ W)',
    loadDirection: 'Загрузка:',
    towardCab: '← К кабине',
    towardDoors: 'К дверям →',
    bulkhead: 'Перегородка',
    bulkheadHint: 'Стенка между кабиной водителя и грузом',

    allUnitsFit: 'Все {0} единиц помещаются! Использовано {1}% объёма.',
    cargoDoesNotFit: 'Груз <strong>не</strong> помещается (размещено {0} из {1}).',

    volumeUsed: 'Использовано объёма',
    payloadUsed: 'Использовано грузоподъёмности',
    cargoTypes: 'Типов груза',
    totalUnits: 'Всего единиц',
    totalWeight: 'Общий вес',

    cargoCol: 'Груз',
    dimensionsCol: 'Размеры ({0})',
    qtyCol: 'Кол-во',
    placedCol: 'Размещено',
    weightCol: 'Вес',
    dashEmpty: '–',

    visualization: '3D Визуализация',
    vizHint: '(потяните для поворота · колесо мыши для масштаба)',
    truckBody: 'Кузов',
    unitsPlacedLabel: 'Размещено {0} из {1}',
    vizTruncated: 'Показаны первые {0} из {1} единиц (лимит)',

    enterTruckDims: 'Введите все размеры машины.',
    enterCargoDims: 'Введите хотя бы один груз с размерами и количеством ≥ 1.',

    warnExceedsTruck: '«{0}» превышает {1} машины – единица не помещается.',
    warnOnlyFit: '«{0}»: только {1} из {2} помещается – недостаточно места в машине.',
    warnVolumeExceeds: 'Объём груза превышает объём кузова ({0}%).',
    warnWeightExceeds: 'Общий вес {0} {2} превышает грузоподъёмность {1} {2}.',
    warnNonStackable: '«{0}» отмечен как не штабелируемый – укладывается в один слой.',
    warnWheelWellOverlap: '{0} ед. пересекаются с колёсными арками – выделены оранжевым.',

    dim_length: 'длине',
    dim_width: 'ширине',
    dim_height: 'высоте',

    sprinterName: 'Спринтер / Фургон',
    sprinterDesc: 'Mercedes Sprinter, Ford Transit',
    smallStraightName: 'Малый бортовой',
    smallStraightDesc: 'Бортовой 16–20 футов',
    largeStraightName: 'Большой бортовой',
    largeStraightDesc: 'Бортовой 24–26 футов',
    customName: 'Свой',
    customDesc: 'Введите свои размеры',
    customDims: 'Свои размеры',
    payloadLabel: 'грузоподъёмность {0} {1}',
    setPayload: 'Задайте грузоподъёмность',

    switchToLight: 'Переключить на светлую тему',
    switchToDark: 'Переключить на тёмную тему',
    switchLang: 'Сменить язык',

    placeholder_l: 'напр. 150',
    placeholder_w: 'напр. 55',
    placeholder_h: 'напр. 72',
    placeholder_payload: 'напр. 4000',
    placeholder_tare: 'напр. 0',
    placeholder_lbs: 'lbs',

    helpTitle: 'Cargo Spacer',
    helpDesc: 'Проверка, поместится ли груз в кузов – визуально и по цифрам.',
    helpHow: 'Как пользоваться',
    helpStep1: 'Выбери машину – пресет (Sprinter, Small / Large Straight) или custom-размеры.',
    helpStep2: 'Добавь груз – длина, ширина, высота, вес и количество для каждого места.',
    helpStep3: 'Переключай единицы – футы / дюймы / метры / см и фунты / кг.',
    helpStep4: 'Проверь укладку – визуальная схема плюс pass/fail по объёму и весу.',
    helpStep5: 'Авто-сохранение – состояние хранится в браузере, можно вернуться позже.',
}
};

    let currentLang = 'en';
    try {
    const saved = localStorage.getItem('cargo-spacer-lang');
    if (saved && I18N[saved]) currentLang = saved;
    else if (navigator.language && navigator.language.toLowerCase().startsWith('ru')) currentLang = 'ru';
} catch(e) {}

    function t(key, ...args) {
    const dict = I18N[currentLang] || I18N.en;
    let str = dict[key];
    if (str == null) str = I18N.en[key] ?? key;
    args.forEach((arg, i) => { str = str.split('{' + i + '}').join(arg); });
    return str;
}

    // =========================
    // Constants
    // =========================
    const toM = { ft: 0.3048, in: 0.0254, m: 1, cm: 0.01 };
    const LB_TO_KG = 0.453592;

    const COLOR_PALETTE = [
    '#3b82f6','#10b981','#f59e0b','#8b5cf6','#ec4899',
    '#06b6d4','#84cc16','#ef4444','#e11d48','#14b8a6'
    ];

    const TRUCK_PRESETS = {
    sprinter: {
    nameKey: 'sprinterName', descKey: 'sprinterDesc', icon: '🚐',
    l: 150, w: 55, h: 72, unit: 'in', payload: 4000,
    style: {
    cabRatio: 0.18, cabHeightRatio: 0.82,
    hoodRatio: 0.05, hoodHeightRatio: 0.55,
    wheels: 4, wheelRadiusN: 0.04, chassisRatio: 0.05,
    rearWheelRatio: 0.72,
    hasWheelWells: true, wheelWellWidthIn: 3, wheelWellHeightIn: 22, wheelWellLengthIn: 28,
    bulkheadAvailable: true
}
},
    smallStraight: {
    nameKey: 'smallStraightName', descKey: 'smallStraightDesc', icon: '🚚',
    l: 192, w: 90, h: 84, unit: 'in', payload: 7000,
    style: {
    cabRatio: 0.22, cabHeightRatio: 0.70,
    hoodRatio: 0.10, hoodHeightRatio: 0.55,
    wheels: 4, wheelRadiusN: 0.05, chassisRatio: 0.07,
    rearWheelRatio: 0.90,
    hasWheelWells: false, bulkheadAvailable: false
}
},
    largeStraight: {
    nameKey: 'largeStraightName', descKey: 'largeStraightDesc', icon: '🚛',
    l: 312, w: 96, h: 102, unit: 'in', payload: 10000,
    style: {
    cabRatio: 0.18, cabHeightRatio: 0.62,
    hoodRatio: 0.04, hoodHeightRatio: 0.55,
    wheels: 6, wheelRadiusN: 0.045, chassisRatio: 0.07,
    rearWheelRatio: 0.90,
    hasWheelWells: false, bulkheadAvailable: false
}
},
    custom: {
    nameKey: 'customName', descKey: 'customDesc', icon: '✏️',
    l: '', w: '', h: '', unit: 'in', payload: '',
    style: {
    cabRatio: 0.20, cabHeightRatio: 0.72,
    hoodRatio: 0.06, hoodHeightRatio: 0.55,
    wheels: 4, wheelRadiusN: 0.045, chassisRatio: 0.07,
    rearWheelRatio: 0.90,
    hasWheelWells: false, bulkheadAvailable: false
}
}
};

    // =========================
    // State
    // =========================
    let cargoItems = [];
    let nextItemId = 1;
    let truckUnit = 'in';
    let cargoUnit = 'in';
    let weightUnit = 'lbs';
    let selectedTruckType = 'sprinter';
    let hasBulkhead = false;
    let loadDirection = 'front'; // 'front' (toward cab) | 'back' (toward doors)
    let vizState = null;

    // =========================
    // DOM element cache – populated after DOM is ready
    // =========================
    const els = {};
    (function cacheEls() {
    const ids = [
    'dim-errors','dim-error-msg',
    'result-card','result-banner','result-badge','result-text',
    'stats-row','vol-bar','vol-pct-label',
    'weight-progress','wt-bar','wt-pct-label',
    'cargo-summary-wrap','cargo-summary-table',
    'warnings-block','warnings-list',
    'viz-legend','viz3d',
    'preset-grid','cargo-items',
    'bulkhead-row','bulkhead-toggle',
    'truck-l','truck-w','truck-h','truck-payload',
    'theme-toggle','lang-toggle'
    ];
    ids.forEach(id => {
    const camelKey = id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    els[camelKey] = document.getElementById(id);
});
})();

    // =========================
    // State persistence
    // =========================
    const STATE_KEY = 'cargo-spacer-state';

    function readTruckInputs() {
    return {
    l: els.truckL?.value ?? '',
    w: els.truckW?.value ?? '',
    h: els.truckH?.value ?? '',
    payload: els.truckPayload?.value ?? ''
};
}

    function saveState() {
    try {
    const state = {
    truckUnit, cargoUnit, weightUnit,
    selectedTruckType, hasBulkhead, loadDirection,
    truck: readTruckInputs(),
    cargoItems: cargoItems.map(i => ({
    name: i.name, l: i.l, w: i.w, h: i.h,
    weight: i.weight, qty: i.qty,
    stackable: i.stackable, rotatable: i.rotatable
}))
};
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
} catch(e) {}
}

    function loadState() {
    try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (s.truckUnit && toM[s.truckUnit]) truckUnit = s.truckUnit;
    if (s.cargoUnit && toM[s.cargoUnit]) cargoUnit = s.cargoUnit;
    if (s.weightUnit === 'kg' || s.weightUnit === 'lbs') weightUnit = s.weightUnit;
    if (s.selectedTruckType && TRUCK_PRESETS[s.selectedTruckType]) selectedTruckType = s.selectedTruckType;
    if (typeof s.hasBulkhead === 'boolean') hasBulkhead = s.hasBulkhead;
    if (s.loadDirection === 'front' || s.loadDirection === 'back') loadDirection = s.loadDirection;
    if (Array.isArray(s.cargoItems) && s.cargoItems.length > 0) {
    cargoItems = s.cargoItems.map(i => ({ ...i, id: nextItemId++ }));
}
    return s.truck || null;
} catch(e) { return null; }
}

    // =========================
    // Debounced auto-recheck
    // =========================
    let recheckTimer = null;
    function scheduleRecheck() {
    if (recheckTimer) clearTimeout(recheckTimer);
    recheckTimer = setTimeout(() => {
    saveState();
    if (els.resultCard && els.resultCard.classList.contains('visible')) checkCargo();
}, 350);
}

    // =========================
    // Theme
    // =========================
    function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const btn = els.themeToggle;
    const label = theme === 'dark' ? t('switchToLight') : t('switchToDark');
    btn.title = label;
    btn.setAttribute('aria-label', label);
    try { localStorage.setItem('cargo-spacer-theme', theme); } catch(e) {}
    if (vizState) redrawViz();
}
    function toggleTheme() {
    const cur = document.documentElement.dataset.theme;
    applyTheme(cur === 'dark' ? 'light' : 'dark');
}
    (function initTheme() {
    let saved = 'dark';
    try {
    const stored = localStorage.getItem('cargo-spacer-theme');
    if (stored) saved = stored;
    else if (matchMedia('(prefers-color-scheme: light)').matches) saved = 'light';
} catch(e) {}
    applyTheme(saved);
})();

    // =========================
    // Language
    // =========================
    function toggleLang() {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    document.documentElement.lang = currentLang;
    try { localStorage.setItem('cargo-spacer-lang', currentLang); } catch(e) {}
    applyTranslations();
}

    function updateWeightLabels() {
    document.querySelectorAll('[data-i18n-wu]').forEach(el => {
        el.textContent = t(el.dataset.i18nWu, weightUnit);
    });
}

    function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.dataset.i18nTitle);
});
    updateWeightLabels();

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
    langBtn.textContent = currentLang === 'en' ? 'RU' : 'EN';
    langBtn.title = t('switchLang');
    langBtn.setAttribute('aria-label', t('switchLang'));
}
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
    const isDark = document.documentElement.dataset.theme === 'dark';
    themeBtn.title = isDark ? t('switchToLight') : t('switchToDark');
}
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) resetBtn.title = t('resetTitle');

    const tl = document.getElementById('truck-l'); if (tl) tl.placeholder = t('placeholder_l');
    const tw = document.getElementById('truck-w'); if (tw) tw.placeholder = t('placeholder_w');
    const th = document.getElementById('truck-h'); if (th) th.placeholder = t('placeholder_h');
    const tp = document.getElementById('truck-payload'); if (tp) tp.placeholder = t('placeholder_payload');

    renderPresets();
    renderCargoItems();
    updateBulkheadVisibility();

    const rc = document.getElementById('result-card');
    if (rc && rc.classList.contains('visible')) {
    checkCargo();
}
}

    // =========================
    // Preset selector
    // =========================
    function renderPresets() {
    const grid = document.getElementById('preset-grid');
    grid.innerHTML = '';
    Object.entries(TRUCK_PRESETS).forEach(([key, p]) => {
    const card = document.createElement('div');
    card.className = 'preset-card' + (key === selectedTruckType ? ' active' : '');
    card.onclick = () => selectTruckType(key);
    const dimsText = (p.l && p.w && p.h) ? `${p.l} × ${p.w} × ${p.h} ${p.unit}` : t('customDims');
    let payloadText;
    if (p.payload) {
    const displayPayload = weightUnit === 'kg' ? Math.round(p.payload * LB_TO_KG) : p.payload;
    payloadText = t('payloadLabel', displayPayload.toLocaleString(), weightUnit);
} else {
    payloadText = t('setPayload');
}
    card.innerHTML = `
      <div class="preset-icon">${p.icon}</div>
      <div class="preset-info">
        <div class="preset-name">${escapeHtml(t(p.nameKey))}</div>
        <div class="preset-dims">${dimsText}</div>
        <div class="preset-payload">${escapeHtml(payloadText)}</div>
      </div>
    `;
    grid.appendChild(card);
});
}

    function selectTruckType(key) {
    selectedTruckType = key;
    const p = TRUCK_PRESETS[key];

    if (p.unit) {
    truckUnit = p.unit;
    document.querySelectorAll('#truck-units button').forEach(b =>
    b.classList.toggle('active', b.dataset.unit === p.unit));
}
    document.getElementById('truck-l').value = p.l ?? '';
    document.getElementById('truck-w').value = p.w ?? '';
    document.getElementById('truck-h').value = p.h ?? '';
    let presetPayload = p.payload ?? '';
    if (presetPayload && weightUnit === 'kg') presetPayload = +(presetPayload * LB_TO_KG).toFixed(2);
    document.getElementById('truck-payload').value = presetPayload;

    if (!p.style.bulkheadAvailable) hasBulkhead = false;
    document.getElementById('bulkhead-toggle').checked = hasBulkhead;
    updateBulkheadVisibility();

    renderPresets();
    scheduleRecheck();
}

    function updateBulkheadVisibility() {
    const row = document.getElementById('bulkhead-row');
    const style = TRUCK_PRESETS[selectedTruckType]?.style;
    row.style.display = style?.bulkheadAvailable ? 'flex' : 'none';
}

    function onBulkheadChange() {
    hasBulkhead = document.getElementById('bulkhead-toggle').checked;
    scheduleRecheck();
}

    function resetAll() {
    // Clear truck inputs
    ['truck-l','truck-w','truck-h','truck-payload'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    // Reset bulkhead
    hasBulkhead = false;
    const bhToggle = document.getElementById('bulkhead-toggle');
    if (bhToggle) bhToggle.checked = false;

    // Reset load direction to front
    loadDirection = 'front';
    document.querySelectorAll('#load-direction button').forEach(b =>
    b.classList.toggle('active', b.dataset.dir === 'front'));

    // Switch to custom (no preset values applied)
    selectedTruckType = 'custom';

    // Reset cargo to a single empty item
    cargoItems = [];
    nextItemId = 1;
    cargoItems.push({
    id: nextItemId++,
    name: `${t('cargoBase')} 1`,
    l: '', w: '', h: '', weight: '', qty: 1, stackable: false, rotatable: true
});

    // Hide errors and result
    els.dimErrors.style.display = 'none';
    els.resultCard.classList.remove('visible');

    // Clear the 3D viz state so toggling theme doesn't try to redraw stale data
    vizState = null;

    // Re-render
    renderPresets();
    renderCargoItems();
    updateBulkheadVisibility();

    // Persist cleared state
    saveState();
}

    function fillRandom() {
    // 1. Pick a random real truck preset
    const presetKeys = ['sprinter', 'smallStraight', 'largeStraight'];
    const key = presetKeys[Math.floor(Math.random() * presetKeys.length)];
    selectTruckType(key);
    clearTimeout(recheckTimer); // cancel debounce from selectTruckType

    // 2. Switch cargo unit to inches (all presets are in inches) without triggering conversion
    cargoUnit = 'in';
    document.querySelectorAll('#cargo-units button').forEach(b =>
    b.classList.toggle('active', b.dataset.unit === 'in'));

    // 3. Truck dimensions in inches
    const { l: tL, w: tW, h: tH } = TRUCK_PRESETS[key];

    // 4. Reset cargo list
    cargoItems = [];
    nextItemId = 1;

    // 5. Generate 1–3 cargo types guaranteed to fit.
    //    Each item's w/h fit in the truck cross-section.
    //    qty = perSlice × slices, totalLength = slices×itemL ≤ xBudget ≤ tL.
    const numTypes = Math.floor(Math.random() * 3) + 1;
    const targetX = tL * (0.45 + Math.random() * 0.40); // fill 45–85 % of length
    let xBudget = targetX;

    for (let ti = 0; ti < numTypes && xBudget > 4; ti++) {
    const rnd2 = v => Math.max(2, Math.round(v / 2) * 2); // snap to 2-in grid
    const itemL = rnd2(Math.min((0.15 + Math.random() * 0.30) * tL, xBudget * 0.85));
    const itemW = rnd2((0.25 + Math.random() * 0.55) * tW);
    const itemH = rnd2((0.20 + Math.random() * 0.55) * tH);
    const stackable = Math.random() > 0.55;

    const nW = Math.max(1, Math.floor(tW / itemW));   // items side by side
    const nH = stackable ? Math.max(1, Math.floor(tH / itemH)) : 1; // stacked layers
    const perSlice = nW * nH;

    const maxSlices = Math.floor(xBudget / itemL);
    if (maxSlices === 0) break;
    const slices = Math.max(1, Math.round(maxSlices * (0.35 + Math.random() * 0.55)));

    const itemId = nextItemId++;
    cargoItems.push({
    id: itemId,
    name: `${t('cargoBase')} ${itemId}`,
    l: itemL, w: itemW, h: itemH,
    weight: '', qty: slices * perSlice,
    stackable, rotatable: true
});

    xBudget -= slices * itemL;
}

    // 6. Render and immediately check
    renderCargoItems();
    checkCargo();
}

    // Auto-normalize comma → dot in truck inputs (RU keyboard layout uses comma)
    ['truck-l','truck-w','truck-h','truck-payload'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
    if (el.value && el.value.indexOf(',') !== -1) {
    el.value = el.value.replace(/,/g, '.');
}
});
});

    // Enter-key shortcut: trigger Check Cargo Fit from any input (except checkboxes/buttons)
    document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const tg = e.target;
    if (!tg) return;
    const tag = tg.tagName;
    if (tag === 'BUTTON' || tag === 'TEXTAREA') return;
    if (tag === 'INPUT' && tg.type === 'checkbox') return;
    e.preventDefault();
    if (typeof tg.blur === 'function') tg.blur();
    checkCargo();
});

    // =========================
    // Cargo items
    // =========================
    function addCargoItem(prefill) {
    const id = nextItemId++;
    cargoItems.push({
    id,
    name: prefill?.name || `${t('cargoBase')} ${id}`,
    l: prefill?.l ?? '',
    w: prefill?.w ?? '',
    h: prefill?.h ?? '',
    weight: prefill?.weight ?? '',
    qty: prefill?.qty ?? 1,
    stackable: prefill?.stackable !== undefined ? prefill.stackable : false,
    rotatable: prefill?.rotatable !== undefined ? prefill.rotatable : true
});
    renderCargoItems();
    scheduleRecheck();
}

    function removeCargoItem(id) {
    if (cargoItems.length <= 1) return;
    cargoItems = cargoItems.filter(item => item.id !== id);
    renderCargoItems();
    scheduleRecheck();
}

    function duplicateCargoItem(id) {
    const idx = cargoItems.findIndex(i => i.id === id);
    if (idx === -1) return;
    const orig = cargoItems[idx];
    cargoItems.splice(idx + 1, 0, {
    ...orig,
    id: nextItemId++,
    name: `${orig.name} (${t('copySuffix')})`
});
    renderCargoItems();
    scheduleRecheck();
}

    function updateCargoItem(id, field, value) {
    const item = cargoItems.find(i => i.id === id);
    if (!item) return;
    if (field === 'name') item[field] = value;
    else if (field === 'stackable' || field === 'rotatable') item[field] = !!value;
    else {
    // accept comma-decimals (RU keyboard layout)
    const v = String(value).replace(/,/g, '.');
    const n = parseFloat(v);
    item[field] = (v === '' || isNaN(n)) ? '' : n;
}
    scheduleRecheck();
}

    function renderCargoItems() {
    const container = document.getElementById('cargo-items');
    container.innerHTML = '';
    cargoItems.forEach((item, idx) => {
    const color = COLOR_PALETTE[idx % COLOR_PALETTE.length];
    const div = document.createElement('div');
    div.className = 'cargo-item';
    div.innerHTML = `
      <div class="cargo-item-header">
        <div class="cargo-item-title">
          <div class="cargo-color-dot" style="background:${color}"></div>
          <input type="text" class="cargo-name-input" value="${escapeHtml(item.name)}"
                 onchange="updateCargoItem(${item.id}, 'name', this.value)" maxlength="30">
        </div>
        <div class="cargo-item-actions">
          <button class="dup-btn" onclick="duplicateCargoItem(${item.id})" title="${escapeHtml(t('duplicate'))}" aria-label="${escapeHtml(t('duplicate'))}">⧉</button>
          <button class="remove-btn" onclick="removeCargoItem(${item.id})" aria-label="${escapeHtml(t('remove'))}"
                  ${cargoItems.length === 1 ? `disabled title="${escapeHtml(t('atLeastOneCargo'))}"` : `title="${escapeHtml(t('remove'))}"`}>×</button>
        </div>
      </div>
      <div class="field-group">
        <div class="field"><label>${escapeHtml(t('length'))}</label>
          <input type="number" min="0" step="any" placeholder="L" value="${item.l}"
                 oninput="updateCargoItem(${item.id}, 'l', this.value)"></div>
        <div class="field"><label>${escapeHtml(t('width'))}</label>
          <input type="number" min="0" step="any" placeholder="W" value="${item.w}"
                 oninput="updateCargoItem(${item.id}, 'w', this.value)"></div>
        <div class="field"><label>${escapeHtml(t('height'))}</label>
          <input type="number" min="0" step="any" placeholder="H" value="${item.h}"
                 oninput="updateCargoItem(${item.id}, 'h', this.value)"></div>
      </div>
      <div class="field-group two">
        <div class="field"><label>${escapeHtml(t('weightPerUnit', weightUnit))}</label>
          <input type="number" min="0" step="any" placeholder="${weightUnit}" value="${item.weight}"
                 oninput="updateCargoItem(${item.id}, 'weight', this.value)"></div>
        <div class="field"><label>${escapeHtml(t('quantity'))}</label>
          <input type="number" min="1" step="1" value="${item.qty}"
                 oninput="updateCargoItem(${item.id}, 'qty', this.value)"></div>
      </div>
      <div class="toggle-grid">
        <label class="toggle-row">
          <input type="checkbox" ${item.rotatable ? 'checked' : ''}
                 onchange="updateCargoItem(${item.id}, 'rotatable', this.checked)">
          <span class="toggle-label">
            ${escapeHtml(t('rotatable'))}
            <div class="toggle-hint">${escapeHtml(t('rotatableHint'))}</div>
          </span>
        </label>
        <label class="toggle-row">
          <input type="checkbox" ${item.stackable ? 'checked' : ''}
                 onchange="updateCargoItem(${item.id}, 'stackable', this.checked)">
          <span class="toggle-label">
            ${escapeHtml(t('stackable'))}
            <div class="toggle-hint">${escapeHtml(t('stackableHint'))}</div>
          </span>
        </label>
      </div>
    `;
    container.appendChild(div);
});
    const lastItem = container.lastElementChild;
    if (lastItem) lastItem.classList.add('cargo-item-enter');
}

    function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

    // init
    const restoredTruck = loadState();
    if (restoredTruck && cargoItems.length > 0) {
    // State restored from localStorage – apply truck inputs and unit selectors
    document.getElementById('truck-l').value = restoredTruck.l ?? '';
    document.getElementById('truck-w').value = restoredTruck.w ?? '';
    document.getElementById('truck-h').value = restoredTruck.h ?? '';
    document.getElementById('truck-payload').value = restoredTruck.payload ?? '';

    document.querySelectorAll('#truck-units button').forEach(b =>
    b.classList.toggle('active', b.dataset.unit === truckUnit));
    document.querySelectorAll('#cargo-units button').forEach(b =>
    b.classList.toggle('active', b.dataset.unit === cargoUnit));

    document.getElementById('bulkhead-toggle').checked = hasBulkhead;
    renderPresets();
    renderCargoItems();
    updateBulkheadVisibility();
} else {
    // No saved state – start fresh with default preset
    addCargoItem();
    selectTruckType('sprinter');
}

    // Apply weight-unit selector active state
    document.querySelectorAll('#weight-units button').forEach(b =>
    b.classList.toggle('active', b.dataset.wunit === weightUnit));

    applyTranslations();

    // =========================
    // Unit selector with conversion
    // =========================
    function setupUnitSelector(groupId, getCurrentUnit, setCurrentUnit, onChange) {
    document.querySelectorAll(`#${groupId} button`).forEach(btn => {
        btn.addEventListener('click', () => {
            const newUnit = btn.dataset.unit;
            const oldUnit = getCurrentUnit();
            if (newUnit === oldUnit) return;
            const factor = toM[oldUnit] / toM[newUnit];
            onChange(factor);
            setCurrentUnit(newUnit);
            document.querySelectorAll(`#${groupId} button`).forEach(b =>
                b.classList.toggle('active', b.dataset.unit === newUnit));
        });
    });
}

    setupUnitSelector('truck-units',
    () => truckUnit,
    (u) => truckUnit = u,
    (factor) => {
    ['truck-l','truck-w','truck-h'].forEach(id => {
        const el = document.getElementById(id);
        if (el.value !== '') {
            const clean = el.value.replace(/,/g, '.');
            el.value = +(parseFloat(clean) * factor).toFixed(3);
        }
    });
    scheduleRecheck();
});

    setupUnitSelector('cargo-units',
    () => cargoUnit,
    (u) => cargoUnit = u,
    (factor) => {
    cargoItems.forEach(item => {
        ['l','w','h'].forEach(k => {
            if (item[k] !== '' && item[k] != null) item[k] = +(parseFloat(item[k]) * factor).toFixed(3);
        });
    });
    renderCargoItems();
    scheduleRecheck();
});

    // Weight unit selector (lbs <-> kg with value conversion)
    document.querySelectorAll('#weight-units button').forEach(btn => {
    btn.addEventListener('click', () => {
        const newUnit = btn.dataset.wunit;
        if (newUnit === weightUnit) return;
        const factor = (weightUnit === 'lbs' && newUnit === 'kg') ? LB_TO_KG
            : (weightUnit === 'kg' && newUnit === 'lbs') ? 1 / LB_TO_KG : 1;
        const payloadEl = document.getElementById('truck-payload');
        if (payloadEl.value !== '') payloadEl.value = +(parseFloat(payloadEl.value) * factor).toFixed(2);
        cargoItems.forEach(item => {
            if (item.weight !== '' && item.weight != null) {
                item.weight = +(parseFloat(item.weight) * factor).toFixed(2);
            }
        });
        weightUnit = newUnit;
        document.querySelectorAll('#weight-units button').forEach(b =>
            b.classList.toggle('active', b.dataset.wunit === newUnit));
        updateWeightLabels();
        renderCargoItems();
        scheduleRecheck();
    });
});

    // ── Directional fill animation for all .unit-selector groups ─────────────
    (function initDirectionalSelectors() {
    document.querySelectorAll('.unit-selector').forEach(sel => {
        const btns = [...sel.querySelectorAll('button')];

        // Inject fill + txt spans, preserving existing innerHTML (e.g. data-i18n content)
        btns.forEach(btn => {
            const inner = btn.innerHTML;
            btn.innerHTML = `<span class="u-fill"></span><span class="u-txt">${inner}</span>`;
        });

        // Capture-phase: fires BEFORE the existing click handlers that toggle .active
        sel.addEventListener('click', e => {
            const btn = e.target.closest('button');
            if (!btn || btn.classList.contains('active')) return;
            const newIdx = btns.indexOf(btn);
            const oldBtn = btns.find(b => b.classList.contains('active'));
            if (!oldBtn) return;
            const oldIdx = btns.indexOf(oldBtn);
            const dir = newIdx > oldIdx ? 1 : -1;

            // Old button: fill drains toward the travel direction
            oldBtn.querySelector('.u-fill').style.transformOrigin =
                dir > 0 ? 'right center' : 'left center';

            // New button: fill appears instantly (no transition this frame)
            const nf = btn.querySelector('.u-fill');
            nf.style.transition = 'none';
            btn.classList.add('active');
            void btn.offsetWidth; // force reflow
            nf.style.transition = '';
            // Existing handlers will call classList.toggle('active', true) on new btn
            // (idempotent) and classList.toggle('active', false) on old btn (triggers drain)
        }, true);
    });
})();

    // Load-direction selector (loaded via loadState; just attach listeners)
    document.querySelectorAll('#load-direction button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.dir === loadDirection);
    btn.addEventListener('click', () => {
    const newDir = btn.dataset.dir;
    if (newDir === loadDirection) return;
    loadDirection = newDir;
    document.querySelectorAll('#load-direction button').forEach(b =>
    b.classList.toggle('active', b.dataset.dir === loadDirection));
    scheduleRecheck();
});
});

    function val(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    // Accept both "5.5" and "5,5" (RU keyboard layout uses comma as decimal)
    const raw = String(el.value).replace(/,/g, '.');
    const v = parseFloat(raw);
    return isNaN(v) || v < 0 ? 0 : v;
}

    function fmt(v, decimals = 2) {
    return Number(v).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals });
}

    // =========================
    // Packing
    // =========================
    // Pack a single cargo type at xOffsetStart with given orientation (l,w,h).
    // Returns { placements, placed, xOffset } – does NOT mutate input.
    function packOneOrient(truck, c, l, w, h, xOffsetStart) {
    const nW = Math.floor(truck.w / w + 1e-9);
    let nH = Math.floor(truck.h / h + 1e-9);
    if (!c.stackable) nH = Math.min(nH, 1);
    const perSlice = nW * nH;
    const placements = [];
    let xOffset = xOffsetStart;
    let placed = 0;

    if (perSlice === 0 || l > truck.l + 1e-9) {
    return { placements, placed, xOffset, perSlice };
}

    while (placed < c.qty) {
    if (xOffset + l > truck.l + 1e-9) break;
    for (let hi = 0; hi < nH && placed < c.qty; hi++) {
    for (let wi = 0; wi < nW && placed < c.qty; wi++) {
    placements.push({ x: xOffset, y: hi*h, z: wi*w, l, w, h });
    placed++;
}
}
    xOffset += l;
}
    return { placements, placed, xOffset, perSlice };
}

    function packCargo(truck, cargos) {
    const placements = [];
    const perItemPlaced = new Array(cargos.length).fill(0);
    let xOffset = 0;

    // First pass: sequential X-axis packing (original algorithm)
    for (let ci = 0; ci < cargos.length; ci++) {
    const c = cargos[ci];
    if (c.qty <= 0) continue;

    const orig = packOneOrient(truck, c, c.l, c.w, c.h, xOffset);
    let chosen = orig;

    if (c.rotatable && Math.abs(c.l - c.w) > 1e-9) {
    const rot = packOneOrient(truck, c, c.w, c.l, c.h, xOffset);
    if (rot.placed > chosen.placed ||
    (rot.placed === chosen.placed && rot.xOffset < chosen.xOffset)) {
    chosen = rot;
}
}

    chosen.placements.forEach(p => placements.push({ cargoIdx: ci, ...p }));
    perItemPlaced[ci] = chosen.placed;
    xOffset = chosen.xOffset;
}

    // Second pass: try to fit remaining items on top of already-placed cargo
    // (exploits vertical space above shorter items).
    // Snapshot first-pass state once — keeps the loop O(n log n) and prevents
    // second-pass items from inflating topH for later cargo types.
    const firstPassPlacements = placements.slice();
    const firstPassXStarts = [...new Set(firstPassPlacements.map(p => p.x))].sort((a, b) => a - b);

    for (let ci = 0; ci < cargos.length; ci++) {
    const c = cargos[ci];
    let remaining = c.qty - perItemPlaced[ci];
    if (remaining <= 0) continue;

    const orientations = [[c.l, c.w, c.h]];
    if (c.rotatable && Math.abs(c.l - c.w) > 1e-9) orientations.push([c.w, c.l, c.h]);

    for (const [ol, ow, oh] of orientations) {
    if (remaining <= 0) break;
    if (oh > truck.h + 1e-9) continue;

    for (const xPos of firstPassXStarts) {
    if (remaining <= 0) break;
    if (xPos + ol > truck.l + 1e-9) continue;

    // Max height + stackable check: all items overlapping [xPos, xPos+ol]
    // must be stackable (i.e. allow other cargo on top).
    let topH = 0;
    let canStack = true;
    for (const p of firstPassPlacements) {
    if (p.x < xPos + ol - 1e-9 && p.x + p.l > xPos + 1e-9) {
    if (p.y + p.h > topH) topH = p.y + p.h;
    if (!cargos[p.cargoIdx].stackable) canStack = false;
}
}
    if (!canStack) continue;

    if (topH + oh > truck.h + 1e-9) continue;

    const nW = Math.floor(truck.w / ow + 1e-9);
    if (nW === 0) continue;

    for (let wi = 0; wi < nW && remaining > 0; wi++) {
    placements.push({ cargoIdx: ci, x: xPos, y: topH, z: wi * ow, l: ol, w: ow, h: oh });
    perItemPlaced[ci]++;
    remaining--;
}
}
}
}

    const allFit = cargos.every((c, i) => c.qty <= 0 || perItemPlaced[i] >= c.qty);
    const lengthUsed = placements.reduce((m, p) => Math.max(m, p.x + p.l), 0);
    return { fits: allFit, lengthUsed, placements, perItemPlaced };
}

    // Mark placements that physically overlap with wheel wells.
    // A placement overlaps a well if its x/z range intersects the well block AND
    // its bottom is below the well top (y < wellH).
    function markWellOverlaps(truck, placements, style) {
    if (!style?.hasWheelWells) return;
    const wwDepth = (style.wheelWellWidthIn || 3) * toM.in;
    const wwH     = (style.wheelWellHeightIn || 22) * toM.in;
    const wwL     = (style.wheelWellLengthIn || 28) * toM.in;
    const wwCx    = truck.l * (style.rearWheelRatio ?? 0.90);
    const wwXS    = wwCx - wwL / 2;
    const wwXE    = wwCx + wwL / 2;

    placements.forEach(p => {
    const xOver = p.x < wwXE && p.x + p.l > wwXS;
    const yOver = p.y < wwH;
    const leftWell  = p.z < wwDepth;
    const rightWell = p.z + p.w > truck.w - wwDepth;
    p.wellOverlap = xOver && yOver && (leftWell || rightWell);
});
}

    // =========================
    // Main check
    // =========================
    // --- Helpers split out from checkCargo for readability ---

    function gatherTruck() {
    const presetStyle = TRUCK_PRESETS[selectedTruckType]?.style;
    const truck = {
    l: val('truck-l') * toM[truckUnit],
    w: val('truck-w') * toM[truckUnit],
    h: val('truck-h') * toM[truckUnit]
};
    // Bulkhead occupies ~1.5 inches of cargo length when enabled
    const bulkheadInchLoss = (presetStyle?.bulkheadAvailable && hasBulkhead) ? 1.5 : 0;
    truck.l -= bulkheadInchLoss * toM.in;
    return truck;
}

    function gatherCargos() {
    return cargoItems.map((item, idx) => {
    const qty = Math.max(0, Math.round(item.qty || 0));
    return {
    idx, name: item.name,
    color: COLOR_PALETTE[idx % COLOR_PALETTE.length],
    l: (item.l || 0) * toM[cargoUnit],
    w: (item.w || 0) * toM[cargoUnit],
    h: (item.h || 0) * toM[cargoUnit],
    weight: item.weight || 0, qty,
    stackable: item.stackable !== false,
    rotatable: item.rotatable !== false
};
});
}

    function buildWarnings(truck, cargos, packResult, payload, totalCargoWeight, weightFit, volPct) {
    const warnings = [];
    cargos.forEach((c, i) => {
    if (c.qty <= 0) return;
    const dimsExceed = [];
    if (c.l > truck.l) dimsExceed.push(t('dim_length'));
    if (c.w > truck.w) dimsExceed.push(t('dim_width'));
    if (c.h > truck.h) dimsExceed.push(t('dim_height'));
    if (dimsExceed.length) warnings.push(t('warnExceedsTruck', c.name, dimsExceed.join(', ')));
    const placed = packResult.perItemPlaced[i];
    if (placed < c.qty && dimsExceed.length === 0) warnings.push(t('warnOnlyFit', c.name, placed, c.qty));
});
    if (volPct > 100) warnings.push(t('warnVolumeExceeds', fmt(volPct, 1)));
    if (!weightFit) warnings.push(t('warnWeightExceeds', fmt(totalCargoWeight), fmt(payload), weightUnit));
    const wellOverlapCount = packResult.placements.filter(p => p.wellOverlap).length;
    if (wellOverlapCount > 0) warnings.push(t('warnWheelWellOverlap', wellOverlapCount));
    return warnings;
}

    function renderResultBanner(fits, totalQty, totalPlaced, volPct) {
    els.resultBanner.className = 'result-banner ' + (fits ? 'fit' : 'nofit');
    els.resultBadge.textContent = fits ? '✓' : '✗';
    els.resultText.innerHTML = fits
    ? t('allUnitsFit', totalQty, fmt(volPct, 1))
    : t('cargoDoesNotFit', totalPlaced, totalQty);
}

    function renderStats(payload, totalCargoWeight, validCargos, volPct, weightPct, totalPlaced, totalQty) {
    const volClass = volPct > 100 ? 'bad' : volPct > 90 ? 'warn' : 'ok';
    let statsHTML = `
    <div class="stat-box"><div class="stat-label">${escapeHtml(t('volumeUsed'))}</div>
      <div class="stat-value ${volClass}">${fmt(Math.min(volPct, 9999), 1)}%</div></div>
    <div class="stat-box"><div class="stat-label">${escapeHtml(t('cargoTypes'))}</div>
      <div class="stat-value">${validCargos.length}</div></div>
    <div class="stat-box"><div class="stat-label">${escapeHtml(t('totalUnits'))}</div>
      <div class="stat-value ${totalPlaced === totalQty ? 'ok' : 'bad'}">${totalPlaced}/${totalQty}</div></div>
  `;
    if (payload > 0 && totalCargoWeight > 0) {
    const wtClass = weightPct > 100 ? 'bad' : weightPct > 90 ? 'warn' : 'ok';
    statsHTML += `<div class="stat-box"><div class="stat-label">${escapeHtml(t('payloadUsed'))}</div>
      <div class="stat-value ${wtClass}">${fmt(Math.min(weightPct, 9999), 1)}%</div></div>`;
} else {
    statsHTML += `<div class="stat-box"><div class="stat-label">${escapeHtml(t('totalWeight'))}</div>
      <div class="stat-value">${totalCargoWeight ? fmt(totalCargoWeight) + ' ' + weightUnit : t('dashEmpty')}</div></div>`;
}
    els.statsRow.innerHTML = statsHTML;
}

    function renderProgressBars(volPct, weightPct, payload, totalCargoWeight) {
    els.volBar.style.width = Math.min(volPct, 100) + '%';
    els.volBar.className = 'progress-bar-fill ' + (volPct > 100 ? 'bad' : volPct > 90 ? 'warn' : 'ok');
    els.volPctLabel.textContent = fmt(Math.min(volPct, 9999), 1) + '%';

    if (payload > 0 && totalCargoWeight > 0) {
    els.weightProgress.style.display = 'block';
    els.wtBar.style.width = Math.min(weightPct, 100) + '%';
    els.wtBar.className = 'progress-bar-fill ' + (weightPct > 100 ? 'bad' : weightPct > 90 ? 'warn' : 'ok');
    els.wtPctLabel.textContent = fmt(Math.min(weightPct, 9999), 1) + '%';
} else {
    els.weightProgress.style.display = 'none';
}
}

    function renderSummaryTable(validCargos, cargos, packResult) {
    if (validCargos.length <= 1) {
    els.cargoSummaryWrap.style.display = 'none';
    return;
}
    els.cargoSummaryWrap.style.display = 'block';
    let tHtml = `<thead><tr>
    <th>${escapeHtml(t('cargoCol'))}</th>
    <th>${escapeHtml(t('dimensionsCol', cargoUnit))}</th>
    <th>${escapeHtml(t('qtyCol'))}</th>
    <th>${escapeHtml(t('placedCol'))}</th>
    <th>${escapeHtml(t('weightCol'))}</th>
  </tr></thead><tbody>`;
    cargos.forEach((c, i) => {
    if (c.qty <= 0) return;
    const placed = packResult.perItemPlaced[i];
    const placedClass = placed === c.qty ? 'placed-ok' : 'placed-bad';
    const dispL = c.l/toM[cargoUnit], dispW = c.w/toM[cargoUnit], dispH = c.h/toM[cargoUnit];
    tHtml += `<tr>
      <td><span class="cargo-tag"><span class="cargo-color-dot" style="background:${c.color}"></span><span class="cargo-name-text" title="${escapeHtml(c.name)}">${escapeHtml(c.name)}</span></span></td>
      <td>${fmt(dispL)} × ${fmt(dispW)} × ${fmt(dispH)}</td>
      <td>${c.qty}</td>
      <td class="${placedClass}">${placed}/${c.qty}</td>
      <td>${c.weight ? fmt(c.weight * c.qty) + ' ' + weightUnit : t('dashEmpty')}</td>
    </tr>`;
});
    tHtml += '</tbody>';
    els.cargoSummaryTable.innerHTML = tHtml;
}

    function renderWarningsBlock(warnings) {
    if (warnings.length) {
    els.warningsBlock.style.display = 'block';
    els.warningsList.innerHTML = warnings.map(w => `<li>⚠ ${w}</li>`).join('');
} else {
    els.warningsBlock.style.display = 'none';
}
}

    function renderLegend(cargos) {
    let legendHTML = `<div class="legend-item"><div class="legend-dot" style="background:var(--truck-shell);border-color:var(--truck-cab)"></div> ${escapeHtml(t('truckBody'))}</div>`;
    cargos.forEach(c => {
    if (c.qty <= 0) return;
    legendHTML += `<div class="legend-item"><div class="legend-dot" style="background:${c.color}"></div> ${escapeHtml(c.name)}</div>`;
});
    els.vizLegend.innerHTML = legendHTML;
}

    function applyLoadDirectionShift(truck, packResult) {
    if (loadDirection === 'back' && packResult.placements.length) {
    const shift = truck.l - packResult.lengthUsed;
    if (shift > 1e-9) packResult.placements.forEach(p => { p.x += shift; });
}
}

    // --- Main entry point ---
    function checkCargo() {
    els.dimErrors.style.display = 'none';

    // 1. Read & validate inputs
    const truck = gatherTruck();
    const payload = val('truck-payload');
    if (!truck.l || !truck.w || !truck.h) {
    els.dimErrorMsg.textContent = t('enterTruckDims');
    els.dimErrors.style.display = 'block';
    return;
}

    const cargos = gatherCargos();
    const validCargos = cargos.filter(c => c.l > 0 && c.w > 0 && c.h > 0 && c.qty > 0);
    if (validCargos.length === 0) {
    els.dimErrorMsg.textContent = t('enterCargoDims');
    els.dimErrors.style.display = 'block';
    return;
}

    // 2. Compute weight totals and pack
    const truckVol = truck.l * truck.w * truck.h;
    const totalCargoWeight = cargos.reduce((s, c) => s + c.weight*c.qty, 0);

    let weightFit = true, weightPct = 0;
    if (payload > 0 && totalCargoWeight > 0) {
    weightPct = (totalCargoWeight / payload) * 100;
    weightFit = totalCargoWeight <= payload;
}

    // 3. Pack, apply load-direction shift, then mark wheel-well overlaps
    // (shift must come first so overlap detection uses final positions)
    const truckStyle = TRUCK_PRESETS[selectedTruckType]?.style || null;
    const packResult = packCargo(truck, cargos);
    applyLoadDirectionShift(truck, packResult);
    markWellOverlaps(truck, packResult.placements, truckStyle);

    // Volume based on actually placed items only
    const totalCargoVol = packResult.placements.reduce((s, p) => s + p.l * p.w * p.h, 0);
    const volPct = (totalCargoVol / truckVol) * 100;

    // volPct is derived from actually-placed items (≤ truck volume by construction),
    // so we don't gate fits on volPct — that would false-fail on floating-point rounding.
    const fits = packResult.fits && weightFit;
    const totalQty = cargos.reduce((s, c) => s + c.qty, 0);
    const totalPlaced = packResult.perItemPlaced.reduce((s, n) => s + n, 0);
    const warnings = buildWarnings(truck, cargos, packResult, payload, totalCargoWeight, weightFit, volPct);

    // 4. Render result UI
    els.resultCard.classList.add('visible');

    renderResultBanner(fits, totalQty, totalPlaced, volPct);
    renderStats(payload, totalCargoWeight, validCargos, volPct, weightPct, totalPlaced, totalQty);
    renderProgressBars(volPct, weightPct, payload, totalCargoWeight);
    renderSummaryTable(validCargos, cargos, packResult);
    renderWarningsBlock(warnings);
    renderLegend(cargos);

    // 5. Render 3D visualization
    render3D({ truck, cargos, packResult, truckType: selectedTruckType });
    els.resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

    // =========================
    // 3D Renderer
    // =========================
    function render3D({ truck, cargos, packResult, truckType }) {
    const canvas = document.getElementById('viz3d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    vizState = {
    truck, cargos, packResult, truckType,
    W: rect.width, H: rect.height,
    rotX: 0.30, rotY: -0.7, zoom: 1.0,
    dragging: false, lastX: 0, lastY: 0, dpr
};
    drawScene(ctx, vizState);

    canvas.onmousedown = (e) => {
    vizState.dragging = true;
    vizState.lastX = e.clientX; vizState.lastY = e.clientY;
};
    window.onmouseup = () => { if (vizState) vizState.dragging = false; };
    window.onmousemove = (e) => {
    if (!vizState || !vizState.dragging) return;
    vizState.rotY += (e.clientX - vizState.lastX) * 0.01;
    vizState.rotX += (e.clientY - vizState.lastY) * 0.008;
    vizState.rotX = Math.max(-1.2, Math.min(1.2, vizState.rotX));
    vizState.lastX = e.clientX; vizState.lastY = e.clientY;
    redrawViz();
};
    canvas.ontouchstart = (e) => {
    if (e.touches.length === 1) {
    vizState.dragging = true;
    vizState.lastX = e.touches[0].clientX;
    vizState.lastY = e.touches[0].clientY;
    e.preventDefault();
}
};
    canvas.ontouchmove = (e) => {
    if (!vizState || !vizState.dragging || e.touches.length !== 1) return;
    vizState.rotY += (e.touches[0].clientX - vizState.lastX) * 0.012;
    vizState.rotX += (e.touches[0].clientY - vizState.lastY) * 0.01;
    vizState.rotX = Math.max(-1.2, Math.min(1.2, vizState.rotX));
    vizState.lastX = e.touches[0].clientX;
    vizState.lastY = e.touches[0].clientY;
    redrawViz();
    e.preventDefault();
};
    canvas.ontouchend = () => { if (vizState) vizState.dragging = false; };
    canvas.style.touchAction = 'none';
    canvas.onwheel = (e) => {
    if (!vizState) return;
    vizState.zoom *= e.deltaY > 0 ? 0.93 : 1.07;
    vizState.zoom = Math.max(0.4, Math.min(3.0, vizState.zoom));
    redrawViz();
    e.preventDefault();
};
}

    function redrawViz() {
    if (!vizState) return;
    const canvas = document.getElementById('viz3d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    vizState.W = rect.width; vizState.H = rect.height; vizState.dpr = dpr;
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.scale(dpr, dpr);
    drawScene(ctx, vizState);
    ctx.restore();
}

    function getCSS(varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

    function shadeColor(hex, factor) {
    const h = (hex || '#888').replace('#','');
    const r = parseInt(h.slice(0,2),16);
    const g = parseInt(h.slice(2,4),16);
    const b = parseInt(h.slice(4,6),16);
    return `rgb(${Math.round(Math.min(255, r*factor))},${Math.round(Math.min(255, g*factor))},${Math.round(Math.min(255, b*factor))})`;
}

    function hexFromVar(varValue) {
    const v = String(varValue).trim();
    if (v.startsWith('#')) return v;
    const m = v.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (m) return '#' + [+m[1], +m[2], +m[3]].map(n => n.toString(16).padStart(2,'0')).join('');
    return '#94a3b8';
}

    function drawScene(ctx, s) {
    const { truck, cargos, packResult, truckType, W, H, rotX, rotY, zoom } = s;

    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, getCSS('--canvas-bg-1'));
    bg.addColorStop(1, getCSS('--canvas-bg-2'));
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const style = TRUCK_PRESETS[truckType]?.style || TRUCK_PRESETS.custom.style;

    const cabL = truck.l * style.cabRatio;
    const hoodL = truck.l * (style.hoodRatio || 0);
    const chassisH = truck.h * style.chassisRatio;
    const wheelDrop = truck.h * style.wheelRadiusN * 2;
    const totalL = truck.l + cabL + hoodL;
    const totalH = truck.h + chassisH + wheelDrop;
    const maxDim = Math.max(totalL, truck.w, totalH);

    const NT = { l: truck.l/maxDim, w: truck.w/maxDim, h: truck.h/maxDim };
    const NCab = {
    l: cabL/maxDim,
    w: NT.w * 0.95,
    h: (truck.h * style.cabHeightRatio)/maxDim
};
    const NHood = {
    l: hoodL/maxDim,
    w: NT.w * 0.90,
    h: (truck.h * style.cabHeightRatio * (style.hoodHeightRatio || 0.5))/maxDim
};
    const NChassis = chassisH/maxDim;
    const NWheelR = (truck.h * style.wheelRadiusN)/maxDim;

    const scale = Math.min(W, H) * 0.50 * zoom;
    const cx = W / 2;
    const cy = H / 2 + (NT.h + NChassis + NWheelR) * scale * 0.1;
    if (vizState) vizState.cyOffset = (NT.h + NChassis + NWheelR) * scale * 0.1;

    function project(x, y, z) {
    const x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
    const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
    const y1 = y;
    const y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
    const z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);
    return { x: cx + x1 * scale, y: cy - y2 * scale, z: z2 };
}

    // Center entire vehicle
    const shiftX = (NCab.l + NHood.l) / 2;
    const tox = -NT.l/2 + shiftX;
    const toy = 0;
    const toz = -NT.w/2;

    const cabOx = tox - NCab.l;
    const hoodOx = cabOx - NHood.l;
    const groundY = -NChassis - NWheelR * 2;

    const allFaces = [];
    const allWheels = [];

    // === Truck cargo shell – translucent (see-through walls) so cargo inside is visible ===
    pushBoxFaces(allFaces, {
    ox: tox, oy: toy, oz: toz, l: NT.l, w: NT.w, h: NT.h,
    color: getCSS('--truck-shell'), alpha: 0.18,
    stroke: getCSS('--truck-shell-stroke'),
    isShell: true
}, project);

    // === Bulkhead (sprinter only when enabled) ===
    if (style.bulkheadAvailable && hasBulkhead) {
    const bhT = 0.005;
    pushBoxFaces(allFaces, {
    ox: tox, oy: toy, oz: toz,
    l: bhT, w: NT.w, h: NT.h,
    color: getCSS('--truck-bulkhead'), alpha: 1,
    stroke: 'rgba(0,0,0,0.4)', isShell: false
}, project);
}

    // === Wheel wells (sprinter) ===
    if (style.hasWheelWells) {
    const wwW = (style.wheelWellWidthIn || 4) * toM.in / maxDim;
    const wwH = (style.wheelWellHeightIn || 22) * toM.in / maxDim;
    const wwL = (style.wheelWellLengthIn || 50) * toM.in / maxDim;
    // Center wheel wells on the rear-wheel x-position so they align with the actual wheels
    const rearWheelX = tox + NT.l * (style.rearWheelRatio ?? 0.90);
    const wwOx = rearWheelX - wwL / 2;
    // Left
    pushBoxFaces(allFaces, {
    ox: wwOx, oy: toy, oz: toz,
    l: wwL, w: wwW, h: wwH,
    color: getCSS('--truck-wheel-well'), alpha: 1,
    stroke: 'rgba(0,0,0,0.4)', isShell: false
}, project);
    // Right
    pushBoxFaces(allFaces, {
    ox: wwOx, oy: toy, oz: toz + NT.w - wwW,
    l: wwL, w: wwW, h: wwH,
    color: getCSS('--truck-wheel-well'), alpha: 1,
    stroke: 'rgba(0,0,0,0.4)', isShell: false
}, project);
}

    // === Cab (opaque, lower than cargo) ===
    pushBoxFaces(allFaces, {
    ox: cabOx, oy: 0, oz: -NCab.w/2,
    l: NCab.l, w: NCab.w, h: NCab.h,
    color: getCSS('--truck-cab'), alpha: 1,
    stroke: shadeColor(hexFromVar(getCSS('--truck-cab')), 0.5),
    isShell: false
}, project);

    // === Windshield: thin pane on front face of cab ===
    pushBoxFaces(allFaces, {
    ox: cabOx + 0.001,
    oy: NCab.h * 0.45,
    oz: -NCab.w/2 + NCab.w * 0.08,
    l: 0.001,
    w: NCab.w * 0.84,
    h: NCab.h * 0.42,
    color: getCSS('--truck-cab-window'), alpha: 0.95,
    stroke: 'rgba(0,0,0,0.35)', isShell: false
}, project);

    // === Hood (in front of cab, lower) ===
    if (NHood.l > 0) {
    pushBoxFaces(allFaces, {
    ox: hoodOx, oy: 0, oz: -NHood.w/2,
    l: NHood.l, w: NHood.w, h: NHood.h,
    color: getCSS('--truck-hood'), alpha: 1,
    stroke: shadeColor(hexFromVar(getCSS('--truck-hood')), 0.5),
    isShell: false
}, project);
}

    // === Chassis ===
    pushBoxFaces(allFaces, {
    ox: hoodOx + NHood.l * 0.05,
    oy: -NChassis,
    oz: -NT.w/2 * 0.92,
    l: NT.l + NCab.l + NHood.l * 0.92,
    w: NT.w * 0.92,
    h: NChassis,
    color: shadeColor('#3b4250', 1.0), alpha: 1,
    stroke: 'rgba(0,0,0,0.4)', isShell: false
}, project);

    // === Wheels ===
    const wheels = computeWheelPositions(NT, NCab, NHood, NWheelR, NChassis, style, tox, cabOx, hoodOx);
    wheels.forEach(w => allWheels.push(w));

    // === Cargo placements (solid, no shading) ===
    // Cap rendered placements for performance – large qty values would freeze the browser.
    const VIZ_MAX_PLACEMENTS = 500;
    const totalPlacements = packResult.placements.length;
    const renderedPlacements = totalPlacements > VIZ_MAX_PLACEMENTS
    ? packResult.placements.slice(0, VIZ_MAX_PLACEMENTS)
    : packResult.placements;
    const placementsTruncated = totalPlacements > VIZ_MAX_PLACEMENTS;
    renderedPlacements.forEach(p => {
    const c = cargos[p.cargoIdx];
    const boxColor = p.wellOverlap ? '#f97316' : c.color;
    const boxStroke = p.wellOverlap ? '#c2410c' : shadeColor(c.color, 0.55);
    pushBoxFaces(allFaces, {
    ox: tox + p.x / maxDim,
    oy: toy + p.y / maxDim,
    oz: toz + p.z / maxDim,
    l: p.l / maxDim,
    w: p.w / maxDim,
    h: p.h / maxDim,
    color: boxColor, alpha: 1.0,
    stroke: boxStroke,
    isShell: false, noShade: true
}, project);
});

    // === Unfit cargo (warning stripe, outside) ===
    packResult.perItemPlaced.forEach((placed, ci) => {
    const c = cargos[ci];
    if (c.qty <= 0) return;
    const cantFit = c.l > truck.l || c.w > truck.w || c.h > truck.h;
    if (placed < c.qty && cantFit) {
    pushBoxFaces(allFaces, {
    ox: tox + NT.l + 0.08,
    oy: toy,
    oz: -((c.w/maxDim))/2,
    l: c.l/maxDim, w: c.w/maxDim, h: c.h/maxDim,
    color: c.color, alpha: 0.65,
    stroke: '#dc2626', isShell: false, warningStripe: true, noShade: true
}, project);
}
});

    // Sort + draw
    const drawables = [];
    allFaces.forEach(f => drawables.push({ kind: 'face', avgZ: f.avgZ, data: f }));
    allWheels.forEach(w => drawables.push({ kind: 'wheel', avgZ: w.center.z, data: w }));
    drawables.sort((a, b) => a.avgZ - b.avgZ);

    drawables.forEach(d => {
    if (d.kind === 'face') drawFace(ctx, d.data);
    else drawWheel(ctx, d.data);
});

    drawGround(ctx, project, NT, NCab, NHood, groundY);

    // Wireframe edges of cargo shell on top (subtle outline)
    drawWireframeBox(NT.l, NT.w, NT.h, tox, toy, toz, project, ctx,
    getCSS('--truck-shell-stroke') || 'rgba(80,100,120,0.6)', 0.55, 1.1);

    // Status label
    ctx.font = '600 12px -apple-system, sans-serif';
    ctx.fillStyle = getCSS('--text');
    ctx.globalAlpha = 0.7;
    ctx.textAlign = 'center';
    const totalQty = cargos.reduce((s, c) => s + c.qty, 0);
    const totalPlaced = packResult.perItemPlaced.reduce((s, n) => s + n, 0);
    const truckName = t(TRUCK_PRESETS[truckType]?.nameKey || 'customName');
    ctx.fillText(`${truckName} · ${t('unitsPlacedLabel', totalPlaced, totalQty)}`, W / 2, H - 10);

    if (placementsTruncated) {
    ctx.font = '500 11px -apple-system, sans-serif';
    ctx.fillStyle = getCSS('--warning');
    ctx.globalAlpha = 0.9;
    ctx.fillText(t('vizTruncated', VIZ_MAX_PLACEMENTS, totalPlacements), W / 2, 16);
}
    ctx.globalAlpha = 1;
}

    function pushBoxFaces(allFaces, box, project) {
    const pts = computeBoxCorners(box.ox, box.oy, box.oz, box.l, box.w, box.h, project);
    const faceDefs = [
{ verts: [0,1,5,4], shade: 1.0  },
{ verts: [1,2,6,5], shade: 0.7  },
{ verts: [2,3,7,6], shade: 0.85 },
{ verts: [3,0,4,7], shade: 0.6  },
{ verts: [4,5,6,7], shade: 1.15 },
{ verts: [0,3,2,1], shade: 0.5  },
    ];
    faceDefs.forEach(f => {
    const vs = f.verts.map(i => pts[i]);
    const avgZ = (vs[0].z + vs[1].z + vs[2].z + vs[3].z) / 4;
    const dx1 = vs[1].x - vs[0].x, dy1 = vs[1].y - vs[0].y;
    const dx2 = vs[2].x - vs[0].x, dy2 = vs[2].y - vs[0].y;
    const isBackface = (dx1 * dy2 - dy1 * dx2) > 0;
    allFaces.push({
    vs, avgZ, shade: f.shade,
    color: box.color, alpha: box.alpha, stroke: box.stroke,
    isShell: box.isShell, isBackface,
    warningStripe: box.warningStripe,
    noShade: box.noShade,
    cullFront: box.cullFront
});
});
}

    function computeBoxCorners(ox, oy, oz, l, w, h, project) {
    return [
    project(ox,     oy,     oz    ),
    project(ox + l, oy,     oz    ),
    project(ox + l, oy,     oz + w),
    project(ox,     oy,     oz + w),
    project(ox,     oy + h, oz    ),
    project(ox + l, oy + h, oz    ),
    project(ox + l, oy + h, oz + w),
    project(ox,     oy + h, oz + w),
    ];
}

    function drawFace(ctx, f) {
    // Shell draws both faces (translucent see-through). Solid objects cull backfaces.
    if (!f.isShell && f.isBackface) return;

    ctx.save();
    ctx.globalAlpha = f.alpha;
    ctx.beginPath();
    ctx.moveTo(f.vs[0].x, f.vs[0].y);
    for (let k = 1; k < f.vs.length; k++) ctx.lineTo(f.vs[k].x, f.vs[k].y);
    ctx.closePath();

    const baseColor = (f.color || '#888888').startsWith('#') ? f.color : hexFromVar(f.color);
    ctx.fillStyle = f.noShade ? baseColor : shadeColor(baseColor, f.shade);
    ctx.fill();

    if (f.warningStripe) {
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = 'rgba(220,38,38,0.7)';
    ctx.lineWidth = 2;
    const minX = Math.min(...f.vs.map(v => v.x)) - 5;
    const maxX = Math.max(...f.vs.map(v => v.x)) + 5;
    const minY = Math.min(...f.vs.map(v => v.y)) - 5;
    const maxY = Math.max(...f.vs.map(v => v.y)) + 5;
    for (let i = minX - (maxY - minY); i < maxX; i += 8) {
    ctx.beginPath();
    ctx.moveTo(i, minY);
    ctx.lineTo(i + (maxY - minY), maxY);
    ctx.stroke();
}
    ctx.restore();
}

    ctx.strokeStyle = f.stroke;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
}

    function computeWheelPositions(NT, NCab, NHood, NWheelR, NChassis, style, tox, cabOx, hoodOx) {
    const wy = -NChassis - NWheelR;
    const wzL = -NT.w/2 - NWheelR * 0.4;
    const wzR = NT.w/2 + NWheelR * 0.4;
    // Front wheels: under cab (closer to hood-cab junction)
    const frontX = cabOx + NCab.l * 0.55;
    // Rear wheels – position controlled per truck type (Sprinter axle is more forward)
    const rearWheelRatio = style.rearWheelRatio ?? 0.90;
    const rearX = tox + NT.l * rearWheelRatio;

    const wheels = [
{ center: { x: frontX, y: wy, z: wzL }, radius: NWheelR },
{ center: { x: frontX, y: wy, z: wzR }, radius: NWheelR },
{ center: { x: rearX,  y: wy, z: wzL }, radius: NWheelR },
{ center: { x: rearX,  y: wy, z: wzR }, radius: NWheelR },
    ];
    if (style.wheels === 6) {
    const rearX2 = rearX - NT.l * 0.09;
    wheels.push({ center: { x: rearX2, y: wy, z: wzL }, radius: NWheelR });
    wheels.push({ center: { x: rearX2, y: wy, z: wzR }, radius: NWheelR });
}
    return wheels;
}

    function drawWheel(ctx, wheel) {
    const s = vizState;
    const project = (x, y, z) => {
    const x1 = x * Math.cos(s.rotY) + z * Math.sin(s.rotY);
    const z1 = -x * Math.sin(s.rotY) + z * Math.cos(s.rotY);
    const y1 = y;
    const y2 = y1 * Math.cos(s.rotX) - z1 * Math.sin(s.rotX);
    const z2 = y1 * Math.sin(s.rotX) + z1 * Math.cos(s.rotX);
    const scale = Math.min(s.W, s.H) * 0.50 * s.zoom;
    const cx = s.W / 2;
    const cy = s.H / 2 + (s.cyOffset ?? 0.05 * scale);
    return { x: cx + x1 * scale, y: cy - y2 * scale, z: z2 };
};
    const c = project(wheel.center.x, wheel.center.y, wheel.center.z);
    const top = project(wheel.center.x, wheel.center.y + wheel.radius, wheel.center.z);
    const front = project(wheel.center.x + wheel.radius, wheel.center.y, wheel.center.z);

    const ry = Math.hypot(top.x - c.x, top.y - c.y);
    const rx = Math.hypot(front.x - c.x, front.y - c.y);
    const angle = Math.atan2(top.y - c.y, top.x - c.x) - Math.PI/2;

    ctx.save();
    ctx.fillStyle = getCSS('--wheel-fill') || '#0f172a';
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, Math.max(rx, 4), Math.max(ry, 4), angle, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = getCSS('--wheel-stroke') || '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = getCSS('--wheel-stroke') || '#94a3b8';
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, Math.max(rx*0.35, 1.5), Math.max(ry*0.35, 1.5), angle, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

    function drawGround(ctx, project, NT, NCab, NHood, groundY) {
    const totalL = NT.l + NCab.l + NHood.l;
    const corners = [
    project(-totalL/2 - 0.05, groundY, -NT.w/2 - 0.05),
    project( totalL/2 + 0.05, groundY, -NT.w/2 - 0.05),
    project( totalL/2 + 0.05, groundY,  NT.w/2 + 0.05),
    project(-totalL/2 - 0.05, groundY,  NT.w/2 + 0.05)
    ];
    ctx.save();
    ctx.fillStyle = getCSS('--ground-line') || 'rgba(80,100,120,0.25)';
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    for (let i = 1; i < corners.length; i++) ctx.lineTo(corners[i].x, corners[i].y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

    function drawWireframeBox(l, w, h, ox, oy, oz, project, ctx, color, alpha, lw) {
    const pts = computeBoxCorners(ox, oy, oz, l, w, h, project);
    const edges = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7]
    ];
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.setLineDash([3, 3]);
    edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(pts[a].x, pts[a].y);
    ctx.lineTo(pts[b].x, pts[b].y);
    ctx.stroke();
});
    ctx.setLineDash([]);
    ctx.restore();
}

    const resizeObs = new ResizeObserver(() => { if (vizState) redrawViz(); });
    resizeObs.observe(document.getElementById('viz3d'));

    // Help modal
    function openHelp() { document.getElementById('help-overlay').classList.add('open'); }
    function closeHelp() { document.getElementById('help-overlay').classList.remove('open'); }
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeHelp(); });

