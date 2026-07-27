# KOSHA Product Specification: 04 - Component Reinvention

## Vision
To achieve award-winning recognition, KOSHA systematically reinvents every standard mobile UI primitive. Generic cards, rectangular text inputs, basic buttons, default filter chips, standard lists, and plain badges are strictly forbidden. In their place, KOSHA introduces bespoke components designed specifically for luxury Emirati wedding management.

## User Goals
- Interact with controls that feel tactically satisfying, high-end, and visually harmonious.
- Input data through fluid, self-guiding workspaces rather than daunting clinical form fields.
- Experience clear hierarchy and beauty in every UI element.

## UX Problems
- Default UI elements (inputs with thin outline boxes, grey rectangular cards) look generic and cheap.
- Filter chips look like basic Android tags.
- Form inputs trigger layout jumps when error messages appear below input boxes.

## Proposed Solution

### 1. Card Reinvention -> Journey Cards & Floating Content Islands
- Replaces flat rectangular boxes.
- Asymmetric radii (`28px 16px 28px 28px`), golden hairline borders (`0.5px`), warm background tint (`#FDFBF8`), and soft depth drop shadow.

### 2. Button Reinvention -> Velvet Ribbon & Glass Flow Controls
- Replaces flat colored rectangles.
- Primary Button: Deep Velvet Burgundy (`#4A0D15`) filled capsule with rounded pill ends (`9999px`), subtle gold foil sheen border, and micro-bounce press physics (`scale: 0.96`).
- Secondary Glass Button: Semi-transparent glass (`rgba(253, 251, 248, 0.65)`), blurred backdrop, and inner hairline shimmer.

### 3. Input Reinvention -> Fluid Floating Workspaces & Organic Input Fields
- Replaces standard text boxes.
- Floating input fields with integrated Cormorant Garamond floating labels (`18px`) that elevate seamlessly into top ribbon borders on focus.
- Integrated inline validation alerts sliding horizontally within input padding.

### 4. Filter Reinvention -> Visual Filter Spheres & Interactive Category Arcs
- Replaces rectangular scroll chips.
- Circular and arch-contoured visual filter spheres containing iconography and dynamic fill gauges.

### 5. List Reinvention -> Staggered Ribbon Cascades
- Replaces standard vertical lists.
- Asymmetric staggered item entry where odd rows align left and even rows inset slightly, connected by background ribbon threads.

## Design Concepts
```
STANDARD COMPONENT                KOSHA REINVENTED PRIMITIVE
[ Rectangular Card ]       -->    [ Asymmetric Floating Island (Radii 28|16) ]
[ Flat Color Button ]      -->    [ Velvet Ribbon Pill with Gold Foil Sheen ]
[ Outline Text Input ]     -->    [ Fluid Input with Floating Serif Label ]
[ Simple Filter Tag ]      -->    [ Visual Filter Sphere with Fill Gauge ]
```

## Wireframe Description
```
+-------------------------------------------------------------+
|  FLUID FLOATING INPUT FIELD                                 |
|  +-------------------------------------------------------+  |
|  | Label: "Bride & Groom Full Names" (Serif 18px)        |  |
|  | [ Active Typing Indicator: Burgundy Cursor Glow ]     |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  VISUAL FILTER SPHERES                                      |
|  ( Sphere: Venues )  ( Sphere: Flowers )  ( Sphere: Music ) |
|  [=== Fill 80% ===]  [=== Fill 40% ===]  [=== Fill 90% =] |
|                                                             |
|  VELVET RIBBON PILL BUTTON                                  |
|  (=== [Icon] Confirm Selection with Shimmer (Pill) ===)     |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Fluid Floating Input**: On focus, input container height expands from `54px` to `64px`, border transitions from `#E8E2D9` to `#4A0D15`, label scales to `12px` and docks into top-left border cutout.
- **Visual Filter Sphere**: Tapping a sphere triggers an internal liquid wave animation representing filter intensity or selected price tier.

## Animation Behaviour
- **Micro-Bounce Physics**: All interactive buttons utilize spring tension (`tension: 350, mass: 0.8, friction: 18`) returning to rest state within `120ms`.
- **Input Error Shake**: Invalid input triggers a quick horizontal spring vibration (`translateX: [-6, 6, -4, 4, 0]`) while input border shifts to `#B84A39`.

## Accessibility
- **Input Voiceover Annotations**: Inputs speak field purpose, mandatory status, and dynamic error state.
- **High Contrast Focus State**: Keyboard focus outlines component boundaries with high-contrast gold outline (`2px`).

## Edge Cases
- **Disabled State**: Disabled controls retain `0.4` opacity, replace gold borders with soft grey hairline, and respond to tap with a gentle double micro-pulse explaining why control is disabled.

## AI Suggestions
- **Smart Auto-Fill Assistant**: AI pre-populates organic inputs based on user profile metadata, displaying a subtle gold sparkle icon next to auto-filled values.

## Developer Notes
- Re-usable components stored in `/src/components/ui/`: `KoshaIsland`, `KoshaButton`, `KoshaInput`, `KoshaFilterSphere`.

## Fable Implementation Notes
- Ensure input components export standardized React Native TextInput / Web HTML input props with wrapped Kosha animations.
