# KOSHA — Scroll-Driven Journey Architecture Specification

> **Creative Direction, Interaction Design, Motion Design & Frontend Architect**  
> *Branch: `scroll-driven-journey`*

---

## 1. Core Philosophy

**THE ENTIRE APPLICATION IS A SCROLL-DRIVEN JOURNEY.**

Traditional mobile applications isolate content into disconnected pages, tab bars, and static modal screens. **KOSHA V2** replaces this paradigm with one continuous vertical storytelling descent. Users do not navigate away to isolated screens—they travel through a sequence of interconnected, atmospheric scenes.

- **Scroll as Navigation**: Every scroll tick evolves the interface. Content unfolds, cards tilt and shift perspective, statistics compute in real time, and atmospheric light shifts dynamically.
- **Cinematic Continuity**: Sections dissolve into one another through shared visual elements, silk fabric wipes, and ribbon wraps.
- **Interactive Luxury Exhibition**: The user experience feels like walking through a high-end luxury exhibition where every milestone is a destination with its own visual personality.

---

## 2. The Ribbon Motif System

The KOSHA logo is built from an unbroken, continuous stroke monogram. In this version, the ribbon becomes the living heart of the application:

```
[ Top Overture ] ─── (Ribbon Curve) ───► [ Dream ] ─── (Ribbon Wrap) ───► [ Vision ]
                                                                               │
[ Budget ] ◄─── (Node Light-up) ─── [ Guest Seating ] ◄─── (Bezier Morphing) ──┘
    │
    └───► [ Venue Stage ] ───► [ Florals ] ───► [ Photography ] ───► [ Zaffa Soundscape ]
                                                                           │
[ Married Vault ] ◄─── [ Wedding Day ] ◄─── [ Timeline ] ◄─── [ Wax Seal Invitations ]
```

### Roles of the Ribbon
1. **Progress Path**: Draws itself in real-time (`stroke-dashoffset` driven by global scroll progress `--gp`).
2. **Glowing Particle Head**: A luminous gold point (`cx, cy`) calculated via SVG `getPointAtLength()` tracks the user's exact current position on the scroll.
3. **Section Divider & Transition Mechanism**: Curves dynamically between alternating left/right anchor points, wrapping around content cards.
4. **Milestone Node Rail**: Interactive nodes threaded on the path light up with golden halos when reached.
5. **Interactive Micro-Interactions**: Serves as loader rings, wax seal monograms, and custom success state animations.

---

## 3. Cinematic 7-Layer Parallax Architecture

Every scene is rendered across a hardware-accelerated 7-layer depth stack:

```
┌────────────────────────────────────────────────────────────────────────┐
│ Layer 7: Foreground Vignette, Film Grain & Chapter Progress Dock      │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 6: Interactive Micro-Widgets (Swatches, Wax Stamper, Audio Player)│
├────────────────────────────────────────────────────────────────────────┤
│ Layer 5: Section Modules (Matchmaking Radar, Zafa Stage, Tawjeeh Majlis)│
├────────────────────────────────────────────────────────────────────────┤
│ Layer 4: Floating Badges & Parallax Detail Chips (--depth: +40px..+60px)│
├────────────────────────────────────────────────────────────────────────┤
│ Layer 3: Main Milestone Story Cards (0.92..1.0 scale unfold transform) │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 2: Continuous Ribbon SVG Bezier Path & Gold Particle Emitter     │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 1: Atmosphere (Drifting Rose/Gold Petals, Light Rays, Sheens)    │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 0: Dynamic Ambient Backdrops (Color RGB lerp per scene)          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. The 14 Wedding Journey Destinations & Section Identities

Each milestone has a distinct visual identity while remaining unified within the luxury brand ecosystem:

| # | Milestone | Section Identity | Unique Interactive Experience |
|---|---|---|---|
| 1 | ✨ **Dream** | 💕 Matchmaking (Warm & Romantic) | Verified Candidate 92A card with 5-Pillar Harmony Radar chart & private circle intro request. |
| 2 | 👁️ **Vision** | Aesthetic Studio | Interactive Color Swatch palette (Ivory, Gold, Indigo, Emerald) that dynamically reskins app atmosphere. |
| 3 | 💰 **Budget** | Financial Architecture | Real-time AED Budget Allocator breakdown widget (Venue, Attire, Décor, Services). |
| 4 | 👥 **Guests** | Hospitality | Guest seating chart counter & table distribution breakdown (320 confirmed guests, 18 tables). |
| 5 | 🏰 **Venue** | 🌸 Zafa Studio (Architectural Blueprint) | Royal Majestic Hall vs Al Jumeirah Oasis stage selector with guest capacity slider. |
| 6 | 🌸 **Decoration** | Floral & Lighting Art | Spotlight on ivory orchids, gold candelabras, and lighting mood preview. |
| 7 | 📸 **Photography** | Memory Vault | Cinematic shot-list checklist (2 film cinematographers, 1 stills lead, aerial drone). |
| 8 | 🎵 **Music** | Zaffa & Entertainment | Interactive Audio Waveform player widget with play/pause Zaffa drum preview. |
| 9 | 🍽️ **Food** | Luxury Catering | 9-course tasting menu selector timed to evening timeline. |
| 10 | 🚘 **Transportation** | Royal Convoy | 18:40 GST procession timetable and chauffeur escort log. |
| 11 | 💌 **Invitations** | 🛍 Marketplace (Editorial Magazine) | Interactive Wax Seal Stamper widget (click/scroll to stamp KOSHA gold wax monogram onto envelope). |
| 12 | ⏱️ **Timeline** | 🧠 Tawjeeh (Knowledge Sanctuary) | Day-of agenda run-of-show with Live Majlis webinar countdown timer. |
| 13 | 💍 **Wedding Day** | Master Control | Live celebration state counter and wedding day countdown clock (1 May 2027). |
| 14 | 💖 **Married** | Legacy Vault | Finale KOSHA Gold Seal, thank-you cards, and certified digital receipt link. |

---

## 5. Technical Implementation & Motion Guidelines

### 1. Zero Layout-Thrashing Frame Engine
- **Cached Offsets**: `offsetTop` and `offsetHeight` are measured once upon mounting and on window `resize`.
- **Single rAF Loop**: The scroll handler sets `dirty = true` and triggers a single `requestAnimationFrame` loop.
- **Single Style Write**: JavaScript computes and writes CSS custom properties per live scene (`--p`, `--pIn`, `--pOut`, `--gp`). CSS transforms and opacity handle all visual motion without layout recalculations.

### 2. IntersectionObserver Scene Culling
Offscreen scenes are automatically unobserved/culled:
```javascript
this.io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      this.live.add(scene);
      scene.el.style.willChange = 'transform';
    } else {
      this.live.delete(scene);
      scene.el.style.willChange = '';
    }
  });
}, { root, rootMargin: '35% 0px 35% 0px', threshold: 0 });
```

### 3. Smooth Atmospheric Color Interpolation
Atmospheric gradients blend smoothly between adjacent scenes based on normalized scroll distance:
```javascript
const rel = (st + vh / 2 - centre) / scene.h;
const nb = this.scenes[rel > 0 ? Math.min(idx + 1, max) : Math.max(idx - 1, 0)];
const t = clamp01(Math.abs(rel) * 1.6);
this.atmoEl.style.setProperty('--atmo-a', mix(scene.atmo[0], nb.atmo[0], t));
this.atmoEl.style.setProperty('--atmo-b', mix(scene.atmo[1], nb.atmo[1], t));
```

### 4. 60fps Performance Strategy
- All animations use hardware-accelerated properties (`transform: translate3d`, `scale`, `rotateX/Y`, `opacity`).
- Heavy SVG filters are restricted to hardware-accelerated glow layers.
- Full support for `prefers-reduced-motion: reduce`.
