# KOSHA: End-to-End User Journeys
## Customer Lifecycle Maps: From Onboarding to Marriage

The KOSHA user journey spans six key phases, transitioning the user from single and planning to married and supported. Below are the visual maps and detailed touchpoint specifications for each stage of the lifecycle.

---

## 1. Lifecycle Journey Overview

```mermaid
graph TD
    Phase1[Phase 1: Discovery & Setup] --> Phase2[Phase 2: Matchmaking 'Khotbah']
    Phase2 --> Phase3[Phase 3: Pre-Marital 'Tawjeeh']
    Phase3 --> Phase4[Phase 4: Shopping 'Zahbah']
    Phase4 --> Phase5[Phase 5: Event Booking 'Zaffah']
    Phase5 --> Phase6[Phase 6: Marriage & Support]
```

---

## 2. Phase-by-Phase Walkthrough

### Phase 1: Discovery, Verification, and Setup
* **Objective**: Introduce KOSHA's value proposition, verify identity (UAE Pass/OTP), configure user profiles, and set user role (Individual, Supplier, Counselor).

```mermaid
sequenceDiagram
    autonumber
    actor User as Individual User
    participant App as KOSHA Mobile UI
    participant Auth as Auth & UAE Pass API
    participant DB as Backend Database
    
    User->>App: Install and open KOSHA
    App->>User: Display Onboarding Splash Carousel (Curated UI)
    User->>App: Click "Get Started"
    App->>User: Prompt Phone / Email Input
    User->>App: Submit Credentials / Select UAE Pass
    App->>Auth: Send verification request
    Auth->>User: Send OTP / Redirect to Identity Verification
    User->>App: Enter OTP / Confirm UAE Pass Identity
    App->>Auth: Verify credentials
    Auth->>App: Token issued + verified national ID payload
    App->>DB: Query account existence
    alt New User
        App->>User: Load Profile Setup (Role Selector)
        User->>App: Choose 'Individual User'
        App->>User: Load Questionnaire (Preferences, values, date target)
        User->>App: Complete profiles questions
        App->>DB: Save user profile records
    else Existing User
        App->>DB: Retrieve User Context
    end
    App->>User: Navigate to Dashboard Home
```

---

### Phase 2: Matchmaking & Partner Discovery ("Khotbah")
* **Objective**: Safely discover compatible partners, subscribe to the directory, request communication, and chat securely without disclosing personal contact numbers.

```mermaid
sequenceDiagram
    autonumber
    actor User as User A (Subscribed)
    actor Partner as User B (Subscribed)
    participant App as KOSHA Matchmaking UI
    participant Chat as Secure Chat Engine
    
    User->>App: Tap Khotbah Tab
    App->>User: Load compatibility matching grid
    User->>App: Filter by location (e.g. Dubai) & values
    App->>User: Render matching profiles (anonymized)
    User->>App: Click User B profile card
    App->>User: Display Editorial Details (hobbies, goals)
    User->>App: Click "Request Connection"
    App->>Partner: Send connection notification
    Partner->>App: Open connection request list
    Partner->>App: Tap "Accept Request"
    App->>Chat: Initialize chatRoomId (secure)
    User->>Chat: Send "Hello! Let's talk"
    Partner->>Chat: Reply
    Note over Chat: Chat Engine automatically filters out emails, phone numbers, and social handles
```

---

### Phase 3: Professional Family Guidance ("Tawjeeh")
* **Objective**: Consult experts regarding marital prep, legal/pre-nup advice, and psychological counseling to establish a strong family foundation.
* **Touchpoints**:
  1. User navigates to **Tawjeeh** tab.
  2. Filter specialists by category: *Psychological, Familial, Legal*.
  3. User views **Specialist Profile** (Read reviews, credentials, pricing).
  4. Select booking slot from counselor's active calendar.
  5. Counselor accepts booking request.
  6. Stripe payment completed (invoice sent via push notification).
  7. **Consultation Day**: Push notification triggers 15 minutes before slot.
  8. User and Specialist enter **Live Session Room** (WebRTC video feed).
  9. Session finishes -> user rates counselor -> counselor shares notes.

---

### Phase 4: Wedding Preparation & Marketplace ("Zahbah")
* **Objective**: Shop for wedding assets (invitations, rings, attire, luxury gifts) from validated designers and merchants.
* **Touchpoints**:
  1. User enters **Zahbah Shop**.
  2. Browse collections (e.g., "Emirati Bride Collection").
  3. User selects jewelry item, configures customizations, and taps "Add to Cart".
  4. User navigates to **Cart Screen**, selects delivery address, and taps "Place Order Request".
  5. Supplier reviews order (inventory validation).
  6. Order approved -> user pays invoice (AED via Stripe/Apple Pay).
  7. Supplier packs & ships product, updating courier tracker.
  8. Product is delivered -> user confirms receipt -> submits review card.

---

### Phase 5: Service & Venue Bookings ("Zaffah")
* **Objective**: Plan and reserve wedding logistics (hall rental, photography, flowers, makeup artists).

```mermaid
flowchart TD
    A[Enter Zaffah Services Catalog] --> B[Filter by Venue Location & Capacity]
    B --> C[Select Venue & View 3D/Photo Gallery]
    C --> D[Open Custom Intake Booking Form]
    D --> E[Enter Event Date, Guests, Styling Needs]
    E --> F[Submit Booking Request]
    F --> G{Venue Owner Reviews Date Availability}
    G -- Available --> H[Approve Booking & Issue Invoice]
    G -- Unavailable --> I[Decline & Suggest Alternative Dates]
    H --> J[User Completes Secure Payment via Stripe/AED]
    J --> K[Booking Status: Confirmed & Reserved]
    K --> L[Event Execution on Wedding Day]
    L --> M[Submit Vendor Rating & Review]
```

---

### Phase 6: Marriage Day & Beyond
* **Objective**: Support the couple after the wedding day through ongoing counseling, anniversary planning, and e-commerce shopping.
* **Touchpoints**:
  1. **Wedding Day**: All bookings change status to "Completed".
  2. User receives automated congrats popup with a gift voucher from the KOSHA team.
  3. **Ongoing Support**: Home screen shifts layouts to show "Anniversary Gift Shop" (Zahbah) and "Marital Consulting Columns" (Tawjeeh).
  4. Access to legal support/documentation consultation slots for marital status updates (UAE Government registry integration advice).
