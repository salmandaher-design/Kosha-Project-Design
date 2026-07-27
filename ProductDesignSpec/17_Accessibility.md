# KOSHA Product Specification: 17 - Inclusive Accessibility Architecture

## Vision
Accessibility in KOSHA is a fundamental pillar of luxury design. True luxury means ensuring every user—regardless of vision, hearing, motor capability, or cognitive differences—can navigate their wedding journey with dignity, independence, and delight. KOSHA strictly complies with **WCAG 2.1 Level AAA** standards while preserving its signature continuous ribbon aesthetics.

## User Goals
- Navigate the entire app seamlessly using VoiceOver (iOS), TalkBack (Android), or hardware keyboards.
- Read all editorial typography effortlessly with high contrast ratios and dynamic font scaling.
- Enjoy accessible alternatives for complex visual roadmaps, video masterclasses, and haptic feedback.

## UX Problems
- Luxury apps often sacrifice accessibility for aesthetics (e.g. tiny grey text on white, unlabelled icon buttons).
- Screen readers fail on complex custom graphics like SVG radar charts or visual countdown wheels.
- Dynamic font scaling breaks fixed-height card layouts and clips text.

## Proposed Solution
- **The Dual-Typography Contrast Standard**:
  - *Display Headlines*: Cormorant Garamond semibold with explicit minimum contrast ratios (7:1 against background).
  - *Body & Controls*: Plus Jakarta Sans with generous line height (`1.5x`) and letter tracking (`+0.2px`).
- **Accessible Screen Reader Mapping**: Every signature primitive (Flow Ribbon, Journey Node, Layered Panel, Compatibility Wheel) exposes structured semantic ARIA roles and descriptive text equivalents.
- **Dynamic Text Reflow System**: Containers utilize flexible auto-layout padding, expanding vertically to accommodate up to 200% system font scaling without text clipping.
- **Linear Alternative Views**: Users can toggle complex graphic experiences (Zaffa Dream Roadmap, Khitbah Matrix Wheel) into high-contrast linear list views.

## Design Concepts
- **High-Contrast Hairlines**: In accessibility mode, subtle `0.5px` borders automatically expand to `1.5px` high-contrast strokes (`#4A0D15` in light theme, `#FAF7F2` in dark theme).
- **Focus Indicator Rings**: Hardware keyboard navigation renders a prominent golden focus outline (`2px` `#D4AF37`) around active elements.

## Wireframe Description
```
+-------------------------------------------------------------+
|  ACCESSIBILITY ARCHITECTURE: DYNAMIC REFLOW & FOCUS         |
|                                                             |
|  [ KEYBOARD FOCUS STATE: Prominent Gold Ring Outline ✦ ]    |
|  +-------------------------------------------------------+  |
|  |  (=== ACTIVE ACCESSIBLE BUTTON (2px Gold Focus) ===)  |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  DYNAMIC FONT SCALE (200% SYSTEM SCALE REFLOW)              |
|  +-------------------------------------------------------+  |
|  |  HEADLINE: Grand Ballroom Venue                       |  |
|  |  (Container expands vertically; zero text clipping)   |  |
|  |                                                       |  |
|  |  Body text reflows gracefully across multiple lines  |  |
|  |  with 1.5x line height and WCAG AAA 7:1 contrast.    |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  ALT ACCESSIBLE VIEW TOGGLE                                 |
|  [ Switch to High-Contrast Linear Roadmap View ]            |
+-------------------------------------------------------------+
```

## Component Behaviour
- **VoiceOver Grouping**: Interactive components are grouped into logical accessibility elements so VoiceOver users read full context in one swipe (e.g. "Vendor: Royal Rose. Status: Invoice Pending 14,000 AED. Double tap to view details.").
- **Touch Target Enforcement**: All interactive elements strictly enforce a minimum touch target size of `48px x 48px`.

## Animation Behaviour
- **Reduced Motion Fallback**: System `prefers-reduced-motion` flag disables background parallax drifting, ribbon wave oscillations, and scale spring bounces, replacing them with simple cross-fades (`150ms`).

## Accessibility Checklist
| Dimension | Standard | Implementation in KOSHA |
| :--- | :--- | :--- |
| **Text Contrast** | WCAG AAA (7:1) | Deep Burgundy `#4A0D15` on Warm Cream `#FAF7F2`. |
| **Touch Targets** | Min 48x48dp | Enforced via touch target padding wrappers. |
| **Screen Readers** | Full Coverage | `accessibilityLabel`, `accessibilityHint`, `aria-role`. |
| **Font Scaling** | Up to 200% | Auto-layout containers with dynamic height. |
| **Keyboard Focus** | Visible Focus Ring | `2px` Golden outline `#D4AF37`. |

## Edge Cases
- **Screen Reader on SVG Roadmap**: VoiceOver reads SVG graph as sequential step list ("Step 1 of 15: Venue Lock, Completed. Step 2 of 15: Zahba Trousseau, Active.").

## AI Suggestions
- **AI Accessibility Auditor**: Continuous automated accessibility test suite checks every rendered component tree for missing accessibility labels or low contrast pairs.

## Developer Notes
- Test accessibility using iOS Accessibility Inspector, Android Accessibility Scanner, and VoiceOver/TalkBack gesture flows.

## Fable Implementation Notes
- Use `<KoshaAccessibleWrapper label="..." hint="..." role="...">` around custom SVG controls.
