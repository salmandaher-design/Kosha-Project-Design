# KOSHA Product Specification: 05 - Search Experience

## Vision
Search in KOSHA is completely redesigned from a simple query input box into **The Global Search Studio**. When activated, it transforms the viewport into a floating design workspace. Users do not merely type keywords; they interact with visual filter spheres, budget sliders, distance radar arcs, timeline selectors, and AI-curated discovery suggestions in an interactive canvas.

## User Goals
- Discover venues, services, dresses, and experts matching precise cultural, financial, geographic, and temporal requirements.
- Save complex filter configurations as personalized "Search Workspaces".
- Refine criteria visually without repeated back-and-forth page navigation.

## UX Problems
- Standard search bars rely on text typing, which fails when users don't know exact vendor names or terminology.
- Filter screens present long, boring checklists in static full-page modals.
- Filter changes force full-page reloads and wipe scroll positions.

## Proposed Solution
- **The Search Studio Workspace**: Activating search opens a suspended, translucent canvas (`backdrop-filter: blur(30px)`) overlaying the active screen.
- **Interactive Visual Selectors**:
  - **Budget Selector**: Dual-thumb curved arc slider displaying real-time price distribution histogram in AED.
  - **Location & Distance Selector**: Radar circle selector allowing users to expand geographic radius visually from Dubai, Abu Dhabi, Sharjah, or Al Ain.
  - **Availability Selector**: Horizontal interactive calendar strip showing open vendor booking slots.
  - **Grouped Visual Filters**: Category spheres (e.g. Traditional Zaffa vs Modern Luxury, Organic Floral vs Crystal Decor).
- **Saved Search Workspaces**: Allows saving combinations (e.g., "Dubai Royal Wedding - Winter 2026") into one-tap memory tiles.

## Design Concepts
- **Floating Workspace Canvas**: Rounded top asymmetric sheet (`border-radius: 40px 20px 0 0`) with glass background (`rgba(20, 15, 15, 0.85)` in dark mode, `#FAF7F2` in light mode).
- **Interactive Histogram Slider**: Price curve drawn with smooth cubic bezier SVG stroke, filling dynamically with golden gradient as thumbs adjust.

## Wireframe Description
```
+-------------------------------------------------------------+
|  SEARCH STUDIO WORKSPACE (Floating Translucent Overlay)     |
|  [ Ribbon Drag Handle ]                             ( Close )|
|                                                             |
|  +-------------------------------------------------------+  |
|  |  SEARCH INTENT FIELD: "Venues in Dubai under 150k AED"|  |
|  +-------------------------------------------------------+  |
|                                                             |
|  VISUAL BUDGET HISTOGRAM SLIDER                             |
|        /\                                                   |
|       /  \  /\    Price Distribution Histogram             |
|  ____/    \/  \________________________________________     |
|  ( Thumb A: 50k AED )========( Thumb B: 150k AED )          |
|                                                             |
|  GEOGRAPHIC RADAR ARCS                                      |
|  (( Dubai Center )) -> Expand Radius: [ 25km | 50km | UAE ] |
|                                                             |
|  CATEGORY VISUAL SPHERES                                    |
|  ( Sphere: Royal Ballroom )  ( Sphere: Beachfront Resort )  |
|                                                             |
|  (=== [Icon] EXPLORE 42 MATCHES IN STUDIO (Pill) ===)       |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Studio Trigger**: Tapping global search icon or dragging down from header opens Search Studio with scale-up backdrop transition.
- **Live Match Counter**: Bottom Velvet Ribbon button dynamically updates match count text (e.g., "EXPLORE 42 MATCHES") in real-time as filters shift.

## Animation Behaviour
- **Histogram Height Morph**: Adjusting budget thumbs dynamically morphs histogram bars using spring physics (`mass: 0.5, tension: 300`).
- **Radar Arc Ripple**: Tapping distance radius emits a soft concentric visual ripple outward across the map radar canvas.

## Accessibility
- **Accessible Slider Controls**: Thumbs support keyboard arrow adjustments (Step: 5,000 AED) with clear audio announcements.
- **Screen Reader Summaries**: Studio reads out combined active filter text (e.g., "Active Filter: Royal Ballrooms in Dubai, 50k to 150k AED, Available Dec 2026").

## Edge Cases
- **Zero Matches Found**: Studio automatically expands search radius by 15% and displays AI suggestion: "No direct matches at 50km, but 3 luxury venues found at 65km in Ras Al Khaimah."

## AI Suggestions
- **Natural Language Query Parser**: Parses complex input like "Outdoor winter wedding venue in Abu Dhabi for 300 guests" and pre-configures all Studio sliders automatically.

## Developer Notes
- Search state stored in global Zustand store `useSearchStudioStore`.
- Debounce API query execution by `250ms` while sliders are actively moving.

## Fable Implementation Notes
- Use `<SearchStudioWorkspace visible={isOpen} onClose={closeStudio} />` container wrapper.
