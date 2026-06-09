 /* ── i18n ── */
    const I18N = {
    en: {
    subtitle: 'Rate Confirmation builder',
    backBtn: "← Main",
    secUnit: 'Unit',
    secLoad: 'Load Info', secOptions: 'Options', secNotes: 'Notes',
    secDisp: 'Dispatcher', secAlways: 'Always included', secPreview: 'RC Preview',
    lblUnit: 'Unit #', lblDriver: "Driver's Name", lblLlc: "Driver's LLC",
    lblPieces: 'Total Pieces', lblWeight: 'Total Weight (lbs)', lblMiles: 'Loaded Miles', lblRate: 'Total Rate ($)',
    lblPartialUrsa: 'Partial (by URSA)', lblPartialOther: 'Partial (another carrier)',
    lblTwic: 'TWIC', lblCitizen: 'CITIZEN/GC', lblTransload: 'Transload freight',
    lblEscort: 'Escort option', lblBlind: 'Blind shipment', lblReefer: 'Reefer/heater',
    lblDispName: 'Dispatcher Name', lblPhone: 'Direct Phone', lblTelegram: 'Telegram @', lblWhatsapp: 'WhatsApp', lblEmail: 'Email',
    lblStopDate: 'Date & Time', lblStopCompany: 'Company Name', lblStopAddr: 'Address', lblStopRef: 'REF#', lblStopPoc: 'POC',
    btnCopy: 'Copy', btnClear: 'Clear', copyOk: 'Copied ✓', btnAddStop: '+ Add Stop',
    historyEmpty: 'No history yet. Copy an RC to save it.', historyClear: 'Clear history',
    trkPriority: 'Priority communication',
    requiredNote: 'required field',
    hintStopDate: 'Digits only — separators auto-insert. End with a or p for AM/PM',
    phUnit: 'e.g. 101', phDriver: 'First Last', phLlc: 'Company LLC',
    phAddr: 'Street, City ST ZIP',
    phPieces: 'e.g. 5', phWeight: 'e.g. 1200', phMiles: 'e.g. 320', phRate: 'e.g. 850',
    phNotes: 'Any additional info...', phDispName: 'Your name',
    phStopDate: 'MM/DD/YYYY H:MM AM', phStopCompany: 'Company name', phStopRef: 'Reference #', phStopPoc: 'Point of contact',
    helpHead: '📋  RC Generator',
    helpDesc: 'Fill in the load details and click Copy to get a formatted Rate Confirmation. Dispatcher contacts are saved automatically for the next load.',
    helpFields: '📝  Fields',
    helpUnitKey: 'Unit / Driver / LLC', helpUnitVal: 'Identify the load assignment',
    helpPuKey: 'Stops', helpPuVal: 'Add stops with date, company, address, REF# and POC',
    helpLoadKey: 'Load Info', helpLoadVal: 'Pieces, weight, miles and rate',
    helpOptKey: 'Options', helpOptVal: 'Mark applicable: Partial, TWIC, Transload, Blind, Reefer, etc.',
    helpDispKey: 'Dispatcher', helpDispVal: 'Saved to browser and reused on next load',
    closeBtn: 'Close',
},
    ru: {
    subtitle: 'Генератор Rate Confirmation',
    backBtn: "← Main",
    secUnit: 'Юнит',
    secLoad: 'Информация о грузе', secOptions: 'Опции', secNotes: 'Заметки',
    secDisp: 'Диспетчер', secAlways: 'Всегда включено', secPreview: 'Превью RC',
    lblUnit: 'Юнит #', lblDriver: 'Имя водителя', lblLlc: "Driver's LLC",
    lblPieces: 'Количество мест', lblWeight: 'Общий вес (lbs)', lblMiles: 'Loaded Miles', lblRate: 'Ставка ($)',
    lblPartialUrsa: 'Partial (by URSA)', lblPartialOther: 'Partial (another carrier)',
    lblTwic: 'TWIC', lblCitizen: 'CITIZEN/GC', lblTransload: 'Transload freight',
    lblEscort: 'Escort option', lblBlind: 'Blind shipment', lblReefer: 'Reefer/heater',
    lblDispName: 'Имя диспетчера', lblPhone: 'Прямой телефон', lblTelegram: 'Telegram @', lblWhatsapp: 'WhatsApp', lblEmail: 'Email',
    lblStopDate: 'Дата и время', lblStopCompany: 'Название компании', lblStopAddr: 'Адрес', lblStopRef: 'REF#', lblStopPoc: 'Контакт',
    btnCopy: 'Копировать', btnClear: 'Очистить', copyOk: 'Скопировано ✓', btnAddStop: '+ Добавить стоп',
    historyEmpty: 'История пуста. Нажми Copy чтобы сохранить RC.', historyClear: 'Очистить историю',
    trkPriority: 'Приоритетная связь',
    requiredNote: 'обязательное поле',
    hintStopDate: 'Только цифры — разделители ставятся сами. В конце a или p для AM/PM',
    phUnit: 'напр. 101', phDriver: 'Имя Фамилия', phLlc: 'Company LLC',
    phAddr: 'Улица, Город ST ZIP',
    phPieces: 'напр. 5', phWeight: 'напр. 1200', phMiles: 'напр. 320', phRate: 'напр. 850',
    phNotes: 'Дополнительная информация...', phDispName: 'Ваше имя',
    phStopDate: 'MM/DD/YYYY H:MM AM', phStopCompany: 'Название компании', phStopRef: 'Номер референса', phStopPoc: 'Контактное лицо',
    helpHead: '📋  RC Generator',
    helpDesc: 'Заполни данные груза и нажми Копировать — получишь готовый Rate Confirmation для отправки водителю. Контакты диспетчера сохраняются автоматически.',
    helpFields: '📝  Поля',
    helpUnitKey: 'Юнит / Водитель / LLC', helpUnitVal: 'Информация о назначении',
    helpPuKey: 'Стопы', helpPuVal: 'Добавь стопы с датой, компанией, адресом, REF# и контактом',
    helpLoadKey: 'Информация о грузе', helpLoadVal: 'Места, вес, мили и ставка',
    helpOptKey: 'Опции', helpOptVal: 'Отметь нужные опции: Partial, TWIC, Transload, Blind, Reefer и др.',
    helpDispKey: 'Диспетчер', helpDispVal: 'Сохраняется в браузере и используется для следующего груза',
    closeBtn: 'Закрыть',
}
};

    const SK = { lang: 'rc_lang', theme: 'rc_theme' };
    let LANG = 'en';

    function t(k) { return (I18N[LANG] && I18N[LANG][k]) || I18N.en[k] || k; }

    function applyLang() {
    document.documentElement.setAttribute('lang', LANG);
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    const btn = document.getElementById('langBtn');
    if (btn) btn.textContent = LANG === 'en' ? 'RU' : 'EN';
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn && !copyBtn.classList.contains('copied')) copyBtn.textContent = t('btnCopy');
}

    function toggleLang() {
    LANG = LANG === 'en' ? 'ru' : 'en';
    try { localStorage.setItem(SK.lang, LANG); } catch(e) {}
    applyLang();
}

    function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(SK.theme, next); } catch(e) {}
}

    function toggleHelp() {
    document.getElementById('helpBackdrop').classList.toggle('show');
}

    function toggleAlways() {
    document.getElementById('alwaysSection').classList.toggle('always-collapsed');
}

    function toggleDisp() {
    document.getElementById('dispSection').classList.toggle('always-collapsed');
}

    /* ── Core ── */
    const LS_CONTACTS = ['dispatcher','phone','telegram','whatsapp','email'];
    const TRACKING_LINE = "Ursa's tracking 24/7:\nPhone: (267) 768-7115\nEmail: tracking@ursaexpress.com\nTelegram: @tracking_ursa";

    const RC_STRINGS = {
    en: {
    unit: '🚛 Unit#: ', driver: '👤 Driver: ', llc: '🏢 LLC: ',
    pieces: '📦 Total Pieces: ', weightSuffix: ' lbs',
    weight: '⚖️ Total Weight: ', miles: '🛣️ Loaded Miles: ', rate: '💵 Total Rate: $',
    partialUrsa: '✅ PARTIAL (by URSA)', partialOther: '✅ PARTIAL (another carrier)',
    twic: '✅ TWIC', citizen: '✅ CITIZEN/GC', transload: '✅ TRANSLOAD FREIGHT',
    escort: '✅ ESCORT OPTION', blind: '✅ BLIND SHIPMENT', reefer: '✅ REEFER/HEATER',
    disp: '🧑‍💼 Dispatcher: ',
    tracking: '📡 ' + TRACKING_LINE,
    disclaimer: 'By accepting this RC you agree to the terms stated in the contract. You agree that tardiness and poor communication with tracking and dispatcher may result in rate reduction. You also agree that an unauthorized partial load may result in a complete rate reduction.',
},
    es: {
    unit: '🚛 Unidad #: ', driver: '👤 Conductor: ', llc: '🏢 LLC: ',
    pieces: '📦 Total de piezas: ', weightSuffix: ' lbs',
    weight: '⚖️ Peso total: ', miles: '🛣️ Millas cargadas: ', rate: '💵 Tarifa total: $',
    partialUrsa: '✅ PARTIAL (by URSA)', partialOther: '✅ PARTIAL (another carrier)',
    twic: '✅ TWIC', citizen: '✅ CITIZEN/GC', transload: '✅ TRANSLOAD FREIGHT',
    escort: '✅ ESCORT OPTION', blind: '✅ BLIND SHIPMENT', reefer: '✅ REEFER/HEATER',
    disp: '🧑‍💼 Despachador: ',
    tracking: '📡 Seguimiento Ursa 24/7:\nPhone: (267) 768-7115\nEmail: tracking@ursaexpress.com\nTelegram: @tracking_ursa',
    disclaimer: 'Al aceptar este RC, usted acepta los términos establecidos en el contrato. Acepta que la tardanza y la falta de comunicación con el seguimiento y el despachador puede resultar en una reducción de la tarifa. También acepta que una carga parcial no autorizada puede resultar en una reducción total de la tarifa.',
}
};

    function v(id) {
    return (document.getElementById(id).value || '').trim();
}

    function sv(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

    function openMaps(fieldId) {
    const addr = sv(fieldId);
    if (!addr) return;
    window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(addr), '_blank');
}

    /* ── Dynamic stops ── */
    let stopCount = 2;

    function buildStopFormEl(n, data, canRemove) {
    const div = document.createElement('div');
    div.className = 'fields-group stop-group';
    div.id = 'stop-group-' + n;
    const removeBtn = canRemove
    ? `<button class="stop-remove-btn" onclick="removeStop(${n})" title="Remove">✕</button>`
    : '';
    div.innerHTML = `
    <div class="section-label">
      <span>Stop #${n}</span>
      ${removeBtn}
    </div>
    <div class="field">
      <div class="field-hd">
        <label class="required" data-i18n="lblStopDate">${t('lblStopDate')}</label>
        ${n === 1
    ? `<button class="map-btn" type="button" onclick="setStopDate(${n},'ASAP Pick up')">ASAP PU</button>`
    : `<button class="map-btn" type="button" onclick="setStopDate(${n},'DIRECT')">DIRECT</button>`
}
      </div>
      <input type="text" id="stop-${n}-date" data-i18n-ph="phStopDate" placeholder="${t('phStopDate')}" oninput="maskStopDate(this);renderPreview()" onkeydown="handleStopDateKey(this,event)">
      <div class="field-hint" data-i18n="hintStopDate">${t('hintStopDate')}</div>
    </div>
    <div class="field">
      <label data-i18n="lblStopCompany">${t('lblStopCompany')}</label>
      <input type="text" id="stop-${n}-company" data-i18n-ph="phStopCompany" placeholder="${t('phStopCompany')}" oninput="renderPreview()">
    </div>
    <div class="field">
      <div class="field-hd">
        <label class="required" data-i18n="lblStopAddr">${t('lblStopAddr')}</label>
        <button class="map-btn" onclick="openMaps('stop-${n}-address')" title="Open in Google Maps">📍 Maps</button>
      </div>
      <textarea id="stop-${n}-address" data-i18n-ph="phAddr" placeholder="${t('phAddr')}" oninput="renderPreview()"></textarea>
    </div>
    <div class="row-2">
      <div class="field">
        <label data-i18n="lblStopRef">${t('lblStopRef')}</label>
        <input type="text" id="stop-${n}-ref" data-i18n-ph="phStopRef" placeholder="${t('phStopRef')}" oninput="renderPreview()">
      </div>
      <div class="field">
        <label data-i18n="lblStopPoc">${t('lblStopPoc')}</label>
        <input type="text" id="stop-${n}-poc" data-i18n-ph="phStopPoc" placeholder="${t('phStopPoc')}" oninput="renderPreview()">
      </div>
    </div>
  `;
    if (data) {
    ['date','company','address','ref','poc'].forEach(f => {
    const el = div.querySelector('#stop-' + n + '-' + f);
    if (el && data[f]) el.value = data[f];
});
}
    return div;
}

    function buildStopROEl(n) {
    const div = document.createElement('div');
    div.className = 'fields-group';
    div.id = 'ro-stop-group-' + n;
    div.innerHTML = `
    <div class="section-label"><span>Stop #${n}</span></div>
    <div class="field">
      <label data-i18n="lblStopDate">${t('lblStopDate')}</label>
      <div class="ro-field empty" id="ro-stop-${n}-date">&nbsp;</div>
    </div>
    <div class="field">
      <label data-i18n="lblStopCompany">${t('lblStopCompany')}</label>
      <div class="ro-field empty" id="ro-stop-${n}-company">&nbsp;</div>
    </div>
    <div class="field">
      <label data-i18n="lblStopAddr">${t('lblStopAddr')}</label>
      <div class="ro-field ro-textarea empty" id="ro-stop-${n}-address">&nbsp;</div>
    </div>
    <div class="row-2">
      <div class="field">
        <label data-i18n="lblStopRef">${t('lblStopRef')}</label>
        <div class="ro-field empty" id="ro-stop-${n}-ref">&nbsp;</div>
      </div>
      <div class="field">
        <label data-i18n="lblStopPoc">${t('lblStopPoc')}</label>
        <div class="ro-field empty" id="ro-stop-${n}-poc">&nbsp;</div>
      </div>
    </div>
  `;
    return div;
}

    function collectStopData() {
    const data = [];
    for (let i = 1; i <= stopCount; i++) {
    data.push({
    date:    sv('stop-' + i + '-date'),
    company: sv('stop-' + i + '-company'),
    address: sv('stop-' + i + '-address'),
    ref:     sv('stop-' + i + '-ref'),
    poc:     sv('stop-' + i + '-poc'),
});
}
    return data;
}

    function maskStopDate(el) {
    const raw = el.value;
    const digits = raw.replace(/\D/g, '').slice(0, 12);
    const letters = raw.replace(/[\d\/: ]/g, '').toUpperCase();
    let ampm = '';
    if (letters.includes('A')) ampm = 'AM';
    else if (letters.includes('P')) ampm = 'PM';

    if (!digits.length) { el.value = ''; return; }

    let out = digits.slice(0, 2);
    if (digits.length > 2) out += '/' + digits.slice(2, 4);
    if (digits.length > 4) out += '/' + digits.slice(4, 8);
    if (digits.length > 8) out += ' ' + digits.slice(8, 10);
    if (digits.length > 10) out += ':' + digits.slice(10, 12);
    if (ampm) out += ' ' + ampm;

    el.value = out;
}

    function setStopDate(n, val) {
    const el = document.getElementById('stop-' + n + '-date');
    if (!el) return;
    el.value = val;
    renderPreview();
}

    function handleStopDateKey(el, e) {
    if (e.key !== 'Backspace' && e.key !== 'Delete') return;
    if (!el.value || !/^\d/.test(el.value)) return; // free text — let browser handle
    e.preventDefault();

    let val = el.value;
    if (!val) return;

    // Strip AM/PM suffix as one unit
    if (/ (AM|PM)$/.test(val)) {
    el.value = val.replace(/ (AM|PM)$/, '');
    renderPreview();
    return;
}

    // Skip trailing separators, then remove one digit
    while (val.length > 0 && !/\d/.test(val[val.length - 1])) {
    val = val.slice(0, -1);
}
    val = val.slice(0, -1);

    el.value = val;
    maskStopDate(el);
    renderPreview();
}

    function renderStops(stopData) {
    const leftC  = document.getElementById('stopsContainer');
    const rightC = document.getElementById('ro-stopsContainer');
    leftC.innerHTML  = '';
    rightC.innerHTML = '';
    const canRemove = stopData.length > 1;
    stopData.forEach((data, i) => {
    const n = i + 1;
    leftC.appendChild(buildStopFormEl(n, data, canRemove));
    rightC.appendChild(buildStopROEl(n));
});
    stopCount = stopData.length;
}

    function addStop() {
    const data = collectStopData();
    data.push({ date:'', company:'', address:'', ref:'', poc:'' });
    renderStops(data);
    renderPreview();
}

    function removeStop(n) {
    const data = collectStopData();
    data.splice(n - 1, 1);
    renderStops(data);
    renderPreview();
}

    function waUrl(phone) {
    const digits = phone.replace(/\D/g, '');
    return digits ? 'https://wa.me/' + digits : '';
}

    function setRo(id, val) {
    const el = document.getElementById('ro-' + id);
    if (!el) return;
    if (val) { el.textContent = val; el.classList.remove('empty'); }
    else { el.innerHTML = '&nbsp;'; el.classList.add('empty'); }
}

    function setRoEl(fullId, val) {
    const el = document.getElementById(fullId);
    if (!el) return;
    if (val) { el.textContent = val; el.classList.remove('empty'); }
    else { el.innerHTML = '&nbsp;'; el.classList.add('empty'); }
}

    function buildText(lang = 'en') {
    const S = RC_STRINGS[lang] || RC_STRINGS.en;
    const unit         = v('unit');
    const driver       = v('driver');
    const llc          = v('llc');
    const pieces       = v('pieces');
    const weight       = v('weight');
    const miles        = v('miles');
    const rate         = v('rate');
    const partialUrsa  = document.getElementById('chkPartialUrsa').checked;
    const partialOther = document.getElementById('chkPartialOther').checked;
    const twic         = document.getElementById('chkTwic').checked;
    const citizen      = document.getElementById('chkCitizen').checked;
    const transload    = document.getElementById('chkTransload').checked;
    const escort       = document.getElementById('chkEscort').checked;
    const blind        = document.getElementById('chkBlind').checked;
    const reefer       = document.getElementById('chkReefer').checked;
    const notes        = v('notes');
    const dispatcher   = v('dispatcher');
    const phone        = v('phone');
    const telegram     = v('telegram');
    const whatsapp     = v('whatsapp');
    const email        = v('email');

    const lines = [];

    // ── Unit block ──
    if (unit)   lines.push(S.unit + unit);
    if (driver) lines.push(S.driver + driver);
    if (llc)    lines.push(S.llc + llc);
    if (unit || driver || llc) { lines.push('__'); lines.push(''); }

    // ── Stops: __ between each stop, blank line after each stop ──
    for (let i = 1; i <= stopCount; i++) {
    if (i > 1) lines.push('__');
    const date    = sv('stop-' + i + '-date');
    const company = sv('stop-' + i + '-company');
    const address = sv('stop-' + i + '-address');
    const ref     = sv('stop-' + i + '-ref');
    const poc     = sv('stop-' + i + '-poc');
    if (date)    { lines.push(date); lines.push(''); }
    if (company) lines.push(company);
    if (address) lines.push(address);
    if (ref)     lines.push('REF# ' + ref);
    if (poc)     lines.push('POC: ' + poc);
    lines.push('');
}

    // ── Pieces / Weight ──
    lines.push('__');
    if (pieces) lines.push(S.pieces + pieces);
    if (weight) lines.push(S.weight + weight + S.weightSuffix);
    lines.push('');

    // ── Miles / Rate / Options / Notes / Contacts / Tracking / Disclaimer ──
    lines.push('__');
    if (miles)        lines.push(S.miles + miles);
    if (rate)         lines.push(S.rate + rate);
    if (partialUrsa)  lines.push(S.partialUrsa);
    if (partialOther) lines.push(S.partialOther);
    if (twic)         lines.push(S.twic);
    if (citizen)      lines.push(S.citizen);
    if (transload)    lines.push(S.transload);
    if (escort)       lines.push(S.escort);
    if (blind)        lines.push(S.blind);
    if (reefer)       lines.push(S.reefer);
    if (notes)        { lines.push(''); lines.push('📝 ' + notes); }
    lines.push('');
    if (dispatcher) lines.push(S.disp + dispatcher);
    if (phone)      lines.push('📞 Phone: ' + phone);
    if (telegram)   lines.push('✈️ Telegram: ' + telegram);
    if (whatsapp)   lines.push('💬 WhatsApp: ' + waUrl(whatsapp));
    if (email)      lines.push('📧 Email: ' + email);
    lines.push('');
    lines.push(S.tracking);
    lines.push('');
    lines.push(S.disclaimer);

    return lines.join('\n');
}

    function renderPreview() {
    setRo('unit',   v('unit'));
    setRo('driver', v('driver'));
    setRo('llc',    v('llc'));

    for (let i = 1; i <= stopCount; i++) {
    setRoEl('ro-stop-' + i + '-date',    sv('stop-' + i + '-date'));
    setRoEl('ro-stop-' + i + '-company', sv('stop-' + i + '-company'));
    setRoEl('ro-stop-' + i + '-address', sv('stop-' + i + '-address'));
    setRoEl('ro-stop-' + i + '-ref',     sv('stop-' + i + '-ref'));
    setRoEl('ro-stop-' + i + '-poc',     sv('stop-' + i + '-poc'));
}

    setRo('pieces', v('pieces'));
    setRo('weight', v('weight'));
    setRo('miles',  v('miles'));
    setRo('rate',   v('rate'));
    setRo('notes',  v('notes'));
    ['chkPartialUrsa','chkPartialOther','chkTwic','chkCitizen','chkTransload','chkEscort','chkBlind','chkReefer'].forEach(id => {
    const checked = document.getElementById(id).checked;
    document.getElementById('ro-' + id).classList.toggle('active', checked);
});
    setRo('dispatcher', v('dispatcher'));
    setRo('phone',      v('phone'));
    setRo('telegram',   v('telegram'));
    setRo('whatsapp',   v('whatsapp') ? waUrl(v('whatsapp')) : '');
    setRo('email',      v('email'));
}

    function onContactInput() {
    try {
    LS_CONTACTS.forEach(id => {
    localStorage.setItem('rc_' + id, document.getElementById(id).value.trim());
});
} catch(e) {}
    renderPreview();
}

    function flashCopy() {
    const btn = document.getElementById('copyBtn');
    btn.textContent = t('copyOk');
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = t('btnCopy'); btn.classList.remove('copied'); }, 2000);
}

    function doCopy() {
    const text = buildText('en').trim();
    if (!text) return;
    pushHistory();
    navigator.clipboard.writeText(text).then(flashCopy).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    flashCopy();
});
}

    function flashCopyES() {
    const btn = document.getElementById('copyBtnES');
    btn.textContent = 'Copiado ✓';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = '🇪🇸 ES'; btn.classList.remove('copied'); }, 2000);
}

    function doCopyES() {
    const text = buildText('es').trim();
    if (!text) return;
    pushHistory();
    navigator.clipboard.writeText(text).then(flashCopyES).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    flashCopyES();
});
}

    /* ── History ── */
    const HISTORY_MAX = 20;
    let HISTORY = [];
    try { HISTORY = JSON.parse(localStorage.getItem('rc_history') || '[]'); } catch {}

    function pushHistory() {
    const stops = [];
    for (let i = 1; i <= stopCount; i++) {
    stops.push({
    date:    sv('stop-' + i + '-date'),
    company: sv('stop-' + i + '-company'),
    address: sv('stop-' + i + '-address'),
    ref:     sv('stop-' + i + '-ref'),
    poc:     sv('stop-' + i + '-poc'),
});
}
    const entry = {
    ts: Date.now(), stops,
    unit: v('unit'), driver: v('driver'),
    pieces: v('pieces'), weight: v('weight'),
    miles: v('miles'), rate: v('rate'),
    notes: v('notes'), dispatcher: v('dispatcher'),
};
    const hasContent = stops.some(s => s.date || s.company || s.address) || entry.miles || entry.rate;
    if (!hasContent) return;
    HISTORY.unshift(entry);
    if (HISTORY.length > HISTORY_MAX) HISTORY.length = HISTORY_MAX;
    try { localStorage.setItem('rc_history', JSON.stringify(HISTORY)); } catch {}
}

    function toggleHistory() {
    const p = document.getElementById('historyPanel');
    if (p.hidden) renderHistory();
    p.hidden = !p.hidden;
}

    function renderHistory() {
    const p = document.getElementById('historyPanel');
    if (!HISTORY.length) {
    p.innerHTML = `<div class="history-empty">${t('historyEmpty')}</div>`;
    return;
}
    const fmtDate = ts => new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const city = addr => {
    if (!addr) return '';
    const parts = addr.split(',');
    return parts.length > 1 ? (parts[1].trim().split(' ')[0] || '') : '';
};
    p.innerHTML = HISTORY.map((e, i) => {
    const s0    = e.stops && e.stops[0];
    const s1    = e.stops && e.stops.find((s, idx) => idx > 0 && (s.address || s.company));
    const from  = (s0 && (city(s0.address) || s0.company)) || '?';
    const to    = (s1 && (city(s1.address) || s1.company)) || '?';
    const rate  = e.rate ? '$' + e.rate : '';
    return `<div class="history-item" onclick="loadHistory(${i})">
      <div class="history-route">${from} → ${to}</div>
      <div class="history-meta"><span>${fmtDate(e.ts)}</span><span>${rate}</span></div>
    </div>`;
}).join('') + `<button class="history-clear" id="historyClearBtn" onclick="clearHistory()">${t('historyClear')}</button>`;
}

    function loadHistory(i) {
    const e = HISTORY[i];
    if (!e) return;
    ['unit','driver','pieces','weight','miles','rate','notes','dispatcher'].forEach(k => {
    const el = document.getElementById(k);
    if (el) el.value = e[k] || '';
});
    const stopData = (e.stops || []).map(s => ({
    date: s.date || '', company: s.company || '',
    address: s.address || '', ref: s.ref || '', poc: s.poc || '',
}));
    while (stopData.length < 2) stopData.push({ date:'', company:'', address:'', ref:'', poc:'' });
    renderStops(stopData);
    renderPreview();
    document.getElementById('historyPanel').hidden = true;
}

    function clearHistory() {
    const btn = document.getElementById('historyClearBtn');
    if (!btn) return;
    if (btn.dataset.confirming) {
    HISTORY = [];
    try { localStorage.removeItem('rc_history'); } catch {}
    renderHistory();
} else {
    btn.dataset.confirming = '1';
    btn.textContent = LANG === 'ru' ? '⚠️ Нажми ещё раз' : '⚠️ Tap again to confirm';
    btn.style.color = 'var(--danger)';
    btn.style.borderColor = 'var(--danger)';
    setTimeout(() => {
    if (btn && btn.dataset.confirming) {
    delete btn.dataset.confirming;
    btn.textContent = t('historyClear');
    btn.style.color = '';
    btn.style.borderColor = '';
}
}, 3000);
}
}

    document.addEventListener('click', e => {
    const wrap = document.querySelector('.history-wrap');
    if (wrap && !wrap.contains(e.target))
    document.getElementById('historyPanel').hidden = true;
});

    function doClear() {
    ['unit','driver','llc','pieces','weight','miles','rate','notes'].forEach(id => {
        document.getElementById(id).value = '';
    });
    ['chkPartialUrsa','chkPartialOther','chkTwic','chkCitizen','chkTransload','chkEscort','chkBlind','chkReefer'].forEach(id => {
    document.getElementById(id).checked = false;
});
    renderStops([{}, {}]);
    renderPreview();
}

    /* ── Init ── */
    (function init() {
    try {
    const savedTheme = localStorage.getItem(SK.theme);
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
    const savedLang = localStorage.getItem(SK.lang);
    if (savedLang === 'ru') LANG = 'ru';
    LS_CONTACTS.forEach(id => {
    const saved = localStorage.getItem('rc_' + id);
    if (saved) document.getElementById(id).value = saved;
});
} catch(e) {}
    renderStops([{},{} ]);
    applyLang();
    renderPreview();
})();

    /* ── Tracking Modal ── */
    const TRK_LANGS = ['ENG', 'ESP', 'RUS', 'FR'];
    let trkLangIdx = 0;

    function openTracking() {
    document.getElementById('trk-driver').value = v('driver');
    document.getElementById('trk-dphone').value = v('phone');
    document.getElementById('trk-dispatcher').value = v('dispatcher');
    document.getElementById('trk-priority').checked = false;
    document.getElementById('trk-dphone2-wrap').style.display = 'none';
    document.getElementById('trk-dphone2').value = '';
    document.getElementById('trk-main-error').style.display = 'none';
    document.querySelectorAll('#trkBackdrop .trk-input').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('#trkBackdrop .trk-toggle').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.field input.field-error, .field textarea.field-error').forEach(el => el.classList.remove('field-error'));
    document.getElementById('trkBackdrop').classList.add('show');
}

    function closeTracking() {
    document.getElementById('trkBackdrop').classList.remove('show');
    document.querySelectorAll('.field input.field-error, .field textarea.field-error').forEach(el => el.classList.remove('field-error'));
}

    function cycleTrkLang() {
    trkLangIdx = (trkLangIdx + 1) % TRK_LANGS.length;
    document.getElementById('trkLangBtn').textContent = TRK_LANGS[trkLangIdx];
}

    function trkSel(groupId, btn) {
    const group = document.getElementById(groupId);
    group.querySelectorAll('button').forEach(b => b.classList.remove('sel'));
    btn.classList.add('sel');
    group.classList.remove('error');
    if (groupId === 'trk-option') {
    const isFakeTeam = btn.textContent === 'Fake Team';
    const wrap = document.getElementById('trk-dphone2-wrap');
    wrap.style.display = isFakeTeam ? '' : 'none';
    if (!isFakeTeam) {
    document.getElementById('trk-dphone2').value = '';
    document.getElementById('trk-dphone2').classList.remove('error');
}
}
}

    function sendTracking() {
    let valid = true;

    // Modal fields
    ['trk-chain','trk-driver','trk-dphone','trk-brokerage','trk-period','trk-dispatcher'].forEach(id => {
    const el = document.getElementById(id);
    const ok = el.value.trim().length > 0;
    el.classList.toggle('error', !ok);
    if (!ok) valid = false;
});
    const isFakeTeam = document.getElementById('trk-dphone2-wrap').style.display !== 'none';
    if (isFakeTeam) {
    const el = document.getElementById('trk-dphone2');
    const ok = el.value.trim().length > 0;
    el.classList.toggle('error', !ok);
    if (!ok) valid = false;
}
    ['trk-option','trk-truck','trk-photos'].forEach(id => {
    const group = document.getElementById(id);
    const ok = !!group.querySelector('button.sel');
    group.classList.toggle('error', !ok);
    if (!ok) valid = false;
});

    // Main form: stops (all fields except company)
    document.querySelectorAll('.field input.field-error, .field textarea.field-error').forEach(el => el.classList.remove('field-error'));
    let mainValid = true;
    for (let i = 1; i <= stopCount; i++) {
    ['date','address'].forEach(f => {
    const el = document.getElementById('stop-' + i + '-' + f);
    if (el && !el.value.trim()) { el.classList.add('field-error'); mainValid = false; }
});
}
    // Main form: load info
    ['pieces','weight','miles','rate'].forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.value.trim()) { el.classList.add('field-error'); mainValid = false; }
});
    document.getElementById('trk-main-error').style.display = mainValid ? 'none' : '';
    if (!mainValid) valid = false;

    if (!valid) return;

    const getToggle = id => document.getElementById(id).querySelector('button.sel').textContent;
    const payload = {
    chain:        document.getElementById('trk-chain').value.trim(),
    dispatcher:   document.getElementById('trk-dispatcher').value.trim(),
    driverName:   document.getElementById('trk-driver').value.trim(),
    driverLang:   TRK_LANGS[trkLangIdx],
    driverPhone:  document.getElementById('trk-dphone').value.trim(),
    driverPhone2: isFakeTeam ? document.getElementById('trk-dphone2').value.trim() : '',
    ownerInfo:    document.getElementById('trk-owner').value.trim(),
    priorityComm: document.getElementById('trk-priority').checked,
    option:       getToggle('trk-option'),
    truckType:    getToggle('trk-truck'),
    brokerage:    document.getElementById('trk-brokerage').value.trim(),
    sendPhotos:   getToggle('trk-photos'),
    updatePeriod: document.getElementById('trk-period').value.trim(),
    unit:  v('unit'),
    miles: v('miles'),
    rate:  v('rate'),
    stops: Array.from({ length: stopCount }, (_, i) => ({
    date:    sv('stop-' + (i+1) + '-date'),
    company: sv('stop-' + (i+1) + '-company'),
    address: sv('stop-' + (i+1) + '-address'),
})),
};

    console.log('[Tracking payload]', payload);
    alert('✓ Data collected! (test mode — not sent)');
    closeTracking();
}

    document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
    const bd = document.getElementById('helpBackdrop');
    if (bd.classList.contains('show')) toggleHelp();
    closeTracking();
}
    if (e.key === '?' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
    toggleHelp();
}
});
