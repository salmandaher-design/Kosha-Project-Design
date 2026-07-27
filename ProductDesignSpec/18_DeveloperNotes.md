# KOSHA Product Specification: 18 - Technical Architecture & Developer Notes

## Vision
The Technical Architecture & Developer Notes document bridges high-luxury product design and high-performance software engineering. It defines the technical constraints, token implementation, state machine models, network synchronization strategies, and client-side architecture required to realize KOSHA's signature visual language at 60fps/120fps on modern mobile and web platforms.

## User Goals
- Enjoy instantaneous page loads, zero UI thread freezing, and seamless offline data access.
- Benefit from rock-solid security, encrypted matchmaking data, and PCI-compliant transaction security.

## UX Problems
- Complex visual design systems often result in bloated bundle sizes, slow render times, and battery drain.
- Disconnected client state causes out-of-sync invoice statuses or lost user inputs.
- Unhandled network drops disrupt critical payment or live consultation sessions.

## Proposed Solution

### 1. State Machine Architecture
Each core module operates under strict finite state machines (XState / Zustand) ensuring deterministic UI rendering:
```
[ OFFBOARDED ] ---> ( UAE Pass Auth ) ---> [ PROFILED ]
                                               |
           +-----------------------------------+-----------------------------------+
           |                                   |                                   |
           v                                   v                                   v
   [ KHITBAH STATE ]                   [ ZAHBA STATE ]                     [ ZAFFA STATE ]
   - Anonymized                        - Chest Curated                     - Roadmap Arc
   - Request Pending                   - Order Placed                      - Dependencies Active
   - Connected                         - Delivered                         - Event Completed
```

### 2. Design Token Architecture (`design_tokens.json`)
All layout primitives reference centralized design tokens:
```json
{
  "colors": {
    "primary": { "light": "#4A0D15", "dark": "#E8D3D6" },
    "secondary": { "light": "#1A365D", "dark": "#90CDF4" },
    "accent": { "light": "#9F86C0", "dark": "#D6CADD" },
    "gold": { "light": "#D4AF37", "dark": "#F3E5AB" },
    "background": { "light": "#FAF7F2", "dark": "#140F0F" },
    "surface": { "light": "#FDFBF8", "dark": "#1F191A" },
    "border": { "light": "#E8E2D9", "dark": "#362B2C" }
  },
  "radii": {
    "pill": 9999,
    "panel": 40,
    "island": { "tl": 28, "tr": 16, "br": 28, "bl": 28 },
    "arch": { "top": 120, "bottom": 24 }
  }
}
```

### 3. Performance & Memory Guardrails
- **UI Thread Rendering**: All layout morphs, spring animations, and gesture tracking execute exclusively on the UI thread via React Native Reanimated / Web GL canvas.
- **Image Cache Optimization**: Remote imagery loaded via fast-image caching with WebP / AVIF formats, thumbnail progressive blurs, and max `2048px` texture bounds.
- **Local Database Caching**: Offline persistent caching powered by MMKV key-value store and WatermelonDB for offline Zaffa roadmap access.

## Wireframe Description
```
+-------------------------------------------------------------+
|  CLIENT ARCHITECTURE & INTEGRATION LAYERS                   |
|                                                             |
|  +-------------------------------------------------------+  |
|  |  PRESENTATION LAYER (Signature Primitives)            |  |
|  |  [ Flow Ribbon ] [ Journey Node ] [ Layered Panel ]   |  |
|  +-------------------------------------------------------+  |
|                              |                              |
|  +-------------------------------------------------------+  |
|  |  STATE & MOTION LAYER (Zustand + Reanimated)          |  |
|  |  [ XState Machines ] [ Mass-Spring-Damper Physics ]     |  |
|  +-------------------------------------------------------+  |
|                              |                              |
|  +-------------------------------------------------------+  |
|  |  DATA & PERSISTENCE LAYER (MMKV + WatermelonDB)       |  |
|  |  [ Encrypted Tokens ] [ Offline Cache Engine ]        |  |
|  +-------------------------------------------------------+  |
|                              |                              |
|  +-------------------------------------------------------+  |
|  |  NETWORK & SECURITY LAYER (GraphQL + WebSockets)      |  |
|  |  [ Secure WSS ] [ Stripe Payment SDK ] [ TLS 1.3 ]     |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Offline Fallback**: When network connection drops, network state hooks transition app into offline mode seamlessly displaying cached local roadmap state.
- **Token Hot Swapping**: Dynamic theme switching rebinds CSS variables / React Native style tokens within `16ms` (single frame).

## Animation Behaviour
- **Garbage Collection Optimization**: Reanimated worklets avoid JS object allocations inside animation loops to eliminate micro-stutter.

## Accessibility
- **Automated Accessibility Testing**: Integrated Jest / React Native Testing Library setup executes automated ARIA and accessibility audits on every build.

## Edge Cases
- **App Crash Recovery**: In-flight form state saved to MMKV every 2 seconds; if app is terminated unexpectedly, reopening restores form state automatically.

## AI Suggestions
- **AI Performance Monitor**: Telemetry engine tracks frame drop frequency across user devices and auto-adjusts visual complexity parameters for low-end hardware.

## Developer Notes
- Source code organized under `/src/components`, `/src/features`, `/src/theme`, `/src/services`, `/src/store`.
- Strictly enforce zero hardcoded hex colors or inline pixel margins.

## Fable Implementation Notes
- Developers implementing this specification in Fable should reference `design_tokens.json` as the single source of truth for all styling primitives.
