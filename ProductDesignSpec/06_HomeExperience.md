# KOSHA Product Specification: 06 - Home Experience

## Vision
The Home Experience in KOSHA is not a static feed of advertisements and rectangular cards; it is an organic, story-driven sanctuary customized to the user's active life journey. It seamlessly orchestrates countdown momentum, featured artisan spotlights, upcoming consultation reminders, matchmaking activity, and personalized trousseau recommendations inside continuous flow ribbons.

## User Goals
- View personal wedding countdown timeline, immediate next steps, and pending approvals at a single glance.
- Discover high-luxury wedding inspiration, top specialists, and trending Emirati bridal collections.
- Access all core KOSHA ecosystem modules (Khitbah, Zahba, Zaffa, Tawjeeh) with fluid gesture paths.

## UX Problems
- Traditional homepages look like chaotic billboards with competing banners, pop-up ads, and cluttered grids.
- Users lose track of urgent pending tasks (unpaid invoices, unconfirmed vendors).
- Generic greeting cards feel impersonal.

## Proposed Solution
- **The Journey Hero Showcase**: Top screen real estate is reserved for the user's personalized "Wedding Countdown Roadmap Arc" featuring fluid ribbon graphics and live milestone counters.
- **Organic Story-Driven Layout**: Replaces rigid grid blocks with staggered, asymmetric floating islands connected by continuous background flow ribbons.
- **Priority Attention Carousel**: Highlights critical actionable events (e.g. "Vendor Deposit Approved", "Specialist Consultation in 2 Hours") in an urgent glass ribbon widget.
- **Curated Artisan Spotlights**: High-fashion Arch-Contoured Editorial Frames showcasing Emirati bridal designers, floral sculptors, and royal venues.

## Design Concepts
- **Warm Editorial Atmosphere**: Cormorant Garamond display typography (`36px`) paired with Plus Jakarta Sans body text.
- **Parallax Ribbon Mesh**: Background features subtle vector ribbon strokes that shift vertically at `0.25x` scroll speed.

## Wireframe Description
```
+-------------------------------------------------------------+
|  [User Avatar]             K O S H A             (Inbox) (N)|
|                                                             |
|  HERO SHOWCASE: THE WEDDING COUNTDOWN ROADMAP ARC           |
|  /-------------------------------------------------------\  |
| /   "142 Days Until Your Dream Zaffa"                     \ |
| |   [ Interactive Countdown Wheel ]  (Next: Venue Lock)    | |
| \_________________________________________________________/ |
|                                                             |
|  PRIORITY ATTENTION RIBBON WIDGET                           |
|  +-------------------------------------------------------+  |
|  |  (⚡ Action Needed) Deposit Approval for Royal Hall    |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  ~~~ Curved Flow Ribbon Section Divider ~~~~~~~~~~~~~~~~~~  |
|                                                             |
|  ECOSYSTEM MODULE DISCOVERY (Asymmetric Floating Islands)   |
|  +-----------------------+   +---------------------------+  |
|  | KHITBAH MATCHMAKING   |   | ZAHBA BRIDAL TROUSSEAU    |  |
|  | (Soft Lavender Accent)|   | (Rose Gold Accent)        |  |
|  +-----------------------+   +---------------------------+  |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Countdown Wheel Interaction**: Tapping the hero countdown wheel opens the full Zaffa Visual Roadmap with an elastic spring zoom transition.
- **Priority Attention Ribbon**: Swiping horizontally dismisses resolved alerts or expands actionable details inline.

## Animation Behaviour
- **Parallax Ribbon Drift**: Background vector paths gently float horizontally (`-10px` to `+10px`) over a 6-second breathing loop.
- **Staggered Entry**: On home mount, islands pop in sequentially with a `40ms` stagger delay.

## Accessibility
- **Screen Reader Hierarchy**: Home layout follows strict reading order: Hero Countdown -> Priority Alerts -> Module Portals -> Featured Spotlights.
- **Descriptive Alt Text**: All editorial photography includes rich alt descriptions (e.g. "Royal Emirati wedding stage decorated with white orchids and gold calligraphy").

## Edge Cases
- **Unconfigured User Profile**: If user has not set a wedding date, Hero Showcase adapts to "Begin Your Story" onboarding widget prompting profile customization.

## AI Suggestions
- **Dynamic Feed Curation**: AI adjusts home layout order based on time of day and proximity to wedding (e.g., shifts Tawjeeh consultations up in the morning, Zaffa vendor lists in the evening).

## Developer Notes
- Home data aggregated via single GraphQL query / REST endpoint `GET /api/home/overview`.
- Cache home dashboard responses in AsyncStore / MMKV for instant offline render.

## Fable Implementation Notes
- Wrap homepage view in `<KoshaHomeContainer>` with integrated parallax scroll listeners.
