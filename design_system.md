# KOSHA Design System Specification
## Brand Identity, Visual System, and Component Standards

KOSHA is a luxury wedding ecosystem. This design system bridges editorial sophistication with modern interface design, merging the curves of the KOSHA logo with high-performance UI engineering.

---

## 1. Brand Personality & Identity

| Dimension | Aesthetic Expression | Product Translation |
| :--- | :--- | :--- |
| **Luxury** | Elegant, high-value, bespoke, non-commodity. | Deep burgundy accents, generous spacing, serif display fonts. |
| **Modern** | Clean, fast, tech-forward, high-performance. | Ultra-smooth micro-interactions, sans-serif UI, flat color fields. |
| **Warm & Emotional** | Human, connective, celebratory, romantic. | Cream backgrounds, soft lavender accents, natural skin-tone imagery. |
| **Elegant & Minimal** | Quiet confidence, clutter-free, high focus. | Border-based separation (Linear-style) rather than block shading. |

### Visual Style DNA
* **Apple Human Interface**: Native-feeling navigation, smooth gesture-based dismissals, circular avatar frames, bottom sheets.
* **Stripe Motion**: Continuous, elastic page transitions, shimmer skeleton states, status-based color morphing.
* **Notion Spacing**: Strict grids, content-first layout, clear document-like hierarchies in profiles and listings.
* **Linear Precision**: Hairline borders (`0.5pt`), dark mode surfaces with subtle color tints, high contrast icons.
* **Instagram Polish**: Immersive media cards, circular imagery, seamless transitions from catalog to detail views.

---

## 2. Color System & Theme Variables

KOSHA avoids pure white (`#FFFFFF` in light mode is reserved for overlays) and pure black (`#000000` is never used).

### Primary Color Palette

| Token | Hex (Light) | Hex (Dark) | Description / Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `#4A0D15` | `#E8D3D6` | Deep Burgundy (Luxurious, romantic brand core) |
| **Secondary** | `#1A365D` | `#90CDF4` | Royal Blue (Trust, booking clarity, security) |
| **Accent** | `#9F86C0` | `#D6CADD` | Soft Lavender (Emotional transitions, spark effects) |
| **Background** | `#FAF7F2` | `#140F0F` | Warm Cream / Soft Warm Black (No cold tones) |
| **Surface** | `#FDFBF8` | `#1F191A` | Card & container background |
| **Border** | `#E8E2D9` | `#362B2C` | Muted hairline dividers (`0.5px`) |

*Detailed token mappings are defined in the [design_tokens.json](file:///c:/Users/ASUS/Desktop/kosha/design_tokens.json) file.*

---

## 3. Typography Scale & Hierarchy

We use a **Dual-Font System**:
1. **Cormorant Garamond** (Serif): Used for all editorial titles, display elements, headers, and quote blocks. It provides a luxurious, high-fashion editorial feel.
2. **Plus Jakarta Sans** (Sans-Serif): Used for all functional UI text, buttons, body paragraphs, and micro-text to ensure readability on small screens.

### Typography Specifications

| Scale | Size | Line Height | Tracking | Font Family | Default Weight |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | 48px | 56px | -1.5% | Cormorant Garamond | Semibold (600) |
| **Hero** | 36px | 44px | -1.0% | Cormorant Garamond | Semibold (600) |
| **Heading 1** | 28px | 36px | -0.5% | Cormorant Garamond | Semibold (600) |
| **Heading 2** | 22px | 28px | -0.2% | Cormorant Garamond | Semibold (600) |
| **Heading 3** | 18px | 24px | 0% | Plus Jakarta Sans | Semibold (600) |
| **Title** | 16px | 22px | 0% | Plus Jakarta Sans | Bold (700) |
| **Subtitle** | 14px | 20px | 0% | Plus Jakarta Sans | Medium (500) |
| **Body** | 15px | 22px | 0% | Plus Jakarta Sans | Regular (400) |
| **Caption** | 12px | 16px | +0.2% | Plus Jakarta Sans | Regular (400) |
| **Micro** | 10px | 12px | +0.5% | Plus Jakarta Sans | Medium (500) |
| **Button** | 14px | 20px | +0.5% | Plus Jakarta Sans | Bold (700) |
| **Navigation** | 11px | 14px | +0.2% | Plus Jakarta Sans | Medium (500) |

---

## 4. Spacing, Borders, and Radii

### Spacing System (4pt Grid)
We use a strict incremental spacing system:
* `xs`: **4px** (Label-to-input gap, icon offsets)
* `sm`: **8px** (Inside-card text groups, chip padding)
* `md`: **12px** (Sub-item grouping, card inline elements)
* `lg`: **16px** (Standard screen margins, card inner padding)
* `xl`: **20px** (Card-to-card gap, section subheaders)
* `xxl`: **24px** (Section-to-section gap)
* `xxxl`: **32px** (Hero margin, bottom sheet handles)
* `huge` / `xhuge`: **40px / 48px** (Large header margins)
* `layout_sm` / `md` / `lg`: **64px / 80px / 96px** (Onboarding margins, empty state offsets)

### Border Radii (Inspired by Logo Curves)
To echo the logo's elegant rounded geometry:
* **Avatars / Circular Badges**: `9999px` (Full circle)
* **Bottom Sheets / Modals**: `40px` (Highly pronounced top-left and top-right curves)
* **Large Containers / Dialogs**: `28px` / `32px` (Soft rounded corners)
* **Standard Cards / Floating Cards**: `24px` / `20px` (Balances content framing)
* **Buttons / Text Inputs**: `14px` / `12px` (Comfortable interaction touchpoints)
* **Mini Chips / Small Badges**: `4px` / `8px` (Maintains layout precision)

---

## 5. Assets, Icons, and Media Guidelines

### Iconography Style
* **Source**: Custom SVGs or `lucide-react-native` configured with a custom style wrapper.
* **Weights**: Ultra-light (`1.2px` stroke width) to standard (`1.5px` stroke width).
* **Geometry**: Curved terminals, circular nodes, avoiding sharp rectangular corners.
* **Haptics**: Navigation icons trigger selection haptics on tap.

### Illustration Style (Wedding-Inspired Abstract)
* **Elements**: Ribbon curves, abstract outline flowers, delicate sparkles (`✦`), fluid paths mimicking satin textures.
* **Gradients**: Soft dual-tone background gradients (Burgundy to Lavender, Opacity `0.08` to `0`).
* **Visual Density**: Light. Do not use heavy flat illustrations or cartoon elements. Use line art and geometric structures.

### Photography Style (Editorial Luxury)
* **Tone**: Natural daylight, editorial styling (similar to *Vogue Weddings* or *Kinfolk*).
* **Color Temperature**: Warm tones, rich neutral backgrounds, golden-hour accents.
* **Composition**: Central subject framing, shallow depth of field, generous negative space.

### 3D Brand Assets (Blender Core)
To project a premium, high-fidelity aesthetic, the brand identity supports 3D-modeled logo variants for splashes, headers, and video openers:
* **Geometry Specifications**: Curve-traced vector profiles, extruded at `0.05m`, with a double-sided fill and a `0.008m` rounded edge bevel.
* **Material & Lighting**: High-specular Metallic Burgundy (`Base Color: #4A0D15`, `Metallic: 0.95`, `Roughness: 0.18`) set in a professional three-point area lighting rig (800W Key, 300W Fill, and 1200W Rim backlighting to trace the bevels).
* **Source Master Asset**: [logo_3d.blend](file:///c:/Users/ASUS/Desktop/kosha/logo_3d.blend).

---

## 6. Motion, Haptics, and Micro-interactions

All transitions are optimized to feel like native iOS. We avoid standard cubic-bezier curves in favor of mass-spring-damper physical springs.

### Physics-based Spring Configs

| Transition Type | Mass | Tension | Friction | Behaviors |
| :--- | :--- | :--- | :--- | :--- |
| **Card Slide / Dismiss** | 1.0 | 180 | 26 | Responsive, natural dampening, no bounce. |
| **Modal Sheet Spring** | 1.2 | 220 | 30 | Firm, high-speed pull-up, smooth settling. |
| **Micro-tap Button Bounce** | 0.8 | 350 | 18 | Snappy, quick scale-down (`0.96`), instant return. |
| **Tab / Layout Fade** | Linear | - | - | Custom cross-fade duration of 180ms. |

### Haptic Feedback System
* **Selection / Scroll Index**: Soft tick on list item transition.
* **Tap Button (Primary)**: Light haptic pulse.
* **Success / Payment Completed**: Double medium pulses (Success signal).
* **Error / Input Invalid**: Three short rapid pulses (Error signal).

---

## 7. Component Library Specifications

### Buttons
1. **Primary Button**: Filled background (`Primary` color), text in `text_on_primary`, rounded corner `14px`. Dynamic scaling on press (`scale: 0.96`).
2. **Secondary Button**: Hairline border (`1.5px`, `Primary` color), background transparent, text `primary`.
3. **Glass Button**: Semi-transparent surface, blurred background (using overlay glass), hairline white border. Used over photography.
4. **FAB (Floating Action Button)**: Round (`9999px`), `Primary` background, high elevation shadow (`floating`), containing icon.

### Inputs & Selectors
1. **Text Fields**: Large input height (`54px`), rounded corner `12px`, thin border (`1px` `#E8E2D9`). Active state transitions border to `primary` with a 150ms ease. Label floats to top-left.
2. **Segment Controls**: Pill-shaped container (`borderRadius: 9999px`), dark/light theme backdrop. Selected tab uses a sliding white card backing powered by spring physics.
3. **Date/Time Pickers**: Embedded calendar grid (Cormorant display for months, Plus Jakarta for dates). Minimal spacing, selection indicated by a soft circular burgundy background.

### Cards & Collections
1. **Matchmaking Detail Card**: Large editorial card, full-screen background photo, text overlaid on bottom using a black-to-transparent gradient (`rgba(0,0,0,0.6)`). Contains compatibility match percentage in a small lavender chip.
2. **Vendor/Services Card**: Standard card (`borderRadius: 24px`), top half image, bottom half details (Title, rating star, location, starting price). Hairline border.
3. **Booking Summary Card**: Floating card with dual borders, showing payment status (Success, Pending, Action Needed) in matching accent colors.

### Feedback & Alerts
1. **Modal Sheets**: Pull-up sheets with rounded corners (`40px`), top pill handle for dismiss gesture. Height dynamically fits contents or locks to `80%` height for directory details.
2. **Toasts**: Micro-toasts appearing from the top edge. Blurred glass background (`backdropFilter: blur(10px)`), elegant thin font, automatically sliding up and out after `2500ms`.
