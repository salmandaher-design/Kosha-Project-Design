# KOSHA Product Specification: 03 - Global Navigation

## Vision
Global Navigation in KOSHA abandons standard iOS bottom tab bars and Android floating buttons. Instead, it introduces **Ribbon Navigation**: a suspended, translucent fluid pill bar that dynamic-morphs based on user position, active lifecycle stage, and context. Navigation feels like gliding along a continuous satin thread.

## User Goals
- Access core ecosystem hubs (Home, Khitbah, Zahba, Zaffa, Tawjeeh) effortlessly with thumb gestures.
- Quickly understand active application context and lifecycle progress.
- Enjoy an unobtrusive, floating bar that dynamically recedes when scrolling through media-rich content.

## UX Problems
- Standard 5-tab bars waste screen space and present identical static icons regardless of user state.
- Tab switches cause harsh screen flashing or robotic horizontal sliding.
- Deep nested screens obscure the way back, stranding users in multi-level stacks.

## Proposed Solution
- **The Ribbon Navigation Dock**: Suspended `16px` above the bottom edge, floating inside an ultra-thin glass container (`backdrop-filter: blur(20px)`).
- **Dynamic Context Morphing**: When in Zaffa (Wedding Planning), the navigation bar morphs to display the Zaffa Milestone Node directly in the center dock slot.
- **Scroll-Aware Recess**: Fast scrolling down collapses the navigation bar into a minimalist floating logo badge (`44px` circle); scrolling up or tapping brings it back immediately.
- **Layered Stack Breadcrumbs**: Displays continuous ribbon breadcrumbs at the screen top for quick back-stack jumping.

## Design Concepts
- **Asymmetric Dock Pill**: Rounded pill frame (`borderRadius: 9999px`) with hair-line burgundy glow (`0.5px` `#4A0D15`).
- **Sliding Liquid Highlight Card**: Active tab indicator is a soft background shape that glides between items using mass-spring-damper physics (`mass: 0.7, tension: 280, friction: 22`).

## Wireframe Description
```
+-------------------------------------------------------------+
|  [Top Layered Breadcrumb: Home > Zaffa > Venue Selection]   |
|  ---------------------------------------------------------  |
|                                                             |
|                    MAIN CONTENT CANVAS                      |
|                                                             |
|                                                             |
|                                                             |
|   +-----------------------------------------------------+   |
|   |  SUSPENDED RIBBON DOCK (Floating 16px from bottom)  |   |
|   |  +-----------------------------------------------+  |   |
|   |  | (Home)  (Khitbah)  [ZAFFA NODE]  (Zahba)  (Tawjeeh)| |   |
|   |  |           Liquid Sliding Highlight Card       |  |   |
|   |  +-----------------------------------------------+  |   |
|   +-----------------------------------------------------+   |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Tab Selection**: Tapping a tab triggers an instant light haptic pulse (`10ms`), initiates layout morphing of the sliding indicator card, and updates top breadcrumb state.
- **Center Node Slot**: Tap and hold on the center node slot opens the quick Zaffa Roadmap progress wheel without leaving the current view.

## Animation Behaviour
- **Fluid Morphing Indicator**: The liquid highlight card stretches horizontally during rapid tab transitions before snapping into exact alignment over the selected item.
- **Scroll Collapse Physics**: Dock translates `+80px` Y-axis on downward scroll (`velocity > 400px/s`) with linear opacity fade.

## Accessibility
- **Screen Reader Announcements**: Changing tabs announces: "Switched to Zaffa Wedding Planning Hub, Step 3 of 7 Active."
- **Touch Target Cushioning**: Each icon item inside the Ribbon Dock has a minimum target area of `48px x 52px`.

## Edge Cases
- **Keyboard View Active**: Dock automatically slides out of view off-screen (`translateY: +120px`) when soft input keyboard opens, preventing layout overlap.
- **Deep Modular Nesting (5+ Levels)**: Top breadcrumbs compress into an expandable ribbon droplet indicator.

## AI Suggestions
- **Smart Dock Reordering**: AI learns user frequency and temporarily elevates Khitbah or Zaffa icons to primary focus based on upcoming calendar dates.

## Developer Notes
- Navigation bar container anchored to `SafeAreaView` bottom inset + `16px`.
- Tab state controlled by unified React Navigation / Expo Router custom navigator `KoshaRibbonNavigator`.

## Fable Implementation Notes
- Use `<KoshaRibbonDock routes={routes} activeIndex={index} onTabPress={handlePress} />` root integration.
