# KOSHA Product Specification: 15 - Motion Language Architecture

## Vision
Motion in KOSHA is not an decorative afterthought; it is a primary design system dimension that expresses luxury, organic elegance, and physical responsiveness. The Motion Language Architecture rejects standard linear and cubic-bezier easing curves, replacing them entirely with **Mass-Spring-Damper Physical Models** (Stripe & Apple Human Interface style). Every screen transition, element morph, and ribbon wave moves with physical weight, tension, and continuous momentum.

## User Goals
- Enjoy fluid, spatial visual transitions that feel continuous and natural.
- Understand spatial relationships between screens as containers morph gracefully rather than jumping abruptly.
- Experience zero lag or frame drops during high-speed gestures.

## UX Problems
- Default app transitions use rigid cubic-bezier curves that feel mechanical and robotic.
- Sudden page jumps break mental mapping and confuse users.
- Over-animating every element causes motion sickness and degrades device performance.

## Proposed Solution
- **The Spring Physics Core Matrix**: Standardizes 4 physical spring profiles across all app components:
  1. *Responsive Card Spring*: `mass: 1.0, tension: 180, friction: 26` (For list slides, card expands, dismiss gestures).
  2. *Firm Workspace Spring*: `mass: 1.2, tension: 220, friction: 30` (For Search Studio overlays, Layered Panels).
  3. *Snappy Micro-Bounce*: `mass: 0.8, tension: 350, friction: 18` (For button taps, icon scales, active toggles).
  4. *Gentle Ribbon Wave*: `mass: 2.0, tension: 80, friction: 35` (For background vector wave drift).
- **Shared Element Morphing Architecture**: When transitioning from a card to a detail view, the card container's outer bounds, corner radii, and elevation expand continuously into the destination screen layout.
- **Dynamic Scroll-Linked Parallax**: Foreground floating islands move at `1.0x` speed, while background flow ribbons drift at `0.25x` speed.

## Design Concepts
- **Spatial Expansion Nodes**: Elements scale and morph out from the exact touch coordinates `(X, Y)` where the gesture originated.
- **Velocity-Sensitive Snap Back**: Dragging down a layered workspace checks gesture velocity on release; fast flicks dismiss instantly, slow drags below `100px` snap smoothly back to resting position.

## Wireframe Description
```
+-------------------------------------------------------------+
|  MOTION ARCHITECTURE: SHARED CONTAINER MORPH                |
|                                                             |
|  [ STEP 1: Small Card (Tap Point X:180, Y:320) ]            |
|  +-----------------------+                                  |
|  | Card Radii: 24|12|24|24 |                                  |
|  +-----------------------+                                  |
|              |                                              |
|              v  [ Mass-Spring-Damper Interpolation ]         |
|                                                             |
|  [ STEP 2: Mid-Morph Layout Stretch ]                       |
|  +-------------------------------------------------------+  |
|  | Morphing Radii: 32|16|32|32 |                           |  |
|  +-------------------------------------------------------+  |
|              |                                              |
|              v  [ Settles at 180 Tension / 26 Friction ]     |
|                                                             |
|  [ STEP 3: Full Target Screen Workspace Container ]         |
|  +-------------------------------------------------------+  |
|  | Target Radii: 40|20|0|0 |                             |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Interactive Drag Gestures**: Layered panels follow finger drag 1:1. Rubber-band dampening applies when dragging past top/bottom bounds (`0.3x` resistance).
- **Parallax Scroll Listener**: Uses React Native Reanimated worklets running on UI thread (`60fps / 120fps` ProMotion support).

## Animation Behaviour
- **Frame Rate Optimization**: Zero JS thread blocking; all interpolation curves compiled to native UI thread drivers.
- **Staggered Cascade Delays**: Children containers enter with a `40ms` sequential stagger delay.

## Accessibility
- **Prefers-Reduced-Motion Compliance**: When reduced motion is enabled at system level, all spring physics transitions auto-fallback to linear cross-fades (`150ms`).
- **Vestibular Motion Safety**: Avoids full-screen rotation or high-velocity scaling effects that trigger motion sickness.

## Edge Cases
- **Low End Device Frame Drops**: Dynamically drops background ribbon wave animation if device FPS dips below 45 FPS for 3 consecutive frames.

## AI Suggestions
- **AI Motion Tuner**: Automatically optimizes spring tension parameters based on real-time device CPU/GPU performance benchmarks.

## Developer Notes
- Powered by React Native Reanimated v3 / Web Framer Motion spring physics.
- Global spring configs exported from `/src/theme/motion.ts`.

## Fable Implementation Notes
- Use `withSpring(targetValue, KOSHA_SPRING_CONFIGS.responsive)` for all layout animations.
