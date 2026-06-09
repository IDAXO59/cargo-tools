const NAMES = [
    'Evgeny V.', 'Pavel Z.', 'Leon M.', 'Alex M.', 'Kent B.',
    'Andrew A.', 'Mike W.', 'Nate W.', 'Blake W.', 'Nick F.',
    'Jim S.', 'Tim S.', 'Michael K.', 'Jonas M.'
];

let checked = new Array(NAMES.length).fill(true);
let spinning = false;
let lastWinner = -1;

function render() {
    const list = document.getElementById('names-list');
    list.innerHTML = '';
    NAMES.forEach((name, i) => {
        const row = document.createElement('div');
        row.className = 'name-row' + (checked[i] ? '' : ' excluded') + (lastWinner === i ? ' winner-highlight' : '');
        row.onclick = () => toggle(i);
        row.innerHTML = `
      <span class="name-text">${name}</span>
      <label class="cb-wrap" onclick="event.stopPropagation()">
        <input type="checkbox" ${checked[i] ? 'checked' : ''} onchange="toggle(${i})">
        <span class="cb-custom"></span>
      </label>`;
        list.appendChild(row);
    });
    const active = checked.filter(Boolean).length;
    document.getElementById('count-badge').textContent = `(${active}/${NAMES.length})`;
    document.getElementById('toggle-all-btn').textContent = active === NAMES.length ? 'Deselect all' : 'Select all';
}

function toggle(i) {
    checked[i] = !checked[i];
    render();
}

function toggleAll() {
    const active = checked.filter(Boolean).length;
    checked = new Array(NAMES.length).fill(active < NAMES.length);
    render();
}

function spin() {
    const pool = NAMES.map((_, i) => i).filter(i => checked[i]);
    if (pool.length === 0) {
        const label = document.querySelector('.result-label');
        const orig = label.textContent;
        label.style.color = '#ef4444';
        label.textContent = 'Select at least one participant';
        setTimeout(() => { label.style.color = ''; label.textContent = orig; }, 2000);
        return;
    }
    if (spinning) return;
    spinning = true;

    const btn = document.getElementById('spin-btn');
    const nameEl = document.getElementById('result-name');
    const box = document.getElementById('result-box');

    btn.disabled = true;
    box.classList.remove('winner');
    lastWinner = -1;
    render();
    nameEl.classList.add('rolling');

    let ticks = 0;
    const totalTicks = 24 + Math.floor(Math.random() * 12);
    let interval = 60;
    let lastPick = -1;

    function tick() {
        lastPick = pool[Math.floor(Math.random() * pool.length)];
        nameEl.textContent = NAMES[lastPick];
        ticks++;
        if (ticks >= totalTicks) {
            nameEl.classList.remove('rolling');
            box.classList.add('winner');
            lastWinner = lastPick;
            spinning = false;
            btn.disabled = false;
            btn.textContent = '🎲 Spin again';
            render();
            return;
        }
        interval = Math.min(interval * 1.06, 320);
        setTimeout(tick, interval);
    }
    tick();
}

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

applyTheme(localStorage.getItem(LS_THEME) || 'dark');
applyLang(localStorage.getItem(LS_LANG) || 'en');
render();