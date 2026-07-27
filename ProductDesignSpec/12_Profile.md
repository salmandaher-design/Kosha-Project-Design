# KOSHA Product Specification: 12 - Profile Experience

## Vision
Profile in KOSHA is not a routine, boring account settings page. It is an **Organic Life Story Dashboard** that reflects the user's role (Bride, Groom, Guardian/Wali, Supplier, or Specialist), active lifecycle stage, verified identity credentials, privacy controls, and personal preferences in an elegant, editorial space.

## User Goals
- Manage personal details, wedding dates, UAE Pass verification badges, and shipping addresses.
- Seamlessly toggle between "User Mode" (planning personal wedding) and "Supplier / Specialist Mode" (managing clients and listings).
- Control privacy levels for Khitbah matchmaking and vendor notifications.

## UX Problems
- Profile pages in standard apps look like administrative form lists with boring grey rows.
- Switching user roles forces logging out or opening separate application portals.
- Difficult to manage complex privacy preferences and verification status.

## Proposed Solution
- **The Life Story Header**: Arch-Contoured Editorial Frame displaying user avatar, verified UAE Pass crest badge, active wedding countdown tag, and role badge.
- **Dynamic Role Mode Switcher**: A prominent organic control toggle allowing seamless switching between *Bride/Groom Planning Mode* and *Supplier Atelier Mode* with smooth canvas re-rendering.
- **Organized Settings Islands**: Grouped floating containers for *Personal Story & Bio, Verified Credentials, Delivery Addresses, Payment Cards, Privacy & Security, Help & Concierge*.

## Design Concepts
- **Gold Crest Verification Badge**: Verified profiles feature a gleaming UAE Pass gold foil crest badge (`✦ Verified Emirati Profile`).
- **Role Mode Transition**: Toggling role mode slides a liquid backdrop across the header, transforming accent colors from Deep Burgundy to Royal Blue.

## Wireframe Description
```
+-------------------------------------------------------------+
|  PROFILE EXPERIENCE                                         |
|  [ Settings Gear ]                         ( Share Story )  |
|                                                             |
|  HERO LIFE STORY HEADER                                     |
|  /-------------------------------------------------------\  |
| /   ARCH-CONTOURED AVATAR FRAME (UAE Pass Gold Crest ✦)   \ |
| |   Sheikha Fatima Al-Mansoori                            | |
| |   [ WEDDING DATE: December 14, 2026 - Dubai ]           | |
| \_________________________________________________________/ |
|                                                             |
|  ORGANIC ROLE MODE SWITCHER                                 |
|  [ (•) Bride Planning Mode ] | [ ( ) Supplier Atelier Mode ]|
|                                                             |
|  SETTINGS FLOATING ISLANDS                                  |
|  +-------------------------------------------------------+  |
|  |  PERSONAL STORY & KHITBAH BIO (Soft Lavender Accent)  |  |
|  |  Manage Anonymized Soul Profile & Values              |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  +-------------------------------------------------------+  |
|  |  VERIFIED ADDRESSES & ZAHBA SHIPMENTS                 |  |
|  |  Saved Locations: Villa 42, Palm Jumeirah, Dubai      |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Role Switcher Toggle**: Tapping "Supplier Atelier Mode" triggers a screen-wide background morph, updating navigation dock routes to provider management tools.
- **Avatar Tap**: Opens high-res avatar preview with options to update photo or generate AI artistic portrait.

## Animation Behaviour
- **Role Canvas Morph**: Screen transitions smoothly with a `300ms` spatial layout stretch and palette shift.
- **Verification Crest Glow**: UAE Pass Gold Crest shines with a soft light sweep animation upon screen load.

## Accessibility
- **Accessible Role Switcher**: Mode switcher clearly announces active role ("Selected: Bride Planning Mode. Tap to switch to Supplier Atelier Mode").
- **High Contrast Borders**: Settings rows maintain high contrast borders (`0.5px` expanding to `1.5px` in accessibility mode).

## Edge Cases
- **Unverified Profile**: Unverified state displays prominent "Verify with UAE Pass" banner with one-tap authentication redirect.

## AI Suggestions
- **Profile Completeness Assistant**: AI highlights missing profile fields that enhance Khitbah compatibility or Zahba delivery accuracy.

## Developer Notes
- Profile data retrieved via `GET /api/user/profile`.
- Role switching toggles global application context `useUserRoleStore`.

## Fable Implementation Notes
- Use `<KoshaProfileContainer user={userData} currentRole={role} />`.
