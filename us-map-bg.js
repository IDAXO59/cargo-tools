/* US Map Animated Background — cargo-tools
 * Injects a fixed SVG of US states as a decorative backdrop.
 * 2-3 states randomly glow amber; zero layout impact (fill-only transitions).
 */
(function () {
  'use strict';
  var ns = 'http://www.w3.org/2000/svg';

  /* Simplified polygon paths, viewBox 0 0 960 600 (Albers-USA-like) */
  var STATES = [
    /* Pacific */
    ['WA','M79,47 L184,47 L190,80 L186,118 L150,133 L90,133 L79,100 Z'],
    ['OR','M79,133 L186,118 L194,160 L192,230 L143,234 L79,230 Z'],
    ['CA','M79,230 L143,234 L153,285 L158,380 L128,452 L52,440 L46,364 L52,278 Z'],
    ['NV','M143,234 L192,230 L197,288 L186,354 L143,358 L131,300 L131,250 Z'],
    ['ID','M186,118 L216,118 L218,170 L215,230 L192,230 L194,160 Z'],
    /* Mountain */
    ['MT','M184,47 L314,47 L315,148 L218,148 L216,118 L190,80 Z'],
    ['WY','M218,148 L315,148 L315,232 L218,232 Z'],
    ['UT','M143,232 L218,232 L218,346 L131,346 L131,300 Z'],
    ['CO','M218,232 L372,232 L372,340 L218,340 Z'],
    ['AZ','M131,346 L218,346 L246,463 L112,463 Z'],
    ['NM','M218,340 L372,340 L372,455 L246,455 L246,421 L218,346 Z'],
    /* Northern Plains */
    ['ND','M315,47 L469,47 L469,150 L315,148 Z'],
    ['SD','M315,148 L469,150 L469,235 L315,232 Z'],
    ['NE','M315,232 L457,232 L455,306 L315,306 Z'],
    ['KS','M315,306 L455,306 L453,372 L315,372 Z'],
    ['OK','M315,372 L453,372 L491,370 L491,432 L315,432 Z'],
    ['TX','M315,432 L315,502 L382,505 L396,492 L446,492 L501,455 L501,385 L491,370 L491,432 Z'],
    /* Midwest */
    ['MN','M369,56 L469,50 L469,150 L397,150 L367,200 L369,128 Z'],
    ['IA','M397,195 L520,198 L518,286 L397,286 Z'],
    ['MO','M397,286 L520,286 L554,370 L451,376 L397,372 Z'],
    ['AR','M451,372 L554,368 L560,434 L434,434 L434,396 Z'],
    ['LA','M434,434 L560,434 L564,492 L466,500 L436,492 Z'],
    /* Great Lakes */
    ['WI','M465,100 L556,100 L554,202 L397,200 L367,165 Z'],
    ['IL','M491,202 L554,202 L554,342 L469,346 Z'],
    ['IN','M554,202 L616,202 L614,334 L554,334 Z'],
    ['MI','M556,100 L665,115 L702,148 L680,190 L616,202 L556,202 L542,165 Z'],
    ['OH','M616,185 L704,190 L702,298 L614,295 Z'],
    /* South */
    ['KY','M469,342 L616,332 L704,298 L716,365 L554,370 L451,376 L452,342 Z'],
    ['TN','M554,368 L716,363 L730,415 L555,418 Z'],
    ['MS','M527,418 L609,418 L614,502 L528,502 Z'],
    ['AL','M609,418 L651,418 L651,502 L614,502 Z'],
    ['GA','M651,418 L730,380 L733,467 L705,494 L651,494 Z'],
    ['FL','M641,462 L767,464 L762,547 L641,542 Z'],
    /* Southeast seaboard */
    ['SC','M700,390 L792,378 L793,464 L705,464 Z'],
    ['NC','M697,357 L842,352 L842,393 L697,393 Z'],
    ['VA','M697,285 L822,280 L832,358 L697,360 Z'],
    ['WV','M668,270 L767,265 L770,344 L616,340 L616,298 L668,298 Z'],
    /* Mid-Atlantic */
    ['MD','M785,258 L857,252 L857,292 L785,295 Z'],
    ['DE','M834,248 L860,248 L860,293 L834,293 Z'],
    ['PA','M684,188 L802,185 L805,273 L684,273 Z'],
    ['NJ','M802,200 L840,197 L840,274 L802,274 Z'],
    /* Northeast */
    ['NY','M720,108 L844,98 L844,197 L802,202 L720,197 Z'],
    ['CT','M836,200 L877,196 L877,228 L836,228 Z'],
    ['RI','M872,196 L900,194 L900,222 L872,222 Z'],
    ['MA','M820,170 L879,165 L879,200 L820,200 Z'],
    ['VT','M800,90 L838,88 L838,174 L800,174 Z'],
    ['NH','M838,88 L864,86 L862,170 L838,170 Z'],
    ['ME','M840,58 L906,52 L906,180 L840,178 Z'],
    /* Insets */
    ['AK','M30,440 L178,438 L205,464 L188,524 L120,547 L55,537 L28,514 Z'],
    ['HI','M225,500 L248,490 L274,494 L300,500 L320,512 L284,534 L244,532 Z'],
  ];

  /* ── CSS ── */
  var style = document.createElement('style');
  style.textContent =
    '#_usmap{position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;overflow:hidden;}' +
    '#_usmap path{fill:transparent;stroke:rgba(255,179,24,0.13);stroke-width:0.9;stroke-linejoin:round;' +
      'transition:fill 2s ease-in-out,stroke 2s ease-in-out;}' +
    '#_usmap path.lit{fill:rgba(255,179,24,0.18)!important;stroke:rgba(255,179,24,0.32)!important;}';
  document.head.appendChild(style);

  /* ── Build & inject SVG ── */
  function init() {
    var svg = document.createElementNS(ns, 'svg');
    svg.id = '_usmap';
    svg.setAttribute('viewBox', '0 0 960 600');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    var paths = STATES.map(function (s) {
      var p = document.createElementNS(ns, 'path');
      p.id = 'st-' + s[0];
      p.setAttribute('d', s[1]);
      svg.appendChild(p);
      return p;
    });

    document.body.insertBefore(svg, document.body.firstChild);

    /* ── Animation ── */
    var busy = new Set();
    var MAX  = 3;

    function light() {
      var avail = paths.filter(function (p) { return !busy.has(p); });
      if (!avail.length || busy.size >= MAX) return;
      var pick = avail[Math.floor(Math.random() * avail.length)];
      busy.add(pick);
      pick.classList.add('lit');
      var hold = 2200 + Math.random() * 2600; /* 2.2 – 4.8 s hold */
      setTimeout(function () {
        pick.classList.remove('lit');
        setTimeout(function () { busy.delete(pick); }, 2000); /* wait for fade-out */
      }, hold);
    }

    /* Staggered startup so it doesn't feel mechanical */
    setTimeout(light, 400);
    setTimeout(light, 1300);
    setTimeout(light, 2400);

    /* Keep 2-3 states lit at all times */
    setInterval(function () { if (busy.size < MAX) light(); }, 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
