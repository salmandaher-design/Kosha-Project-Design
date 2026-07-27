# KOSHA Product Specification: 19 - Fable Implementation Guide

## Vision
The Fable Implementation Guide provides explicit step-by-step instructions for Fable AI (or any front-end UI generation agent) to translate this Product Design Specification into production React Native / React Web code. It defines component mapping, design token integration, frame layouts, state management patterns, and quality verification criteria.

## User Goals
- Ensure the resulting codebase perfectly mirrors the KOSHA Product Design Specification.
- Guarantee that Fable generates clean, modular, award-winning code without reverting to standard UI libraries.

## UX Problems
- AI code generation tools default to generic UI libraries (Bootstrap, Tailwind defaults, standard Material buttons) unless given strict architectural constraints.
- Inconsistent state wiring leads to broken animations or static mockup components.

## Proposed Solution
- **The Fable Execution Protocol**:
  1. *Step 1: Load Design Tokens*: Inject `design_tokens.json` as the root theme context provider.
  2. *Step 2: Instantiate Signature Primitives*: Build standard wrapper components for the 10 Signature Primitives defined in `99_KOSHA_SIGNATURE_ELEMENTS.md`.
  3. *Step 3: Assemble Page Workspaces*: Construct ecosystem screens using asymmetric floating islands, ribbon flow docks, and search studio canvases.
  4. *Step 4: Attach Spring Physics*: Bind mass-spring-damper configs to all gesture triggers.
  5. *Step 5: Verify Quality Standard*: Validate that zero standard rectangular cards or default inputs remain.

## Fable Component Translation Matrix
| Specification Concept | Required Fable Component Name | Code Template Primitive |
| :--- | :--- | :--- |
| **Flow Ribbon Divider** | `<FlowRibbon />` | `<Svg><Path d="M0,20 C150,60 250,-20 400,20" ... /></Svg>` |
| **Journey Node** | `<JourneyNode />` | `<Pressable><AnimatedRing status={status} /></Pressable>` |
| **Layered Panel** | `<LayeredPanel />` | `<BlurView intensity={25}><KoshaView radii="40 20 0 0" /></BlurView>` |
| **Floating Island** | `<FloatingIsland />` | `<View style={{ borderRadius: '28px 16px 28px 28px', ... }}>` |
| **Organic Controls** | `<OrganicSegmentControl />` | `<View style={{ borderRadius: 9999 }}>{slidingCard}</View>` |
| **Arch-Contoured Frame** | `<ArchEditorialFrame />` | `<View style={{ borderRadius: '120px 120px 24px 24px' }}>` |
| **Search Studio** | `<SearchStudioWorkspace />` | `<Modal transparent animationType="none">{studio}</Modal>` |

## Design Concepts
- **Strict Anti-Pattern Linter**: Fable must fail build generation if any output file imports `<FlatList>`, `<Modal>` directly without wrapping in a Kosha primitive, or hardcodes raw hex values (e.g. `#000000` or `#FFFFFF`).

## Wireframe Description
```
+-------------------------------------------------------------+
|  FABLE AI IMPLEMENTATION PIPELINE                           |
|                                                             |
|  [ INPUT: ProductDesignSpec/*.md Documents ]                |
|                             |                               |
|                             v                               |
|  [ STEP 1: Parse Design Tokens -> theme.ts ]                |
|                             |                               |
|                             v                               |
|  [ STEP 2: Generate Signature Components -> /signature/ ]   |
|                             |                               |
|                             v                               |
|  [ STEP 3: Assemble Workspace Screens -> /screens/ ]        |
|                             |                               |
|                             v                               |
|  [ STEP 4: Wire XState Machines & Reanimated Physics ]      |
|                             |                               |
|                             v                               |
|  [ OUTPUT: Award-Winning KOSHA Production Codebase ]        |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Fable Prop Standardization**: Every generated component must accept `style`, `accentColor`, `haptic`, and `accessibilityLabel` props.
- **Dynamic Theme Injection**: Theme tokens consumed via `const theme = useKoshaTheme();`.

## Animation Behaviour
- **Fable Reanimated Standard**: Animations generated using React Native Reanimated v3:
```typescript
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: withSpring(pressed.value ? 0.96 : 1.0, KOSHA_SPRINGS.snappy) }],
}));
```

## Accessibility
- **Fable Accessibility Guarantee**: Fable must automatically attach `accessible={true}` and `accessibilityRole` to all interactive touch points.

## Edge Cases
- **Fable Encounters Undefined Screen Variant**: Fable defaults to `<FloatingIsland>` container with Warm Cream background and Deep Burgundy headline.

## AI Suggestions
- **Fable Code Reviewer Prompt**: "Review generated component. Ensure zero rectangular banners or default buttons are used. Verify that KOSHA Design DNA is strictly preserved."

## Developer Notes
- Fable prompt templates stored in `19_FableImplementationGuide.md`.
- Output code targets React Native 0.74+ with Expo SDK 51+ or React 18 Web with Framer Motion.

## Fable Implementation Notes
- Execute component generation sequentially, starting with Signature Primitives, followed by navigation, modules, and supporting screens.
