/* ══════════════════════════════════════════════════════════════════════
   KOSHA — SCROLL JOURNEY ENGINE (V2 CINEMATIC ENGINE)
   ──────────────────────────────────────────────────────────────────────
   One descent, fourteen destinations, four pillars, one unbroken ribbon.

   PERFORMANCE & MOTION ARCHITECTURE
   · Hardware-Accelerated: JS calculates normalized scroll progress (0..1)
     and writes custom properties (--p, --pIn, --pOut, --gp) per frame.
   · Zero Layout Thrashing: Offsets are measured once and on window resize.
   · IntersectionObserver Culling: Offscreen scenes consume 0 style calculations.
   · Single rAF Frame Loop: Gated by dirty state for locked 60fps performance.
   · Continuous Ribbon SVG Pathing: Smooth Bezier morphing with a glowing
     gold particle head traveling along the path via getPointAtLength.
   ══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const clamp01 = v => (v < 0 ? 0 : v > 1 ? 1 : v);
  const smooth = t => t * t * (3 - 2 * t);              // smoothstep easing
  const fmtNum = n => Math.round(n).toLocaleString('en-US');

  /* Colour interpolation for atmosphere transitions ------------------ */
  const hex2rgb = h => {
    const v = parseInt(h.replace('#', ''), 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  };
  const mix = (a, b, t) => {
    const A = hex2rgb(a), B = hex2rgb(b);
    return `rgb(${Math.round(A[0] + (B[0] - A[0]) * t)},${Math.round(A[1] + (B[1] - A[1]) * t)},${Math.round(A[2] + (B[2] - A[2]) * t)})`;
  };

  /* ═══ THE FOURTEEN DESTINATIONS & INTEGRATED PILLARS ════════════════ */
  const MILESTONES = [
    {
      id: 'dream', ar: 'حلم · The First Page', t: 'It begins with<br><em>a quiet certainty</em>',
      c: 'Before the ledgers and logistics, there is only a shared vision between two souls. This is where we start.',
      atmo: ['#3A0A12', '#2C1830', '#120A0E'],
      glyph: 'M27 8 A19 19 0 1 0 46 27 A15 15 0 1 1 27 8 Z M40 10 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z',
      float: [{ t: '💕 Khotbah · Private Circle', x: '62%', y: '20%', d: '44px' }],
      widget: 'matchmaker'
    },
    {
      id: 'vision', ar: 'رؤية · Mood & Aesthetics', t: 'A aesthetic,<br><em>made tangible</em>',
      c: 'Ivory silk and deep burgundy. Candlelight over warm marble. Every choice ahead will answer to this mood.',
      atmo: ['#43122A', '#2B1B3E', '#140C12'],
      glyph: 'M8 27 C8 15 17 8 27 8 C37 8 46 15 46 25 C46 33 40 36 34 36 L30 36 C27 36 25 38 25 41 C25 44 27 46 27 46 C16 46 8 38 8 27 Z',
      swatches: ['#F6EFE9', '#99274A', '#C9AD7C', '#2C4A78', '#1F3A2B'],
      float: [{ t: 'Aesthetic · Locked ✦', x: '58%', y: '16%', d: '52px' }]
    },
    {
      id: 'budget', ar: 'ميزانية · Smart Allocator', t: 'The shape of<br><em>what is possible</em>',
      c: 'Not a restriction — a frame of elegance. Every dirham placed with intention and tracked to the last petal.',
      atmo: ['#4A2410', '#2E1C22', '#140E0C'],
      glyph: 'M27 10 v34 M18 17 h13 a6 6 0 0 1 0 12 h-13 M18 29 h13 a6 6 0 0 1 0 12 h-13',
      count: { v: 250000, u: 'AED total budget' }, meter: 0.68,
      float: [{ t: '68% Committed · 170,000 AED', x: '56%', y: '18%', d: '48px' }],
      widget: 'budget'
    },
    {
      id: 'guests', ar: 'ضيوف · Seating & RSVP', t: 'Every name<br><em>a cherished story</em>',
      c: 'The circle of loved ones who will bear witness. Seated, welcomed, and remembered — each guest accounted for.',
      atmo: ['#3D1430', '#241C40', '#120B15'],
      glyph: 'M18 24 a7 7 0 1 0 0-14 a7 7 0 0 0 0 14 Z M36 24 a7 7 0 1 0 0-14 a7 7 0 0 0 0 14 Z M6 44 c0-8 6-13 12-13 s12 5 12 13 M30 44 c0-8 6-13 12-13 s6 5 6 13',
      count: { v: 320, u: 'guests confirmed' }, meter: 0.88,
      float: [{ t: '18 Tables · Seating Chart Ready', x: '60%', y: '22%', d: '42px' }]
    },
    {
      id: 'venue', ar: 'مكان · Zaffah Studios', t: 'A hall that<br><em>holds the evening</em>',
      c: 'Soaring arches, crystal chandeliers, and a grand doorway your guests will remember walking through.',
      atmo: ['#2A1838', '#1E2A4E', '#0F0B16'],
      glyph: 'M10 44 V24 C10 14 17 8 27 8 C37 8 44 14 44 24 V44 M10 44 H44 M20 44 V30 C20 25 23 22 27 22 C31 22 34 25 34 30 V44',
      float: [
        { t: '🌸 Zaffa · Royal Majestic Hall', x: '50%', y: '18%', d: '58px' },
        { t: 'Abu Dhabi · 500 Capacity', x: '14%', y: '78%', d: '-36px' }
      ]
    },
    {
      id: 'decoration', ar: 'زينة · Stage & Florals', t: 'Silk, marble<br><em>and candlelight</em>',
      c: 'Every surface curated. The floral kosha arch, candlelit aisles, and a canopy of warm lights.',
      atmo: ['#3E1226', '#2A1C3C', '#130A10'],
      glyph: 'M27 27 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M27 19 C27 9 34 6 38 10 C42 14 37 19 27 19 M27 35 C27 45 20 48 16 44 C12 40 17 35 27 35 M19 27 C9 27 6 20 10 16 C14 12 19 17 19 27 M35 27 C45 27 48 34 44 38 C40 42 35 37 35 27',
      float: [{ t: 'Ivory Orchids & Gold Candelabras', x: '56%', y: '20%', d: '50px' }]
    },
    {
      id: 'photography', ar: 'تصوير · Memories Vault', t: 'So it survives<br><em>for generations</em>',
      c: 'The timeless frames you will hand down to your children. Captured in cinematic 4K stills and film.',
      atmo: ['#1E2440', '#2E1830', '#0E0F16'],
      glyph: 'M6 18 h9 l4-6 h16 l4 6 h9 a4 4 0 0 1 4 4 v18 a4 4 0 0 1 -4 4 H6 a4 4 0 0 1 -4-4 V22 a4 4 0 0 1 4-4 Z M27 38 a8 8 0 1 0 0-16 a8 8 0 0 0 0 16 Z',
      float: [{ t: '2 Cinematographers · 1 Stills Master', x: '58%', y: '21%', d: '46px' }]
    },
    {
      id: 'music', ar: 'موسيقى · Soundscape', t: 'The sound of<br><em>the grand entry</em>',
      c: 'Resonating drums for the zaffa procession, soft strings for the vows, and a playlist for the night.',
      atmo: ['#3A1C42', '#1E2648', '#110E1A'],
      glyph: 'M20 40 a6 6 0 1 0 0-12 a6 6 0 0 0 0 12 Z M42 34 a6 6 0 1 0 0-12 a6 6 0 0 0 0 12 Z M26 34 V12 l22-4 v22',
      float: [{ t: 'Emirati Zaffa Troupe · Booked', x: '48%', y: '18%', d: '52px' }],
      widget: 'music'
    },
    {
      id: 'food', ar: 'ولائم · Luxury Catering', t: 'A table that<br><em>expresses generosity</em>',
      c: 'Couture gastronomy served to your guests. Nine courses timed seamlessly to the evening’s flow.',
      atmo: ['#4A2A12', '#2C1E24', '#140E08'],
      glyph: 'M14 8 v12 a13 13 0 0 0 26 0 V8 Z M27 33 v13 M18 46 h18',
      count: { v: 9, u: 'tasting courses' },
      float: [{ t: 'Chef Tasting · Confirmed', x: '56%', y: '22%', d: '44px' }]
    },
    {
      id: 'transportation', ar: 'موكب · Royal Convoy', t: 'The procession,<br><em>timed perfectly</em>',
      c: 'Chauffeurs, luxury convoy, and arrival logistics — orchestrated so you step into calm elegance.',
      atmo: ['#22263F', '#331A2C', '#0E1018'],
      glyph: 'M8 34 v-7 l5-11 h28 l5 11 v7 M8 34 h38 M8 34 v6 h6 v-6 M40 34 v6 h6 v-6 M17 27 h20',
      float: [{ t: '18:40 GST · Royal Car Arrival', x: '60%', y: '20%', d: '48px' }]
    },
    {
      id: 'invitations', ar: 'دعوات · Zahbah Atelier', t: 'Letterpressed,<br><em>and wax sealed</em>',
      c: 'Heavy cotton paper, hand-gilded edges, and a custom burgundy wax seal. The first touch of your celebration.',
      atmo: ['#42162E', '#2A1C3E', '#130C12'],
      glyph: 'M6 14 h42 v26 a4 4 0 0 1-4 4 H10 a4 4 0 0 1-4-4 Z M6 15 l21 16 l21-16',
      count: { v: 180, u: 'sealed invitations' }, meter: 1,
      float: [{ t: '🛍 Zahbah · Atelier Suite', x: '58%', y: '18%', d: '46px' }],
      widget: 'wax'
    },
    {
      id: 'timeline', ar: 'توقيت · Tawjeeh Sanctuary', t: 'Every moment,<br><em>gently guided</em>',
      c: 'From the first guest’s arrival to the last dance. Wisdom and coordination so nothing is left to chance.',
      atmo: ['#2A2040', '#3A1830', '#100E18'],
      glyph: 'M27 47 a20 20 0 1 0 0-40 a20 20 0 0 0 0 40 Z M27 15 v12 l9 6',
      meter: 0.94,
      float: [{ t: '🧠 Tawjeeh · Specialist Guidance', x: '54%', y: '20%', d: '50px' }]
    },
    {
      id: 'weddingday', ar: 'الزفة · The Wedding Day', t: 'And now —<br><em>the celebration begins</em>',
      c: 'No tasks remain. Only to step out into the light, embrace your loved ones, and live the story.',
      atmo: ['#5A1B2E', '#3C1F4E', '#180C14'],
      glyph: 'M20 30 a11 11 0 1 0 0-22 a11 11 0 0 0 0 22 Z M34 46 a11 11 0 1 0 0-22 a11 11 0 0 0 0 22 Z',
      float: [
        { t: 'Saturday, 1 May 2027', x: '56%', y: '16%', d: '54px' },
        { t: 'Dubai, UAE', x: '16%', y: '76%', d: '-30px' }
      ]
    },
    {
      id: 'married', ar: 'بيت · Forever & Beyond', t: 'A beginning,<br><em>not an ending</em>',
      c: 'The music quietens, the lights turn to dawn. The marriage begins. Kosha walks beside you into forever.',
      atmo: ['#6B4A1E', '#4A2038', '#18110D'],
      glyph: 'M27 44 C16 36 8 30 8 22 C8 15 13 11 19 11 C23 11 26 13 27 16 C28 13 31 11 35 11 C41 11 46 15 46 22 C46 30 38 36 27 44 Z',
      finale: true
    }
  ];

  /* ═══ RENDER DOM HTML STRUCTURE ══════════════════════════════════════ */
  function buildDOM(root) {
    const petals = Array.from({ length: 16 }, (_, i) =>
      `<i class="jn-petal" style="left:${4 + i * 6}%;animation-duration:${14 + (i % 6) * 4}s;animation-delay:${-i * 2.2}s;transform:scale(${0.65 + (i % 4) * 0.16})"></i>`).join('');

    const scenes = MILESTONES.map((m, i) => {
      const glyphLen = 260;
      const floats = (m.float || []).map(f =>
        `<span class="jn-float" style="left:${f.x};top:${f.y};--depth:${f.d}" data-depth>${f.t}</span>`).join('');

      const swatches = m.swatches
        ? `<div class="jn-swatches">${m.swatches.map((s, k) =>
            `<i class="jn-swatch-item ${k === 0 ? 'active' : ''}" style="background:${s};--k:${k}" data-color="${s}"></i>`).join('')}</div>` : '';

      const stat = m.count
        ? `<div class="jn-stat"><span class="v" data-count="${m.count.v}">0</span><span class="u">${m.count.u}</span></div>` : '';

      const meter = m.meter
        ? `<div class="jn-meter"><i style="--target:${m.meter}"></i></div>` : '';

      let customWidget = '';
      if (m.widget === 'matchmaker') {
        customWidget = `
          <div class="jn-matchmaker-card">
            <div class="jn-mm-head">
              <div class="jn-mm-user">
                <div class="jn-mm-avatar" style="background-image:url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop')"></div>
                <div class="jn-mm-info">
                  <h4>Candidate 92A</h4>
                  <p>28 · Dubai · Architect · 96% Match</p>
                </div>
              </div>
              <button class="btn champagne slim" data-partner="92A" style="font-size:0.75rem;padding:6px 14px">View Circle</button>
            </div>
          </div>`;
      } else if (m.widget === 'budget') {
        customWidget = `
          <div class="jn-budget-widget">
            <div class="jn-bw-row"><span class="jn-bw-label">Venue & Halls</span><span class="jn-bw-val">100,000 AED</span></div>
            <div class="jn-bw-row"><span class="jn-bw-label">Attire & Jewelry</span><span class="jn-bw-val">50,000 AED</span></div>
            <div class="jn-bw-row"><span class="jn-bw-label">Décor & Florals</span><span class="jn-bw-val">60,000 AED</span></div>
            <div class="jn-bw-row"><span class="jn-bw-label">Photography & Music</span><span class="jn-bw-val">40,000 AED</span></div>
          </div>`;
      } else if (m.widget === 'wax') {
        customWidget = `
          <div class="jn-wax-widget">
            <div class="jn-wax-seal" id="jnWaxStamper" title="Click to stamp wax seal">
              <svg viewBox="0 0 1024 1024"><use href="#k-logo"/></svg>
            </div>
            <p style="font-size:0.72rem;color:#C9AD7C;margin-top:8px;letter-spacing:0.05em">Touch seal to press KOSHA gold monogram</p>
          </div>`;
      } else if (m.widget === 'music') {
        customWidget = `
          <div class="jn-music-widget">
            <button class="jn-mw-play" id="jnZaffaAudioBtn" aria-label="Toggle Zaffa Demo Audio"><i data-lucide="play"></i></button>
            <div class="jn-mw-info">
              <h5>Emirati Royal Zaffa</h5>
              <p>Live Percussion &amp; Oud Ensemble</p>
            </div>
            <div class="jn-mw-wave"><span></span><span></span><span></span><span></span></div>
          </div>`;
      }

      const body = m.finale
        ? `<div class="jn-card jn-finale">
             <div class="jn-seal"><svg viewBox="0 0 1024 1024"><use href="#k-logo" fill="#1B0E06"/></svg></div>
             <div class="jn-idx">Destination ${i + 1} · ${MILESTONES.length}</div>
             <div class="jn-ar" lang="ar">${m.ar}</div>
             <h2 class="jn-title">${m.t}</h2>
             <p class="jn-copy" style="margin-inline:auto">${m.c}</p>
             <button class="btn champagne" id="jnRestart" style="max-width:240px;margin:28px auto 0">Return to the Beginning</button>
           </div>`
        : `<div class="jn-card">
             <svg class="jn-glyph" viewBox="0 0 54 54" aria-hidden="true"><path d="${m.glyph}" style="--len:${glyphLen}"/></svg>
             <div class="jn-idx">Destination ${i + 1} · ${MILESTONES.length}</div>
             <div class="jn-ar" lang="ar">${m.ar}</div>
             <h2 class="jn-title">${m.t}</h2>
             <p class="jn-copy">${m.c}</p>
             ${swatches}${stat}${meter}${customWidget}
           </div>`;

      return `<section class="jn-scene" data-scene data-ms="${m.id}"
                 data-atmo-a="${m.atmo[0]}" data-atmo-b="${m.atmo[1]}" data-atmo-base="${m.atmo[2]}">
                <div class="jn-stage">${body}</div>
                ${floats}
                <div class="jn-silk"></div>
              </section>`;
    }).join('');

    root.innerHTML = `
      <!-- Fixed Parallax Stack -->
      <div class="jn-fixed" aria-hidden="true">
        <div class="jn-atmo" data-atmo></div>
        <div class="jn-rays" data-rays></div>
        <div class="jn-sheen"></div>
        <div class="jn-petals">${petals}</div>
        <div class="jn-vignette"></div>
        <div class="jn-grain"></div>
      </div>

      <!-- Top Header Chapter Dock -->
      <div class="jn-topbar" data-topbar>
        <svg viewBox="0 0 1024 1024"><use href="#k-logo" fill="#C9AD7C"/></svg>
        <div>
          <div class="jn-topbar-title" id="jnCurrentTitle">The Kosha Journey</div>
          <div class="jn-topbar-chapter" id="jnCurrentChapter">Destination 1 of 14</div>
        </div>
      </div>

      <!-- Endless Ribbon Path Container -->
      <svg class="jn-ribbon" data-ribbon aria-hidden="true" preserveAspectRatio="none">
        <path class="jn-ribbon-glow"  data-ribbon-glow/>
        <path class="jn-ribbon-track" data-ribbon-track/>
        <path class="jn-ribbon-fill"  data-ribbon-fill/>
        <circle class="jn-ribbon-head" data-ribbon-head r="7" fill="#F3E4D2" filter="drop-shadow(0 0 12px #C9AD7C)"/>
        <g data-nodes></g>
      </svg>

      <!-- Overture Scene -->
      <section class="jn-scene jn-overture-scene" data-scene
               data-atmo-a="#2A0C16" data-atmo-b="#1B1230" data-atmo-base="#0B0609">
        <div class="jn-stage">
          <div class="jn-card jn-overture">
            <div class="jn-idx">The Scroll-Driven Journey</div>
            <h2 class="jn-title" style="margin-top:12px">Fourteen chapters,<br><em>one continuous story</em></h2>
            <p class="jn-copy" style="margin-inline:auto">Scroll to travel. The ribbon guides your path through every milestone from your first dream to your wedding day.</p>
          </div>
        </div>
        <div class="jn-scrollcue"><span>Begin the Descent</span><span class="line"></span></div>
      </section>

      <!-- 14 Milestone Scenes -->
      ${scenes}

      <!-- Side Chapter Rail -->
      <nav class="jn-rail" data-rail aria-label="Journey chapters"></nav>`;
  }

  /* ═══ JOURNEY ENGINE CLASS ═══════════════════════════════════════════ */
  class Journey {
    constructor(root) {
      this.root = root;
      root.classList.add('jn');
      buildDOM(root);

      this.scenes = [...root.querySelectorAll('[data-scene]')].map(el => ({
        el,
        stage: el.querySelector('.jn-stage'),
        pinned: el.hasAttribute('data-pin'),
        atmo: [el.dataset.atmoA, el.dataset.atmoB, el.dataset.atmoBase],
        counters: [...el.querySelectorAll('[data-count]')].map(n => ({ n, to: +n.dataset.count, last: -1 })),
        meters: [...el.querySelectorAll('.jn-meter i')],
        top: 0, h: 0, live: false,
      }));

      this.atmoEl = root.querySelector('[data-atmo]');
      this.ribbon = root.querySelector('[data-ribbon]');
      this.glow = root.querySelector('[data-ribbon-glow]');
      this.track = root.querySelector('[data-ribbon-track]');
      this.fill = root.querySelector('[data-ribbon-fill]');
      this.head = root.querySelector('[data-ribbon-head]');
      this.nodesG = root.querySelector('[data-nodes]');
      this.rail = root.querySelector('[data-rail]');

      this.live = new Set();
      this.dirty = true;
      this.raf = null;
      this.lastNodeIdx = -1;
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

      /* IntersectionObserver culling */
      this.io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          const s = this.scenes.find(x => x.el === e.target);
          if (!s) return;
          s.live = e.isIntersecting;
          if (e.isIntersecting) {
            this.live.add(s);
            s.el.style.willChange = 'transform';
          } else {
            this.live.delete(s);
            s.el.style.willChange = '';
          }
        });
        this.kick();
      }, { root, rootMargin: '35% 0px 35% 0px', threshold: 0 });

      this.scenes.forEach(s => this.io.observe(s.el));

      this.onScroll = () => this.kick();
      root.addEventListener('scroll', this.onScroll, { passive: true });

      this.ro = new ResizeObserver(() => this.measure());
      this.ro.observe(root);

      this.buildRail();
      this.bindEvents();

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this.measure());
      }
      this.measure();
    }

    bindEvents() {
      /* Swatch color switcher inside Vision scene */
      this.root.addEventListener('click', e => {
        const swatch = e.target.closest('.jn-swatch-item');
        if (!swatch) return;
        const color = swatch.dataset.color;
        const scene = swatch.closest('.jn-scene');
        if (!scene || !color) return;
        scene.querySelectorAll('.jn-swatch-item').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        scene.dataset.atmoA = color;
        this.kick();
      });

      /* Wax seal stamper micro-interaction */
      const stamper = this.root.querySelector('#jnWaxStamper');
      if (stamper) {
        stamper.addEventListener('click', () => {
          stamper.style.transform = 'scale(1.25) rotate(15deg)';
          if (window.lucide) lucide.createIcons();
          setTimeout(() => { stamper.style.transform = ''; }, 400);
          if (window.toast) toast('KOSHA Monogram Wax Seal Stamped ✦', 'success');
        });
      }

      /* Music audio player preview toggle */
      const playBtn = this.root.querySelector('#jnZaffaAudioBtn');
      if (playBtn) {
        let playing = false;
        playBtn.addEventListener('click', () => {
          playing = !playing;
          playBtn.innerHTML = playing ? '<i data-lucide="pause"></i>' : '<i data-lucide="play"></i>';
          if (window.lucide) lucide.createIcons();
          if (window.toast) toast(playing ? 'Playing Emirati Zaffa Drums Preview' : 'Audio Paused', 'info', 2000);
        });
      }
    }

    measure() {
      const root = this.root;
      const vh = root.clientHeight;
      if (!vh) return;
      this.vh = vh;
      root.style.setProperty('--jn-vh', vh + 'px');

      this.scenes.forEach(s => { s.top = s.el.offsetTop; s.h = s.el.offsetHeight; });
      this.scrollMax = Math.max(1, root.scrollHeight - vh);

      this.layoutRibbon();
      this.dirty = true;
      this.kick();
    }

    /* ── Lay out the continuous ribbon Bezier path ────────────────────── */
    layoutRibbon() {
      const W = this.root.clientWidth;
      const H = this.root.scrollHeight;
      if (!W || !H) return;

      this.ribbon.setAttribute('viewBox', `0 0 ${W} ${H}`);
      this.ribbon.setAttribute('width', W);
      this.ribbon.setAttribute('height', H);

      const pts = this.scenes.map((s, i) => ({
        x: i === 0 ? W * 0.5 : (i % 2 ? W * 0.82 : W * 0.18),
        y: s.top + s.h * 0.5,
      }));

      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i], dy = (b.y - a.y) * 0.55;
        d += ` C ${a.x} ${a.y + dy}, ${b.x} ${b.y - dy}, ${b.x} ${b.y}`;
      }
      this.track.setAttribute('d', d);
      this.fill.setAttribute('d', d);
      this.glow.setAttribute('d', d);

      this.len = this.fill.getTotalLength();
      this.fill.style.strokeDasharray = this.len;
      this.fill.style.strokeDashoffset = this.len;
      this.glow.style.strokeDasharray = this.len;
      this.glow.style.strokeDashoffset = this.len;

      this.nodeAt = pts.map(p => this.lengthAtY(p.y) / this.len);

      this.nodesG.innerHTML = pts.map((p, i) => `
        <g class="jn-node" data-node="${i}" transform="translate(${p.x},${p.y})">
          <circle class="halo" r="15"/>
          <circle class="ring" r="9"/>
          <circle class="core" r="4.5"/>
          <circle class="hit" r="24" style="pointer-events:auto;cursor:pointer"/>
        </g>`).join('');

      this.nodeEls = [...this.nodesG.querySelectorAll('.jn-node')];
      this.nodeEls.forEach((g, i) => g.addEventListener('click', () => this.goTo(i)));
      this.ribbon.style.pointerEvents = 'none';
    }

    lengthAtY(y) {
      let lo = 0, hi = this.len;
      for (let i = 0; i < 18; i++) {
        const mid = (lo + hi) / 2;
        if (this.fill.getPointAtLength(mid).y < y) lo = mid; else hi = mid;
      }
      return (lo + hi) / 2;
    }

    buildRail() {
      this.rail.innerHTML = this.scenes.map((s, i) => {
        const ms = MILESTONES[i - 1];
        const title = ms ? (ms.ar ? ms.ar.split('·')[0] : `Chapter ${i}`) : 'Overture';
        return `<button data-jump="${i}" data-title="${title}" aria-label="Chapter ${i}"></button>`;
      }).join('');
      this.rail.addEventListener('click', e => {
        const b = e.target.closest('[data-jump]');
        if (b) this.goTo(+b.dataset.jump);
      });
      this.railBtns = [...this.rail.querySelectorAll('button')];
    }

    goTo(i) {
      const s = this.scenes[i];
      if (!s) return;
      this.root.scrollTo({ top: s.top - (this.vh - s.h) / 2, behavior: this.reduced ? 'auto' : 'smooth' });
    }

    kick() {
      this.dirty = true;
      if (!this.raf) this.raf = requestAnimationFrame(() => this.frame());
    }

    frame() {
      this.raf = null;
      if (!this.dirty) return;
      this.dirty = false;

      const st = this.root.scrollTop;
      const vh = this.vh || this.root.clientHeight;
      const gp = clamp01(st / this.scrollMax);

      this.root.style.setProperty('--gp', gp.toFixed(4));

      /* Update continuous ribbon stroke dashoffset and gold head position */
      if (this.len) {
        const drawnLen = this.len * gp;
        this.fill.style.strokeDashoffset = (this.len - drawnLen).toFixed(1);
        this.glow.style.strokeDashoffset = (this.len - drawnLen).toFixed(1);
        
        if (this.head && drawnLen > 0) {
          const pt = this.fill.getPointAtLength(drawnLen);
          this.head.setAttribute('cx', pt.x.toFixed(1));
          this.head.setAttribute('cy', pt.y.toFixed(1));
        }
      }

      /* Milestone node lighting & rail highlights */
      let currentIdx = 0;
      for (let i = 0; i < this.nodeAt.length; i++) {
        if (gp >= this.nodeAt[i] - 0.004) currentIdx = i;
      }
      if (currentIdx !== this.lastNodeIdx) {
        this.nodeEls.forEach((g, i) => {
          g.classList.toggle('reached', gp >= this.nodeAt[i] - 0.004);
          g.classList.toggle('current', i === currentIdx);
        });
        this.railBtns.forEach((b, i) => b.classList.toggle('on', i === currentIdx));
        
        const titleEl = document.getElementById('jnCurrentTitle');
        const chapterEl = document.getElementById('jnCurrentChapter');
        if (titleEl && chapterEl) {
          const ms = MILESTONES[currentIdx - 1];
          if (ms) {
            titleEl.textContent = ms.ar.split('·')[0] + ' · ' + ms.id.toUpperCase();
            chapterEl.textContent = `Destination ${currentIdx} of ${MILESTONES.length}`;
          } else {
            titleEl.textContent = 'The Kosha Journey';
            chapterEl.textContent = 'Begin Descent';
          }
        }
        this.lastNodeIdx = currentIdx;
      }

      /* Scene progress loop for visible scenes */
      let atmoScene = null, atmoT = 0;
      this.live.forEach(s => {
        const st0 = s.top, h = s.h;
        let p, pIn, pOut;

        if (s.pinned) {
          const span = Math.max(1, h - vh);
          p = clamp01((st - st0) / span);
          pIn = smooth(clamp01(p / 0.3));
          pOut = clamp01((p - 0.7) / 0.3);
        } else {
          p = clamp01((st + vh - st0) / (vh + h));
          pIn = smooth(clamp01((st + vh - st0) / (vh * 0.65)));
          pOut = clamp01((st + vh * 0.5 - (st0 + h)) / (vh * 0.5));
        }

        const style = s.el.style;
        style.setProperty('--p', p.toFixed(4));
        style.setProperty('--pIn', pIn.toFixed(4));
        style.setProperty('--pOut', pOut.toFixed(4));

        /* Number counters */
        s.counters.forEach(c => {
          const val = Math.round(c.to * pIn);
          if (val !== c.last) { c.n.textContent = fmtNum(val); c.last = val; }
        });
        s.meters.forEach(m => {
          m.style.setProperty('--fill', (pIn * (+m.style.getPropertyValue('--target') || 1)).toFixed(3));
        });

        const centreDist = Math.abs((st0 + h / 2) - (st + vh / 2));
        if (atmoScene === null || centreDist < atmoT) { atmoScene = s; atmoT = centreDist; }
      });

      /* Atmospheric background blending */
      if (atmoScene) {
        const idx = this.scenes.indexOf(atmoScene);
        const centre = atmoScene.top + atmoScene.h / 2;
        const rel = (st + vh / 2 - centre) / atmoScene.h;
        const nb = this.scenes[rel > 0 ? Math.min(idx + 1, this.scenes.length - 1) : Math.max(idx - 1, 0)];
        const t = clamp01(Math.abs(rel) * 1.6);
        this.atmoEl.style.setProperty('--atmo-a', mix(atmoScene.atmo[0], nb.atmo[0], t));
        this.atmoEl.style.setProperty('--atmo-b', mix(atmoScene.atmo[1], nb.atmo[1], t));
        const base = mix(atmoScene.atmo[2], nb.atmo[2], t);
        this.atmoEl.style.setProperty('--atmo-base', base);
        this.root.style.setProperty('--atmo-base', base);
      }
    }

    destroy() {
      this.io.disconnect(); this.ro.disconnect();
      this.root.removeEventListener('scroll', this.onScroll);
      if (this.raf) cancelAnimationFrame(this.raf);
    }
  }

  /* ═══ PUBLIC API ═════════════════════════════════════════════════════ */
  let instance = null;
  window.KoshaJourney = {
    mount(root) {
      if (instance) instance.destroy();
      instance = new Journey(root);
      return instance;
    },
    refresh() { if (instance) instance.measure(); },
    get instance() { return instance; },
    MILESTONES,
  };
})();
