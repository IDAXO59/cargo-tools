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
}
function toggleLang() {
    applyLang(localStorage.getItem(LS_LANG) === 'ru' ? 'en' : 'ru');
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
    applyTheme(localStorage.getItem(LS_THEME) || 'dark');
    applyLang(localStorage.getItem(LS_LANG)   || 'en');
    if (localStorage.getItem('isAuthorized') === 'true') {
        document.getElementById('auth-screen').style.display = 'none';
        const mc = document.getElementById('main-content');
        mc.style.display = 'block';
        mc.classList.add('revealed');
    }
})();
