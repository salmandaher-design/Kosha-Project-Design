# KOSHA Product Specification: 11 - Conversations Hub

## Vision
Conversations in KOSHA rejects standard linear chat apps like WhatsApp or iMessage. It never opens directly into a single conversation thread. Instead, users enter **The Premium Conversation Hub**—an organized, multi-tier messaging workspace that categorizes communication into distinct life contexts: *Matchmaking Requests, Vendor Logistics, Specialist Consultations, Appointment Reminders, and Support*.

## User Goals
- Manage diverse communications (matchmaking partners, high-end wedding suppliers, certified counselors) without clutter or confusion.
- Instantly review rich appointment cards, unpaid invoice reminders, and vendor contract milestones embedded directly within message feeds.
- Protect privacy with automated content safety moderation preventing premature contact detail sharing during Khitbah.

## UX Problems
- Traditional messaging apps mix personal chats, business inquiries, and support notifications into a single chaotic inbox.
- Important appointment times, invoice links, and contract files get buried under hundreds of chat bubbles.
- Lack of specialized context cards for vendor coordination.

## Proposed Solution
- **The Premium Conversation Hub**: Organized into 5 distinct floating category islands:
  1. *Matchmaking (Khitbah)*: Anonymized candidates & connection approvals.
  2. *Vendor Logistics (Zaffa)*: Venues, photographers, florists, caterers with integrated milestone previews.
  3. *Expert Consultations (Tawjeeh)*: Private counselor streams with upcoming appointment countdowns.
  4. *Appointments & Invoices*: Automated rich status cards for pending approvals and scheduled events.
  5. *Archived & Support*: Concierge help and historical records.
- **Smart Grouping & Rich Previews**: Thread previews render active status badges (e.g., `Deposit Needed`, `Appointment Today 4:00 PM`, `Khitbah Request Pending`).
- **Embedded Context Workspaces**: Tapping an appointment thread unveils an inline mini-workspace above the message feed showing live contract status.

## Design Concepts
- **Asymmetric Hub Cards**: Chat threads housed inside Floating Content Islands (`radii: 24px 12px 24px 24px`) with unread status indicated by soft glowing lavender or gold badges.
- **Divergent Bubble Aesthetics**: User messages rendered in Deep Burgundy (`#4A0D15`) with white text; partner/vendor messages in Soft Warm Surface (`#FDFBF8`) with hairline borders.

## Wireframe Description
```
+-------------------------------------------------------------+
|  CONVERSATIONS HUB                                          |
|  [ Filter Search Studio ]                    ( Pinned: 3 )  |
|                                                             |
|  CATEGORY FLOATING ISLAND SELECTORS                         |
|  ( Matchmaking: 2 ) [ Vendor Chats ] ( Consultations: 1 )   |
|                                                             |
|  SMART GROUPED THREAD LIST                                  |
|  +-------------------------------------------------------+  |
|  |  VENDOR: Royal Rose Floral Atelier                    |  |
|  |  Preview: "We updated the stage flower quote..."      |  |
|  |  [ RICH EMBED BADGE: Invoice Pending - 14,000 AED ]   |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  +-------------------------------------------------------+  |
|  |  TAWJEEH: Dr. Mariam Al-Mansoori                      |  |
|  |  Preview: "Looking forward to our session today"      |  |
|  |  [ APPOINTMENT COUNTDOWN: Starts in 2h 15m ]          |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  (=== OPEN SELECTED CONVERSATION WORKSPACE (Pill) ===)      |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Category Filter Tap**: Filters thread list instantly using staggered spring transition without full screen reload.
- **Rich Embed Badge Tap**: Tapping embedded invoice badge directly opens payment studio overlay without scrolling through chat history.

## Animation Behaviour
- **Thread Entry Physics**: Tapping a thread expands the conversation card into the full screen chat room using shared element container morphing.
- **Inbound Message Bounce**: New inbound messages slide up from bottom edge with a soft micro-bounce and light haptic tick.

## Accessibility
- **Thread Category Announcement**: VoiceOver announces category totals ("Vendor Logistics Hub: 4 active threads, 1 payment action needed").
- **Unread Badge Contrast**: Badges maintain 7:1 contrast with clear numeric and textual unread indicators.

## Edge Cases
- **Restricted Phone Number Sharing**: If user types phone/email in Khitbah thread prior to mutual approval, message bubble turns soft red with warning toast: "For your safety, contact sharing is restricted until Khitbah approval."

## AI Suggestions
- **AI Conversation Summarizer**: Displays 1-line action summary at top of long vendor threads (e.g. "Vendor agreed to 10% discount; awaiting your sign-off").

## Developer Notes
- Real-time messages delivered over Secure WebSocket connection `wss://chat.kosha.ae/v1`.
- Thread metadata cached locally in SQLite / WatermelonDB for instant offline reading.

## Fable Implementation Notes
- Use `<KoshaConversationHub threads={chatThreads} activeCategory={cat} />`.
