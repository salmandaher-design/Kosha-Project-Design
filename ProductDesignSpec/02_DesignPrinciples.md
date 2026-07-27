# KOSHA Product Specification: 02 - Design Principles

## Vision
The KOSHA Design Principles serve as the unwavering manifesto for every interaction, layout decision, and micro-moment across the platform. They guarantee that KOSHA never degrades into a conventional mobile app. These principles challenge every mobile UI trope, forbidding plain forms, generic cards, rectangular banners, standard bottom sheets, and routine list views.

## User Goals
- Enjoy an experience that feels intentionally crafted, high-fashion, and emotionally inspiring.
- Interact with controls that provide continuous, tactile delight through subtle spring physics and haptics.
- Focus effort on meaningful decisions rather than wading through cluttered interfaces.

## UX Problems
- Apps routinely copy iOS or Android stock components, creating identical, boring digital products.
- Interfaces force users through rigid multi-step form fields that feel like tax forms.
- Dynamic data is presented in dense, uninspiring tables or standard card grids.

## Proposed Solution
- **The Core Tenets of KOSHA Design**:
  1. **Question Every Convention**: If a UI solution looks like iOS settings, Material Design, or Airbnb, tear it down and invent a KOSHA native paradigm.
  2. **Every Screen Has a Hero Signature**: No page is allowed to be mundane. Every screen must contain at least one memorable signature visual element.
  3. **Progressive Luxury Disclosure**: Show only what inspires in the primary layer; expose complex filters and details inside interactive design workspaces.
  4. **Continuous Flow Over Discrete Pages**: Screens do not slam back and forth; they morph, slide, and flow along continuous ribbon paths.
  5. **Cultural Dignity & Privacy**: Every feature respects Emirati customs, modesty, family honor, and discreet communication.

## Design Concepts

### Anti-Pattern Rulebook
| Standard Mobile Pattern | KOSHA Reinvented Primitive |
| :--- | :--- |
| **Standard Bottom Modal Sheet** | *Layered Curved Panel Workspace* (Floating asymmetric overlay with glass blur and ribbon drag handle). |
| **Rectangular Image Cards** | *Journey Cards* (Arch-contoured, editorial photo framing with integrated typography overlay). |
| **Generic Search Input** | *Search Studio Workspace* (Interactive filter studio with floating visual selectors). |
| **Standard Tab Bar** | *Ribbon Flow Dock* (Suspended translucent pill container with fluid sliding node tracker). |
| **Basic Checklist** | *Visual Roadmap Story Arc* (Connected milestone nodes with state morphing). |

## Wireframe Description
```
+-------------------------------------------------------------+
|  TENET 2: EVERY SCREEN HAS A HERO SIGNATURE                 |
|                                                             |
|  [ Signature Element: Arch-Contoured Editorial Showcase ]  |
|  /-------------------------------------------------------\  |
| /                                                         \ |
| |   [ High-Fashion Image Frame with Curved Top Arch ]      | |
| |   Cormorant Garamond Overlay Headline                    | |
| \                                                         / |
|  \-------------------------------------------------------/  |
|                                                             |
|  TENET 3: PROGRESSIVE LUXURY DISCLOSURE                     |
|                                                             |
|  +-------------------------------------------------------+  |
|  |  Interactive Morphing Workspace Trigger                |  |
|  |  "Tap to open Studio Controls" -> Expands Workspace   |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  ==================== RIBBON DOCK ======================    |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Hero Signature Component**: Rendered prominently in the top viewport section of every screen. Receives priority animation focus upon screen enter.
- **Interactive Morphing Trigger**: Tap triggers a non-linear spring expansion (`tension: 240, mass: 0.9`), converting the trigger button into a full workspace canvas.

## Animation Behaviour
- **Fluid Morphing Core**: Elements expand from their point of tap contact, scaling gracefully while morphing their border radii from rounded pills (`9999px`) to asymmetric panels (`32px`).
- **Parallax Depth Layers**: Background ribbon lines move at `0.3x` scroll speed relative to foreground floating islands.

## Accessibility
- **Accessible Motion Alternatives**: When `prefers-reduced-motion` is active, morphing expansions are replaced by soft cross-fades (`150ms`).
- **Focus Order Guarantee**: Morphing workspaces capture accessible keyboard focus immediately upon opening.

## Edge Cases
- **Nested Workspaces**: Opening a secondary sub-workspace smoothly pushes the parent workspace into a scaled-backed `0.92x` background layer with dark glass tint.

## AI Suggestions
- **Design Consistency Guard**: Automated AI check in CI/CD pipeline validates that any new screen layout complies with the anti-pattern rulebook.

## Developer Notes
- Enforce component guidelines via ESLint rules that block import of default UI components (e.g. `<Modal>`, `<FlatList>`).

## Fable Implementation Notes
- Use `KoshaPageLayout` master component which injects the Ribbon Flow Dock, background SVG mesh, and parallax scroll listener automatically.
