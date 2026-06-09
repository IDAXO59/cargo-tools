const DATA = [
    {rank:1, name:'Globaltranz / IMPACT DIVERSITY / WORLDWIDE EXPRESS', reps:[
            {name:'Dallas McFarland',email:'dmcfarland@shipblx.com'},
            {name:'Brianna Stokes',email:'bstokes@shipblx.com'},
            {name:'Kyle Mann',email:'KMann@shipblx.com'},
            {name:'Grace Diaz',email:'gdiaz@shipblx.com'},
            {name:'David Wilson',email:'DWilson@shipblx.com'},
            {name:'Austin Weidenhamer',email:'aweidenhamer@shipblx.com'},
            {name:'Logan Wedo',email:'lwedo@shipblx.com'},
            {name:'Adel Elessais',email:'aelessais@shipblx.com'},
            {name:'Miranda Kies',email:'mkies@shipblx.com'},
            {name:'Antonette Mana',email:'amanaay@shipblx.com'},
        ], note:'Топ один брокер за последние пол года. Работаем крайне аккуратно и стараемся предоставить свой лучший сервис. Не канселим груз без веской причины! Всегда пытаемся найти рекавери, даже если уходим в минус.'},

    {rank:2, name:'NTG / Nolan Transportation Group', reps:[
            {name:'Jonathan Watola',email:'jonathan.watola@ntgfreight.com'},
            {name:'Team Watola',email:'TeamWatola@ntgfreight.com'},
        ], note:'Когда бидуем – обязательно с письмом в догонку прикрепляем Ватолу и его команду. Рекомендую сразу писать им в G-chat.'},

    {rank:3, name:'AM TRANS EXPEDITE, INC', reps:[
            {name:'Evan Pencek',email:'epencek@amtransexpedite.com'},
            {name:'Will Easley',email:'weasley@amtransexpedite.com'},
            {name:'Caleb Anderson',email:'andersonc@amtransexpedite.com'},
            {name:'Cynthia Avila',email:'cavila@amtransexpedite.com'},
            {name:'Kevin Williams',email:'kevin.williams@amtransexpedite.com'},
            {name:'Kimbert Frye',email:'kfrye@amtransexpedite.com'},
            {name:'Ethan Shuler',email:'eshuler@amtransexpedite.com'},
        ], note:''},

    {rank:4, name:'S-2International LLC', reps:[
            {name:'Jolee Gresham',email:'jolee@s-2international.com'},
            {name:'Monica Green',email:'monica@s-2international.com'},
            {name:'Rachel Dereu',email:'rachel@s-2international.com'},
            {name:'Hank Whitaker',email:'hank@s-2international.com'},
            {name:'Robert Solis Jr',email:'robert@s-2international.com'},
            {name:'Jill Stubbs',email:'jill@s-2international.com'},
            {name:'Brittany Lawrence',email:'blawrence@s-2international.com'},
        ], note:''},

    {rank:5, name:'EXPRESS FAMILY OF COMPANIES', reps:[
            {name:'Benjamin Dee',email:'ben.dee@expressfamily.com'},
            {name:'Mark Stack',email:'Mark.Stack@expressfamily.com'},
            {name:'Shay Mitchell',email:'Shay.Mitchell@expressfamily.com'},
            {name:'Angel Alvey',email:'ada@expressfamily.com'},
            {name:'Dino Krdzalic',email:'Dino.Krdzalic@expressfamily.com'},
            {name:'John Yazembiak',email:'jpy@expressfamily.com'},
            {name:'Dennis Thompson',email:'Dennis.Thompson@expressfamily.com'},
            {name:'Dejan Ilmic',email:'Dejan.Ilmic@expressfamily.com'},
            {name:'Rashad Robinson',email:'Rashad.Robinson@expressfamily.com'},
        ], note:'Работаем крайне аккуратно и стараемся предоставить свой лучший сервис. Не канселим груз без веской причины! Всегда пытаемся найти рекавери, даже если уходим в минус.'},

    {rank:6, name:'BOUNCE LOGISTICS, LLC', reps:[
            {name:'Chad VanLue',email:'kendaleth.vanlue@bouncelogistics.com'},
            {name:'David Lora Gamarra',email:'davidricardo.loragamarra@bouncelogistics.com'},
            {name:'Paula Virguez Galindo',email:'paula.virguezgalindo@bouncelogistics.com'},
            {name:'Brayan Acevedo',email:'brayan.acevedo@bouncelogistics.com'},
            {name:'Keith Singleton',email:'keith.singleton@bouncelogistics.com'},
            {name:'Cristian Santana',email:'cristian.santana@bouncelogistics.com'},
            {name:'Ashleigh Markin',email:'ashleigh.markin@bouncelogistics.com'},
            {name:'Troy Tooke',email:'Troy.Tooke@bouncelogistics.com'},
            {name:'Tanya Wilson',email:'Tanya.Wilson@bouncelogistics.com'},
        ], note:'Ставьте им дороже чем обычно! Работаем крайне аккуратно.'},

    {rank:7, name:'Circle Logistics, Inc', reps:[
            {name:'Andrew Keszei',email:'andrew.keszei@circledelivers.com'},
            {name:'Payton Fox',email:'payton.fox@circledelivers.com'},
            {name:'Tom Kracium',email:'tom.kracium@circledelivers.com'},
            {name:'Geordan Stenson',email:'geordan.stenson@circledelivers.com'},
            {name:'Sara Lopez',email:'sara.lopez@circledelivers.com'},
        ], note:'Работаем крайне аккуратно и стараемся предоставить свой лучший сервис.'},

    {rank:8, name:'PINNACLE PRO LOGISTICS LLC', reps:[
            {name:'Evan Charlone',email:'e.charlone@pinnacleprologistics.com'},
            {name:'Brandon Bulanadi',email:'b.bulanadi@pinnacleprologistics.com'},
            {name:'Spencer Cordero',email:'s.cordero@pinnacleprologistics.com'},
            {name:'Jacob Sparks',email:'j.sparks@pinnacleprologistics.com'},
            {name:'Chelsea Porter',email:'chelseap@pinnacleprologistics.com'},
            {name:'Nolan Rader',email:'n.rader@pinnacleprologistics.com'},
            {name:"D'nay Rovo",email:'d.rovo@pinnacleprologistics.com'},
            {name:'Cassandra Hirata',email:'c.hirata@pinnacleprologistics.com'},
            {name:'Austyn Lambrigh',email:'austyn.l@pinnacleprologistics.com'},
            {name:'Alexander Hammers',email:'a.hammers@pinnacleprologistics.com'},
        ], note:''},

    {rank:9, name:'GO TO LOGISTICS INC.', reps:[
            {name:'Matthew Buck',email:'matthew@gotologistics.net'},
            {name:'Tanner Reichardt',email:'tanner@gotologistics.net'},
            {name:'James Cripe',email:'jamescripe@gotologistics.net'},
            {name:'John Fetsch',email:'john@gotologistics.net'},
            {name:'Ossiel Cossyleon',email:'ossiel@gotologistics.net'},
        ], note:''},

    {rank:10, name:'SUNSET TRANSPORTATION, INC.', reps:[
            {name:'Nick Brohammer',email:'nbrohammer@sunsettrans.com'},
            {name:'Madison Crosswhite',email:'mcrosswhite@sunsettrans.com'},
            {name:'Crystal Aquino',email:'caquino@sunsettrans.com'},
            {name:'Ryan Karsznia',email:'rkarsznia@sunsettrans.com'},
            {name:'Scott Bates',email:'sbates@sunsettrans.com'},
            {name:'Hunter Maher',email:'hmaher@sunsettrans.com'},
            {name:'Ian Barnes',email:'ibarnes@sunsettrans.com'},
        ], note:''},

    {rank:11, name:'PRIORITY EXPEDITE', reps:[], note:'Работаем крайне аккуратно! У парней свои грузы – ставьте дороже обычного!'},
    {rank:12, name:'C5 EXPEDITE LLC', reps:[], note:''},
    {rank:13, name:'GSA Transportation, LLC', reps:[], note:''},
    {rank:14, name:'PEI-LAS', reps:[], note:'Работаем крайне аккуратно!'},
    {rank:15, name:'KA PINNACLE PRO LOGISTICS LLC', reps:[], note:''},
    {rank:16, name:'Expedited America – EP America Inc.', reps:[], note:'Есть чат с 18 репами в вацапе – дублируйте опцию, будет больше шансов забрать груз!'},
    {rank:17, name:'ASAP EXPEDITING & LOGISTICS – G & H TRANSPORT', reps:[], note:'Работаем крайне аккуратно!'},
    {rank:18, name:'FREEWAY INTERNATIONAL LOGISTICS', reps:[], note:''},
    {rank:19, name:'ONE8 FREIGHT LLC – CANDOR', reps:[], note:''},
    {rank:20, name:'BURRIS LOGISTICS', reps:[], note:'Работаем крайне аккуратно!'},
    {rank:21, name:'SATURN FREIGHT SYSTEMS', reps:[], note:'Платят детеншн после 1-го часа'},
    {rank:22, name:'TA SERVICES', reps:[], note:''},

    {rank:23, name:'AIT TRUCKLOAD SOLUTIONS INC', reps:[
            {name:'',email:'skimball@aitworldwide.com'},
            {name:'',email:'jdavidson@aitworldwide.com'},
            {name:'',email:'Team3@aitworldwide.com'},
            {name:'',email:'rsorgenfrey@aitworldwide.com'},
            {name:'',email:'sptaylor@aitworldwide.com'},
            {name:'',email:'atsexpedite@aitworldwide.com'},
            {name:'',email:'CarriersalesTL@aitworldwide.com'},
            {name:'',email:'chgonzalez@aitworldwide.com'},
            {name:'',email:'teamstephanie@aitworldwide.com'},
        ], note:'У парней свои грузы – ставьте дороже обычного!'},

    {rank:24, name:'NATIONAL LOGISTICS NETWORK', reps:[
            {name:'',email:'dan@shipnln.com'},
            {name:'',email:'mikaela@shipnln.com'},
            {name:'',email:'brian@shipnln.com'},
            {name:'',email:'holly@shipnln.com'},
            {name:'',email:'tmickel@nlnllc.com'},
            {name:'',email:'dispatch@shipnln.com'},
            {name:'',email:'tracking@shipnln.com'},
        ], note:'Любят нас. Ставьте ДОРОЖЕ!'},

    {rank:25, name:'VIRNICH CORPORATION', reps:[], note:''},
    {rank:26, name:'PAR LOGISTICS', reps:[], note:'Работаем крайне аккуратно!'},
    {rank:27, name:'RAVEN CARGO INC', reps:[], note:''},
    {rank:28, name:'ASSET HOUND LLC', reps:[], note:''},
    {rank:29, name:'ON TIME INTERNATIONAL INC.', reps:[], note:'У парней свои грузы – ставьте дороже обычного!'},
    {rank:30, name:'AXIS WORLDWIDE', reps:[], note:'У парней свои грузы – ставьте дороже обычного!'},

    // rank 31 intentionally absent
    {rank:32, name:'GRAND AIRE INC.', reps:[
            {name:'Erin Winseman',email:'eduke@grandaire.com'},
            {name:'Laura Hageman',email:'lhageman@grandaire.com'},
        ], note:''},

    {rank:33, name:"ANDREY'S DELIVERY EXPRESS LLC", reps:[], note:'Дорогие грузы на Ларджи'},
    {rank:34, name:'EF CORPORATION – NEW AGE', reps:[], note:''},
    {rank:35, name:'FREIGHT FLEX', reps:[], note:''},
    {rank:36, name:'GROUND FREIGHT SOLUTIONS LLC', reps:[], note:'Никогда не пиздите за команду!'},
    {rank:37, name:'STRAIGHT SHOT EXPRESS', reps:[], note:'У парней свои грузы – ставьте дороже обычного!'},

    {rank:38, name:'440 TRANSIT, LLC', reps:[
            {name:'Shannon Cantu',email:'scantu@440transit.com'},
        ], note:'У парней свои грузы – ставьте дороже обычного!'},

    {rank:39, name:'JUNG EXPRESS', reps:[], note:'Работаем крайне аккуратно!'},
    {rank:40, name:'YELLOW DIAMOND', reps:[], note:'Много грузов на TWIC – ставьте дороже!'},

    {rank:null, name:'KCH TRANSPORTATION INC', reps:[], note:''},
    {rank:null, name:'MILLHOUSE LOGISTICS INC', reps:[], note:'Нужно вернуть!'},
    {rank:null, name:'FASTMORE LOGISTICS', reps:[], note:'Нужно вернуть!'},
    {rank:null, name:'SUNTECK TRANSPORT', reps:[], note:'?????'},
    {rank:null, name:'META LOGISTIC SOLUTIONS INC', reps:[], note:'Постят очень много грузов, но нам не отдают'},
    {rank:null, name:'SAFEWAY TRUCK LINES', reps:[], note:'Постят очень много грузов, но нам не отдают'},
    {rank:null, name:'LOAD SMART', reps:[], note:'Постят очень много грузов, но нам не отдают'},
    {rank:null, name:'TRY HOURS', reps:[], note:'Постят очень много грузов, но нам не отдают'},
];

const I18N = {
    en: {
        title:'Broker Directory', subtitle:'URSA Express · Internal',
        searchPh:'Search broker, rep, email…',
        tools:'Tools', cargo:'Cargo', rchief:'Order Converter',
        sectionRanked:'Ranked Brokers', sectionWatch:'Watch List',
        catRecover:'To Recover', catRecoverDesc:'Get them back',
        catProspect:'Prospects', catProspectDesc:'Post many loads but don’t give to us',
        catOther:'Other',
        repsHead:'Reps & Contacts',
        empty:'Nothing found',
        copied:'✓ Copied',
        helpTitle:'Broker Directory',
        helpDesc:'Internal directory of brokers, reps, and contacts – searchable, with one-tap email copy.',
        helpHow:'How to use',
        helpStep1:'Search by anything – broker name, rep name, or email. Results filter as you type.',
        helpStep2:'Tap any email button to copy it to your clipboard instantly.',
        helpStep3:'Color-coded notes: green = charge more, amber = work carefully, blue = recover, purple = unresponsive prospect.',
        helpStep4:'Ranked Brokers (#1–40) are ordered by volume and profit. Watch List groups brokers we want back or want to crack.',
    },
    ru: {
        title:'Каталог брокеров', subtitle:'URSA Express · Внутренний',
        searchPh:'Поиск брокера, репа, email…',
        tools:'Tools', cargo:'Cargo', rchief:'Order Converter',
        sectionRanked:'Рейтинг брокеров', sectionWatch:'На контроле',
        catRecover:'Вернуть', catRecoverDesc:'Нужно вернуть в работу',
        catProspect:'Перспективные', catProspectDesc:'Постят много грузов, но нам не отдают',
        catOther:'Прочие',
        repsHead:'Репы и контакты',
        empty:'Ничего не найдено',
        copied:'✓ Скопировано',
        helpTitle:'Каталог брокеров',
        helpDesc:'Внутренний справочник брокеров, репов и контактов – с поиском и копированием email в один клик.',
        helpHow:'Как пользоваться',
        helpStep1:'Ищи по чему угодно – название брокера, имя репа, email. Фильтр работает по мере ввода.',
        helpStep2:'Тапни на любой email – он мгновенно копируется в буфер обмена.',
        helpStep3:'Цветные пометки: зелёный = ставить дороже, жёлтый = работать аккуратно, синий = вернуть, фиолетовый = постят, но не отдают.',
        helpStep4:'Рейтинг брокеров (#1–40) сортируется по объёму и профиту. На контроле сгруппированы брокеры, которых хотим вернуть или пробить.',
    }
};

const LS_THEME = 'brokers_theme';
const LS_LANG  = 'brokers_lang';
let lang = (localStorage.getItem(LS_LANG) === 'ru') ? 'ru' : 'en';

function t(k) { return I18N[lang][k] || k; }

function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function noteStyle(note) {
    if (!note) return null;
    const n = note.toLowerCase();
    if (n.includes('нужно вернуть')) return 'recover';
    if (n.includes('не отдают')) return 'prospect';
    if (n.includes('дороже')) return 'charge';
    if (n.includes('аккуратно') || n.includes('детеншн')) return 'careful';
    return 'default';
}

function watchCategory(note) {
    if (!note) return 'other';
    const n = note.toLowerCase();
    if (n.includes('нужно вернуть')) return 'recover';
    if (n.includes('не отдают')) return 'prospect';
    return 'other';
}

function card(b, hideNote) {
    let rk, rc;
    if (b.rank == null) { rk = '–'; rc = 'r-none'; }
    else if (b.rank <= 3) { rk = '#'+b.rank; rc = 'r-gold'; }
    else if (b.rank <= 10) { rk = '#'+b.rank; rc = 'r-silver'; }
    else { rk = '#'+b.rank; rc = 'r-plain'; }

    let noteHtml = '';
    if (!hideNote) {
        const ns = noteStyle(b.note);
        if (b.note && ns) noteHtml = `<div class="card-note n-${ns}">${esc(b.note)}</div>`;
    }

    let repsHtml = '';
    if (b.reps.length) {
        const rows = b.reps.map(r => {
            const nm = r.name
                ? `<span class="rep-nm">${esc(r.name)}</span>`
                : `<span class="rep-nm empty">–</span>`;
            const em = r.email
                ? `<button class="rep-email" onclick="cp(this,'${r.email.replace(/'/g,"\\'")}')">${esc(r.email)}</button>`
                : '';
            return `<div class="rep-row">${nm}${em}</div>`;
        }).join('');
        repsHtml = `<div class="card-reps"><div class="reps-head">${esc(t('repsHead'))}</div>${rows}</div>`;
    }

    return `<div class="broker-card"><div class="card-head"><div class="rank ${rc}">${rk}</div><div class="card-name">${esc(b.name)}</div></div>${noteHtml}${repsHtml}</div>`;
}

function render(q, opts) {
    q = (q||'').toLowerCase().trim();
    const all = DATA.filter(b => {
        if (!q) return true;
        if (b.name.toLowerCase().includes(q)) return true;
        if (b.note && b.note.toLowerCase().includes(q)) return true;
        return b.reps.some(r =>
            (r.name && r.name.toLowerCase().includes(q)) ||
            (r.email && r.email.toLowerCase().includes(q))
        );
    });

    const ranked = all.filter(b => b.rank != null);
    const watch  = all.filter(b => b.rank == null);
    const watchGroups = { recover: [], prospect: [], other: [] };
    watch.forEach(b => watchGroups[watchCategory(b.note)].push(b));

    const list = document.getElementById('list');
    document.getElementById('count').textContent = all.length + ' / ' + DATA.length;

    if (!all.length) {
        list.innerHTML = `<div class="empty">${esc(t('empty'))}</div>`;
        return;
    }

    let html = '';
    if (ranked.length) {
        html += `<div class="grid-full"><div class="section-label">${esc(t('sectionRanked'))}</div></div>`;
        ranked.forEach(b => { html += card(b, false); });
    }
    if (watch.length) {
        html += `<div class="grid-full"><div class="section-label">${esc(t('sectionWatch'))}</div></div>`;
        const order = ['recover','prospect','other'];
        order.forEach(cat => {
            const items = watchGroups[cat];
            if (!items.length) return;
            if (cat === 'recover') {
                html += `<div class="subcat sc-recover"><span class="sc-name">${esc(t('catRecover'))}</span><span class="sc-count">${items.length}</span><span class="sc-desc">– ${esc(t('catRecoverDesc'))}</span></div>`;
            } else if (cat === 'prospect') {
                html += `<div class="subcat sc-prospect"><span class="sc-name">${esc(t('catProspect'))}</span><span class="sc-count">${items.length}</span><span class="sc-desc">– ${esc(t('catProspectDesc'))}</span></div>`;
            } else {
                html += `<div class="subcat sc-other"><span class="sc-name">${esc(t('catOther'))}</span><span class="sc-count">${items.length}</span></div>`;
            }
            const hideNote = (cat === 'recover' || cat === 'prospect');
            items.forEach(b => { html += card(b, hideNote); });
        });
    }
    list.innerHTML = html;

    if (opts && opts.scroll) {
        const wrap = document.querySelector('.search-wrap');
        if (wrap) {
            const top = wrap.getBoundingClientRect().top + window.scrollY - 16;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }
}

function cp(btn, email) {
    const orig = btn.textContent;
    const okText = t('copied');
    const reset = () => {
        btn.textContent = orig;
        btn.classList.remove('ok');
    };
    const ok = () => {
        btn.textContent = okText;
        btn.classList.add('ok');
        setTimeout(reset, 1400);
    };
    navigator.clipboard.writeText(email).then(ok).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = email; ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); ok(); } catch(e) {}
        document.body.removeChild(ta);
    });
}

function applyLang() {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        el.placeholder = t(el.dataset.i18nPh);
    });
    document.getElementById('lang-toggle').textContent = (lang === 'en') ? 'RU' : 'EN';
    render(document.getElementById('search').value);
}

function openHelp() { document.getElementById('help-overlay').classList.add('open'); }
function closeHelp() { document.getElementById('help-overlay').classList.remove('open'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeHelp(); });

function toggleLang() {
    lang = (lang === 'en') ? 'ru' : 'en';
    try { localStorage.setItem(LS_LANG, lang); } catch(e) {}
    applyLang();
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(LS_THEME, theme); } catch(e) {}
}

function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(cur === 'dark' ? 'light' : 'dark');
}

(function init() {
    const savedTheme = localStorage.getItem(LS_THEME) || 'dark';
    applyTheme(savedTheme);
    applyLang();
    document.getElementById('search').addEventListener('input', e => render(e.target.value, { scroll: true }));
})();
// Функция, которая проверяет пароль
function checkPass() {
    const pass = document.getElementById('pass-input').value;
    const secret = "JIMMY"; // Твой пароль

    if (pass === secret) {
        // Если пароль верный: скрываем заставку и показываем сайт
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        // Запоминаем, что вход выполнен (чтобы не вводить при обновлении страницы)
        localStorage.setItem('isAuthorized', 'true');
    } else {
        // Если неверный: показываем текст ошибки
        document.getElementById('error-msg').style.display = 'block';
    }
}

// Позволяет нажимать Enter вместо клика по кнопке
document.getElementById('pass-input')?.addEventListener('keypress', e => {
    if (e.key === 'Enter') checkPass();
});

// Дополнение к стандартной загрузке (init)
(function authInit() {
    // Проверяем, входил ли пользователь ранее
    if (localStorage.getItem('isAuthorized') === 'true') {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }
})();