# KOSHA Product Specification: 16 - Micro-Interactions & Haptic Suite

## Vision
Micro-interactions and haptics in KOSHA provide subtle visual and tactile delight at every touchpoint. Every button tap, tab switch, filter toggle, invoice approval, and milestone unlock is reinforced with high-precision physical haptic pulses and responsive micro-animations. The goal is to make using KOSHA feel like handling a luxury physical object—a satin ribbon, a gold-embossed invitation, or a fine timepiece.

## User Goals
- Receive instant, satisfying physical feedback for every action.
- Confirm state changes (e.g. item added to Zahba chest, Khitbah request sent) without needing to re-read confirmation text.
- Enjoy subtle micro-animations that make digital interactions feel alive.

## UX Problems
- Apps feel flat and lifeless when taps yield no immediate physical or visual feedback.
- Overly loud or generic buzzes confuse users and drain device battery.
- Lack of tactile reinforcement during high-value financial or emotional actions.

## Proposed Solution
- **The KOSHA Haptic Suite**: Custom haptic feedback engine mapped to specific application events:
  1. *Selection Tick (`10ms` light pulse)*: Tapping organic tab controls, category pills, calendar hours.
  2. *Milestone Unlock (`Dual medium pulses with 50ms gap`)*: Completing a Zaffa roadmap step, sending Khitbah request.
  3. *Payment Success (`Triple crescendo pulse`)*: Finalizing Apple Pay or credit card transaction.
  4. *Error / Validation Alert (`Three short high-frequency buzzes`)*: Invalid form field, declined payment.
- **Bespoke Micro-Animations**:
  - **Sparkle Particle Flow (`✦`)**: Tapping "Add to Zahba Chest" emits gold sparkle particles that curve into the chest counter.
  - **Heart Bloom Effect**: Saving a Khitbah candidate profile causes a soft lavender heart outline to bloom and fill with gradient.
  - **Checkmark Morph**: Primary action buttons morph text into a checkmark icon with a gold sheen upon completion.

## Design Concepts
- **Gold Sparkle Particles**: SVG particle system (`#D4AF37`) rendered with spring velocity curves.
- **Elastic Scale Reaction**: Tapping interactive buttons scales container down to `0.96x` on `touchDown` and snaps back to `1.0x` on `touchUp`.

## Wireframe Description
```
+-------------------------------------------------------------+
|  MICRO-INTERACTION SPECIFICATION: BUTTON TAP & PARTICLES    |
|                                                             |
|  [ STATE 1: Default Idle Button ]                           |
|  (=== ADD TO ZAHBA CHEST (Gold Sheen) ===)                  |
|                                                             |
|  [ STATE 2: Touch Down (Scale 0.96x + Light Haptic Tick) ]  |
|  (== ADD TO ZAHBA CHEST ==)                                 |
|                                                             |
|  [ STATE 3: Touch Release (Sparkle Burst ✦ ✦ ✦) ]           |
|       ✦   ✦                                                 |
|    ✦  (=== ✔ ADDED TO CHEST ===)  ✦                         |
|       ✦   ✦                                                 |
|  [ HAPTIC: Milestone Unlock Dual Pulse ]                    |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Gesture Haptic Coupling**: Swiping cards across thresholds triggers soft haptic resistance step at `50%` swipe mark.
- **Button Micro-Scale**: Micro-scale applied instantly on UI thread (`touchDown`) with zero gesture delay.

## Animation Behaviour
- **Particle Lifetime Curve**: Particles emit with initial velocity (`400px/s`), decay exponentially over `600ms`, and fade opacity (`1.0 -> 0`).
- **Icon Morphing Speed**: Icon state changes complete within `180ms`.

## Accessibility
- **Haptic Toggle Control**: Users can toggle haptic strength (Off / Gentle / Standard / Rich) inside Profile settings.
- **Screen Reader Haptic Sync**: Screen readers speak state changes synchronized with haptic pulses.

## Edge Cases
- **Device Lacks Advanced Haptics**: Auto-falls back to standard device vibration API (`Vibration.vibrate(15)`).

## AI Suggestions
- **Adaptive Micro-Feedback**: AI adjusts particle density and haptic strength based on user interaction speed (calm feedback for deliberate users, snappy for fast power users).

## Developer Notes
- Haptics powered by `react-native-haptic-feedback` / Web `navigator.vibrate`.
- Particle animations executed via SVG Canvas / Skia.

## Fable Implementation Notes
- Wrap interactive elements in `<KoshaTouchable haptic="selection" scaleOnPress={true}>`.
