# KOSHA Product Specification: 14 - Contextual Notifications System

## Vision
Notifications in KOSHA rejects intrusive banner pop-ups and spammy push alerts. It introduces **The Contextual Notification System**—a priority-driven notification hub where alerts are delivered as elegant, translucent micro-toasts sliding out from the flow ribbon, categorized by urgency, lifecycle relevance, and user focus.

## User Goals
- Receive timely updates on critical wedding milestones (deposit deadlines, specialist appointments, Khitbah connection approvals).
- Control notification channels (In-app micro-toasts, SMS, Push, WhatsApp concierge digests) with granular precision.
- Review past alerts in an organized, non-cluttered notification sanctuary.

## UX Problems
- Push notifications in standard apps are annoying, repetitive, and lack visual elegance.
- Users miss critical time-sensitive alerts because they get lost in generic notification lists.
- Lack of priority categorization leads to notification fatigue.

## Proposed Solution
- **The Flow Ribbon Micro-Toast**: In-app notifications slide gracefully out from behind the top flow ribbon, frame the alert in a glass island (`backdrop-filter: blur(20px)`), and dissolve after 3.5 seconds.
- **Priority Attention Engine**: Categorizes alerts into 3 priority channels:
  1. *Critical (Gold Crest)*: Payment deposits, appointment start reminders (T-15 mins), weather alerts.
  2. *Lifecycle (Burgundy Ribbon)*: Khitbah approvals, Zaffa milestone unlocks, Zahba shipping tracking.
  3. *Informational (Lavender Dot)*: New blog articles, masterclass invites, recommended specialists.
- **The Notification Sanctuary**: Organized notification center displaying alerts grouped by date with one-tap action buttons.

## Design Concepts
- **Micro-Toast Glass Island**: Top-anchored pill container (`radii: 9999px`) with hairline glowing border matching priority tier color.
- **Priority Gold Crest Indicator**: Critical alerts feature a miniature glowing gold crest that pulses subtly until acknowledged.

## Wireframe Description
```
+-------------------------------------------------------------+
|  MICRO-TOAST IN-APP ALERT (Slides down from Flow Ribbon)    |
|  +-------------------------------------------------------+  |
|  |  (⚡ GOLD CREST) Deposit Approved: Royal Ballroom Hall |  |
|  |  "Tap to view updated Zaffa Dream Roadmap"            |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  NOTIFICATION SANCTUARY                                     |
|  [ Filter Priority ]                         ( Clear All )  |
|                                                             |
|  TODAY'S ALERTS                                             |
|  +-------------------------------------------------------+  |
|  |  LIFECYCLE: Khitbah Connection Request Approved       |  |
|  |  "Candidate K-842 accepted your connection request"   |  |
|  |  [ Action Button: Open Conversation Hub ]             |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  +-------------------------------------------------------+  |
|  |  INFORMATIONAL: Tawjeeh Live Webinar Starting Tomorrow |  |
|  |  "Harmonizing Family Traditions in Modern Marriage"   |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Micro-Toast Tap**: Tapping an in-app toast immediately opens the associated workspace screen (e.g. tapping deposit alert opens Payment Studio).
- **Toast Swipe Dismiss**: Swiping toast upward slides it back behind the flow ribbon with a light haptic tick.

## Animation Behaviour
- **Ribbon Eruption Entry**: Toast slides out from top header stroke with spring physics (`mass: 0.8, tension: 250, friction: 20`).
- **Dissolve Fade Out**: Toast automatically fades out (`opacity: 1.0 -> 0`) after 3500ms if untouched.

## Accessibility
- **VoiceOver Announcement Priority**: High-priority alerts interrupt screen reader immediately to announce urgent details.
- **Haptic Priority Differentiation**:
  - *Critical*: Double medium haptic pulse.
  - *Lifecycle*: Single light haptic pulse.
  - *Informational*: Silent visual-only alert.

## Edge Cases
- **Do Not Disturb / Quiet Hours Mode**: Automatically queues non-critical alerts during user's designated sleep hours, delivering a summary digest at 9:00 AM.

## AI Suggestions
- **Smart Alert Scheduler**: AI learns user activity patterns and delivers non-urgent notifications at times when user is most likely to engage.

## Developer Notes
- Push notifications handled via Firebase Cloud Messaging (FCM) / Apple Push Notification service (APNs).
- In-app toast state managed via `useKoshaNotificationStore`.

## Fable Implementation Notes
- Render `<KoshaToastManager />` at root application wrapper level.
