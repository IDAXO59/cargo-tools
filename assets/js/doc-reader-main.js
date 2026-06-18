
/* ══════════════════════════════════════════════
   pdf.js
══════════════════════════════════════════════ */
import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';

const TESSERACT_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.1.0/tesseract.min.js';
const STORAGE_KEY   = 'rc-templates';

/* ══════════════════════════════════════════════
   DOM refs
══════════════════════════════════════════════ */
const dropZone       = document.getElementById('dropZone');
const fileInput      = document.getElementById('fileInput');
const loader         = document.getElementById('loader');
const loaderLabel    = document.getElementById('loaderLabel');
const loaderProgress = document.getElementById('loaderProgress');
const outputSection  = document.getElementById('outputSection');
const outputBox      = document.getElementById('outputBox');
const errorBanner    = document.getElementById('errorBanner');
const fileChip       = document.getElementById('fileChip');
const chipIcon       = document.getElementById('chipIcon');
const chipName       = document.getElementById('chipName');
const chipSize       = document.getElementById('chipSize');
const btnCopy        = document.getElementById('btnCopy');
const btnClear       = document.getElementById('btnClear');
const parsedCard     = document.getElementById('parsedCard');
const parsedFields   = document.getElementById('parsedFields');
const btnTrain       = document.getElementById('btnTrain');
const trainOverlay   = document.getElementById('trainOverlay');
const trainCloseBtn  = document.getElementById('trainCloseBtn');
const trainLinesList  = document.getElementById('trainLinesList');
const trainMappingList = document.getElementById('trainMappingList');
const btnClearMapping  = document.getElementById('btnClearMapping');
const btnSaveTemplate  = document.getElementById('btnSaveTemplate');
const templatesList    = document.getElementById('templatesList');
const templatesEmpty   = document.getElementById('templatesEmpty');
const brokerSelector    = document.getElementById('brokerSelector');
const brokerSelect      = document.getElementById('brokerSelect');
const btnParse          = document.getElementById('btnParse');
const parsedBrokerBadge = document.getElementById('parsedBrokerBadge');
const btnExportTemplates = document.getElementById('btnExportTemplates');
const btnCopyParsed     = document.getElementById('btnCopyParsed');
const btnLoadDefaults   = document.getElementById('btnLoadDefaults');

/* ══════════════════════════════════════════════
   State
══════════════════════════════════════════════ */
let lastExtractedText  = '';
let tesseractLoaded    = false;
let lastMatchedBroker  = null;
let trainLines         = [];   /* [{ text, page, box }] loaded into training panel */
let trainPages         = [];   /* [{ src, width, height }] rendered page images */
let trainViewMode      = 'list'; /* 'list' | 'doc' */
let trainDocPage       = 0;
let activeDocPopover   = null;
let lastParsedResults  = null;
let trainMappings      = {};   /* { lineIdx: {field, text} } */
let activeLineItem     = null; /* line div currently showing field selector */

/* ══════════════════════════════════════════════
   Upload & file handling
══════════════════════════════════════════════ */
dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', e => {
    e.preventDefault(); dropZone.classList.remove('drag-over');
    const f = e.dataTransfer.files[0]; if (f) processFile(f);
});
fileInput.addEventListener('change', () => { if (fileInput.files[0]) processFile(fileInput.files[0]); });
dropZone.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
});

/* ══════════════════════════════════════════════
   UI helpers
══════════════════════════════════════════════ */

/* ── Copy structured output ── */
btnCopyParsed.addEventListener('click', async () => {
    if (!lastParsedResults) return;
    try {
        await navigator.clipboard.writeText(buildCopyText(lastParsedResults));
        btnCopyParsed.textContent = '✓ Copied!';
        btnCopyParsed.classList.add('copied');
        setTimeout(() => { btnCopyParsed.innerHTML = '&#10697; Copy'; btnCopyParsed.classList.remove('copied'); }, 1800);
    } catch {
        btnCopyParsed.textContent = 'Select manually';
        setTimeout(() => { btnCopyParsed.innerHTML = '&#10697; Copy'; }, 2000);
    }
});

function showLoader(label) {
    hideError(); hideParsed(); hideOutput(); hideBrokerSelector();
    loader.classList.add('visible');
    loaderLabel.textContent = label || 'Processing…';
    loaderProgress.textContent = '';
}
function hideLoader() { loader.classList.remove('visible'); }

function showError(msg) {
    hideLoader();
    errorBanner.textContent = msg;
    errorBanner.classList.add('visible');
}
function hideError() { errorBanner.classList.remove('visible'); }

function hideParsed() { parsedCard.classList.remove('visible'); }
function hideOutput() { outputSection.classList.remove('visible'); }
function hideBrokerSelector() { brokerSelector.classList.remove('visible'); }

function showFileChip(file) {
    chipName.textContent = file.name;
    chipSize.textContent = formatBytes(file.size);
    chipIcon.textContent = file.type === 'application/pdf' ? '📄' : '🖼️';
    fileChip.classList.add('visible');
}

function formatBytes(b) {
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
    return (b / 1048576).toFixed(1) + ' MB';
}

/* ══════════════════════════════════════════════
   Dispatch
══════════════════════════════════════════════ */
const SUPPORTED_IMG = ['image/png', 'image/jpeg', 'image/webp'];

function processFile(file) {
    hideError(); fileInput.value = '';
    showFileChip(file);
    if (file.type === 'application/pdf') {
        processPDF(file);
    } else if (SUPPORTED_IMG.includes(file.type)) {
        processImage(file);
    } else {
        showError('Unsupported file: "' + file.name + '". Upload a PDF, PNG, JPG, or WEBP.');
        fileChip.classList.remove('visible');
    }
}

/* ══════════════════════════════════════════════
   PDF extraction
══════════════════════════════════════════════ */
async function processPDF(file) {
    showLoader('Reading PDF…');
    document.getElementById('ocrNotice').classList.remove('visible');
    try {
        const buf = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
        const total = pdf.numPages;

        /* ── Pass 1: standard text extraction ── */
        let allText = '';
        const pages = [];
        for (let i = 1; i <= total; i++) {
            loaderLabel.textContent = 'Extracting page ' + i + ' of ' + total + '…';
            loaderProgress.textContent = Math.round((i / total) * 100) + '%';
            const page = await pdf.getPage(i);
            pages.push(page);
            const content = await page.getTextContent();
            const pt = buildPageText(content);
            if (allText && pt.trim()) allText += '\n\n─── Page ' + i + ' ───\n\n';
            allText += pt;
        }

        /* ── Quality check: flag garbled output ── */
        if (!allText.trim() || isGarbled(allText)) {
            loaderLabel.textContent = 'Text looks garbled — switching to OCR…';
            loaderProgress.textContent = '';
            const ocrText = await pdfOcrFallback(pdf, pages, total);
            document.getElementById('ocrNotice').classList.add('visible');
            finalizeExtractedText(ocrText);
            return;
        }

        finalizeExtractedText(allText);
    } catch (err) {
        showError('Failed to read PDF: ' + (err.message || err));
    }
}

/* Returns true when >20% of printable characters are non-ASCII or replacement chars */
function isGarbled(text) {
    const printable = text.replace(/\s/g, '');
    if (!printable.length) return true;
    let badCount = 0;
    for (let i = 0; i < printable.length; i++) {
        const cp = printable.charCodeAt(i);
        /* non-ASCII printable, replacement char (U+FFFD), or private-use area */
        if (cp > 127 || cp === 0xFFFD || (cp >= 0xE000 && cp <= 0xF8FF)) badCount++;
    }
    return (badCount / printable.length) > 0.20;
}

/* Render each page to canvas → Tesseract OCR */
async function pdfOcrFallback(pdf, pages, total) {
    await loadTesseract();
    const worker = await Tesseract.createWorker('eng', 1, {
        logger: m => {
            if (m.status === 'recognizing text')
                loaderProgress.textContent = Math.round(m.progress * 100) + '%';
        }
    });

    const offscreen = document.createElement('canvas');
    let allText = '';

    for (let i = 0; i < pages.length; i++) {
        loaderLabel.textContent = 'OCR page ' + (i + 1) + ' of ' + total + '…';
        loaderProgress.textContent = '';
        const page = pages[i];
        const viewport = page.getViewport({ scale: 2.0 }); /* 2× for better OCR accuracy */
        offscreen.width  = viewport.width;
        offscreen.height = viewport.height;
        const ctx = offscreen.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, offscreen.width, offscreen.height);
        await page.render({ canvasContext: ctx, viewport }).promise;

        const { data } = await worker.recognize(offscreen);
        const pt = data.text || '';
        if (allText && pt.trim()) allText += '\n\n─── Page ' + (i + 1) + ' ───\n\n';
        allText += pt;
    }

    await worker.terminate();
    offscreen.remove();
    return allText;
}

function buildPageText(content) {
    if (!content.items.length) return '';
    const THRESH = 5;
    const sorted = [...content.items].sort((a, b) => {
        const dy = b.transform[5] - a.transform[5];
        if (Math.abs(dy) > THRESH) return dy;
        return a.transform[4] - b.transform[4];
    });
    const lines = [];
    let cur = [], lastY = null;
    for (const item of sorted) {
        const y = Math.round(item.transform[5]);
        if (lastY === null || Math.abs(y - lastY) > THRESH) {
            if (cur.length) lines.push(cur);
            cur = [item]; lastY = y;
        } else { cur.push(item); }
    }
    if (cur.length) lines.push(cur);
    return lines
        .map(ln => ln.map(it => it.str.trimEnd()).join(ln.length > 2 ? '  ' : ' '))
        .filter(l => l.trim())
        .join('\n');
}

/* ══════════════════════════════════════════════
   Image OCR
══════════════════════════════════════════════ */
function loadTesseract() {
    return new Promise((res, rej) => {
        if (tesseractLoaded) { res(); return; }
        const s = document.createElement('script');
        s.src = TESSERACT_CDN;
        s.onload = () => { tesseractLoaded = true; res(); };
        s.onerror = () => rej(new Error('Failed to load Tesseract.js'));
        document.head.appendChild(s);
    });
}

async function processImage(file) {
    showLoader('Loading OCR engine…');
    try {
        await loadTesseract();
        loaderLabel.textContent = 'Running OCR…';
        loaderProgress.textContent = '';
        const worker = await Tesseract.createWorker('eng', 1, {
            logger: m => {
                if (m.status === 'recognizing text')
                    loaderProgress.textContent = Math.round(m.progress * 100) + '%';
            }
        });
        const { data } = await worker.recognize(file);
        await worker.terminate();
        if (!data.text || !data.text.trim()) {
            showError('No text detected. Make sure the image is clear and contains readable text.');
            return;
        }
        finalizeExtractedText(data.text);
    } catch (err) {
        showError('OCR failed: ' + (err.message || err));
    }
}

/* ══════════════════════════════════════════════
   Finalize extraction: show text + broker selector
══════════════════════════════════════════════ */
function finalizeExtractedText(text) {
    hideLoader();
    lastExtractedText = text;
    outputBox.textContent = text.trim();
    outputSection.classList.add('visible');
    populateBrokerSelect();
    brokerSelector.classList.add('visible');
}

/* ══════════════════════════════════════════════
   PARSING ENGINE
══════════════════════════════════════════════ */
const FIELD_LABELS = {
    PickupTime:       'Pick up time',
    PickupLocation:   'Pick-up location',
    Reference:        'PU notes/ref#',
    POC:              'POC',
    DeliveryTime:     'Delivery time',
    DeliveryLocation: 'Delivery location',
    DeliveryNotes:    'Delivery notes',
    Pieces:           'Total Pieces',
    Weight:           'Total Weight',
    Miles:            'Loaded Miles',
};
const FIELD_NAMES = Object.keys(FIELD_LABELS);

const FIELD_COLORS = {
  PickupTime:       '#38bdf8',
  PickupLocation:   '#34d399',
  Reference:        '#a78bfa',
  POC:              '#fb923c',
  DeliveryTime:     '#f472b6',
  DeliveryLocation: '#4ade80',
  DeliveryNotes:    '#facc15',
  Pieces:           '#60a5fa',
  Weight:           '#e879f9',
  Miles:            '#f87171',
};
const FIELD_SHORT = {
  PickupTime:       'PU Time',
  PickupLocation:   'PU Loc',
  Reference:        'Ref#',
  POC:              'POC',
  DeliveryTime:     'DEL Time',
  DeliveryLocation: 'DEL Loc',
  DeliveryNotes:    'DEL Notes',
  Pieces:           'Pieces',
  Weight:           'Weight',
  Miles:            'Miles',
};

/* Template used for rendering + copy — groups define separator positions */
const PARSED_TEMPLATE = [
    [
        { field: 'PickupTime',     label: 'Pick up time'     },
        { field: 'PickupLocation', label: 'Pick-up location' },
        { field: 'Reference',      label: 'PU notes/ref#'    },
        { field: 'POC',            label: 'POC'              },
    ],
    [
        { field: 'DeliveryTime',     label: 'Delivery time'     },
        { field: 'DeliveryLocation', label: 'Delivery location' },
        { field: 'DeliveryNotes',    label: 'Delivery notes'    },
    ],
    [
        { field: 'Pieces', label: 'Total Pieces' },
        { field: 'Weight', label: 'Total Weight' },
    ],
    [
        { field: 'Miles', label: 'Loaded Miles' },
    ],
];

/* Default regex sets — each is [regex, captureGroup] */
const DATE_RE = [
    /\b(\d{1,2}\/\d{1,2}\/\d{2,4}(?:\s+\d{1,2}:\d{2}(?:\s*[AP]M)?)?)\b/gi,
    /\b(\d{1,2}-\d{1,2}-\d{4}(?:\s+\d{1,2}:\d{2}(?:\s*[AP]M)?)?)\b/gi,
    /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\s+\d{1,2}:\d{2}(?:\s*[AP]M)?)\b/gi,
];
const CITY_ST_RE = /([A-Z][a-zA-Z .]+(?:,\s*[A-Z]{2})\s*\d{5}(?:-\d{4})?)/g;
const DEFAULT_PATTERNS = {
    PickupTime: [
        [/(?:pick[\s-]?up|pu\b|shipper|origin|ready[\s-]?(?:date|time)?|loading)[^\n]{0,50}(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}(?:[^\n]{0,12}\d{1,2}:\d{2}(?:\s*[AP]M)?)?)/gi, 1],
        [/\b(\d{1,2}\/\d{1,2}\/\d{2,4}(?:\s+\d{1,2}:\d{2}(?:\s*[AP]M)?)?)\b/gi, 1],
        [/\b(\d{1,2}-\d{1,2}-\d{4}(?:\s+\d{1,2}:\d{2}(?:\s*[AP]M)?)?)\b/gi, 1],
    ],
    PickupLocation: [
        [/(?:pick[\s-]?up|pu\b|shipper|origin|from|ship\s*from)[:\s]+([A-Z][a-zA-Z .]+(?:,\s*[A-Z]{2})?\s*\d{5}(?:-\d{4})?)/gi, 1],
        [/(?:pick[\s-]?up|pu\b|shipper|origin|from)[:\s]+([A-Z][a-zA-Z .]+,\s*[A-Z]{2})/gi, 1],
    ],
    Reference: [
        [/\b([A-Z]{1,5}\d{5,12}[A-Z]?)\b/g, 1],
        [/(?:load|order|ref(?:erence)?|confirmation|pro|shipment)\s*(?:no\.?|#|num(?:ber)?)?[:\s]+([A-Z0-9]{5,15})/gi, 1],
    ],
    POC: [
        [/(?:poc|point\s*of\s*contact|contact|agent|dispatcher)\s*[:\-]\s*([A-Za-z][A-Za-z\s.'-]{2,40})/gi, 1],
        [/(?:poc|contact|phone|tel(?:\.)?|call)[:\s]+(\+?1?[\s\-.]?\(?\d{3}\)?[\s\-.]?\d{3}[\s\-.]?\d{4})/gi, 1],
    ],
    DeliveryTime: [
        [/(?:deliver(?:y|ed)?|del\b|consignee|destination|drop[\s-]?off)[^\n]{0,50}(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}(?:[^\n]{0,12}\d{1,2}:\d{2}(?:\s*[AP]M)?)?)/gi, 1],
    ],
    DeliveryLocation: [
        [/(?:deliver(?:y|ed)?|del\b|consignee|destination|drop[\s-]?off|deliver[\s-]?to)[:\s]+([A-Z][a-zA-Z .]+(?:,\s*[A-Z]{2})?\s*\d{5}(?:-\d{4})?)/gi, 1],
        [/(?:deliver(?:y|ed)?|del\b|consignee|destination)[:\s]+([A-Z][a-zA-Z .]+,\s*[A-Z]{2})/gi, 1],
    ],
    DeliveryNotes: [
        [/(?:delivery\s*(?:notes?|instructions?|special|requirements?)|special\s*instructions?|delivery\s*comments?)[:\s]+([^\n]{5,150})/gi, 1],
    ],
    Pieces: [
        [/([\d,]+)\s*(?:pcs?|pieces?|pallets?|skids?|units?)\b/gi, 1],
        [/(?:pieces?|pallets?|skids?|units?|qty\.?|quantity)[:\s]+([\d,]+)/gi, 1],
        [/(\d+)\s*(?:x\s*)?\d+\s*(?:pcs?|pieces?)/gi, 1],
    ],
    Weight: [
        [/([\d,]+(?:\.\d+)?\s*(?:lbs?|pounds?|kg|kilograms?))\b/gi, 1],
        [/(?:weight|wt\.?)[:\s]+([\d,]+(?:\.\d+)?\s*(?:lbs?|pounds?|kg)?)/gi, 1],
    ],
    Miles: [
        [/([\d,]+(?:\.\d+)?\s*(?:miles?|mi\.?))\b/gi, 1],
        [/(?:miles?|distance|mileage)[:\s]+([\d,]+(?:\.\d+)?)/gi, 1],
    ],
};

/* Returns all unique broker names from saved patterns */
function getBrokers() {
    return [...new Set(loadPatterns().filter(p => p.broker).map(p => p.broker))].sort();
}

/* Score a broker: count fields that produce at least one match */
function scoreBroker(broker, patterns, text) {
    const pts = patterns.filter(p => p.broker === broker);
    let score = 0;
    for (const field of FIELD_NAMES) {
        if (pts.filter(p => p.field === field).some(p => runCustomPattern(p, text).length))
            score++;
    }
    return score;
}

/* Auto-detect best matching broker for this text */
function autoDetectBroker(text) {
    const all = loadPatterns().filter(p => p.broker);
    const brokers = [...new Set(all.map(p => p.broker))];
    let best = null, bestScore = 0;
    for (const b of brokers) {
        const s = scoreBroker(b, all, text);
        if (s > bestScore) { bestScore = s; best = b; }
    }
    return bestScore >= 1 ? best : null;
}

/* brokerFilter: null = all custom patterns, string = only that broker */
function parseDocument(text, brokerFilter) {
    const results = {};
    const allCustom = loadPatterns();
    const custom = brokerFilter
        ? allCustom.filter(p => p.broker === brokerFilter)
        : allCustom;

    for (const field of FIELD_NAMES) {
        const found = new Set();

        /* 1. Custom patterns first */
        for (const p of custom.filter(c => c.field === field)) {
            for (const v of runCustomPattern(p, text)) found.add(v);
        }

        /* 2. Default patterns if nothing yet */
        if (!found.size) {
            for (const [re, grp] of DEFAULT_PATTERNS[field] || []) {
                re.lastIndex = 0;
                let m;
                while ((m = re.exec(text)) !== null) {
                    const v = (m[grp] || m[0]).trim();
                    if (v && v.length > 1) found.add(v);
                }
            }
        }

        results[field] = found.size ? [...found] : null;
    }
    return results;
}

function runCustomPattern(p, text) {
    try {
        const reStr = p.keyword
            ? escRx(p.keyword) + '[^\\n]{0,60}(' + p.pattern + ')'
            : '(' + p.pattern + ')';
        const re = new RegExp(reStr, 'gi');
        const out = [];
        let m;
        while ((m = re.exec(text)) !== null) {
            const v = (m[1] || m[0]).trim();
            if (v && !out.includes(v)) out.push(v);
        }
        return out;
    } catch { return []; }
}

function escRx(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/* ══════════════════════════════════════════════
   Render parsed card
══════════════════════════════════════════════ */
function buildCopyText(results) {
    return PARSED_TEMPLATE.map((group, gi) => {
        const lines = group.map(({ field, label }) => {
            const value = results[field] ? results[field][0] : '';
            return '* ' + label + ': ' + value;
        }).join('\n');
        return gi < PARSED_TEMPLATE.length - 1 ? lines + '\n___' : lines;
    }).join('\n\n');
}

function renderParsed(results, matchedBroker, wasAuto) {
    parsedFields.innerHTML = '';
    lastParsedResults = results;

    /* Broker badge */
    if (matchedBroker) {
        parsedBrokerBadge.textContent = (wasAuto ? '⚡ ' : '') + matchedBroker;
        parsedBrokerBadge.className = 'parsed-broker-badge' + (wasAuto ? ' auto-detected' : '');
        parsedBrokerBadge.style.display = '';
    } else {
        parsedBrokerBadge.style.display = 'none';
    }

    PARSED_TEMPLATE.forEach((group, gi) => {
        group.forEach(({ field, label }) => {
            const value = results[field] ? results[field][0] : '';
            const line = document.createElement('div');
            line.className = 'pb-line';
            line.innerHTML =
                '<span class="pb-star">* </span>' +
                '<span class="pb-label">' + esc(label) + ':</span>' +
                ' <span class="pb-value">' + esc(value) + '</span>';
            parsedFields.appendChild(line);
        });
        if (gi < PARSED_TEMPLATE.length - 1) {
            const sep = document.createElement('div');
            sep.className = 'pb-sep'; sep.textContent = '___';
            parsedFields.appendChild(sep);
            const gap = document.createElement('div');
            gap.className = 'pb-gap';
            parsedFields.appendChild(gap);
        }
    });

    parsedCard.classList.add('visible');
}

/* ══════════════════════════════════════════════
   Copy + Clear
══════════════════════════════════════════════ */
btnCopy.addEventListener('click', async () => {
    const text = outputBox.textContent;
    if (!text) return;
    try {
        await navigator.clipboard.writeText(text);
        btnCopy.textContent = '✓ Copied!';
        btnCopy.classList.add('copied');
        setTimeout(() => { btnCopy.textContent = '⎘ Copy'; btnCopy.classList.remove('copied'); }, 1800);
    } catch {
        btnCopy.textContent = 'Select manually';
        setTimeout(() => { btnCopy.textContent = '⎘ Copy'; }, 2000);
    }
});

btnClear.addEventListener('click', () => {
    hideOutput(); hideError(); hideLoader(); hideParsed(); hideBrokerSelector();
    fileChip.classList.remove('visible');
    document.getElementById('ocrNotice').classList.remove('visible');
    fileInput.value = '';
    lastExtractedText = '';
    lastMatchedBroker = null;
});

/* ══════════════════════════════════════════════
   TRAINING PANEL
══════════════════════════════════════════════ */
btnTrain.addEventListener('click', openTrainPanel);
trainCloseBtn.addEventListener('click', closeTrainPanel);

function openTrainPanel() {
  setDocLoadedUI(trainLines.length > 0);
  renderTrainLines();
  if (trainViewMode === 'doc') renderDocView();
  renderMappingPanel();
  renderTemplates();
  trainOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function setDocLoadedUI(loaded) {
  document.getElementById('trainFileZone').style.display   = loaded ? 'none' : '';
  document.getElementById('trainChangeDoc').style.display  = loaded ? ''     : 'none';
  document.getElementById('trainModeToggle').style.display = loaded ? 'flex' : 'none';
  document.getElementById('trainDocPageNav').style.display =
    (loaded && trainViewMode === 'doc' && trainPages.length > 1) ? 'flex' : 'none';
  document.getElementById('trainModeDocBtn').disabled = !loaded || trainPages.length === 0;
}

function closeTrainPanel() {
  trainOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Render all lines ── */
function renderTrainLines() {
  trainLinesList.innerHTML = '';
  activeLineItem = null;
  trainLines.forEach((line, idx) => {
    const item = document.createElement('div');
    item.className = 'train-line-item';
    item.dataset.idx  = idx;
    item.dataset.text = line.text;
    if (trainMappings[idx]) {
      applyTaggedState(item, idx, trainMappings[idx].field, line.text);
    } else {
      applyUntaggedState(item, idx, line.text);
    }
    trainLinesList.appendChild(item);
  });
}

function applyUntaggedState(item, idx, text) {
  item.classList.remove('tagged');
  item.style.removeProperty('--fc');
  item.innerHTML = '<span class="tli-text">' + esc(text) + '</span>';
  item.onclick = () => activateLine(item, idx, text);
}

function applyTaggedState(item, idx, field, text) {
  const color = FIELD_COLORS[field] || 'var(--primary)';
  const short = FIELD_SHORT[field] || field;
  item.classList.add('tagged');
  item.style.setProperty('--fc', color);
  item.innerHTML =
    '<span class="tli-badge" style="background:' + hexToRgba(color, 0.15) + ';color:' + color + '">' + esc(short) + '</span>' +
    '<span class="tli-text">' + esc(text) + '</span>' +
    '<button class="tli-untag" title="Remove tag">&#10005;</button>';
  item.querySelector('.tli-untag').addEventListener('click', e => {
    e.stopPropagation();
    untagLine(idx);
  });
  item.onclick = () => activateLine(item, idx, text);
}

function activateLine(item, idx, text) {
  if (activeLineItem && activeLineItem !== item) deactivateLine(activeLineItem);
  if (item.classList.contains('active')) { deactivateLine(item); return; }
  activeLineItem = item;
  item.classList.add('active');

  const sel = document.createElement('div');
  sel.className = 'tli-selector';
  const currentField = trainMappings[idx]?.field || '';
  sel.innerHTML =
    '<select class="tli-field-select">' +
    '<option value="">— select field —</option>' +
    FIELD_NAMES.map(f =>
      '<option value="' + f + '"' + (f === currentField ? ' selected' : '') + '>' +
      esc(FIELD_LABELS[f]) + '</option>'
    ).join('') +
    '</select>' +
    '<button class="tli-apply" title="Apply">&#10003;</button>' +
    '<button class="tli-cancel" title="Cancel">&#10005;</button>';
  item.appendChild(sel);

  sel.querySelector('.tli-apply').addEventListener('click', e => {
    e.stopPropagation();
    const field = sel.querySelector('.tli-field-select').value;
    if (field) tagLine(idx, field, text); else deactivateLine(item);
  });
  sel.querySelector('.tli-cancel').addEventListener('click', e => {
    e.stopPropagation();
    deactivateLine(item);
  });
  sel.querySelector('.tli-field-select').addEventListener('click', e => e.stopPropagation());
  /* Apply on Enter */
  sel.querySelector('.tli-field-select').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); sel.querySelector('.tli-apply').click(); }
  });
}

function deactivateLine(item) {
  item.classList.remove('active');
  const sel = item.querySelector('.tli-selector');
  if (sel) sel.remove();
  if (activeLineItem === item) activeLineItem = null;
}

function tagLine(idx, field, text) {
  trainMappings[idx] = { field, text };
  const item = trainLinesList.querySelector('[data-idx="' + idx + '"]');
  if (item) {
    if (activeLineItem === item) activeLineItem = null;
    item.className = 'train-line-item';
    applyTaggedState(item, idx, field, text);
  }
  renderMappingPanel();
  if (trainViewMode === 'doc') renderDocView();
}

function untagLine(idx) {
  delete trainMappings[idx];
  const item = trainLinesList.querySelector('[data-idx="' + idx + '"]');
  if (item) { item.className = 'train-line-item'; applyUntaggedState(item, idx, item.dataset.text); }
  renderMappingPanel();
  if (trainViewMode === 'doc') renderDocView();
}

/* ══════════════════════════════════════════════
   Document view (image + overlay boxes)
══════════════════════════════════════════════ */
const trainModeListBtn  = document.getElementById('trainModeListBtn');
const trainModeDocBtn   = document.getElementById('trainModeDocBtn');
const trainDocView      = document.getElementById('trainDocView');
const trainDocImg       = document.getElementById('trainDocImg');
const trainDocOverlays  = document.getElementById('trainDocOverlays');
const trainDocPageNav   = document.getElementById('trainDocPageNav');
const trainDocPageLabel = document.getElementById('trainDocPageLabel');
const trainDocPrev      = document.getElementById('trainDocPrev');
const trainDocNext      = document.getElementById('trainDocNext');

trainModeListBtn.addEventListener('click', () => setTrainViewMode('list'));
trainModeDocBtn.addEventListener('click',  () => setTrainViewMode('doc'));
trainDocPrev.addEventListener('click', () => { if (trainDocPage > 0) { trainDocPage--; renderDocView(); } });
trainDocNext.addEventListener('click', () => { if (trainDocPage < trainPages.length - 1) { trainDocPage++; renderDocView(); } });

function setTrainViewMode(mode) {
  if (mode === 'doc' && !trainPages.length) return;
  trainViewMode = mode;
  trainModeListBtn.classList.toggle('active', mode === 'list');
  trainModeDocBtn.classList.toggle('active',  mode === 'doc');
  trainLinesList.style.display = mode === 'list' ? '' : 'none';
  trainDocView.style.display   = mode === 'doc'  ? 'flex' : 'none';
  trainDocPageNav.style.display = (mode === 'doc' && trainPages.length > 1) ? 'flex' : 'none';
  if (mode === 'doc') renderDocView();
  else closeDocPopover();
}

function renderDocView() {
  closeDocPopover();
  if (!trainPages.length) { trainDocOverlays.innerHTML = ''; trainDocImg.removeAttribute('src'); return; }
  const page = trainPages[trainDocPage];
  trainDocImg.src = page.src;
  trainDocPageLabel.textContent = 'Page ' + (trainDocPage + 1) + ' / ' + trainPages.length;
  trainDocPrev.disabled = trainDocPage === 0;
  trainDocNext.disabled = trainDocPage === trainPages.length - 1;

  trainDocOverlays.innerHTML = '';
  trainLines.forEach((line, idx) => {
    if (line.page !== trainDocPage || !line.box) return;
    const b = document.createElement('div');
    b.className = 'tdo-box';
    b.style.left   = line.box.leftPct + '%';
    b.style.top    = line.box.topPct + '%';
    b.style.width  = line.box.widthPct + '%';
    b.style.height = line.box.heightPct + '%';
    b.title = line.text;
    const mapping = trainMappings[idx];
    if (mapping) {
      const color = FIELD_COLORS[mapping.field] || 'var(--primary)';
      b.classList.add('tagged');
      b.style.borderColor = color;
      b.style.background  = hexToRgba(color, 0.18);
    }
    b.addEventListener('click', e => { e.stopPropagation(); openDocTagPopover(b, idx, line.text); });
    trainDocOverlays.appendChild(b);
  });
}

function openDocTagPopover(box, idx, text) {
  closeDocPopover();
  const pop = document.createElement('div');
  pop.className = 'tdo-popover';
  const currentField = trainMappings[idx]?.field || '';
  pop.innerHTML =
    '<select class="tli-field-select">' +
    '<option value="">— select field —</option>' +
    FIELD_NAMES.map(f =>
      '<option value="' + f + '"' + (f === currentField ? ' selected' : '') + '>' +
      esc(FIELD_LABELS[f]) + '</option>'
    ).join('') +
    '</select>' +
    '<button class="tli-apply" title="Apply">&#10003;</button>' +
    '<button class="tli-cancel" title="Cancel">&#10005;</button>';
  pop.style.top  = (box.offsetTop + box.offsetHeight + 4) + 'px';
  pop.style.left = box.offsetLeft + 'px';
  trainDocOverlays.appendChild(pop);
  activeDocPopover = pop;

  pop.querySelector('.tli-apply').addEventListener('click', e => {
    e.stopPropagation();
    const field = pop.querySelector('.tli-field-select').value;
    if (field) tagLine(idx, field, text);
    closeDocPopover();
  });
  pop.querySelector('.tli-cancel').addEventListener('click', e => { e.stopPropagation(); closeDocPopover(); });
  pop.querySelector('.tli-field-select').addEventListener('click', e => e.stopPropagation());
  pop.querySelector('.tli-field-select').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); pop.querySelector('.tli-apply').click(); }
  });
}

function closeDocPopover() {
  if (activeDocPopover) { activeDocPopover.remove(); activeDocPopover = null; }
}
document.addEventListener('click', closeDocPopover);

/* ── Mapping panel (right side) ── */
function renderMappingPanel() {
  trainMappingList.innerHTML = '';
  const hasAny = Object.keys(trainMappings).length > 0;

  if (!hasAny) {
    trainMappingList.innerHTML = '<div class="tm-empty">&#8592; Click lines on the left to tag them</div>';
  } else {
    PARSED_TEMPLATE.forEach(group => {
      group.forEach(({ field, label }) => {
        const mapped = Object.values(trainMappings).filter(m => m.field === field);
        if (!mapped.length) return;
        const color = FIELD_COLORS[field] || 'var(--primary)';
        const row = document.createElement('div');
        row.className = 'tm-row';
        row.innerHTML =
          '<div class="tm-field" style="color:' + color + '">' +
            '<span class="tm-dot" style="background:' + color + '"></span>' +
            esc(label) +
          '</div>' +
          mapped.map(m => '<div class="tm-value">' + esc(m.text) + '</div>').join('');
        trainMappingList.appendChild(row);
      });
    });
  }

  const broker = document.getElementById('taggerBroker')?.value?.trim() || '';
  btnSaveTemplate.disabled = !hasAny || !broker;
}

/* ── Clear mapping ── */
btnClearMapping.addEventListener('click', () => {
  trainMappings = {};
  renderTrainLines();
  renderMappingPanel();
});

/* ── Save template ── */
btnSaveTemplate.addEventListener('click', saveTrainTemplate);

function saveTrainTemplate() {
  const broker = document.getElementById('taggerBroker')?.value?.trim() || '';
  if (!broker) {
    const inp = document.getElementById('taggerBroker');
    inp.classList.add('error');
    inp.focus();
    setTimeout(() => inp.classList.remove('error'), 2000);
    return;
  }
  if (!Object.keys(trainMappings).length) return;

  const existing = loadPatterns();
  const newPats  = [];
  for (const [idx, { field, text }] of Object.entries(trainMappings)) {
    const { keyword, value } = autoSplit(text);
    if (!value) continue;
    newPats.push({
      id:      Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      broker,  field,  keyword,
      pattern: derivePattern(value, field),
      example: value,
      created: Date.now(),
    });
  }
  if (!newPats.length) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, ...newPats]));
  trainMappings = {};
  renderTrainLines();
  renderMappingPanel();
  renderTemplates();
  populateBrokerSelect();
  if (lastExtractedText) renderParsed(parseDocument(lastExtractedText, lastMatchedBroker), lastMatchedBroker, false);

  const orig = btnSaveTemplate.textContent;
  btnSaveTemplate.classList.add('success');
  btnSaveTemplate.textContent = '\u2713 Saved ' + newPats.length + ' pattern' + (newPats.length > 1 ? 's' : '');
  setTimeout(() => { btnSaveTemplate.classList.remove('success'); btnSaveTemplate.textContent = orig; }, 2500);
}

/* Keep broker input → update save button state */
document.getElementById('taggerBroker')?.addEventListener('input', renderMappingPanel);

/* ── Helpers ── */
function autoSplit(line) {
  const m1 = line.match(/^([^:]{2,40}):\s*(.+)$/);
  if (m1) return { keyword: m1[1].trim(), value: m1[2].trim() };
  const m2 = line.match(/^([^#]{2,30}#\s*)(.+)$/);
  if (m2) return { keyword: m2[1].trim(), value: m2[2].trim() };
  return { keyword: '', value: line.trim() };
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

/* ── Pattern derivation ── */
function derivePattern(value, field) {
  const datePattern = (v) => {
    if (/^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(v))
      return '\\d{1,2}\\/\\d{1,2}\\/\\d{2,4}(?:\\s+\\d{1,2}:\\d{2}(?:\\s*[AP]M)?)?';
    if (/^\d{1,2}-\d{1,2}-\d{4}/.test(v))
      return '\\d{1,2}-\\d{1,2}-\\d{4}(?:\\s+\\d{1,2}:\\d{2}(?:\\s*[AP]M)?)?';
    if (/^\d{1,2}-[A-Za-z]{3}/.test(v))
      return '\\d{1,2}-[A-Za-z]{3}-\\d{2,4}';
    return escRx(v).replace(/\d+/g, '\\d+');
  };
  switch (field) {
    case 'Reference': {
      let p = value.replace(/[A-Z]+/g, '[A-Z]+').replace(/\d+/g, '\\d+');
      return p;
    }
    case 'PickupTime':
    case 'DeliveryTime':
      return datePattern(value);
    case 'PickupLocation':
    case 'DeliveryLocation':
    case 'DeliveryNotes':
      return escRx(value).replace(/\d+/g, '\\d+');
    case 'POC':
      if (/\d{3}/.test(value)) return '\\+?1?[\\s\\-.\\(\\)\\d]{10,14}';
      return escRx(value).replace(/[A-Z][a-z]+/g, '[A-Z][a-z]+');
    case 'Pieces':
      return '[\\d,]+';
    case 'Weight':
      return '[\\d,]+(?:\\.\\d+)?\\s*(?:lbs?|pounds?|kg|kilograms?)';
    case 'Miles':
      return '[\\d,]+(?:\\.\\d+)?\\s*(?:miles?|mi\\.?)';
    default:
      return escRx(value).replace(/\d+/g, '\\d+');
  }
}

/* ══════════════════════════════════════════════
   localStorage pattern management
══════════════════════════════════════════════ */
function loadPatterns() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function deletePattern(id) {
  const all = loadPatterns().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

/* ── Render saved templates ── */
function renderTemplates() {
  const all = loadPatterns();
  templatesList.innerHTML = '';
  if (!all.length) {
    templatesEmpty.textContent = 'No saved patterns yet. Tag some lines above to create them.';
    templatesEmpty.style.display = 'block';
    return;
  }
  templatesEmpty.style.display = 'none';
  all.slice().reverse().forEach(p => {
    const item = document.createElement('div');
    item.className = 'template-item';

    const badge = document.createElement('span');
    badge.className = 'template-field-badge';
    badge.textContent = p.field;

    const info = document.createElement('div');
    info.className = 'template-info';

    if (p.broker) {
      const bb = document.createElement('div');
      bb.className = 'template-broker-badge';
      bb.textContent = p.broker;
      info.appendChild(bb);
    }
    const kw = document.createElement('div');
    kw.className = 'template-keyword';
    kw.innerHTML = p.keyword
      ? 'Keyword: <span>' + esc(p.keyword) + '</span>'
      : '<span style="color:var(--muted);font-style:italic">No keyword</span>';

    const pat = document.createElement('div');
    pat.className = 'template-pattern';
    pat.textContent = p.pattern;

    const ex = document.createElement('div');
    ex.className = 'template-example';
    ex.textContent = 'Example: ' + p.example;

    info.appendChild(kw);
    info.appendChild(pat);
    info.appendChild(ex);

    const del = document.createElement('button');
    del.className = 'btn-del-template';
    del.title = 'Delete pattern';
    del.textContent = '✕';
    del.addEventListener('click', () => {
      deletePattern(p.id);
      renderTemplates();
      if (lastExtractedText) renderParsed(parseDocument(lastExtractedText, lastMatchedBroker), lastMatchedBroker, false);
    });

    item.appendChild(badge);
    item.appendChild(info);
    item.appendChild(del);
    templatesList.appendChild(item);
  });
}


/* ══════════════════════════════════════════════
   Broker selector
══════════════════════════════════════════════ */
function populateBrokerSelect() {
  const current = brokerSelect.value;
  brokerSelect.innerHTML = '<option value="auto">⚨ Auto-detect</option>';
  for (const b of getBrokers()) {
    const opt = document.createElement('option');
    opt.value = b; opt.textContent = b;
    brokerSelect.appendChild(opt);
  }
  if ([...brokerSelect.options].some(o => o.value === current))
    brokerSelect.value = current;
  /* Update datalist in training panel */
  const dl = document.getElementById('brokerDatalist');
  if (dl) {
    dl.innerHTML = '';
    for (const b of getBrokers()) {
      const o = document.createElement('option'); o.value = b; dl.appendChild(o);
    }
  }
}

btnParse.addEventListener('click', () => {
  if (!lastExtractedText) return;
  const sel = brokerSelect.value;
  let matchedBroker = null;
  let wasAuto = false;
  if (sel === 'auto') {
    matchedBroker = autoDetectBroker(lastExtractedText);
    wasAuto = true;
  } else {
    matchedBroker = sel;
  }
  lastMatchedBroker = matchedBroker;
  renderParsed(parseDocument(lastExtractedText, matchedBroker), matchedBroker, wasAuto);
});

/* ══════════════════════════════════════════════
   Export Templates
══════════════════════════════════════════════ */
btnExportTemplates.addEventListener('click', () => {
  const all = loadPatterns();
  if (!all.length) {
    btnExportTemplates.textContent = 'No patterns';
    setTimeout(() => { btnExportTemplates.innerHTML = '&#8659; Export'; }, 1800);
    return;
  }
  const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'templates.json';
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(a.href);
  btnExportTemplates.classList.add('success');
  btnExportTemplates.textContent = '✓ Exported';
  setTimeout(() => {
    btnExportTemplates.classList.remove('success');
    btnExportTemplates.innerHTML = '&#8659; Export';
  }, 2200);
});

/* ══════════════════════════════════════════════
   Load Default Templates (templates.json)
══════════════════════════════════════════════ */
async function loadDefaultTemplates() {
  try {
    const res = await fetch('./templates.json', { cache: 'no-cache' });
    if (!res.ok) return 0;
    const json = await res.json();
    if (!Array.isArray(json)) return 0;
    const existing = loadPatterns();
    const existingIds = new Set(existing.map(p => p.id));
    const toAdd = json.filter(p => p.id && !existingIds.has(p.id));
    if (toAdd.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, ...toAdd]));
    }
    return toAdd.length;
  } catch { return 0; }
}

btnLoadDefaults.addEventListener('click', async () => {
  const orig = btnLoadDefaults.innerHTML;
  btnLoadDefaults.textContent = 'Loading…';
  btnLoadDefaults.disabled = true;
  const count = await loadDefaultTemplates();
  btnLoadDefaults.disabled = false;
  if (count > 0) {
    btnLoadDefaults.classList.add('success');
    btnLoadDefaults.textContent = '✓ Loaded ' + count;
    renderTemplates(); populateBrokerSelect();
  } else {
    btnLoadDefaults.textContent = 'Nothing new';
  }
  setTimeout(() => {
    btnLoadDefaults.classList.remove('success');
    btnLoadDefaults.innerHTML = orig;
  }, 2500);
});

/* ══════════════════════════════════════════════
   Init: load templates.json on startup
══════════════════════════════════════════════ */
(async function init() {
  await loadDefaultTemplates();
  populateBrokerSelect();
})();


/* ══════════════════════════════════════════════
   Training panel — file upload & extraction
══════════════════════════════════════════════ */
function bboxToPctBox(bbox, cw, ch) {
  return {
    leftPct:   bbox.x0 / cw * 100,
    topPct:    bbox.y0 / ch * 100,
    widthPct:  (bbox.x1 - bbox.x0) / cw * 100,
    heightPct: (bbox.y1 - bbox.y0) / ch * 100,
  };
}

/* Group PDF text items into visual lines + bounding boxes, in canvas pixel space */
function pdfLineBoxes(content, viewport, cw, ch) {
  if (!content.items.length) return [];
  const items = content.items.map(item => {
    const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
    const height = Math.hypot(tx[2], tx[3]) || 10;
    const width  = item.width * Math.hypot(tx[0], tx[1]);
    return { str: item.str, x: tx[4], y: tx[5], width, height };
  });
  const THRESH = 5;
  const sorted = [...items].sort((a, b) => {
    const dy = a.y - b.y;
    if (Math.abs(dy) > THRESH) return dy;
    return a.x - b.x;
  });
  const lines = [];
  let cur = [], lastY = null;
  for (const it of sorted) {
    if (lastY === null || Math.abs(it.y - lastY) > THRESH) {
      if (cur.length) lines.push(cur);
      cur = [it]; lastY = it.y;
    } else { cur.push(it); }
  }
  if (cur.length) lines.push(cur);
  return lines.map(ln => {
    const text = ln.map(it => it.str.trimEnd()).join(ln.length > 2 ? '  ' : ' ').trim();
    if (!text) return null;
    const left   = Math.min(...ln.map(it => it.x));
    const right  = Math.max(...ln.map(it => it.x + it.width));
    const top    = Math.min(...ln.map(it => it.y - it.height));
    const bottom = Math.max(...ln.map(it => it.y + it.height * 0.25));
    return {
      text,
      box: {
        leftPct:   left / cw * 100,
        topPct:    top / ch * 100,
        widthPct:  (right - left) / cw * 100,
        heightPct: (bottom - top) / ch * 100,
      },
    };
  }).filter(Boolean);
}

function loadImageEl(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload  = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
    img.src = url;
  });
}

(function () {
  const zone        = document.getElementById('trainFileZone');
  const fileInput   = document.getElementById('trainFileInput');
  const statusEl    = document.getElementById('trainFileStatus');
  const changeDoc   = document.getElementById('trainChangeDoc');

  function setStatus(msg) { statusEl.textContent = msg; }

  zone.addEventListener('click',  () => fileInput.click());
  zone.addEventListener('dragover',  e  => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.classList.remove('drag-over');
    const f = e.dataTransfer.files[0]; if (f) extractForTraining(f);
  });
  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) extractForTraining(fileInput.files[0]);
    fileInput.value = '';
  });
  changeDoc.addEventListener('click', () => {
    trainLines = []; trainPages = []; trainMappings = {}; trainDocPage = 0;
    setTrainViewMode('list');
    document.getElementById('trainLinesList').innerHTML = '';
    setDocLoadedUI(false);
    setStatus('');
    renderMappingPanel();
  });

  async function extractForTraining(file) {
    zone.classList.add('loading');
    setStatus('Reading…');
    const lines = [];
    const pages = [];
    try {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

      if (isPdf) {
        const buf = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
        const total = pdf.numPages;
        const pdfPages = [];
        let anyText = false;
        for (let i = 1; i <= total; i++) {
          setStatus('Page ' + i + ' of ' + total + '…');
          const page = await pdf.getPage(i);
          pdfPages.push(page);
          const content  = await page.getTextContent();
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width; canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;

          const pageLines = pdfLineBoxes(content, viewport, canvas.width, canvas.height);
          if (pageLines.length) anyText = true;
          pages.push({ src: canvas.toDataURL('image/jpeg', 0.9), width: canvas.width, height: canvas.height });
          const pageIdx = pages.length - 1;
          if (lines.length && pageLines.length) lines.push({ text: '─── Page ' + i + ' ───', page: pageIdx, box: null });
          for (const l of pageLines) lines.push({ text: l.text, page: pageIdx, box: l.box });
        }

        const joined = lines.map(l => l.text).join('\n');
        if (!anyText || isGarbled(joined)) {
          setStatus('Switching to OCR…');
          await loadTesseract();
          const worker = await Tesseract.createWorker('eng', 1, {
            logger: m => { if (m.status === 'recognizing text') setStatus('OCR ' + Math.round(m.progress * 100) + '%…'); }
          });
          lines.length = 0; pages.length = 0;
          for (let i = 0; i < pdfPages.length; i++) {
            setStatus('OCR page ' + (i + 1) + ' of ' + total + '…');
            const vp = pdfPages[i].getViewport({ scale: 2.0 });
            const canvas = document.createElement('canvas');
            canvas.width = vp.width; canvas.height = vp.height;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
            await pdfPages[i].render({ canvasContext: ctx, viewport: vp }).promise;
            const { data } = await worker.recognize(canvas);
            pages.push({ src: canvas.toDataURL('image/jpeg', 0.9), width: canvas.width, height: canvas.height });
            const pageIdx = pages.length - 1;
            const ocrLines = (data.lines || [])
              .map(ln => ({ text: ln.text.trim(), box: bboxToPctBox(ln.bbox, canvas.width, canvas.height) }))
              .filter(l => l.text);
            if (lines.length && ocrLines.length) lines.push({ text: '─── Page ' + (i + 1) + ' ───', page: pageIdx, box: null });
            for (const l of ocrLines) lines.push({ text: l.text, page: pageIdx, box: l.box });
          }
          await worker.terminate();
        }
      } else {
        setStatus('Running OCR…');
        await loadTesseract();
        const worker = await Tesseract.createWorker('eng', 1, {
          logger: m => { if (m.status === 'recognizing text') setStatus('OCR ' + Math.round(m.progress * 100) + '%…'); }
        });
        const imgEl = await loadImageEl(file);
        const canvas = document.createElement('canvas');
        canvas.width = imgEl.naturalWidth; canvas.height = imgEl.naturalHeight;
        canvas.getContext('2d').drawImage(imgEl, 0, 0);
        const { data } = await worker.recognize(canvas);
        await worker.terminate();
        pages.push({ src: canvas.toDataURL('image/jpeg', 0.9), width: canvas.width, height: canvas.height });
        const ocrLines = (data.lines || [])
          .map(ln => ({ text: ln.text.trim(), box: bboxToPctBox(ln.bbox, canvas.width, canvas.height) }))
          .filter(l => l.text);
        for (const l of ocrLines) lines.push({ text: l.text, page: 0, box: l.box });
      }

      trainLines = lines;
      trainPages = pages;
      trainMappings = {};
      trainDocPage = 0;
      zone.classList.remove('loading');
      setDocLoadedUI(true);
      setStatus('');
      renderTrainLines();
      renderMappingPanel();
      if (trainViewMode === 'doc') renderDocView();
    } catch (err) {
      zone.classList.remove('loading');
      setStatus('Error: ' + (err.message || err));
    }
  }
})();


function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

