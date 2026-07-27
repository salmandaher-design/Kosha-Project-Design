# KOSHA Product Specification: 01 - KOSHA Design DNA

## Vision
The KOSHA Design DNA is the foundational design language system that makes every digital touchpoint instantly recognizable as KOSHA without relying on a logo placement. It codifies the page rhythm, spatial grid, shape philosophy, motion philosophy, language tone, state behaviors, and premium luxury moments across the entire application ecosystem.

## User Goals
- Feel an immediate sense of quiet luxury, safety, and cultural warmth upon entering any screen.
- Enjoy an intuitive spatial rhythm that reduces cognitive fatigue during intense wedding planning.
- Benefit from clear, supportive, and celebratory language during key actions (onboarding, payments, errors).

## UX Problems
- Apps often feel like collections of disjointed screens built by different teams using generic design kits.
- Cold, robotic copy in error messages and loading screens damages emotional trust during romantic lifecycle events.
- Overuse of harsh box shadows and heavy borders creates visual noise and cheapens the product aesthetic.

## Proposed Solution
- **Unified Brand Geometry**: All layout containers derive their corner radii, cutouts, and divider curves from the golden ratio of the KOSHA logo's ribbon loop.
- **Micro-Tone Philosophy**: Onboarding, loading, success, and error language are written with editorial warmth, empathy, and Emirati hospitality.
- **Section Identity Palette**: Each core module is anchored by a dedicated accent tone while retaining the unified Deep Burgundy & Warm Cream foundation.

## Design Concepts

### 1. Spacing & Spatial Rhythm Philosophy
We enforce an organic 4pt incremental grid paired with rhythmic negative space:
- **Compact Padding**: `8px` / `12px` (Internal chip offsets, icon-label locks).
- **Standard Container Padding**: `20px` / `24px` (Floating Island padding).
- **Section Breathers**: `36px` / `48px` (Curved ribbon divider margins).
- **Page Headroom**: `64px` (Top editorial title margins).

### 2. Shape Philosophy
- **No Sharp Rectangles**: Standard `0px` radii are strictly prohibited.
- **Soft Asymmetric Radii**: Floating Islands use asymmetric corners (e.g., Top-Left: `32px`, Top-Right: `16px`, Bottom-Right: `32px`, Bottom-Left: `32px`) echoing continuous organic ribbons.
- **Layered Curved Overlaps**: Containers overlap preceding sections by `16px` with a dynamic drop contour.

### 3. Section Identity Palette
| Module | Core Accent | Soft Tint | Emotional Resonance |
| :--- | :--- | :--- | :--- |
| **Khitbah (Matchmaking)** | `#9F86C0` (Soft Lavender) | `#F4EFEA` | Romance, Privacy, Soul Alignment |
| **Zahba (Bridal Trousseau)** | `#D4AF37` (Warm Rose Gold) | `#FAF5EF` | Luxury, Craftsmanship, Celebration |
| **Zaffa (Wedding Roadmap)** | `#4A0D15` (Deep Burgundy) | `#FAF7F2` | Grandeur, Tradition, Execution |
| **Tawjeeh (Consultation)** | `#1A365D` (Royal Blue) | `#EEF4FB` | Trust, Wisdom, Harmony |

### 4. Language & Editorial DNA
- **Onboarding Language**: "Welcome to your dream's sanctuary. Let us weave your story together."
- **Loading Language**: "Curating luxury details for your special day..." / "Harmonizing vendor schedules..."
- **Success Language**: "A milestone locked in your story. Your journey blooms brighter."
- **Error Language**: "We encountered a subtle pause. Let us guide you back seamlessly."

## Wireframe Description
```
+-------------------------------------------------------------+
|  SECTION IDENTITY: ZAFFA (Deep Burgundy Highlight Accent)   |
|                                                             |
|  [=== Editorial Header: "The Wedding Trousseau" ===]        |
|  (Cormorant Garamond 36px, Soft Motion Entrance)            |
|                                                             |
|  +-------------------------------------------------------+  |
|  |  ASYMMETRIC FLOATING ISLAND                           |  |
|  |  (Radii: TL 32px | TR 16px | BR 32px | BL 32px)        |  |
|  |                                                       |  |
|  |  [ Organic Control Grouping: Pill Selectors ]        |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  ~~~ Organic Flow Divider Path (SVG Bezier Stroke) ~~~~~~~~~  |
|                                                             |
|  +-------------------------------------------------------+  |
|  |  PREMIUM MOMENT: Interactive Gold Foil Shimmer Badge   |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Asymmetric Floating Islands**: When selected or active, the truncated corner (e.g. `16px`) expands smoothly to `32px`, giving an elastic morphing reaction to user focus.
- **Organic Control Groups**: Radio choices and tab buttons morph continuously inside a liquid pill track using layout animation transitions.

## Animation Behaviour
- **Motion Rhythm**: Entrance animations use staggered delays (`0.04s` step offset per island) to create a cascading downward curtain effect.
- **Continuous Ribbon Pulse**: Badges and active status indicators glow with a soft breathing opacity curve (`0.4` to `1.0` over `3000ms`).

## Accessibility
- **Semantic Color Reliance**: Color changes (such as section accents) are always accompanied by secondary visual indicators (icon shape change, textual badge, state label).
- **Touch Target Padding**: Minimal touch target size for organic controls is locked to `48px x 48px`.

## Edge Cases
- **High Contrast Accessibility Mode**: Replaces asymmetric radii with standard uniform `24px` radii and adds high-contrast outer hairlines (`1.5px`).
- **Dark Mode Palette Adaptation**: Backgrounds shift to soft warm black (`#140F0F`), surface islands to (`#1F191A`), maintaining soft burgundy depth.

## AI Suggestions
- **Emotional State Detector**: Adjusts app copy greeting based on proximity to the wedding date (e.g., calm supportive tone 7 days before wedding vs exploratory tone 180 days before).

## Developer Notes
- Store shape philosophy values as design tokens in `design_tokens.json` under `radii.asymmetric` and `elevation.island`.

## Fable Implementation Notes
- Implement `KoshaIsland` component accepting `variant="asymmetric"` prop to automatically handle spring morphing and theme tinting.
