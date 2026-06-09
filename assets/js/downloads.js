const LS_THEME = 'ursa-theme';
const LS_LANG = 'ursa-lang';
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(LS_THEME, theme);
}
function toggleTheme() {
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}
function applyLang(lang) {
    document.getElementById('langBtn').textContent = lang === 'en' ? 'RU' : 'EN';
    localStorage.setItem(LS_LANG, lang);
}
function toggleLang() {
    applyLang(localStorage.getItem(LS_LANG) === 'ru' ? 'en' : 'ru');
}
(function() {
    applyTheme(localStorage.getItem(LS_THEME) || 'dark');
    applyLang(localStorage.getItem(LS_LANG) || 'en');
})();