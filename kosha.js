/* ══════════════════════════════════════════════════════════════════════
   KOSHA — application logic
   State, navigation, flows. No frameworks — one carefully-kept file.
   ══════════════════════════════════════════════════════════════════════ */

'use strict';

/* ─── Data ───────────────────────────────────────────────────────────── */
const IMG = (id, w = 600) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const VENUES = [
  {
    id: 'royal-majestic', name: 'Royal Majestic Hall', city: 'Abu Dhabi', cap: 500,
    price: 7500, rating: 4.9, img: IMG('photo-1519167758481-83f550bb49b3', 900),
    desc: 'A grand colonnaded ballroom crowned with crystal chandeliers and a private bridal wing. The Royal Majestic has hosted three generations of Emirati celebrations.'
  },
  {
    id: 'jumeirah-oasis', name: 'Al Jumeirah Oasis', city: 'Dubai', cap: 350,
    price: 12000, rating: 4.8, img: IMG('photo-1469371670807-013ccf25f16a', 900),
    desc: 'An open-air garden estate beneath the palms, strung with warm lanterns. Golden-hour ceremonies here are quietly legendary.'
  },
  {
    id: 'desert-rose', name: 'Desert Rose Pavilion', city: 'Sharjah', cap: 280,
    price: 5200, rating: 4.7, img: IMG('photo-1464366400600-7168b8af9bc3', 900),
    desc: 'An intimate pavilion of arches and ivory drapery, framed by desert light. Perfect for gatherings that favour closeness over scale.'
  },
  {
    id: 'pearl-ballroom', name: 'The Pearl Ballroom', city: 'Dubai', cap: 650,
    price: 15800, rating: 5.0, img: IMG('photo-1511795409834-ef04bbd61622', 900),
    desc: 'Dubai’s most storied ballroom — a sweep of marble, mother-of-pearl inlay and a stage made for unforgettable entrances.'
  },
];

const PRODUCTS = [
  {
    id: 'ivory-gown', name: 'Designer Ivory Gown', brand: 'Atelier Noor', cat: 'attire',
    price: 4200, rating: 4.9, reviews: 124, img: IMG('photo-1594552072238-b8a33785b261', 900),
    optLabel: 'Select size', opts: ['XS', 'S', 'M', 'L', 'XL'],
    desc: 'Hand-finished silk mikado with a sculpted bodice and a train that moves like poured cream. Each gown is cut to order in the Dubai atelier.'
  },
  {
    id: 'gold-bands', name: 'Golden Classic Bands', brand: 'Maison d’Or', cat: 'jewellery',
    price: 2800, rating: 4.8, reviews: 89, img: IMG('photo-1605100804763-247f67b3557e', 900),
    optLabel: 'Select metal', opts: ['Yellow gold', 'Rose gold', 'Platinum'],
    desc: 'A matched pair of 18-karat bands, polished to a soft mirror. Engraving of your names and date is included, in Arabic or Latin script.'
  },
  {
    id: 'pearl-veil', name: 'Pearl Cascade Veil', brand: 'Atelier Noor', cat: 'attire',
    price: 1150, rating: 4.7, reviews: 41, img: IMG('photo-1519741497674-611481863552', 900),
    optLabel: 'Select length', opts: ['Chapel', 'Cathedral'],
    desc: 'Freshwater pearls scattered along silk tulle — a veil that catches candlelight with every step down the aisle.'
  },
  {
    id: 'invitation-suite', name: 'Royal Invitation Suite', brand: 'Dar Al Waraq', cat: 'invitations',
    price: 950, rating: 4.9, reviews: 203, img: IMG('photo-1607190074257-dd4b7af0309f', 900),
    optLabel: 'Set of', opts: ['50', '100', '200'],
    desc: 'Letterpressed cotton cards with gilded edges and a wax-sealed envelope. Calligraphy in Arabic and English, composed by hand.'
  },
  {
    id: 'eternity-ring', name: 'Diamond Eternity Ring', brand: 'Maison d’Or', cat: 'jewellery',
    price: 8900, rating: 5.0, reviews: 36, img: IMG('photo-1515562141207-7a88fb7ce338', 900),
    optLabel: 'Select size', opts: ['48', '50', '52', '54', '56'],
    desc: 'A full circle of brilliant-cut diamonds, each stone certified and set by a single master jeweller from start to finish.'
  },
  {
    id: 'table-decor', name: 'Crystal Table Décor', brand: 'Bayt Alward', cat: 'decor',
    price: 620, rating: 4.6, reviews: 57, img: IMG('photo-1519225421980-715cb0215aed', 900),
    optLabel: 'Set of', opts: ['6', '12', '24'],
    desc: 'Hand-cut crystal votives and bud vases in warm champagne tones — the quiet detail your guests will remember.'
  },
];

const SPECIALISTS = [
  {
    id: 'amina', name: 'Dr. Amina Al-Ketbi', cat: 'marital', sub: 'Marital & Pre-marital Counseling',
    price: 500, rating: 5.0, years: '12y', sessions: '340+', online: true,
    img: IMG('photo-1573496359142-b8d87734a5a2', 400),
    bio: 'Doctorate in family psychology from UAEU. Dr. Amina has guided hundreds of couples through their first year and beyond, blending clinical practice with deep cultural understanding.'
  },
  {
    id: 'khalid', name: 'Dr. Khalid Rahman', cat: 'psych', sub: 'Psychological Counseling',
    price: 450, rating: 4.8, years: '9y', sessions: '210+', online: true,
    img: IMG('photo-1560250097-0b93528c311a', 400),
    bio: 'Specialist in anxiety, life transitions and communication patterns. Khalid’s calm, structured sessions are a favourite among newly engaged couples.'
  },
  {
    id: 'layla', name: 'Layla Haddad', cat: 'marital', sub: 'Family & Relationship Counseling',
    price: 400, rating: 4.9, years: '11y', sessions: '390+', online: false,
    img: IMG('photo-1580489944761-15a19d654956', 400),
    bio: 'A licensed family counselor focused on in-law dynamics, blended households and the art of the well-timed conversation.'
  },
  {
    id: 'omar', name: 'Adv. Omar Al-Farsi', cat: 'legal', sub: 'Marriage & Contract Law',
    price: 600, rating: 4.7, years: '15y', sessions: '180+', online: true,
    img: IMG('photo-1507003211169-0a1dd7228f2d', 400),
    bio: 'Advocate before the UAE courts for fifteen years. Omar advises on marriage contracts, registration and the legal architecture of a sound union.'
  },
];

const PARTNERS = [
  {
    id: '92A', age: 28, city: 'Dubai', match: 96, role: 'Architect',
    img: IMG('photo-1544005313-94ddf0286df2', 700),
    compat: 'Shared values on family, faith and ambition — a rare resonance.',
    qa: [
      ['On career', 'I design quiet buildings for a loud city. I’d like a home that feels the same way.'],
      ['On family', 'Sunday lunches at my grandmother’s taught me everything about love that matters.'],
      ['On the future', 'Two cats, one garden, and a bookshelf we argue about beautifully.'],
    ],
    tags: ['Family first', 'Faithful', 'Architecture', 'Calligraphy', 'Slow mornings', 'Travel'],
  },
  {
    id: '74B', age: 31, city: 'Abu Dhabi', match: 92, role: 'Physician',
    img: IMG('photo-1506794778202-cad84cf45f1d', 700),
    compat: 'Aligned on ambition and tradition, with a shared love of quiet evenings.',
    qa: [
      ['On career', 'Medicine chose me at fourteen. It taught me patience — and that every day matters.'],
      ['On family', 'I want a household where my parents always have a seat at the table.'],
      ['On the future', 'A partner to build a practice, a family, and a long story with.'],
    ],
    tags: ['Medicine', 'Tradition', 'Fajr walks', 'Poetry', 'Cooking'],
  },
  {
    id: '58C', age: 27, city: 'Sharjah', match: 89, role: 'Educator',
    img: IMG('photo-1438761681033-6461ffad8d80', 700),
    compat: 'A gentle temperament and strong family anchors on both sides.',
    qa: [
      ['On career', 'I teach seven-year-olds, which means I laugh for a living.'],
      ['On family', 'The youngest of five — our house was never quiet and I loved it.'],
      ['On the future', 'A home full of books, guests, and the smell of saffron.'],
    ],
    tags: ['Teaching', 'Big family', 'Reading', 'Gardening', 'Hospitality'],
  },
  {
    id: '41D', age: 30, city: 'Dubai', match: 87, role: 'Entrepreneur',
    img: IMG('photo-1492562080023-ab3db95bfbce', 700),
    compat: 'Complementary temperaments — one dreams, one plans, both build.',
    qa: [
      ['On career', 'I’ve built two companies. The third project should be the one that matters most.'],
      ['On family', 'My father built our family like a business: on trust, patience and Friday lunches.'],
      ['On the future', 'Someone to travel with in our twenties and sit on a porch with in our eighties.'],
    ],
    tags: ['Building things', 'Majlis talks', 'Horses', 'Fitness', 'Generosity'],
  },
];

const SLOT_TIMES = ['09:00', '10:30', '12:00', '14:00', '16:30', '18:00'];
const WEDDING_DATE = new Date('2027-05-01T18:00:00');

/* ─── State ──────────────────────────────────────────────────────────── */
const state = {
  loggedIn: false,
  subscribed: false,
  userName: 'Guest',
  cart: [],            // {key, kind, name, detail, price, qty, img}
  wishlist: new Set(),
  shopCat: 'all',
  shopQuery: '',
  specCat: 'all',
  currentPartner: null,
  currentProduct: null,
  currentVenue: null,
  currentSpecialist: null,
  chosenVariant: null,
  chosenDay: null,
  chosenSlot: null,
  rating: 0,
  navStack: [],
  current: 'splash',
  recentSearches: [],
  lastReceipt: null,
  stage: 'planning',      /* journey stage: searching | engaged | planning */
  surveyDone: false,
};

const TABS = ['home', 'khotbah', 'zahbah', 'zaffah', 'tawjeeh'];
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const scr = id => $('#scr-' + id);
const fmt = n => n.toLocaleString('en-US');
const icons = () => lucide.createIcons();
const buzz = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch (_) {} };

/* ─── Navigation ─────────────────────────────────────────────────────── */
function switchScreen(id, { remember = true } = {}) {
  if (id === state.current) return;
  const from = scr(state.current);
  const to = scr(id);
  if (!to) return;

  if (remember && to.classList.contains('push')) state.navStack.push(state.current);
  if (!to.classList.contains('push')) state.navStack = [];

  if (from) from.classList.remove('active');
  to.classList.add('active');
  if (remember) $$('.scroll', to).forEach(s => (s.scrollTop = 0));
  state.current = id;

  // status bar tone
  $('#statusbar').classList.toggle('on-dark', to.dataset.statusbar === 'dark');

  // dock only on main tabs
  $('#dock').classList.toggle('show', TABS.includes(id));
  $$('.dock-item').forEach(b => b.classList.toggle('on', b.dataset.tab === id));
  positionDock();

  // rail highlight
  $$('.rail-btn').forEach(b => b.classList.toggle('active', b.dataset.goto === id));

  // per-screen hooks
  if (id === 'home') animateHomeRing();
  if (id === 'live') startLiveTimer(); else stopLiveTimer();
  if (id === 'partner') animatePartnerRing();

  buzz(4);
}

function goBack() {
  const prev = state.navStack.pop();
  switchScreen(prev || 'home', { remember: false });
}

/* delegated navigation clicks */
document.addEventListener('click', e => {
  const go = e.target.closest('[data-goto]');
  if (go) {
    switchScreen(go.dataset.goto);
    if (go.dataset.zaffaView) showZaffaView(go.dataset.zaffaView);
    return;
  }
  const back = e.target.closest('[data-back]');
  if (back) { goBack(); return; }
  const tab = e.target.closest('.dock-item');
  if (tab) switchScreen(tab.dataset.tab);
});

/* ─── Toast ──────────────────────────────────────────────────────────── */
let toastTimer = null;
const TOAST_ICONS = { success: 'check', danger: 'shield-alert', info: 'bell', cart: 'shopping-bag' };
function toast(msg, kind = 'success', ms = 3200) {
  const t = $('#toast');
  t.dataset.kind = kind;
  $('#toastMsg').innerHTML = msg;
  const ic = $('#toastIcon');
  ic.setAttribute('data-lucide', TOAST_ICONS[kind] || 'check');
  ic.outerHTML = `<i data-lucide="${TOAST_ICONS[kind] || 'check'}" id="toastIcon"></i>`;
  icons();
  clearTimeout(toastTimer);
  t.classList.remove('show');
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  toastTimer = setTimeout(() => t.classList.remove('show'), ms);
  buzz(8);
}

/* ─── Sheets ─────────────────────────────────────────────────────────── */
function openSheet(id) {
  $('#sheetScrim').classList.add('show');
  $('#' + id).classList.add('show');
}
function closeSheets() {
  $('#sheetScrim').classList.remove('show');
  $$('.sheet').forEach(s => s.classList.remove('show'));
}
$('#sheetScrim').addEventListener('click', closeSheets);

/* ─── Veils ──────────────────────────────────────────────────────────── */
function wait(label, ms) {
  return new Promise(res => {
    $('#waitLabel').textContent = label;
    $('#waitVeil').classList.add('show');
    setTimeout(() => { $('#waitVeil').classList.remove('show'); res(); }, ms);
  });
}
function celebrate(title, copy) {
  $('#successTitle').textContent = title;
  $('#successCopy').textContent = copy;
  $('#successVeil').classList.add('show');
  buzz([20, 60, 20]);
}
$('#successDone').addEventListener('click', () => {
  $('#successVeil').classList.remove('show');
  switchScreen('home', { remember: false });
});

/* button loading helper */
function withLoading(btn, ms) {
  return new Promise(res => {
    btn.classList.add('loading');
    setTimeout(() => { btn.classList.remove('loading'); res(); }, ms);
  });
}

/* ─── Theme ──────────────────────────────────────────────────────────── */
function setTheme(mode) {
  $('#app').dataset.theme = mode;
  const dark = mode === 'dark';
  $('#railTheme').innerHTML = dark
    ? '<i data-lucide="sun"></i><span>Light mode</span>'
    : '<i data-lucide="moon"></i><span>Dark mode</span>';
  const sw = $('#profThemeSwitch');
  sw.classList.toggle('on', dark);
  sw.setAttribute('aria-checked', dark);
  icons();
}
$('#railTheme').addEventListener('click', () => setTheme($('#app').dataset.theme === 'dark' ? 'light' : 'dark'));
$('#profThemeSwitch').addEventListener('click', () => setTheme($('#app').dataset.theme === 'dark' ? 'light' : 'dark'));

/* ─── Status bar clock ───────────────────────────────────────────────── */
function tickClock() {
  const d = new Date();
  $('#sbTime').textContent = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}
tickClock();
setInterval(tickClock, 20000);

/* ─── Splash ─────────────────────────────────────────────────────────── */
function seedParticles() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const wrap = $('#splashParticles');
  for (let i = 0; i < 16; i++) {
    const s = document.createElement('span');
    const size = 2 + Math.random() * 3.5;
    s.style.cssText = `left:${Math.random() * 100}%; width:${size}px; height:${size}px;
      animation-duration:${9 + Math.random() * 10}s; animation-delay:${Math.random() * 12}s;
      opacity:${0.25 + Math.random() * 0.5};`;
    wrap.appendChild(s);
  }
}

let splashTimer = setTimeout(() => leaveSplash(), 4600);
function leaveSplash() {
  clearTimeout(splashTimer);
  if (state.current === 'splash') switchScreen(state.loggedIn ? 'home' : 'onboard');
}
scr('splash').addEventListener('click', leaveSplash);

/* try to swap the drawn monogram for the real 3D asset */
function attempt3D() {
  if (!window.KOSHA_LOGO_GLB) return;
  const mod = document.createElement('script');
  mod.type = 'module';
  mod.src = 'https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js';
  mod.onload = () => {
    const mv = document.createElement('model-viewer');
    mv.src = window.KOSHA_LOGO_GLB;
    mv.setAttribute('auto-rotate', '');
    mv.setAttribute('auto-rotate-delay', '0');
    mv.setAttribute('rotation-per-second', '10deg');
    mv.setAttribute('interaction-prompt', 'none');
    mv.setAttribute('disable-zoom', '');
    mv.setAttribute('shadow-intensity', '0');
    mv.setAttribute('exposure', '1.3');
    mv.setAttribute('camera-orbit', '0deg 84deg 108%');
    mv.style.cssText = '--progress-bar-color:transparent';
    mv.addEventListener('load', () => {
      const draw = $('.splash-logo .draw');
      draw.style.transition = 'opacity 1.2s ease';
      draw.style.opacity = '0.12';
      mv.style.opacity = '0';
      mv.style.transition = 'opacity 1.4s ease';
      requestAnimationFrame(() => (mv.style.opacity = '1'));
    });
    mv.addEventListener('error', () => mv.remove());
    $('#splash3dSlot').appendChild(mv);
  };
  document.head.appendChild(mod);
}

/* set true path lengths for line-draw animations */
function calibrateStrokes() {
  $$('.splash-logo .draw path, .stage-motif path, .ob-art .stroke').forEach(p => {
    const L = Math.ceil(p.getTotalLength());
    p.style.strokeDasharray = L;
    p.style.strokeDashoffset = L;
  });
  const loop = $('.wait-veil .loop-mark path');
  if (loop) {
    const L = Math.ceil(loop.getTotalLength());
    loop.style.strokeDasharray = `${Math.round(L * 0.22)} ${Math.round(L * 0.78)}`;
  }
}

/* ─── Onboarding ─────────────────────────────────────────────────────── */
let obIndex = 0;
const obSlides = $$('#obSlides .ob-slide');
function obShow(i) {
  obIndex = Math.max(0, Math.min(obSlides.length - 1, i));
  obSlides.forEach((s, k) => {
    s.classList.toggle('on', k === obIndex);
    s.classList.toggle('off-l', k < obIndex);
  });
  $$('#obDots .dot').forEach((d, k) => d.classList.toggle('on', k === obIndex));
  $('#obNext .btn-label').textContent = obIndex === obSlides.length - 1 ? 'Begin your story' : 'Continue';
}
$('#obNext').addEventListener('click', () => {
  if (obIndex === obSlides.length - 1) switchScreen('auth');
  else obShow(obIndex + 1);
});
$('#obSkip').addEventListener('click', () => switchScreen('auth'));

/* swipe */
let touchX = null;
scr('onboard').addEventListener('touchstart', e => (touchX = e.touches[0].clientX), { passive: true });
scr('onboard').addEventListener('touchend', e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 42) obShow(obIndex + (dx < 0 ? 1 : -1));
  touchX = null;
}, { passive: true });

/* ─── Auth ───────────────────────────────────────────────────────────── */
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

$('#authContinue').addEventListener('click', async () => {
  const field = $('#emailField');
  const email = $('#authEmail').value.trim();
  if (!EMAIL_RE.test(email)) {
    field.classList.remove('error'); void field.offsetWidth;
    field.classList.add('error');
    buzz([10, 30, 10]);
    return;
  }
  field.classList.remove('error');
  await withLoading($('#authContinue'), 900);
  $('#otpEmailEcho').textContent = email;
  switchScreen('otp');
  setTimeout(() => $$('.otp-cell')[0].focus(), 600);
});
$('#authEmail').addEventListener('input', () => $('#emailField').classList.remove('error'));

$('#uaePassBtn').addEventListener('click', async () => {
  await wait('Connecting to UAE Pass', 1500);
  login('Ahmad Al-Mansouri');
});

/* OTP cells */
const cells = $$('.otp-cell');
cells.forEach((c, i) => {
  c.addEventListener('input', () => {
    c.value = c.value.replace(/\D/g, '').slice(0, 1);
    c.classList.toggle('filled', !!c.value);
    if (c.value && i < cells.length - 1) cells[i + 1].focus();
    $('#otpVerify').disabled = !cells.every(x => x.value);
  });
  c.addEventListener('keydown', e => {
    if (e.key === 'Backspace' && !c.value && i > 0) cells[i - 1].focus();
  });
});
$('#otpVerify').addEventListener('click', async () => {
  await withLoading($('#otpVerify'), 1100);
  const email = $('#otpEmailEcho').textContent;
  const name = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, m => m.toUpperCase());
  login(name || 'Guest');
});
$('#otpResend').addEventListener('click', () => toast('A new code is on its way to your inbox.', 'info'));

function login(name) {
  state.loggedIn = true;
  state.userName = name;
  $('#profName').textContent = name;
  $('#profInitials').textContent = name.trim()[0].toUpperCase();
  $('#homeName').textContent = name.split(' ')[0];
  const h = new Date().getHours();
  $('#homeGreeting').textContent = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  cells.forEach(c => { c.value = ''; c.classList.remove('filled'); });
  $('#otpVerify').disabled = true;
  if (!state.surveyDone) {
    openSurvey();
  } else {
    switchScreen('home', { remember: false });
  }
  setTimeout(() => toast(`Ahlan, ${name.split(' ')[0]} — your journey begins.`, 'success'), 700);
}

/* ─── Home ───────────────────────────────────────────────────────────── */
function renderHome() {
  const wd = state.weddingDate === undefined ? WEDDING_DATE : state.weddingDate;
  if (wd) {
    const days = Math.max(0, Math.ceil((wd - Date.now()) / 86400000));
    $('#invDays').textContent = fmt(days);
    $('#invDate').textContent = wd.toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }) + ' · ' + (state.city || 'Dubai');
  } else {
    $('#invDays').textContent = 'Someday';
    $('#invDate').textContent = 'A season still unwritten · ' + (state.city || 'Dubai');
  }
  adaptHome();

  $('#homeVenues').innerHTML = VENUES.slice(0, 3).map(v => `
    <button class="venue-card" data-venue="${v.id}">
      <div class="ph" style="background-image:url('${v.img}')" role="img" aria-label="${v.name}">
        <span class="price-tag">from ${fmt(v.price)} AED</span>
      </div>
      <div class="vc-body">
        <h4>${v.name}</h4>
        <div class="vc-meta">
          <span class="loc"><i data-lucide="map-pin"></i>${v.city}</span>
          <span class="stars"><i data-lucide="star"></i>${v.rating}</span>
        </div>
      </div>
    </button>`).join('');

  $('#homeSpecs').innerHTML = SPECIALISTS.slice(0, 2).map(specRowHTML).join('');
  icons();
}

function animateHomeRing() {
  const ring = $('#invRing');
  requestAnimationFrame(() => { ring.style.strokeDashoffset = 213.6 * (1 - 0.72); });
}

/* ─── Khotbah ────────────────────────────────────────────────────────── */
$('#subscribeBtn').addEventListener('click', async () => {
  await withLoading($('#subscribeBtn'), 1600);
  state.subscribed = true;
  const sub = $('#profSub');
  sub.textContent = 'Privée · Active';
  sub.classList.add('pos');
  unlockDirectory();
  toast('Welcome to the circle — your membership is active.', 'success');
});

function unlockDirectory() {
  $('#khotbahLocked').style.display = state.subscribed ? 'none' : '';
  $('#khotbahDirectory').style.display = state.subscribed ? '' : 'none';
  if (state.subscribed) renderMatches('All matches');
}

function renderMatches(filter) {
  const list = PARTNERS.filter(p => {
    if (filter === 'All matches') return true;
    if (filter === '25–30') return p.age >= 25 && p.age <= 30;
    return p.city === filter;
  });
  $('#matchGrid').innerHTML = list.map(p => `
    <button class="match-card" data-partner="${p.id}">
      <span class="match-badge">${p.match}% match</span>
      <div class="ph" style="background-image:url('${p.img}')">
        <div class="veil"></div>
        <div class="mono">${p.id}</div>
      </div>
      <div class="mc-body">
        <h4>Candidate ${p.id}</h4>
        <p>${p.age} yrs · ${p.city} · ${p.role}</p>
      </div>
    </button>`).join('') ||
    `<div class="empty" style="grid-column:1/-1"><h3>No profiles match</h3><p>Loosen a filter and let fate breathe.</p></div>`;
  icons();
}

$('#matchFilters').addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  $$('#matchFilters .chip').forEach(c => c.classList.remove('on'));
  chip.classList.add('on');
  renderMatches(chip.textContent.trim());
});

/* partner detail */
function openPartner(id) {
  const p = PARTNERS.find(x => x.id === id);
  if (!p) return;
  state.currentPartner = p;
  $('#ppPhoto').style.backgroundImage = `url('${p.img}')`;
  $('#ppName').textContent = 'Candidate ' + p.id;
  $('#ppMeta').textContent = `${p.age} · ${p.city} · ${p.role}`;
  $('#ppRingTxt').textContent = p.match + '%';
  $('#ppCompatCopy').textContent = p.compat;
  renderRadarChart([p.match, Math.max(70, p.match - 4), Math.max(75, p.match - 6), p.match, Math.max(72, p.match - 3)]);
  $('#ppQA').innerHTML = p.qa.map(([q, a]) => `
    <div class="card qa-block rise" style="margin-top:12px">
      <div class="q">${q}</div><div class="a">“${a}”</div>
    </div>`).join('');
  $('#ppTags').innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
  const ring = $('#ppRing');
  ring.style.strokeDashoffset = 264;
  switchScreen('partner');
  icons();
}
function animatePartnerRing() {
  const p = state.currentPartner; if (!p) return;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => { $('#ppRing').style.strokeDashoffset = 264 * (1 - p.match / 100); }));
}
$('#ppSkip').addEventListener('click', goBack);
$('#ppReport').addEventListener('click', () => toast('Profile flagged. Our care team will review it discreetly.', 'info'));
$('#ppConnect').addEventListener('click', () => openSheet('sheetConnect'));
$('#connectSend').addEventListener('click', async () => {
  await withLoading($('#connectSend'), 1100);
  closeSheets();
  $('#connectMsg').value = '';
  const p = state.currentPartner;
  toast(`Request sent to Candidate ${p.id} — we'll let you know.`, 'success');
  setTimeout(() => {
    toast(`Candidate ${p.id} accepted your request. Say hello!`, 'info', 4200);
    setTimeout(() => switchScreen('chat'), 1400);
  }, 3200);
});

/* ─── Zahbah ─────────────────────────────────────────────────────────── */
function renderShop() {
  const q = state.shopQuery.toLowerCase();
  const list = PRODUCTS.filter(p =>
    (state.shopCat === 'all' || p.cat === state.shopCat) &&
    (!q || (p.name + ' ' + p.brand).toLowerCase().includes(q)));
  $('#shopGrid').innerHTML = list.map(p => `
    <button class="product-card" data-product="${p.id}">
      <span class="wish ${state.wishlist.has(p.id) ? 'on' : ''}" data-wish="${p.id}" role="button" tabindex="0" aria-label="Save ${p.name}">
        <i data-lucide="heart"></i>
      </span>
      <div class="ph" style="background-image:url('${p.img}')" role="img" aria-label="${p.name}"></div>
      <div class="pc-body">
        <div class="pc-brand">${p.brand}</div>
        <h4>${p.name}</h4>
        <div class="pc-price">${fmt(p.price)} <small>AED</small></div>
      </div>
    </button>`).join('');
  $('#shopEmpty').style.display = list.length ? 'none' : '';
  $('#shopGrid').style.display = list.length ? '' : 'none';
  icons();
}
$('#shopSearch').addEventListener('input', e => { state.shopQuery = e.target.value; renderShop(); });
$('#shopClear').addEventListener('click', () => {
  state.shopQuery = ''; $('#shopSearch').value = ''; renderShop();
});
$('#shopChips').addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  $$('#shopChips .chip').forEach(c => c.classList.remove('on'));
  chip.classList.add('on');
  state.shopCat = chip.dataset.cat;
  renderShop();
});
document.addEventListener('click', e => {
  const w = e.target.closest('[data-wish]');
  if (!w) return;
  e.stopPropagation();
  const id = w.dataset.wish;
  if (state.wishlist.has(id)) state.wishlist.delete(id); else { state.wishlist.add(id); buzz(10); }
  w.classList.toggle('on', state.wishlist.has(id));
  if (state.wishlist.has(id)) {
    const r = w.getBoundingClientRect(), c = $('#sparkleCanvas')?.getBoundingClientRect();
    if (c) triggerSparkles(r.left - c.left + r.width / 2, r.top - c.top + r.height / 2);
  }
  renderChestGrid();
  if (state.currentProduct?.id === id) syncPdWish();
}, true);

/* product detail */
function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  state.currentProduct = p;
  state.chosenVariant = null;
  $('#pdPhoto').style.backgroundImage = `url('${p.img}')`;
  $('#pdBrand').textContent = p.brand;
  $('#pdName').textContent = p.name;
  $('#pdRating').textContent = p.rating.toFixed(1);
  $('#pdReviews').textContent = `· ${p.reviews} reviews`;
  $('#pdPrice').textContent = fmt(p.price);
  $('#pdDesc').textContent = p.desc;
  $('#pdOptLabel').textContent = p.optLabel;
  $('#pdVariants').innerHTML = p.opts.map(o => `<button class="varchip" data-var="${o}">${o}</button>`).join('');
  const addBtn = $('#pdAdd');
  addBtn.querySelector('.btn-label').innerHTML = '<i data-lucide="shopping-bag"></i>&nbsp;Add to Cart';
  syncPdWish();
  switchScreen('product');
  icons();
}
function syncPdWish() {
  const on = !!(state.currentProduct && state.wishlist.has(state.currentProduct.id));
  const btn = $('#pdWish');
  btn.style.color = on ? 'var(--danger)' : '';
  const svg = btn.querySelector('svg');
  if (svg) svg.style.fill = on ? 'currentColor' : 'none';
}
$('#pdWish').addEventListener('click', () => {
  const p = state.currentProduct; if (!p) return;
  if (state.wishlist.has(p.id)) state.wishlist.delete(p.id); else state.wishlist.add(p.id);
  syncPdWish(); renderShop();
  toast(state.wishlist.has(p.id) ? 'Saved to your wishlist.' : 'Removed from wishlist.', 'info', 1800);
});
$('#pdVariants').addEventListener('click', e => {
  const v = e.target.closest('.varchip');
  if (!v) return;
  $$('#pdVariants .varchip').forEach(c => c.classList.remove('on'));
  v.classList.add('on');
  state.chosenVariant = v.dataset.var;
});
$('#pdAdd').addEventListener('click', () => {
  const p = state.currentProduct;
  if (!state.chosenVariant) {
    const row = $('#pdVariants');
    row.classList.remove('attention'); void row.offsetWidth;
    row.classList.add('attention');
    toast(`Please ${p.optLabel.toLowerCase()} first.`, 'danger', 2200);
    return;
  }
  addToCart({
    key: p.id + '·' + state.chosenVariant, kind: 'Boutique',
    name: p.name, detail: `${p.optLabel.replace('Select ', '')}: ${state.chosenVariant}`,
    price: p.price, img: p.img,
  });
  const label = $('#pdAdd .btn-label');
  label.innerHTML = '<i data-lucide="check"></i>&nbsp;Added to Cart';
  icons();
  setTimeout(() => { label.innerHTML = '<i data-lucide="shopping-bag"></i>&nbsp;Add to Cart'; icons(); }, 1600);
});

/* ─── Zaffah ─────────────────────────────────────────────────────────── */
function renderServices() {
  $('#svcList').innerHTML = VENUES.map(v => `
    <button class="svc-card" data-venue="${v.id}">
      <div class="ph" style="background-image:url('${v.img}')" role="img" aria-label="${v.name}">
        <span class="cap-tag"><i data-lucide="users"></i>up to ${v.cap} guests</span>
      </div>
      <div class="sc-body">
        <div class="sc-top"><h4>${v.name}</h4><span class="stars"><i data-lucide="star"></i>${v.rating}</span></div>
        <div class="sc-meta"><i data-lucide="map-pin"></i>${v.city}, United Arab Emirates</div>
        <div class="sc-foot">
          <span class="sc-price">from ${fmt(v.price)} AED <small>/ evening</small></span>
          <span class="seeall">Reserve <i data-lucide="arrow-right"></i></span>
        </div>
      </div>
    </button>`).join('');
  icons();
}

function openVenue(id) {
  const v = VENUES.find(x => x.id === id);
  if (!v) return;
  state.currentVenue = v;
  $('#svPhoto').style.backgroundImage = `url('${v.img}')`;
  $('#svName').textContent = v.name;
  $('#svLoc').textContent = v.city + ', UAE';
  $('#svRating').textContent = v.rating.toFixed(1);
  $('#svCap').textContent = `· up to ${v.cap} guests`;
  $('#svPrice').textContent = fmt(v.price);
  $('#svDesc').textContent = v.desc;
  $('#svDate').selectedIndex = 0;
  $('#svGuests').value = Math.min(250, v.cap);
  syncGuestSlider();
  switchScreen('service');
  icons();
}

function syncGuestSlider() {
  const r = $('#svGuests');
  $('#svGuestVal').textContent = r.value;
  const pct = ((r.value - r.min) / (r.max - r.min)) * 100;
  r.style.setProperty('--fill', pct + '%');
}
$('#svGuests').addEventListener('input', syncGuestSlider);

$('#svBook').addEventListener('click', async () => {
  const v = state.currentVenue;
  const dateSel = $('#svDate');
  if (!dateSel.value) {
    const f = dateSel.closest('.field');
    f.classList.remove('error'); void f.offsetWidth; f.classList.add('error');
    toast('Choose a date for your evening first.', 'danger', 2400);
    return;
  }
  dateSel.closest('.field').classList.remove('error');
  await withLoading($('#svBook'), 1200);
  addToCart({
    key: 'venue·' + v.id, kind: 'Venue booking',
    name: v.name, detail: `${dateSel.value} · ${$('#svGuests').value} guests`,
    price: v.price, img: v.img, single: true,
  });
  toast('Request sent — awaiting venue approval.', 'success');
  switchScreen('cart');
});

/* ─── Tawjeeh ────────────────────────────────────────────────────────── */
function specRowHTML(s) {
  return `
    <button class="spec-row" data-spec-id="${s.id}">
      <span class="avatar" style="background-image:url('${s.img}')">${s.online ? '<span class="live-dot"></span>' : ''}</span>
      <span class="sp-info">
        <h4>${s.name}</h4>
        <div class="sp-sub">${s.sub}</div>
      </span>
      <span class="sp-side">
        <span class="stars"><i data-lucide="star"></i>${s.rating.toFixed(1)}</span>
        <div class="sp-price">${s.price} <small>AED/hr</small></div>
      </span>
    </button>`;
}
function renderSpecialists() {
  const list = SPECIALISTS.filter(s => state.specCat === 'all' || s.cat === state.specCat);
  $('#specList').innerHTML = list.map(specRowHTML).join('') ||
    `<div class="empty"><h3>No specialists here</h3><p>Try another discipline.</p></div>`;
  icons();
}
function moveSegGlider(seg) {
  if (!seg) return;
  const on = $('.seg-btn.on', seg);
  const g = $('.seg-glider', seg);
  if (!on || !g) return;
  g.style.left = on.offsetLeft + 'px';
  g.style.width = on.offsetWidth + 'px';
}
function moveGlider() { $$('.seg').forEach(moveSegGlider); }
$('#specSeg').addEventListener('click', e => {
  const b = e.target.closest('.seg-btn');
  if (!b) return;
  $$('#specSeg .seg-btn').forEach(x => x.classList.remove('on'));
  b.classList.add('on');
  state.specCat = b.dataset.spec;
  moveGlider();
  renderSpecialists();
});

function openSpecialist(id) {
  const s = SPECIALISTS.find(x => x.id === id);
  if (!s) return;
  state.currentSpecialist = s;
  state.chosenDay = null; state.chosenSlot = null;
  $('#sdAvatar').style.backgroundImage = `url('${s.img}')`;
  $('#sdAvatar').innerHTML = s.online ? '<span class="live-dot"></span>' : '';
  $('#sdName').textContent = s.name;
  $('#sdSub').textContent = s.sub;
  $('#sdRating').textContent = s.rating.toFixed(1);
  $('#sdYears').textContent = s.years;
  $('#sdSessions').textContent = s.sessions;
  $('#sdBio').textContent = s.bio;
  $('#sdPrice').textContent = s.price;
  renderCalendar();
  switchScreen('specialist');
  icons();
}

function renderCalendar() {
  const days = [];
  const now = new Date();
  for (let i = 1; i <= 10; i++) {
    const d = new Date(now); d.setDate(now.getDate() + i);
    days.push(d);
  }
  const specSeed = SPECIALISTS.indexOf(state.currentSpecialist);
  $('#sdCal').innerHTML = days.map((d, i) => {
    const off = (i + specSeed) % 5 === 3;
    return `<button class="calday ${off ? 'off' : ''} ${state.chosenDay === i ? 'on' : ''}" data-day="${i}">
      <div class="dow">${d.toLocaleDateString('en', { weekday: 'short' })}</div>
      <div class="dom">${d.getDate()}</div>
    </button>`;
  }).join('');
  renderSlots();
}
function renderSlots() {
  const specSeed = SPECIALISTS.indexOf(state.currentSpecialist);
  if (state.chosenDay === null) {
    $('#sdSlots').innerHTML = `<div style="grid-column:1/-1;font-size:0.78rem;color:var(--text-3);padding:10px 2px">Select a day to see available hours.</div>`;
    return;
  }
  $('#sdSlots').innerHTML = SLOT_TIMES.map((t, i) => {
    const off = (i + state.chosenDay + specSeed) % 4 === 2;
    return `<button class="slot ${off ? 'off' : ''} ${state.chosenSlot === t ? 'on' : ''}" data-slot="${t}">${t}</button>`;
  }).join('');
}
$('#sdCal').addEventListener('click', e => {
  const d = e.target.closest('.calday');
  if (!d || d.classList.contains('off')) return;
  state.chosenDay = +d.dataset.day;
  state.chosenSlot = null;
  $$('#sdCal .calday').forEach(x => x.classList.toggle('on', +x.dataset.day === state.chosenDay));
  renderSlots();
});
$('#sdSlots').addEventListener('click', e => {
  const s = e.target.closest('.slot');
  if (!s || s.classList.contains('off')) return;
  state.chosenSlot = s.dataset.slot;
  $$('#sdSlots .slot').forEach(x => x.classList.toggle('on', x.dataset.slot === state.chosenSlot));
});
$('#sdBook').addEventListener('click', async () => {
  const s = state.currentSpecialist;
  if (state.chosenDay === null || !state.chosenSlot) {
    toast('Pick a day and an hour for your session.', 'danger', 2400);
    return;
  }
  const d = new Date(); d.setDate(d.getDate() + 1 + state.chosenDay);
  const when = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  await withLoading($('#sdBook'), 1100);
  addToCart({
    key: 'session·' + s.id, kind: 'Consultation',
    name: `Session · ${s.name}`, detail: `${when} · ${state.chosenSlot}`,
    price: s.price, img: s.img, single: true,
  });
  toast('Session requested — awaiting specialist confirmation.', 'success');
  switchScreen('cart');
});

/* ─── Cart ───────────────────────────────────────────────────────────── */
function addToCart(item) {
  const existing = state.cart.find(x => x.key === item.key);
  if (existing && !item.single) existing.qty += 1;
  else if (!existing) state.cart.push({ ...item, qty: 1 });
  updateCartBadges();
  renderCart();
  buzz(12);
}
function cartCount() { return state.cart.reduce((n, x) => n + x.qty, 0); }
function updateCartBadges() {
  const n = cartCount();
  $$('#cartBadge, .cart-badge').forEach(b => {
    b.textContent = n;
    b.classList.toggle('show', n > 0);
  });
}
function renderCart() {
  const list = $('#cartList');
  list.innerHTML = state.cart.map(x => `
    <div class="card cart-row" data-key="${x.key}">
      <div class="ph" style="background-image:url('${x.img}')"></div>
      <div class="cr-info">
        <h4>${x.name}</h4>
        <div class="cr-kind">${x.kind}${x.detail ? ' · ' + x.detail : ''}</div>
        <div class="cr-price">${fmt(x.price * x.qty)} AED</div>
      </div>
      <div class="cr-side">
        <button class="cr-del" data-del="${x.key}" aria-label="Remove ${x.name}"><i data-lucide="trash-2"></i></button>
        ${x.single ? '' : `
        <div class="qty">
          <button data-qty="-1" data-key="${x.key}" aria-label="Decrease"><i data-lucide="minus"></i></button>
          <b>${x.qty}</b>
          <button data-qty="1" data-key="${x.key}" aria-label="Increase"><i data-lucide="plus"></i></button>
        </div>`}
      </div>
    </div>`).join('');
  const has = state.cart.length > 0;
  $('#cartFilled').style.display = has ? '' : 'none';
  $('#cartEmpty').style.display = has ? 'none' : '';
  updateSums();
  icons();
}
function updateSums() {
  const sub = state.cart.reduce((n, x) => n + x.price * x.qty, 0);
  const vat = Math.round(sub * 0.05);
  const total = sub + vat;
  $('#sumSub').textContent = fmt(sub) + ' AED';
  $('#sumVat').textContent = fmt(vat) + ' AED';
  $('#sumTotal').textContent = fmt(total) + ' AED';
  updateInstallments(total);
}
$('#cartList').addEventListener('click', e => {
  const del = e.target.closest('[data-del]');
  if (del) {
    const key = del.dataset.del;
    const row = $(`.cart-row[data-key="${CSS.escape(key)}"]`);
    row.classList.add('removing');
    setTimeout(() => {
      state.cart = state.cart.filter(x => x.key !== key);
      updateCartBadges(); renderCart();
    }, 430);
    return;
  }
  const q = e.target.closest('[data-qty]');
  if (q) {
    const item = state.cart.find(x => x.key === q.dataset.key);
    if (!item) return;
    item.qty = Math.max(1, item.qty + Number(q.dataset.qty));
    updateCartBadges(); renderCart();
  }
});

async function payFlow(label) {
  const sub = state.cart.reduce((n, x) => n + x.price * x.qty, 0);
  const vat = Math.round(sub * 0.05);
  state.lastReceipt = {
    total: sub + vat,
    vendor: state.cart.map(x => x.name).slice(0, 2).join(' · ') || 'KOSHA Collection',
    hash: '0x' + Math.random().toString(16).slice(2, 10).toUpperCase() + '·KOSHA',
  };
  await wait(label, 2000);
  celebrate('It’s done.', 'Payment confirmed. Vendors have been notified and your plans are in motion.');
  state.cart = [];
  updateCartBadges(); renderCart();
}
$('#payApple').addEventListener('click', () => payFlow('Confirming with Apple Pay'));
$('#payCard').addEventListener('click', () => payFlow('Securing payment via Stripe'));

/* ─── Chat — guarded messaging (violation scan preserved) ────────────── */
const PHONE_RE = /(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
const CHAT_EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const LINK_RE = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

const REPLIES = [
  'That sounds wonderful. Tell me more about your family?',
  'I was hoping you would say that.',
  'My mother would agree with you completely.',
  'Perhaps we could arrange a chaperoned meeting through the concierge?',
  'You have a lovely way of putting things.',
];
let replyIdx = 0;

function timeNow() {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}
function appendMsg(text, cls) {
  const log = $('#chatLog');
  const div = document.createElement('div');
  div.className = 'msg ' + cls;
  div.textContent = text;
  const t = document.createElement('span');
  t.className = 'm-time';
  t.textContent = timeNow();
  div.appendChild(t);
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}
function sendChat() {
  const input = $('#chatText');
  const text = input.value.trim();
  if (!text) return;
  PHONE_RE.lastIndex = CHAT_EMAIL_RE.lastIndex = LINK_RE.lastIndex = 0;
  if (PHONE_RE.test(text) || CHAT_EMAIL_RE.test(text) || LINK_RE.test(text)) {
    toast('<b>Guarded introduction.</b> Phone numbers, emails and links stay private at this stage.', 'danger', 3800);
    input.style.animation = 'shake 0.45s';
    setTimeout(() => (input.style.animation = ''), 500);
    buzz([15, 40, 15, 40, 15]);
    return;
  }
  appendMsg(text, 'sent');
  input.value = '';
  const log = $('#chatLog');
  setTimeout(() => {
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    log.appendChild(typing);
    log.scrollTop = log.scrollHeight;
    setTimeout(() => {
      typing.remove();
      appendMsg(REPLIES[replyIdx++ % REPLIES.length], 'recv');
    }, 1500);
  }, 700);
}
$('#chatSend').addEventListener('click', sendChat);
$('#chatText').addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });
$('#chatReport').addEventListener('click', () =>
  toast('Conversation reported. A moderator will review it shortly.', 'info'));

/* ─── Live session ───────────────────────────────────────────────────── */
let liveInterval = null, liveSeconds = 0;
function startLiveTimer() {
  stopLiveTimer(); liveSeconds = 0;
  $('#liveTimer').textContent = '00:00';
  liveInterval = setInterval(() => {
    liveSeconds++;
    const m = String(Math.floor(liveSeconds / 60)).padStart(2, '0');
    const s = String(liveSeconds % 60).padStart(2, '0');
    $('#liveTimer').textContent = `${m}:${s}`;
  }, 1000);
}
function stopLiveTimer() { clearInterval(liveInterval); liveInterval = null; }

function toggleLiveBtn(btn, onIcon, offIcon) {
  const muted = btn.classList.toggle('muted');
  btn.innerHTML = `<i data-lucide="${muted ? offIcon : onIcon}"></i>`;
  icons();
}
$('#liveMic').addEventListener('click', () => toggleLiveBtn($('#liveMic'), 'mic', 'mic-off'));
$('#liveCam').addEventListener('click', () => toggleLiveBtn($('#liveCam'), 'video', 'video-off'));
$('#liveEnd').addEventListener('click', () => {
  stopLiveTimer();
  openSheet('sheetRate');
});

/* rating sheet */
$('#rateRow').addEventListener('click', e => {
  const s = e.target.closest('.rate-star');
  if (!s) return;
  state.rating = +s.dataset.v;
  $$('#rateRow .rate-star').forEach(x => x.classList.toggle('lit', +x.dataset.v <= state.rating));
  buzz(8);
});
$('#rateSubmit').addEventListener('click', () => {
  closeSheets();
  switchScreen('home', { remember: false });
  toast(state.rating >= 4
    ? 'Thank you — Dr. Amina will be delighted.'
    : 'Thank you — your feedback shapes the circle.', 'success');
  state.rating = 0;
  setTimeout(() => $$('#rateRow .rate-star').forEach(x => x.classList.remove('lit')), 600);
});

/* ─── Profile / sign out / reset ─────────────────────────────────────── */
$('#signOutBtn').addEventListener('click', () => openSheet('sheetSignout'));
$('#signoutCancel').addEventListener('click', closeSheets);
$('#signoutConfirm').addEventListener('click', () => { closeSheets(); resetJourney(); });
$('#railReset').addEventListener('click', resetJourney);

function resetJourney() {
  Object.assign(state, {
    loggedIn: false, subscribed: false, userName: 'Guest',
    cart: [], wishlist: new Set(), shopCat: 'all', shopQuery: '',
    specCat: 'all', rating: 0, navStack: [],
    recentSearches: [], lastReceipt: null, stage: 'planning', surveyDone: false,
    weddingDate: undefined, city: undefined, budget: undefined,
  });
  renderRecentSearches();
  renderHome();
  $('#profName').textContent = 'Guest';
  $('#profInitials').textContent = 'G';
  const sub = $('#profSub');
  sub.textContent = 'Inactive'; sub.classList.remove('pos');
  $('#authEmail').value = '';
  $('#shopSearch').value = '';
  $$('#shopChips .chip').forEach((c, i) => c.classList.toggle('on', i === 0));
  updateCartBadges(); renderCart(); renderShop(); unlockDirectory();
  obShow(0);
  switchScreen('splash', { remember: false });
  splashTimer = setTimeout(() => leaveSplash(), 4600);
}

/* ─── Delegated openers for dynamic cards ────────────────────────────── */
document.addEventListener('click', e => {
  if (e.target.closest('[data-wish]')) return;
  const v = e.target.closest('[data-venue]');
  if (v) { openVenue(v.dataset.venue); return; }
  const p = e.target.closest('[data-product]');
  if (p) { openProduct(p.dataset.product); return; }
  const s = e.target.closest('[data-spec-id]');
  if (s) { openSpecialist(s.dataset.specId); return; }
  const m = e.target.closest('[data-partner]');
  if (m) { openPartner(m.dataset.partner); return; }
});

/* ══════════════════════════════════════════════════════════════════════
   19. SIGNATURE ELEMENT LOGIC & INTERACTION ENGINE
   ══════════════════════════════════════════════════════════════════════ */

/* ─── 1. Sparkle Micro-Interactions ─── */
function triggerSparkles(x, y) {
  const canvas = $('#sparkleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth || 396;
  canvas.height = canvas.offsetHeight || 838;
  
  const particles = [];
  const count = 18;
  const px = x || canvas.width / 2;
  const py = y || canvas.height / 2;

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
    const speed = 2 + Math.random() * 4;
    particles.push({
      x: px, y: py,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5,
      size: 8 + Math.random() * 12,
      alpha: 1,
      char: Math.random() > 0.4 ? '✦' : '✨'
    });
  }

  function renderSparkles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;
    particles.forEach(p => {
      if (p.alpha <= 0) return;
      active = true;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.035;
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = '#C9AD7C';
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.char, p.x, p.y);
    });
    if (active) requestAnimationFrame(renderSparkles);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  renderSparkles();
}

/* ─── 2. Search Studio Workspace ─── */
let studioPillar = 'all';

function initSearchStudio() {
  const openBtns = [$('#openSearchStudio'), $('#openSearchStudioBar')];
  openBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', () => switchScreen('search-studio'));
  });

  const range = $('#studioBudgetRange');
  const val = $('#studioBudgetVal');
  if (range && val) {
    range.addEventListener('input', e => {
      val.textContent = fmt(+e.target.value);
      renderStudioHistogram(+e.target.value);
      renderStudioResults();
    });
  }

  const queryInput = $('#studioQuery');
  if (queryInput) {
    queryInput.addEventListener('input', () => renderStudioResults());
    queryInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && queryInput.value.trim()) rememberSearch(queryInput.value.trim());
    });
  }

  $('#studioClear')?.addEventListener('click', () => {
    if (queryInput) { queryInput.value = ''; queryInput.focus(); }
    renderStudioResults();
  });

  $('#studioRecent')?.addEventListener('click', e => {
    const chip = e.target.closest('[data-recent]');
    if (!chip || !queryInput) return;
    queryInput.value = chip.dataset.recent;
    renderStudioResults();
  });

  $('#studioExplore')?.addEventListener('click', () => {
    if (queryInput?.value.trim()) rememberSearch(queryInput.value.trim());
    const first = $('#studioResults [data-res-idx]');
    if (first) first.click();
  });

  $('#studioPillarChips')?.addEventListener('click', e => {
    const chip = e.target.closest('[data-pillar]');
    if (!chip) return;
    $$('#studioPillarChips .chip').forEach(c => c.classList.remove('on'));
    chip.classList.add('on');
    studioPillar = chip.dataset.pillar;
    renderStudioResults();
  });

  $('#studioQuickTags')?.addEventListener('click', e => {
    const tag = e.target.closest('[data-tag]');
    if (!tag) return;
    if (queryInput) queryInput.value = tag.dataset.tag;
    renderStudioResults();
  });

  renderStudioHistogram(25000);
  renderRecentSearches();
  renderStudioResults();
}

/* recent searches — kept for the session, rendered as quiet chips */
function rememberSearch(q) {
  state.recentSearches = [q, ...(state.recentSearches || []).filter(x => x !== q)].slice(0, 4);
  renderRecentSearches();
}
function renderRecentSearches() {
  const wrap = $('#studioRecent');
  if (!wrap) return;
  const list = state.recentSearches || [];
  wrap.parentElement.style.display = list.length ? '' : 'none';
  wrap.innerHTML = list.map(q =>
    `<button class="chip" data-recent="${q}"><i data-lucide="history"></i>&nbsp;${q}</button>`).join('');
  icons();
}

/* histogram drawn from the real price distribution of the catalogue */
function renderStudioHistogram(currentMax) {
  const container = $('#studioHistogram');
  if (!container) return;
  const prices = [...PRODUCTS.map(p => p.price), ...VENUES.map(v => v.price), ...SPECIALISTS.map(s => s.price)];
  const BUCKETS = 10, span = 50000 / BUCKETS;
  const counts = Array.from({ length: BUCKETS }, (_, i) =>
    prices.filter(p => p >= i * span && p < (i + 1) * span).length);
  const peak = Math.max(...counts, 1);
  container.innerHTML = counts.map((c, i) => {
    const h = 14 + (c / peak) * 86;
    const active = (i + 1) * span <= currentMax + span / 2;
    return `<div class="bar ${active ? 'active' : ''}" style="height:${h}%"></div>`;
  }).join('');
}

function renderStudioResults() {
  const container = $('#studioResults');
  if (!container) return;
  const q = ($('#studioQuery')?.value || '').toLowerCase();
  const maxB = +($('#studioBudgetRange')?.value || 50000);

  const hit = (...fields) => !q || fields.some(f => f.toLowerCase().includes(q));
  let results = [];

  if (studioPillar === 'all' || studioPillar === 'zahbah') {
    PRODUCTS.filter(p => p.price <= maxB && hit(p.name, p.brand, p.cat))
      .forEach(p => results.push({ type: 'Zahba · Boutique', title: p.name, sub: `${p.brand} · ${fmt(p.price)} AED`, img: p.img, action: () => openProduct(p.id) }));
  }

  if (studioPillar === 'all' || studioPillar === 'zaffah') {
    VENUES.filter(v => v.price <= maxB && hit(v.name, v.city, 'venues dubai'))
      .forEach(v => results.push({ type: 'Zaffa · Venue', title: v.name, sub: `${v.city} · from ${fmt(v.price)} AED`, img: v.img, action: () => openVenue(v.id) }));
  }

  if (studioPillar === 'all' || studioPillar === 'tawjeeh') {
    SPECIALISTS.filter(s => s.price <= maxB && hit(s.name, s.sub, 'legal advice counsel'))
      .forEach(s => results.push({ type: 'Tawjeeh · Counsel', title: s.name, sub: `${s.sub} · ${fmt(s.price)} AED/hr`, img: s.img, action: () => openSpecialist(s.id) }));
  }

  if (studioPillar === 'khotbah') {
    PARTNERS.filter(p => hit('candidate ' + p.id, p.city, p.role))
      .forEach(p => results.push({ type: 'Khitbah · Match', title: `Candidate ${p.id}`, sub: `${p.age} · ${p.city} · ${p.match}% match`, img: p.img, veiled: true, action: () => state.subscribed ? openPartner(p.id) : switchScreen('khotbah') }));
  }

  const explore = $('#studioExplore');
  if (explore) {
    explore.querySelector('.btn-label').textContent =
      results.length ? `Explore ${results.length} ${results.length === 1 ? 'match' : 'matches'}` : 'No matches — widen the arc';
    explore.disabled = !results.length;
  }

  if (results.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:24px 10px;color:var(--text-3);font-size:0.8rem">Nothing within this budget arc yet — try widening it, or clearing a word.</div>`;
    return;
  }

  container.innerHTML = results.slice(0, 8).map((r, i) => `
    <div class="card pressable studio-res-row" data-res-idx="${i}" style="display:flex;align-items:center;gap:12px;padding:10px 14px">
      <div class="ph" style="width:44px;height:44px;border-radius:14px 8px 14px 14px;background-image:url('${r.img}');flex-shrink:0;${r.veiled ? 'filter:blur(6px) brightness(0.9);' : ''}"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:0.6rem;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:var(--champagne)">${r.type}</div>
        <h4 style="font-size:0.86rem;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.title}</h4>
        <div style="font-size:0.7rem;color:var(--text-3)">${r.sub}</div>
      </div>
      <i data-lucide="chevron-right" style="width:16px;height:16px;color:var(--text-3)"></i>
    </div>
  `).join('');

  container.onclick = e => {
    const row = e.target.closest('[data-res-idx]');
    if (row) results[+row.dataset.resIdx].action();
  };
  icons();
}

/* ─── 3. 5-Pillar Compatibility Radar Wheel ─── */
function renderRadarChart(scores = [92, 95, 88, 96, 90]) {
  const chart = $('#ppRadarChart');
  if (!chart) return;
  const center = 100, radius = 65;
  const pillars = ['Values', 'Family', 'Ambition', 'Faith', 'Lifestyle'];
  const total = pillars.length;

  let gridSvg = '';
  [0.33, 0.66, 1].forEach(rRatio => {
    let pts = [];
    for (let i = 0; i < total; i++) {
      const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
      pts.push(`${center + Math.cos(angle) * radius * rRatio},${center + Math.sin(angle) * radius * rRatio}`);
    }
    gridSvg += `<polygon points="${pts.join(' ')}" class="radar-grid" />`;
  });

  let polyPts = [];
  let labelsSvg = '';

  for (let i = 0; i < total; i++) {
    const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
    const scoreRatio = (scores[i] || 90) / 100;
    const px = center + Math.cos(angle) * radius * scoreRatio;
    const py = center + Math.sin(angle) * radius * scoreRatio;
    polyPts.push(`${px},${py}`);

    const lx = center + Math.cos(angle) * (radius + 18);
    const ly = center + Math.sin(angle) * (radius + 18) + 3;
    labelsSvg += `<text x="${lx}" y="${ly}" class="radar-label">${pillars[i]}</text>`;
    gridSvg += `<line x1="${center}" y1="${center}" x2="${center + Math.cos(angle) * radius}" y2="${center + Math.sin(angle) * radius}" class="radar-axis" />`;
  }

  chart.innerHTML = `
    ${gridSvg}
    <polygon points="${polyPts.join(' ')}" class="radar-poly" />
    ${labelsSvg}
  `;
}

/* ─── 4. Zahba Digital Trousseau Chest ─── */
function initZahbaChest() {
  const seg = $('#zahbaSeg');
  if (!seg) return;
  seg.addEventListener('click', e => {
    const btn = e.target.closest('.seg-btn');
    if (!btn) return;
    $$('#zahbaSeg .seg-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    moveSegGlider(seg);
    const mode = btn.dataset.mode;
    $('#zahbaCollectionView').style.display = mode === 'collection' ? '' : 'none';
    $('#zahbaChestView').style.display = mode === 'chest' ? '' : 'none';
    if (mode === 'chest') renderChestGrid();
  });
}

function renderChestGrid() {
  const grid = $('#chestGrid');
  if (!grid) return;
  const items = PRODUCTS.filter(p => state.wishlist.has(p.id));
  const value = items.reduce((n, p) => n + p.price, 0);
  if ($('#chestCount')) $('#chestCount').textContent = `${items.length} / ${PRODUCTS.length}`;
  if ($('#chestValue')) $('#chestValue').textContent = fmt(value) + ' AED';

  if (!items.length) {
    grid.innerHTML = `
      <div class="empty" style="grid-column:1/-1;padding:34px 20px 20px">
        <svg class="e-logo" aria-hidden="true"><use href="#k-logo" fill="url(#logoRibbon)"/></svg>
        <h3>The chest awaits</h3>
        <p>Save a gown, a ring, a veil — tap the heart on any piece and it joins your trousseau.</p>
        <button class="btn slim quiet" id="chestBrowse" style="max-width:200px">Browse the atelier</button>
      </div>`;
    $('#chestBrowse')?.addEventListener('click', () => {
      $('#zahbaSeg [data-mode="collection"]')?.click();
    });
    icons();
    return;
  }

  grid.innerHTML = items.map(p => `
    <button class="chest-card" data-product="${p.id}">
      <div class="cc-stamp">✦</div>
      <div class="cc-thumb" style="background-image:url('${p.img}')"></div>
      <h5>${p.name}</h5>
      <div class="cc-val">${fmt(p.price)} AED</div>
    </button>
  `).join('');
}

/* ─── 5. Zaffa 15-Milestone Interactive Dream Roadmap Arc ─── */
const ROADMAP_NODES = [
  { id: 1, title: 'Engagement Ring', status: 'completed', prereq: 'Khitbah Lock', target: '12 Months' },
  { id: 2, title: 'Budget Allocation', status: 'completed', prereq: 'Family Accord', target: '11 Months' },
  { id: 3, title: 'Guestlist Draft', status: 'completed', prereq: 'Budget Lock', target: '10 Months' },
  { id: 4, title: 'Venue Reservation', status: 'active', prereq: 'Guestlist Lock', target: '9 Months' },
  { id: 5, title: 'Atelier Couture Fitting', status: 'locked', prereq: 'Venue Lock', target: '8 Months' },
  { id: 6, title: 'Catering Menu Lock', status: 'locked', prereq: 'Venue Lock', target: '7 Months' },
  { id: 7, title: 'Floral & Decor Design', status: 'locked', prereq: 'Atelier Lock', target: '6 Months' },
  { id: 8, title: 'Photography Crew', status: 'locked', prereq: 'Venue Lock', target: '5 Months' },
  { id: 9, title: 'Invitation Dispatch', status: 'locked', prereq: 'Guestlist Lock', target: '4 Months' },
  { id: 10, title: 'Beauty & Skincare', status: 'locked', prereq: 'Atelier Lock', target: '3 Months' },
  { id: 11, title: 'Zaffa Musical Ensemble', status: 'locked', prereq: 'Venue Lock', target: '2 Months' },
  { id: 12, title: 'Rehearsal Protocol', status: 'locked', prereq: 'Zaffa Ensemble', target: '1 Month' },
  { id: 13, title: 'Marriage Contract', status: 'locked', prereq: 'Legal Protocol', target: '2 Weeks' },
  { id: 14, title: 'Bridal Suite Setup', status: 'locked', prereq: 'Rehearsal', target: '3 Days' },
  { id: 15, title: 'The Grand Night', status: 'locked', prereq: 'All Milestones', target: 'Day 0' }
];

function showZaffaView(view) {
  $$('#zaffaSeg .seg-btn').forEach(b => b.classList.toggle('on', b.dataset.view === view));
  moveSegGlider($('#zaffaSeg'));
  $('#zaffaRoadmapView').style.display = view === 'roadmap' ? '' : 'none';
  $('#zaffaVendorsView').style.display = view === 'vendors' ? '' : 'none';
  if (view === 'roadmap') renderRoadmapCanvas();
}

function initZaffaRoadmap() {
  $('#zaffaSeg')?.addEventListener('click', e => {
    const btn = e.target.closest('.seg-btn');
    if (btn) showZaffaView(btn.dataset.view);
  });
  $('#rmViewToggle')?.addEventListener('click', () => {
    roadmapView = roadmapView === 'arc' ? 'list' : 'arc';
    const btn = $('#rmViewToggle');
    btn.innerHTML = `<i data-lucide="${roadmapView === 'arc' ? 'list' : 'route'}"></i>`;
    btn.setAttribute('aria-label', roadmapView === 'arc' ? 'Switch to list view' : 'Switch to roadmap view');
    renderRoadmapCanvas();
    icons();
  });
  renderRoadmapCanvas();
}

let roadmapView = 'arc';       /* 'arc' | 'list' — spec 09 accessibility toggle */
let roadmapLastFrac = 0;

function roadmapProgressFrac() {
  const N = ROADMAP_NODES.length;
  let last = -1;
  ROADMAP_NODES.forEach((n, i) => { if (n.status === 'completed') last = i; });
  const frac = last < 0 ? 0 : last / (N - 1);
  const activeNext = ROADMAP_NODES[last + 1]?.status === 'active';
  return Math.min(1, frac + (activeNext ? 0.45 / (N - 1) : 0));
}

function roadmapStatsHTML() {
  const done = ROADMAP_NODES.filter(n => n.status === 'completed').length;
  const next = ROADMAP_NODES.find(n => n.status === 'active');
  return `<b>${done} of ${ROADMAP_NODES.length}</b> milestones sealed${next ? ` · next: <b>${next.title}</b>` : ' · your story is complete'}`;
}

function renderRoadmapCanvas() {
  const container = $('#roadmapCanvasContainer');
  if (!container) return;

  const stats = $('#rmStats');
  if (stats) stats.innerHTML = roadmapStatsHTML();

  if (roadmapView === 'list') { renderRoadmapList(container); return; }

  /* the ribbon: a serpentine whose bezier endpoints ARE the nodes */
  const W = 320, STEP = 92, TOP = 48, XL = 76, XR = 244;
  const N = ROADMAP_NODES.length;
  const H = TOP + STEP * (N - 1) + 44;
  const pts = ROADMAP_NODES.map((n, i) => ({ x: i % 2 === 0 ? XL : XR, y: TOP + i * STEP }));

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < N; i++) {
    const a = pts[i - 1], b = pts[i];
    d += ` C ${a.x} ${a.y + STEP * 0.58}, ${b.x} ${b.y - STEP * 0.58}, ${b.x} ${b.y}`;
  }

  const nodesSvg = ROADMAP_NODES.map((node, i) => {
    const p = pts[i];
    const onLeft = p.x === XL;
    const lx = onLeft ? 26 : -26;
    const anchor = onLeft ? 'start' : 'end';
    const glyph = node.status === 'completed'
      ? `<path class="rn-tick" d="M -5 0.5 L -1.5 4 L 5.5 -3.5"/>`
      : `<text class="rn-num" text-anchor="middle" y="3.5">${node.id}</text>`;
    return `
      <g class="rn-node-group ${node.status}" data-node-id="${node.id}" transform="translate(${p.x}, ${p.y})"
         role="button" tabindex="0" aria-label="Milestone ${node.id}: ${node.title}. ${node.status}.">
        <circle class="rn-halo" r="22"/>
        <circle class="rn-circle" r="14"/>
        ${glyph}
        <text class="rn-label" x="${lx}" y="0" text-anchor="${anchor}">${node.title}</text>
        <text class="rn-sub" x="${lx}" y="13" text-anchor="${anchor}">${node.target} before</text>
      </g>`;
  }).join('');

  container.style.height = 'auto';
  container.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" style="height:auto" aria-label="Wedding roadmap, ${ROADMAP_NODES.length} milestones">
      <path class="rm-track" d="${d}"/>
      <path class="rm-fill" id="rmFillPath" d="${d}"/>
      ${nodesSvg}
    </svg>`;

  /* draw the progress stroke from its previous position to the new one */
  const fill = $('#rmFillPath');
  const L = fill.getTotalLength();
  const target = roadmapProgressFrac();
  fill.style.strokeDasharray = L;
  fill.style.strokeDashoffset = L * (1 - roadmapLastFrac);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    fill.style.strokeDashoffset = L * (1 - target);
  }));
  roadmapLastFrac = target;

  container.onclick = e => {
    const group = e.target.closest('[data-node-id]');
    if (!group) return;
    const node = ROADMAP_NODES.find(n => n.id === +group.dataset.nodeId);
    if (node) openRoadmapNodeSheet(node);
  };
}

function renderRoadmapList(container) {
  container.style.height = 'auto';
  container.innerHTML = `<div class="rm-list">` + ROADMAP_NODES.map(n => `
    <button class="rm-list-row ${n.status}" data-node-id="${n.id}">
      <span class="rl-dot"></span>
      <span class="rl-tx"><b>${n.title}</b><span>${n.target} before · needs ${n.prereq}</span></span>
      <span class="rl-status">${n.status}</span>
    </button>`).join('') + `</div>`;
  container.onclick = e => {
    const row = e.target.closest('[data-node-id]');
    if (!row) return;
    const node = ROADMAP_NODES.find(n => n.id === +row.dataset.nodeId);
    if (node) openRoadmapNodeSheet(node);
  };
}

const MILESTONE_COPY = [
  'A milestone sealed in your story. Your journey blooms brighter.',
  'Another thread of the ribbon is tied. Beautifully done.',
  'The path ahead just lit up — keep weaving.',
];

function openRoadmapNodeSheet(node) {
  $('#rnBadge').textContent = `Milestone ${node.id} of ${ROADMAP_NODES.length}`;
  $('#rnTitle').textContent = node.title;
  $('#rnDesc').textContent = node.status === 'locked'
    ? `This chapter unlocks once “${node.prereq}” is sealed.`
    : `Secure approvals and prerequisites for ${node.title.toLowerCase()}.`;
  $('#rnStatus').textContent = node.status === 'completed' ? 'Sealed ✦' : node.status === 'active' ? 'In progress' : 'Locked';
  $('#rnPrereq').textContent = node.prereq;
  $('#rnTarget').textContent = node.target;

  const actBtn = $('#rnActionBtn');
  if (node.status === 'completed') {
    actBtn.innerHTML = 'Milestone Sealed ✦';
    actBtn.disabled = true;
  } else if (node.status === 'locked') {
    actBtn.innerHTML = `Locked — seal “${node.prereq}” first`;
    actBtn.disabled = true;
  } else {
    actBtn.innerHTML = 'Seal this Milestone ✦';
    actBtn.disabled = false;
  }

  actBtn.onclick = () => {
    if (node.status !== 'active') return;
    node.status = 'completed';
    const nextNode = ROADMAP_NODES.find(n => n.id === node.id + 1);
    if (nextNode && nextNode.status === 'locked') nextNode.status = 'active';
    closeSheets();
    renderRoadmapCanvas();
    /* sparkles bloom from the sealed node itself */
    requestAnimationFrame(() => {
      const g = $(`#roadmapCanvasContainer [data-node-id="${node.id}"] .rn-circle`);
      const canvas = $('#sparkleCanvas');
      if (g && canvas) {
        const r = g.getBoundingClientRect(), c = canvas.getBoundingClientRect();
        triggerSparkles(r.left - c.left + r.width / 2, r.top - c.top + r.height / 2);
      } else triggerSparkles();
    });
    buzz([15, 50, 15]);
    toast(MILESTONE_COPY[node.id % MILESTONE_COPY.length], 'success', 3800);
  };

  openSheet('sheetRoadmapNode');
}

/* ─── 6. Payments Installment & Gold Receipt ─── */
function updateInstallments(total) {
  const dep = Math.round(total * 0.5);
  const fit = Math.round(total * 0.25);
  const del = Math.round(total * 0.25);

  if ($('#instDep')) $('#instDep').textContent = fmt(dep) + ' AED';
  if ($('#instFit')) $('#instFit').textContent = fmt(fit) + ' AED';
  if ($('#instDel')) $('#instDel').textContent = fmt(del) + ' AED';
}

function initGoldReceipt() {
  $('#openGoldReceiptBtn')?.addEventListener('click', () => {
    const r = state.lastReceipt || { total: 0, vendor: 'KOSHA Collection', hash: '0x0000·KOSHA' };
    $('#grHash').textContent = r.hash;
    $('#grVendor').textContent = r.vendor;
    $('#grTime').textContent = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    $('#grAmount').textContent = fmt(r.total) + ' AED';

    /* the receipt lives above the success veil's story: close the veil,
       land home, then unfurl the receipt */
    $('#successVeil').classList.remove('show');
    switchScreen('home', { remember: false });
    setTimeout(() => { openSheet('sheetGoldReceipt'); triggerSparkles(); }, 350);
  });

  $('#grCloseBtn')?.addEventListener('click', closeSheets);
}

/* ─── 7. Profile Role Mode Switcher ─── */
function initProfileRole() {
  $('#profileRoleSeg')?.addEventListener('click', e => {
    const btn = e.target.closest('.seg-btn');
    if (!btn) return;
    $$('#profileRoleSeg .seg-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    moveSegGlider($('#profileRoleSeg'));
    const role = btn.dataset.role;
    toast(role === 'couple' ? 'Switched to Bride & Groom Planning Mode' : 'Switched to Specialist & Atelier Studio Mode', 'info');
  });
}

/* ─── 8. The Taarof — a conversational survey, never paperwork ───────── */
const SURVEY_STEPS = [
  {
    key: 'stage', eyebrow: 'A gentle question',
    title: 'Where does your<br><em>story stand?</em>',
    sub: 'Kosha arranges itself around your chapter.',
    options: [
      { v: 'searching', ic: 'gem', b: 'Writing the first page', s: 'I am looking for the right person' },
      { v: 'engaged', ic: 'heart-handshake', b: 'Recently engaged', s: 'The families have spoken — happily' },
      { v: 'planning', ic: 'landmark', b: 'Planning the celebration', s: 'The date approaches, the dream takes shape' },
    ],
  },
  {
    key: 'window', eyebrow: 'The when',
    title: 'Have you chosen<br><em>the season?</em>',
    sub: 'We will pace your roadmap to it.',
    options: [
      { v: '2027-05-01', ic: 'flower-2', b: 'Spring 2027', s: 'Gardens in bloom, golden evenings' },
      { v: '2027-10-16', ic: 'sunset', b: 'Autumn 2027', s: 'Warm light, cooler nights' },
      { v: '2027-12-18', ic: 'sparkles', b: 'Winter 2027', s: 'The grand season of celebrations' },
      { v: '', ic: 'cloud-moon', b: 'Still dreaming', s: 'We will know it when we feel it' },
    ],
  },
  {
    key: 'city', eyebrow: 'The where',
    title: 'Where will it<br><em>unfold?</em>',
    sub: 'Venues and artisans will follow you there.',
    options: [
      { v: 'Dubai', ic: 'building-2', b: 'Dubai', s: 'The city of grand ballrooms' },
      { v: 'Abu Dhabi', ic: 'landmark', b: 'Abu Dhabi', s: 'Stately, storied, serene' },
      { v: 'Sharjah', ic: 'moon-star', b: 'Sharjah', s: 'Heritage and intimacy' },
      { v: 'Al Ain', ic: 'palmtree', b: 'Al Ain', s: 'The garden city' },
    ],
  },
  {
    key: 'budget', eyebrow: 'The scale', slider: true,
    title: 'How grand is<br><em>the dream?</em>',
    sub: 'A quiet number, just between us. It tunes every recommendation.',
  },
];

const SURVEY = { idx: 0, answers: {} };

function openSurvey() {
  SURVEY.idx = 0;
  SURVEY.answers = {};
  renderSurveyStep();
  switchScreen('survey', { remember: false });
}

function budgetPoetry(v) {
  return v < 60000 ? 'An intimate gathering' : v < 160000 ? 'A grand celebration' : 'A royal affair';
}

function renderSurveyStep() {
  const step = SURVEY_STEPS[SURVEY.idx];
  const body = $('#svyBody');
  $('#svyBar').style.width = ((SURVEY.idx + 1) / SURVEY_STEPS.length * 100) + '%';
  $('#svyBack').style.visibility = SURVEY.idx === 0 ? 'hidden' : 'visible';

  let inner = `
    <div class="svy-step">
      <div class="eyebrow rise">${step.eyebrow}</div>
      <h2 class="svy-title rise">${step.title}</h2>
      <p class="svy-sub rise">${step.sub}</p>`;

  if (step.slider) {
    const v = SURVEY.answers.budget || 120000;
    inner += `
      <div class="svy-slider rise">
        <div class="svy-amount"><span id="svyBudgetVal">${fmt(v)}</span> <small>AED</small></div>
        <div class="svy-poetry" id="svyPoetry">${budgetPoetry(v)}</div>
        <input type="range" id="svyBudget" min="20000" max="400000" step="10000" value="${v}" aria-label="Wedding budget">
      </div>
      <button class="btn champagne rise" id="svyFinish" style="margin-top:26px"><span class="btn-label">Complete my story</span></button>`;
  } else {
    inner += `<div class="svy-options rise">` + step.options.map(o => `
      <button class="svy-opt ${SURVEY.answers[step.key] === o.v ? 'on' : ''}" data-v="${o.v}">
        <span class="so-ic"><i data-lucide="${o.ic}"></i></span>
        <span class="so-tx"><b>${o.b}</b><span>${o.s}</span></span>
        <i data-lucide="arrow-right" class="so-go"></i>
      </button>`).join('') + `</div>`;
  }

  inner += `</div>`;
  body.innerHTML = inner;
  icons();

  if (step.slider) {
    const r = $('#svyBudget');
    r.addEventListener('input', () => {
      $('#svyBudgetVal').textContent = fmt(+r.value);
      $('#svyPoetry').textContent = budgetPoetry(+r.value);
    });
    $('#svyFinish').addEventListener('click', () => {
      SURVEY.answers.budget = +r.value;
      finishSurvey();
    });
  } else {
    body.querySelectorAll('.svy-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        body.querySelectorAll('.svy-opt').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        SURVEY.answers[step.key] = btn.dataset.v;
        buzz(8);
        setTimeout(() => { SURVEY.idx += 1; renderSurveyStep(); }, 330);
      });
    });
  }
}

function finishSurvey() {
  state.surveyDone = true;
  state.stage = SURVEY.answers.stage || 'planning';
  state.city = SURVEY.answers.city || 'Dubai';
  state.budget = SURVEY.answers.budget || 120000;
  state.weddingDate = SURVEY.answers.window ? new Date(SURVEY.answers.window + 'T18:00:00') : null;
  const bs = $('#studioBudgetRange');
  if (bs) {
    bs.value = Math.min(50000, Math.round(state.budget / 8 / 1000) * 1000);
    bs.dispatchEvent(new Event('input'));
  }
  renderHome();
  triggerSparkles();
  celebrate('Beautifully noted.', 'Your Kosha now arranges itself around your story — from this first page to the last dance.');
}

$('#svySkip').addEventListener('click', () => {
  state.surveyDone = true;
  renderHome();
  switchScreen('home', { remember: false });
});
$('#svyBack').addEventListener('click', () => {
  if (SURVEY.idx > 0) { SURVEY.idx -= 1; renderSurveyStep(); }
});

/* ─── 9. Adaptive Home — the dashboard follows the journey ───────────── */
function adaptHome() {
  const searching = state.stage === 'searching';
  const invite = $('#scr-home .invite:not(#searchHero)');
  const hero = $('#searchHero');
  if (hero && invite) {
    hero.style.display = searching ? '' : 'none';
    invite.style.display = searching ? 'none' : '';
  }
  /* the relevant pillar leads the grid */
  const order = searching
    ? { k1: 1, k4: 2, k2: 3, k3: 4 }
    : state.stage === 'engaged'
      ? { k4: 1, k3: 2, k2: 3, k1: 4 }
      : { k3: 1, k2: 2, k4: 3, k1: 4 };
  Object.entries(order).forEach(([cls, ord]) => {
    const el = $('.pillar.' + cls);
    if (el) el.style.order = ord;
  });
  const greet = $('#homeGreeting');
  if (greet && searching) greet.textContent = greet.textContent.replace(/·.*$/, '') /* keep greeting clean */;
}

/* ─── 10. Conversations Hub — every thread in its place ──────────────── */
const THREADS = [
  {
    id: 't92a', cat: 'khitbah', name: 'Candidate 92A', online: true, unread: 2,
    img: IMG('photo-1544005313-94ddf0286df2', 200), veiled: true, time: '20:43',
    preview: 'Perhaps our families could meet at the majlis soon.',
    badge: { tone: 'lavender', txt: 'Guarded introduction' },
    status: 'Online now',
  },
  {
    id: 'tmajestic', cat: 'vendor', name: 'Royal Majestic Hall', online: false, unread: 1,
    img: IMG('photo-1519167758481-83f550bb49b3', 200), time: '18:02',
    preview: 'We can hold Saturday 12 October for you until Thursday.',
    badge: { tone: 'gold', txt: 'Deposit pending · 7,500 AED' },
    status: 'Replies within a day',
  },
  {
    id: 'tnoor', cat: 'vendor', name: 'Atelier Noor', online: true, unread: 0,
    img: IMG('photo-1594552072238-b8a33785b261', 200), time: 'Tue',
    preview: 'Your fitting sketches are ready — they are beautiful.',
    badge: null,
    status: 'Online now',
  },
  {
    id: 'tamina', cat: 'counsel', name: 'Dr. Amina Al-Ketbi', online: true, unread: 0,
    img: IMG('photo-1573496359142-b8d87734a5a2', 200), time: '09:15',
    preview: 'Looking forward to our session this afternoon.',
    badge: { tone: 'blue', txt: 'Session today · 16:30' },
    status: 'In session until 16:00',
  },
  {
    id: 'tconcierge', cat: 'support', name: 'Kosha Concierge', online: true, unread: 0,
    img: null, monogram: true, time: '—',
    preview: 'Always here, always discreet. How may we help?',
    badge: null,
    status: 'At your service',
  },
];
let inboxCat = 'all';

function renderInbox() {
  const list = $('#threadList');
  if (!list) return;
  const rows = THREADS.filter(t => inboxCat === 'all' || t.cat === inboxCat);
  list.innerHTML = rows.map(t => `
    <button class="thread-row" data-thread="${t.id}">
      <span class="avatar" style="${t.img ? `background-image:url('${t.img}')` : ''};${t.veiled ? 'filter:blur(0px);' : ''}">
        ${t.monogram ? '<svg class="th-mono"><use href="#k-logo" fill="url(#logoRibbon)"/></svg>' : ''}
        ${t.online ? '<span class="live-dot"></span>' : ''}
      </span>
      <span class="th-body">
        <span class="th-top"><b>${t.name}</b><small>${t.time}</small></span>
        <span class="th-preview">${t.preview}</span>
        ${t.badge ? `<span class="th-badge ${t.badge.tone}">${t.badge.txt}</span>` : ''}
      </span>
      ${t.unread ? `<span class="th-unread">${t.unread}</span>` : ''}
    </button>`).join('') ||
    `<div class="empty"><svg class="e-logo" aria-hidden="true"><use href="#k-logo" fill="url(#logoRibbon)"/></svg>
      <h3>A quiet room</h3><p>No threads here yet — they will gather as your story grows.</p></div>`;
  icons();
}

function openThread(id) {
  const t = THREADS.find(x => x.id === id);
  if (!t) return;
  t.unread = 0;
  $('#chatTitle').textContent = t.name;
  $('#chatStatus').innerHTML = `<span class="live-dot-s"></span>${t.status}`;
  const av = $('#chatAvatar');
  if (t.img) { av.style.backgroundImage = `url('${t.img}')`; av.innerHTML = t.online ? '<span class="live-dot"></span>' : ''; }
  $('.chat-guard').style.display = t.cat === 'khitbah' ? '' : 'none';
  switchScreen('chat');
  renderInbox();
}

function initInbox() {
  $('#inboxChips')?.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    $$('#inboxChips .chip').forEach(c => c.classList.remove('on'));
    chip.classList.add('on');
    inboxCat = chip.dataset.cat;
    renderInbox();
  });
  $('#threadList')?.addEventListener('click', e => {
    const row = e.target.closest('[data-thread]');
    if (row) openThread(row.dataset.thread);
  });
  renderInbox();
}

/* ─── 11. Tawjeeh Sanctuary — webinar & knowledge capsules ───────────── */
const WEBINAR_AT = Date.now() + ((2 * 24 + 14) * 60 + 35) * 60000;

function tickWebinar() {
  const el = $('#webinarCount');
  if (!el) return;
  let ms = Math.max(0, WEBINAR_AT - Date.now());
  const d = Math.floor(ms / 86400000); ms -= d * 86400000;
  const h = Math.floor(ms / 3600000); ms -= h * 3600000;
  const m = Math.floor(ms / 60000);
  el.innerHTML = `${String(d).padStart(2, '0')}<small>d</small> : ${String(h).padStart(2, '0')}<small>h</small> : ${String(m).padStart(2, '0')}<small>m</small>`;
}

const ARTICLES = [
  {
    id: 'a1', tag: 'Pre-Marriage Harmony', title: 'The quiet art of the first year',
    meta: '5 min read · Dr. Amina Al-Ketbi', img: IMG('photo-1469371670807-013ccf25f16a', 500),
    body: 'The first year of marriage is less about grand gestures and more about a thousand small translations — learning how your partner takes their coffee, their silence, their Fridays.<br><br>Begin with rituals: one meal a day untouched by phones, one walk a week with no destination. The couples who last are rarely the ones who never disagree; they are the ones who learned to disagree beautifully.',
  },
  {
    id: 'a2', tag: 'Legal Rights & Contracts', title: 'Reading your marriage contract like a jurist',
    meta: '7 min read · Adv. Omar Al-Farsi', img: IMG('photo-1450101499163-c8848c66ca85', 500),
    body: 'A marriage contract in the UAE is a document of protection, not suspicion. Understand the mahr, the conditions each party may add, and the registration path through the courts.<br><br>Bring questions, not assumptions. A one-hour consultation before signing has saved more marriages than any clause ever written.',
  },
  {
    id: 'a3', tag: 'Financial Synergy', title: 'Two salaries, one dream: budgeting as a couple',
    meta: '4 min read · Dr. Khalid Rahman', img: IMG('photo-1554224155-6726b3ff858f', 500),
    body: 'Money conversations are trust conversations wearing different clothes. Decide early: what is ours, what is mine, and what is for the story we are building.<br><br>The 60/20/20 rhythm — shared life, personal joy, future dreams — gives each dirham a home and each partner their dignity.',
  },
];
const savedArticles = new Set();

function renderArticles() {
  const row = $('#articleRow');
  if (!row) return;
  row.innerHTML = ARTICLES.map(a => `
    <button class="article-card" data-article="${a.id}">
      <div class="ph" style="background-image:url('${a.img}')"></div>
      <div class="ac-body">
        <div class="ac-tag">${a.tag}</div>
        <h4>${a.title}</h4>
        <div class="ac-meta">${a.meta}</div>
      </div>
    </button>`).join('');
  icons();
}

function initSanctuary() {
  tickWebinar();
  setInterval(tickWebinar, 30000);

  $('#webinarReg')?.addEventListener('click', () => {
    const btn = $('#webinarReg');
    if (btn.classList.contains('done')) return;
    btn.classList.add('done');
    btn.querySelector('.btn-label').innerHTML = '<i data-lucide="check"></i>&nbsp;Seat reserved';
    icons();
    buzz([10, 40, 10]);
    toast('Your seat is reserved — we will remind you before the majlis begins.', 'success');
  });

  $('#articleRow')?.addEventListener('click', e => {
    const card = e.target.closest('[data-article]');
    if (!card) return;
    const a = ARTICLES.find(x => x.id === card.dataset.article);
    if (!a) return;
    $('#artBadge').textContent = a.tag;
    $('#artTitle').textContent = a.title;
    $('#artMeta').textContent = a.meta;
    $('#artBody').innerHTML = a.body;
    const save = $('#artSave');
    save.dataset.article = a.id;
    save.querySelector('.btn-label').textContent = savedArticles.has(a.id) ? 'Saved ✦' : 'Save';
    openSheet('sheetArticle');
  });

  $('#artSave')?.addEventListener('click', () => {
    const id = $('#artSave').dataset.article;
    savedArticles.has(id) ? savedArticles.delete(id) : savedArticles.add(id);
    $('#artSave .btn-label').textContent = savedArticles.has(id) ? 'Saved ✦' : 'Save';
    toast(savedArticles.has(id) ? 'Kept in your reading list.' : 'Removed from your reading list.', 'info', 1800);
  });
  $('#artDone')?.addEventListener('click', closeSheets);

  renderArticles();
}

/* ─── 12. Ribbon Dock — SVG Hump & Icon Build-Up Interaction ─ */
function dockPathD(cx, W, H) {
  /* barTop = where the flat bar edge sits; peak = crest of the hump.
     peak must stay ABOVE the raised orb's top so the dark shape cradles it. */
  const R = 22, barTop = 44, peak = 10;
  const c = Math.max(R + 16, Math.min(W - R - 16, cx));

  /* crest must span WIDER than the 54px orb so the arc wraps its shoulders;
     hw sets how far the slopes run out for a gentle, graceful bump. */
  const CREST = 30, HW = 72;

  const maxHwLeft = c - R;
  const leftHw = Math.max(16, Math.min(HW, maxHwLeft));
  const x0 = Math.max(R, c - leftHw);
  const xl = Math.max(x0 + 8, c - CREST);

  const maxHwRight = (W - R) - c;
  const rightHw = Math.max(16, Math.min(HW, maxHwRight));
  const x3 = Math.min(W - R, c + rightHw);
  const xr = Math.min(x3 - 8, c + CREST);

  const cp1x = x0 + (xl - x0) * 0.55;
  const cp2x = xl - (xl - x0) * 0.25;
  const cp3x = xr + (x3 - xr) * 0.25;
  const cp4x = xr + (x3 - xr) * 0.55;

  return `M ${R},${barTop}
    L ${x0},${barTop}
    C ${cp1x},${barTop} ${cp2x},${peak} ${xl},${peak}
    Q ${c},${peak - 3} ${xr},${peak}
    C ${cp3x},${peak} ${cp4x},${barTop} ${x3},${barTop}
    L ${W - R},${barTop}
    A ${R} ${R} 0 0 1 ${W},${barTop + R}
    L ${W},${H - R}
    A ${R} ${R} 0 0 1 ${W - R},${H}
    L ${R},${H}
    A ${R} ${R} 0 0 1 0,${H - R}
    L 0,${barTop + R}
    A ${R} ${R} 0 0 1 ${R},${barTop} Z`;
}

let dockCx = null, dockTargetCx = null, dockRAF = null;
function drawDock() {
  const dock = $('#dock'), svg = $('#dockCanvas'), p = $('#dockPath');
  if (!dock || !svg || !p || dockCx == null) return;
  /* clientWidth/Height are LAYOUT px — immune to ancestor transforms, so the
     viewBox always matches the CSS box that dockCx is expressed in. */
  const W = dock.clientWidth, H = dock.clientHeight;
  if (!W || W < 100) return;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  p.setAttribute('d', dockPathD(dockCx, W, H));
}
function dockTick() {
  dockCx += (dockTargetCx - dockCx) * 0.24;
  if (Math.abs(dockTargetCx - dockCx) < 0.4) { dockCx = dockTargetCx; dockRAF = null; }
  else dockRAF = requestAnimationFrame(dockTick);
  drawDock();
}
function positionDock() {
  const dock = $('#dock'), on = $('.dock-item.on', dock);
  if (!dock || !on) return;
  const dr = dock.getBoundingClientRect();
  if (!dr || !dr.width || dr.width < 100) return;
  const r = on.getBoundingClientRect();
  /* take the position as a RATIO (ancestor transforms cancel out), then map it
     onto the layout width — keeping cx in the same space as the viewBox. */
  const frac = (r.left - dr.left + r.width / 2) / dr.width;
  const cx = frac * dock.clientWidth;

  if (isNaN(cx)) return;
  dockTargetCx = cx;
  if (dockCx == null || isNaN(dockCx)) {
    dockCx = cx;
    drawDock();
  } else if (!dockRAF) {
    dockRAF = requestAnimationFrame(dockTick);
  }

  triggerIconBuildUp(on);
}

function triggerIconBuildUp(itemEl) {
  if (!itemEl) return;
  $$('.dock-item').forEach(b => b.classList.remove('building-up'));
  itemEl.classList.add('building-up');

  const svg = itemEl.querySelector('.di-ic svg, .di-ic i');
  if (!svg) return;

  const paths = svg.querySelectorAll('path, line, circle, polyline, polygon');
  paths.forEach(p => {
    try {
      const len = Math.ceil(p.getTotalLength ? p.getTotalLength() : 40);
      p.style.strokeDasharray = `${len} ${len}`;
      p.style.strokeDashoffset = `${len}`;
      p.style.transition = 'none';
      void p.offsetWidth; // force reflow
      p.style.transition = 'stroke-dashoffset 0.65s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.3s ease';
      p.style.strokeDashoffset = '0';
    } catch (_) {}
  });

  /* burst subtle sparkles at the active tab center */
  const canvas = $('#sparkleCanvas');
  if (canvas && itemEl) {
    const ir = itemEl.getBoundingClientRect(), cr = canvas.getBoundingClientRect();
    if (ir && cr && ir.width > 0) {
      triggerSparkles(ir.left - cr.left + ir.width / 2, ir.top - cr.top + 16);
    }
  }
}

/* ─── Boot ───────────────────────────────────────────────────────────── */
function boot() {
  icons();
  calibrateStrokes();
  seedParticles();
  renderHome();
  renderShop();
  renderServices();
  renderSpecialists();
  renderCart();
  updateCartBadges();
  unlockDirectory();
  moveGlider();
  initSearchStudio();
  initZahbaChest();
  initZaffaRoadmap();
  initGoldReceipt();
  initProfileRole();
  initInbox();
  initSanctuary();
  scr('splash').classList.add('active');
  state.current = 'splash';
  $('#statusbar').classList.add('on-dark');
  attempt3D();
  
  // ensure dock is positioned accurately once container layout completes
  requestAnimationFrame(() => {
    positionDock();
  });
  
  addEventListener('resize', () => { moveGlider(); positionDock(); });
  
  if (window.ResizeObserver && $('#dock')) {
    new ResizeObserver(() => { drawDock(); positionDock(); }).observe($('#dock'));
  }
}
boot();

