# KOSHA Product Specification: 00 - Project Vision

## Vision
KOSHA is not just a digital platform; it is an intimate, high-luxury wedding ecosystem designed to transform the complex, emotionally high-stakes journey of Emirati and Gulf marriages into a harmonious, award-winning experience. The vision is to establish an interface that transcends standard mobile app paradigms—eliminating rigid rectangular grids, clinical forms, and generic UI widgets in favor of fluid, ribbon-infused UI artwork where every screen feels bespoke, culturally resonant, and emotionally empowering.

When a user opens KOSHA, they must immediately recognize it without checking the logo. The visual rhythm, continuous silk-ribbon geometry, warm editorial typography (Cormorant Garamond + Plus Jakarta Sans), and layered glass elevation redefine digital luxury for modern Arab weddings.

## User Goals
- Experience wedding planning not as a logistical chore, but as a dream coming alive step-by-step.
- Find deep compatibility, cultural respect, and absolute privacy during pre-marital matchmaking (Khitbah).
- Seamlessly curate the bridal trousseau and luxury wedding assets (Zahba) with editorial elegance.
- Connect with certified marital, legal, and psychological experts (Tawjeeh) in an inspiring knowledge sanctuary.
- Track vendors, payments, timelines, guest lists, and weather risks in a unified visual roadmap (Zaffa).

## UX Problems
- Existing wedding and event apps look like generic project management software (Jira/Trello wrappers with pink gradients).
- Standard e-commerce apps treat bridal prep like commodity shopping, stripping away the celebratory luxury.
- Matchmaking applications rely on shallow swipe mechanics that trivialize family values and privacy concerns.
- Consultation platforms feel clinical, intimidating, and disconnected from the celebratory context of marriage.
- Users suffer cognitive overload from disjointed spreadsheets, messaging threads, and vendor invoices.

## Proposed Solution
- **The Ribbon Ecosystem Paradigm**: Replace rigid UI boundaries with continuous, fluid ribbon contours that mirror the KOSHA brand stroke.
- **Contextual Workspaces Over Modals**: Eliminate pop-up modal sheets; replace them with floating, layered design islands that expand and contract naturally.
- **Narrative-Driven Navigation**: Replace static bottom tab bars with a dynamic "Ribbon Flow" navigation bar that morphs based on the user's active life journey phase.
- **Integrated Life Journey Roadmap**: Transform project management into a interactive, visual wedding storyline where completed milestones unlock future preparation chapters.

## Design Concepts
- **Editorial Fluidity**: Layouts inspired by high-fashion editorial magazines (*Vogue Weddings*, *Kinfolk*), utilizing asymmetric grids, generous negative space, and dual-font typography hierarchies.
- **Soft Organic Elevation**: Shadow-less depth created through subtle color temperature shifts, background blurs (`backdrop-filter: blur(20px)`), and layered hairline borders (`0.5px` stroke with `#E8E2D9` in light theme, `#362B2C` in dark theme).
- **Emirati Warmth & Heritage**: Warm Cream (`#FAF7F2`) and Deep Burgundy (`#4A0D15`) foundations paired with Soft Lavender (`#9F86C0`) and Royal Blue (`#1A365D`) highlights.

## Wireframe Description
```
+-------------------------------------------------------------+
|  [Avatar]            K O S H A              (Inbox) (Notif) |
|  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  |
|  /  THE DREAM ROADMAP (Ribbon Node Path)                 \  |
| (  [Node 1: Venue] ----> (Node 2: Zahba) ----> [Node 3]   ) |
|  \_______________________________________________________/  |
|                                                             |
|   +-----------------------------------------------------+   |
|   |  FLOATING CONTENT ISLAND                            |   |
|   |  "Your Zaffa Timeline: 142 Days Remaining"         |   |
|   |  [ Interactive Journey Arc Widget ]                 |   |
|   +-----------------------------------------------------+   |
|                                                             |
|   ~ ~ ~ ~ ~ ~ Curved Flowing Section Divider ~ ~ ~ ~ ~ ~ ~   |
|                                                             |
|   +-------------------+    +----------------------------+   |
|   |  FEATURED STUDIO  |    |  EXPERT KNOWLEDGE CAPSULE  |   |
|   |  (Organic Shape)  |    |  (Layered Glass Island)    |   |
|   +-------------------+    +----------------------------+   |
|                                                             |
|   ===================== RIBBON NAV ======================   |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Global Header**: Scrolls with parabolic dampening. When scrolled down, the title morphs into a compact ribbon emblem while avatar and notifications dock into a translucent header glass island.
- **Content Islands**: Elevate smoothly on hover/touch (`scale: 1.02`), triggering a subtle haptic tick. Expanding an island pushes neighboring components gracefully down using spring physics.
- **Interactive Story Chips**: Tap-and-hold gestures unveil detailed previews without changing page context, using progressive disclosure.

## Animation Behaviour
- **Spring Physics Engine**: Built using custom mass-spring-damper configs (`mass: 1.0, tension: 180, friction: 26`) for screen pushes, avoiding linear or standard cubic-bezier curves.
- **Shared Element Morphing**: Tapping any card seamlessly morphs its outer contour into the container boundary of the target screen, creating unbroken visual continuity.
- **Ribbon Wave Flow**: Background stroke path subtly oscillates at `0.2Hz` during idle states, giving the app a living, organic presence.

## Accessibility
- **Screen Reader Hierarchy**: High-order landmarks (`header`, `main`, `navigation`, `aside`) mapped to VoiceOver/TalkBack elements.
- **Contrast Ratios**: All text tokens strictly enforce WCAG 2.1 AAA contrast (minimum 7:1 ratio against background surface).
- **Dynamic Text Scaling**: Supports system-level font scaling up to 200% without breaking fluid ribbon layouts.

## Edge Cases
- **Low Power / Reduced Motion Mode**: Automatically disables background ribbon wave animations and translucent blur filters, falling back to static vector curves and high-contrast solid backgrounds.
- **RTL / LTR Bidirectional Support**: Complete mirroring of ribbon paths, typography alignments, and gesture directions for Arabic and English locales.

## AI Suggestions
- **Dynamic Context Adaptation**: AI analyzes user progress in Zaffa to dynamically highlight missing requirements or weather alerts on the Home screen.
- **Predictive Intent Engine**: Pre-renders next likely screen transition based on user tap history and wedding countdown timeline.

## Developer Notes
- Design tokens defined in `design_tokens.json` must be used exclusively. No hardcoded hex values or px offsets allowed.
- All curve parameters must utilize SVG cubic beziers `d="M ... C ..."` anchored to dynamic view dimensions.

## Fable Implementation Notes
- **Component Wrapper**: Use `KoshaView` primitive wrapper with built-in spring physics and haptic triggers.
- **Theme Hooks**: Access colors via `useKoshaTheme()` hook; dynamic background blending requires GL / Skia canvas bindings.
