# KOSHA Product Specification: 99 - KOSHA Signature Elements

## Vision
The KOSHA Signature Elements are 10 proprietary visual and interaction primitives that appear across the entire application ecosystem. They are immutable design locks. No developer or designer is permitted to replace these 10 primitives with standard UI components. They guarantee instant brand recognition without relying on the logo.

## User Goals
- Interact with a distinctive, cohesive interface system that feels exclusively built for KOSHA.
- Navigate seamlessly using tangible visual cues, continuous paths, and rewarding touch feedback.

## UX Problems
- Apps typically look like interchangeable templates because they use off-the-shelf component libraries (Material/Tailwind/AntD).
- Visual interest drops after the home screen; sub-pages return to standard, uninspired lists and form controls.

## Proposed Solution
Codify 10 non-negotiable KOSHA Signature UI Primitives:

### 1. The Flow Ribbon Section Divider
A continuous stroke path inspired by the logo's continuous loop that smoothly separates page sections. Rather than a flat horizontal line, it curves gracefully down, frames section content, and flows into the background.

### 2. The Journey Node Timeline
Used in Zaffa wedding roadmaps, Khitbah compatibility steps, and onboarding. Replaces bullet points and standard progress bars with illuminated gold/burgundy interactive ring nodes connected by animated ribbon paths.

### 3. Layered Curved Panel Workspace
Replaces all standard modal sheets. Features asymmetric top curves (`40px` / `20px`), glass blur backdrop (`backdrop-filter: blur(25px)`), and a ribbon-contour pull handle.

### 4. Floating Content Islands
Replaces standard flat cards. Soft elevation achieved via subtle warm tone drop shadows (`box-shadow: 0 12px 32px rgba(74, 13, 21, 0.06)`), asymmetric radii, and hairline golden borders (`0.5px`).

### 5. Organic Grouped Controls
Pill-shaped segmented selectors with liquid sliding background cards powered by mass-spring-damper physics (`mass: 0.8, tension: 300, friction: 20`).

### 6. Arch-Contoured Editorial Frames
Image containers used in Zahba listings, Khitbah profiles, and Zaffa vendor highlights featuring a distinctive cathedral top arch curvature (`border-radius: 120px 120px 24px 24px`).

### 7. Brand Ribbon Loading Wave
Replaces standard circular spinners. A animated vector path of the KOSHA logo stroke that draws itself continuously with a shimmering gradient.

### 8. Soft Depth Color Temperature Shifts
Instead of dark grey shadows, depth is achieved by shifting surface warmth (Warm Cream `#FAF7F2` -> Soft Warm Surface `#FDFBF8` -> Deep Velvet Burgundy `#4A0D15`).

### 9. Contextual Micro-Toasts
Top-anchored floating translucent ribbons that slide in from behind the header, display editorial micro-feedback, and dissolve into the flow ribbon.

### 10. Haptic Micro-Pulse Suite
Custom tactile vibration profiles mapped to key events:
- *Selection Tick*: `10ms` light pulse on node tap.
- *Milestone Unlock*: Dual medium pulses with `50ms` gap.
- *Error Alert*: Three short high-frequency buzzes.

## Wireframe Description
```
+-------------------------------------------------------------+
|  SIGNATURE 6: ARCH-CONTOURED EDITORIAL FRAME                |
|               /-------------------------------\             |
|              /   CATHEDRAL ARCH CURVATURE      \            |
|             |    (Top Radius: 120px)            |           |
|             \__________________________________/            |
|                                                             |
|  SIGNATURE 1: THE FLOW RIBBON SECTION DIVIDER               |
|  ~~~( SVG Bezier Curve Flowing Across Screen Width )~~~~~~  |
|                                                             |
|  SIGNATURE 2: THE JOURNEY NODE TIMELINE                     |
|  (Node 1: Gold Ring) === Ribbon Path === (Node 2: Active)   |
|                                                             |
|  SIGNATURE 4: FLOATING CONTENT ISLAND                       |
|  +-------------------------------------------------------+  |
|  |  SIGNATURE 5: ORGANIC GROUPED CONTROLS                |  |
|  |  ( Option A ) | [ Option B (Liquid Card Backing) ]    |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  SIGNATURE 3: LAYERED CURVED PANEL WORKSPACE (Active)       |
|  /=======================================================\  |
| |  [ Ribbon Contour Drag Handle ]                        |  |
| |  Asymmetric Glass Blurred Panel Workspace              |  |
| \=======================================================/   |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Flow Ribbon Divider**: Responds to scroll speed; high scroll velocity causes the curve amplitude to subtly flatten dynamically.
- **Layered Curved Panel Workspace**: Dragging down past `100px` threshold dismisses the panel with dynamic spring snap-back if released early.

## Animation Behaviour
- **Ribbon Wave Stroke Draw**: Uses `stroke-dasharray` and `stroke-dashoffset` CSS animations (`2.4s` loop) for the brand loading wave.
- **Asymmetric Frame Hover**: Images inside Arch-Contoured Frames scale (`1.04x`) inside their masked boundaries without overflowing.

## Accessibility
- **High Contrast Borders**: In high contrast mode, all hairlines increase from `0.5px` to `1.5px` `#4A0D15`.
- **Keyboard Navigation Focus Rings**: Signature elements feature a custom gold outline (`2px` `#D4AF37`) on keyboard focus.

## Edge Cases
- **Small Viewport (SE Series / Small Android)**: Arch radii auto-scale from `120px` to `80px` to maintain typography proportion.

## AI Suggestions
- **Signature Placement Engine**: AI layout reviewer verifies that every screen contains at least two of the 10 signature primitives.

## Developer Notes
- Primitive components located in `/src/components/signature/`.
- Never override stroke paths or radii directly; use global token definitions.

## Fable Implementation Notes
- Use `<FlowRibbon />`, `<JourneyNode />`, `<LayeredPanel />`, and `<FloatingIsland />` directly in layout templates.
