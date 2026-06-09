 /* ── Restore theme & lang before paint (no FOUC) ── */
    (function(){
    var t=localStorage.getItem('theme'); if(t) document.documentElement.setAttribute('data-theme',t);
    var l=localStorage.getItem('lang');  if(l) document.documentElement.setAttribute('data-lang',l);
})();

    /* ── Global: theme toggle ── */
    function toggleTheme(){
    var r=document.documentElement;
    var n=r.getAttribute('data-theme')==='dark'?'light':'dark';
    r.setAttribute('data-theme',n); localStorage.setItem('theme',n);
}

    /* ── i18n ── */
    var STRINGS={
    en:{
    'subtitle':'Extract &amp; parse text from PDF and image files',
    'drop-title':'Drop a file here, or click to upload',
    'drop-hint':'Supports <strong>PDF</strong>, <strong>PNG</strong>, <strong>JPG</strong>, and <strong>WEBP</strong>',
    'broker-label':'Select Broker / Template',
    'btn-parse':'Parse Document',
    'loader-label':'Processing…',
    'ocr-notice':'Using OCR mode — standard text extraction was unreliable for this PDF',
    'parsed-title':'⚡ Structured Output',
    'btn-train':'⚙ Train',
    'output-title':'Extracted Text',
    'btn-copy':'⧇ Copy',
    'btn-clear':'✕ Clear',
    'train-title':'Training Mode',
    'train-hint':'Click any line to tag it as a field',
    'btn-export':'⇓ Export',
    'btn-load':'↑ Load templates.json',
    'pane-label':'Document Lines',
    'tagger-ph':'← Click a line from the document to tag it',
    'label-broker':'Broker Name',
    'label-selected':'Selected line',
    'label-keyword':'Keyword / label',
    'label-value':'Value to capture',
    'label-tag':'Tag as field',
    'label-pattern':'Pattern preview',
    'btn-save':'Save Pattern',
    'templates-label':'Saved Templates',
    'ph-broker':'e.g. Echo Global, CH Robinson',
    'ph-keyword':'e.g. Load #',
    'ph-value':'e.g. S02805737',
    'opt-select':'— select —',
    'opt-pu-time':'Pick up time',
    'opt-pu-loc':'Pick-up location',
    'opt-ref':'PU notes / ref#',
    'opt-poc':'POC',
    'opt-del-time':'Delivery time',
    'opt-del-loc':'Delivery location',
    'opt-del-notes':'Delivery notes',
    'opt-pieces':'Total Pieces',
    'opt-weight':'Total Weight',
    'opt-miles':'Loaded Miles',
    'main-btn':'← Main',
    'ttl-main':'Back to main page',
    'ttl-theme':'Toggle theme',
    'ttl-lang':'Switch language / Переключить язык',
    'ttl-parse':'Parse the loaded document',
    'ttl-copy':'Copy extracted text to clipboard',
    'ttl-clear':'Clear document',
    'ttl-train':'Open training mode',
    'aria-drop':'Upload PDF or image file',
},
    ru:{
    'subtitle':'Извлечение и парсинг текста из PDF и изображений',
    'drop-title':'Перетащите файл или нажмите для выбора',
    'drop-hint':'Поддерживает <strong>PDF</strong>, <strong>PNG</strong>, <strong>JPG</strong> и <strong>WEBP</strong>',
    'broker-label':'Брокер / шаблон',
    'btn-parse':'Парсить',
    'loader-label':'Обработка…',
    'ocr-notice':'Режим OCR — стандартное извлечение текста ненадёжно для этого PDF',
    'parsed-title':'⚡ Структурированный вывод',
    'btn-train':'⚙ Обучение',
    'output-title':'Извлечённый текст',
    'btn-copy':'⧇ Копировать',
    'btn-clear':'✕ Очистить',
    'train-title':'Режим обучения',
    'train-hint':'Нажмите строку, чтобы пометить как поле',
    'btn-export':'⇓ Экспорт',
    'btn-load':'↑ Загрузить templates.json',
    'pane-label':'Строки документа',
    'tagger-ph':'← Нажмите строку для разметки',
    'label-broker':'Имя брокера',
    'label-selected':'Выбранная строка',
    'label-keyword':'Ключевое слово / метка',
    'label-value':'Значение для захвата',
    'label-tag':'Тег поля',
    'label-pattern':'Предпросмотр шаблона',
    'btn-save':'Сохранить шаблон',
    'templates-label':'Сохранённые шаблоны',
    'ph-broker':'напр. Echo Global, CH Robinson',
    'ph-keyword':'напр. Load #',
    'ph-value':'напр. S02805737',
    'opt-select':'— выбрать —',
    'opt-pu-time':'Время погрузки',
    'opt-pu-loc':'Место погрузки',
    'opt-ref':'Ref# / номер загрузки',
    'opt-poc':'Контакт (POC)',
    'opt-del-time':'Время выгрузки',
    'opt-del-loc':'Место выгрузки',
    'opt-del-notes':'Примечания доставки',
    'opt-pieces':'Количество мест',
    'opt-weight':'Общий вес',
    'opt-miles':'Пробег (мили)',
    'main-btn':'← Главная',
    'ttl-main':'На главную страницу',
    'ttl-theme':'Сменить тему',
    'ttl-lang':'Switch language / Переключить язык',
    'ttl-parse':'Парсить загруженный документ',
    'ttl-copy':'Копировать текст в буфер',
    'ttl-clear':'Очистить',
    'ttl-train':'Открыть режим обучения',
    'aria-drop':'Загрузить PDF или изображение',
}
};

    function applyLang(lang){
    var s=STRINGS[lang]||STRINGS.en;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
    var k=el.getAttribute('data-i18n'); if(s[k]!==undefined) el.innerHTML=s[k];
});
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
    var k=el.getAttribute('data-i18n-ph'); if(s[k]!==undefined) el.placeholder=s[k];
});
    document.querySelectorAll('[data-i18n-title]').forEach(function(el){
    var k=el.getAttribute('data-i18n-title'); if(s[k]!==undefined) el.title=s[k];
});
    document.querySelectorAll('[data-i18n-aria]').forEach(function(el){
    var k=el.getAttribute('data-i18n-aria'); if(s[k]!==undefined) el.setAttribute('aria-label',s[k]);
});
    var lb=document.getElementById('langBtn');
    if(lb) lb.textContent=lang==='en'?'RU':'EN';
}

    function toggleLang(){
    var r=document.documentElement;
    var n=(r.getAttribute('data-lang')||'en')==='en'?'ru':'en';
    r.setAttribute('data-lang',n); localStorage.setItem('lang',n); applyLang(n);
}

    document.addEventListener('DOMContentLoaded',function(){
    applyLang(document.documentElement.getAttribute('data-lang')||'en');
});