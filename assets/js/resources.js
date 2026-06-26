const LS_THEME = 'ursa-theme';
const LS_LANG  = 'ursa-lang';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(LS_THEME, theme);
}
function toggleTheme() {
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}
const T = {
    en: {
        'page-title':    'Resources',
        'page-subtitle': 'Documents, templates and reference files',
        'auth-title':    'Internal Access',
        'login-btn':     'Login',
        'error-msg':     'Invalid Password',
        'pass-ph':       'Password',
        'meta-coi':      'Certificate of Insurance · PDF',
        'meta-coi-new':  'Certificate of Insurance (New) · PDF',
        'meta-mcdot':    'MC/DOT for Truck · PDF',
        'meta-canada':   'Customs Filling Guide · DOCX',
        'meta-change':   'Test Answers · DOCX',
        'meta-tracking': 'Tracking via app2 · DOCX',
        'meta-bol':      'Bill of Lading Template · billoflading.org',
        'btn-view':      'View',
        'btn-download':  'Download',
        'btn-open':      'Open',
        'section-templates': 'Message Templates',
        'btn-copy':          'Copy',
        'btn-copied':        '✓ Copied',
    },
    ru: {
        'page-title':    'Ресурсы',
        'page-subtitle': 'Документы, шаблоны и справочные файлы',
        'auth-title':    'Внутренний доступ',
        'login-btn':     'Войти',
        'error-msg':     'Неверный пароль',
        'pass-ph':       'Пароль',
        'meta-coi':      'Сертификат страхования · PDF',
        'meta-coi-new':  'Сертификат страхования (Новый) · PDF',
        'meta-mcdot':    'MC/DOT на трак · PDF',
        'meta-canada':   'Инструкция по заполнению таможни · DOCX',
        'meta-change':   'Ответы на тесты · DOCX',
        'meta-tracking': 'Инструкция по отслеживанию через app2 · DOCX',
        'meta-bol':      'Шаблон накладной · billoflading.org',
        'btn-view':      'Просмотр',
        'btn-download':  'Скачать',
        'btn-open':      'Открыть',
        'section-templates': 'Шаблоны сообщений',
        'btn-copy':          'Копировать',
        'btn-copied':        '✓ Скопировано',
    }
};

function applyLang(lang) {
    const dict = T[lang] || T.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });
    const passInput = document.getElementById('pass-input');
    if (passInput) passInput.placeholder = dict['pass-ph'];
    document.getElementById('langBtn').textContent = lang === 'en' ? 'RU' : 'EN';
    localStorage.setItem(LS_LANG, lang);
    renderTemplates(lang);
}
function toggleLang() {
    applyLang(localStorage.getItem(LS_LANG) === 'ru' ? 'en' : 'ru');
}

const TEMPLATES = {
  en: [
    { name: 'Rate Confirmation Follow-up',
      text: "Hi {{BROKER}}, following up on the rate confirmation for load #{{LOAD}}. Could you send the signed RC over when you get a chance? Thanks!" },
    { name: 'POD Request',
      text: "Hi {{BROKER}}, checking in on load #{{LOAD}} — could you send over the POD for our records? Appreciate it." },
    { name: 'Detention Notice',
      text: "Hi {{BROKER}}, our driver has been on-site at {{LOCATION}} since {{TIME}} for load #{{LOAD}}, which puts us past free time. Detention charges will apply per the rate confirmation. Please advise." },
    { name: 'Payment Follow-up',
      text: "Hi {{BROKER}}, following up on invoice #{{INVOICE}} for load #{{LOAD}}, due {{DATE}}. Could you confirm payment status? Thanks." },
    { name: 'Appointment Confirmation',
      text: "Hi {{BROKER}}, confirming our driver's appointment for load #{{LOAD}} at {{LOCATION}} on {{DATE}} at {{TIME}}. Let us know if anything changes." },
    { name: 'Check Call / Status Update',
      text: "Hi {{BROKER}}, quick update on load #{{LOAD}} — currently at {{LOCATION}}, ETA {{TIME}} to {{DESTINATION}}." },
  ],
  ru: [
    { name: 'Подтверждение ставки',
      text: "Привет, {{BROKER}}, уточняю по подтверждению ставки для груза #{{LOAD}}. Можете прислать подписанный RC при возможности? Спасибо!" },
    { name: 'Запрос POD',
      text: "Привет, {{BROKER}}, по грузу #{{LOAD}} — можете прислать POD для наших записей? Буду признателен." },
    { name: 'Уведомление о простое',
      text: "Привет, {{BROKER}}, наш водитель находится на объекте {{LOCATION}} с {{TIME}} по грузу #{{LOAD}}, что превышает бесплатное время. Будут начислены сборы за простой согласно подтверждению ставки. Прошу сообщить." },
    { name: 'Уточнение оплаты',
      text: "Привет, {{BROKER}}, уточняю по счёту #{{INVOICE}} за груз #{{LOAD}}, срок оплаты {{DATE}}. Можете подтвердить статус платежа? Спасибо." },
    { name: 'Подтверждение записи',
      text: "Привет, {{BROKER}}, подтверждаю запись водителя для груза #{{LOAD}} на объекте {{LOCATION}} {{DATE}} в {{TIME}}. Сообщите, если что-то изменится." },
    { name: 'Статус груза',
      text: "Привет, {{BROKER}}, краткое обновление по грузу #{{LOAD}} — сейчас в {{LOCATION}}, прибытие {{TIME}} в {{DESTINATION}}." },
  ],
};

const PH_LABELS = {
  en: { BROKER: 'Broker Name', LOAD: 'Load #', LOCATION: 'Location', TIME: 'Time', DATE: 'Date', INVOICE: 'Invoice #', DESTINATION: 'Destination' },
  ru: { BROKER: 'Брокер', LOAD: '№ груза', LOCATION: 'Место', TIME: 'Время', DATE: 'Дата', INVOICE: '№ счёта', DESTINATION: 'Назначение' },
};

function renderTemplates(lang) {
  lang = lang || localStorage.getItem(LS_LANG) || 'en';
  const tpls = TEMPLATES[lang] || TEMPLATES.en;
  const labels = PH_LABELS[lang] || PH_LABELS.en;
  const list = document.getElementById('tmplList');
  list.innerHTML = tpls.map(tpl => {
    const body = tpl.text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      const label = labels[key] || key;
      return `<span class="ph" contenteditable="true" onclick="selectPh(this)" onfocus="selectPh(this)">[${label}]</span>`;
    });
    return `
      <div class="tmpl-card">
        <div class="tmpl-head">
          <div class="tmpl-badge">✉</div>
          <div class="tmpl-name">${tpl.name}</div>
          <button class="btn btn-copy" onclick="copyTemplate(this)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            <span data-i18n="btn-copy">Copy</span>
          </button>
        </div>
        <div class="tmpl-body">${body}</div>
      </div>`;
  }).join('');
}

function selectPh(span) {
  const range = document.createRange();
  range.selectNodeContents(span);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

function copyTemplate(btn) {
  const body = btn.closest('.tmpl-card').querySelector('.tmpl-body');
  const text = body.innerText;
  const span = btn.querySelector('span');
  const orig = span.textContent;
  const lang = localStorage.getItem(LS_LANG) || 'en';
  const okText = T[lang]['btn-copied'];
  const reset = () => { span.textContent = orig; btn.classList.remove('ok'); };
  const ok = () => { span.textContent = okText; btn.classList.add('ok'); setTimeout(reset, 1400); };
  navigator.clipboard.writeText(text).then(ok).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); ok(); } catch (e) {}
    document.body.removeChild(ta);
  });
}

function checkPass() {
    const pass   = document.getElementById('pass-input').value;
    const secret = "JIMMY";
    if (pass === secret) {
        document.getElementById('auth-screen').style.display = 'none';
        const mc = document.getElementById('main-content');
        mc.style.display = 'block';
        mc.classList.add('revealed');
        localStorage.setItem('isAuthorized', 'true');
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}

document.getElementById('pass-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') checkPass();
});

(function() {
    const initLang = localStorage.getItem(LS_LANG) || 'en';
    applyTheme(localStorage.getItem(LS_THEME) || 'dark');
    applyLang(initLang);
    if (localStorage.getItem('isAuthorized') === 'true') {
        document.getElementById('auth-screen').style.display = 'none';
        const mc = document.getElementById('main-content');
        mc.style.display = 'block';
        mc.classList.add('revealed');
    }
})();
