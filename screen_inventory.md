# KOSHA: Screen Inventory & Product Specifications
## Complete Page Architecture, Interactions, and API Integrations

This screen inventory defines the visual layouts, interactions, animations, data flows, and accessibility specifications for every view in the KOSHA mobile application.

---

## 1. Pre-Navigation Stack (Auth & Onboarding)

### Screen 1.1: Splash & Onboarding (`/auth/onboarding`)
* **Purpose**: Introduce KOSHA brand value, display product intro, navigate to authentication stack.
* **Core Components**:
  * Logo container (animated SVG morphing to brand logo).
  * Horizontal paginated swipe card view (3 states: Matchmaking, Event planning, Consultation).
  * Page Indicator dots (animated expand/contract).
  * Primary Button: "Get Started" (Scale-on-touch, Burgundy colored).
* **Interactions**: Swipe gestures to navigate cards, tap button.
* **Animations**: Fade-in and scale logo on app open. Spring-based page change slide. Button opacity shift on drag end.
* **Backend APIs**: None (Static local assets).
* **Empty / Loading States**: None.
* **Errors**: None.
* **Accessibility**: Screen reader reads card description text. "Skip" button provides alternative route. Larger touch target for "Get Started" button (`48dp` min).
* **Edge Cases**: First-time load vs re-install checks (if cached auth token exists, skip onboarding and route to `/main/home`).

### Screen 1.2: Authentication Portal (`/auth/login`)
* **Purpose**: Authenticate user via Email OTP or verified UAE Pass credentials.
* **Core Components**:
  * Editorial Header: "Welcome to KOSHA" (Cormorant serif).
  * Text Field: Email / Phone input with floating label.
  * Button: "Continue with OTP" (Primary).
  * Divider: "or connect using".
  * UAE Pass Brand Button (Teal colored, premium branded logo).
* **Interactions**: Type credentials, click UAE Pass, click Continue.
* **Animations**: Float-up text inputs, micro-bounce on input focus, Stripe-style loading indicator inside button.
* **Backend APIs**:
  * `POST /api/auth/send-otp` (Triggers SMS/Email OTP).
  * `POST /api/auth/uae-pass/login` (Processes token exchange with UAE Pass).
* **Empty States**: Not applicable.
* **Loading**: Button morphs into loading spinner, input fields become read-only.
* **Errors**: Invalid credentials -> dynamic warning banner slides down from input box. Text field turns border color to `#B84A39` (Danger).
* **Accessibility**: Active inputs have labels readable by VoiceOver. Screen announces validation error voice cues. Input focuses automatically on mount.
* **Edge Cases**: User aborts UAE Pass mid-flow -> clean redirect back to login state with a cancellation notification toast.

### Screen 1.3: User Registration & Profiling (`/auth/registration`)
* **Purpose**: Gather user metadata, profile information, and route to specific user dashboard.
* **Core Components**:
  * Role selection cards (User vs Supplier vs Specialist).
  * Questionnaire multi-step form (Progress bar top).
  * File uploader (Profile picture, certificates for specialists).
* **Interactions**: Tap selection card, input questionnaire responses, select files.
* **Animations**: Slide in next step from right, progress bar width ease animation.
* **Backend APIs**:
  * `POST /api/auth/register` (Submits user registration).
  * `POST /api/media/upload` (Uploads profile avatar/credentials).
* **Empty States**: None.
* **Loading**: Full-page blurring overlay with shimmer progress text.
* **Errors**: Network timeout -> toast alert prompting retry.
* **Accessibility**: Accessible progress labels, descriptive hints for text input steps, skip controls where fields are optional.
* **Edge Cases**: Specialist upload fails -> show intermediate retry state for document upload.

---

## 2. Main Tab Stack (Core Navigation Views)

### Screen 2.1: Home Dashboard (`/main/home`)
* **Purpose**: Central hub highlighting active orders, upcoming appointments, vendor spotlights, and catalog recommendations.
* **Core Components**:
  * Custom Top Bar: Profile avatar thumbnail (left), KOSHA logo (center), Chat Inbox & Notifications (right).
  * "My Wedding Countdown" card (Personalized countdown, abstract ribbon background).
  * Curated Banners Carousel (Honeymoon packages, top service deals).
  * "Featured Venues" list (Horizontal scroll, large photos).
  * "Top Specialists" column (Avatar, name, rating stars).
* **Interactions**: Scroll page, pull-to-refresh, click banner, tap spotlight card.
* **Animations**: Elastic scroll, scroll-linked parallax banner scaling, spring expand on spotlight selection.
* **Backend APIs**:
  * `GET /api/home/dashboard` (Fetches user details, countdown, active promos, highlights).
* **Empty States**: No customized wedding date -> default countdown card acts as a call-to-action to configure profile wedding details.
* **Loading**: Shimmer boxes representing banner cards, vendor blocks, and specialist listings.
* **Errors**: Pull-to-refresh resets error state; failed fetches render fallback local static promo banners.
* **Accessibility**: Images contain descriptive alt labels. Star ratings explicitly announce (e.g. "Rating 4.8 out of 5 stars").
* **Edge Cases**: Server down -> display offline warning alert banner, cache previous dashboard results.

### Screen 2.2: Khotbah Matchmaking Gateway (`/main/khotbah/gateway`)
* **Purpose**: Provide details on the matchmaking system, present terms of service, and process payments for paywall subscription.
* **Core Components**:
  * Visual banner showing abstract floral graphics, premium gold text headers.
  * Bulleted listing of safety mechanisms (No phone sharing, verified ID, moderated channels).
  * Stripe card input form & payment selection buttons (AED prices).
  * Primary Button: "Activate Matchmaking".
* **Interactions**: Scroll terms, fill credit card fields, submit payment.
* **Animations**: Gentle color transitions across header, button scale pulse, success slide overlay.
* **Backend APIs**:
  * `GET /api/matchmaking/status` (Verifies current subscription).
  * `POST /api/matchmaking/subscribe` (Initializes Stripe payment transaction).
* **Empty States**: None.
* **Loading**: Card payment form shows Stripe loading skeleton during card token validation.
* **Errors**: Card declined -> highlight invalid input, display bank response error beneath input card.
* **Accessibility**: Numeric keyboard automatically focused for card input fields. Keyboard navigation supports screen reader traversal.
* **Edge Cases**: Subscription payment succeeds but API fails to flag user state -> system retries verification transaction in the background, displays confirmation toast.

### Screen 2.3: Matchmaking Directory (`/main/khotbah/directory`)
* **Purpose**: Browse verified and compatible partner profiles under anonymized IDs.
* **Core Components**:
  * Floating Filter Bar: Age, location, lifestyle preferences.
  * Grid list of partner cards: Blurred portrait photo, Age, Match score, City location.
  * Bottom Action Floating Card: Quick filter toggles, profile request buttons.
* **Interactions**: Tap card to view details, pull-to-refresh listings, toggle filters.
* **Animations**: Grid items load with slight stagger animation, expand profile card on tap.
* **Backend APIs**:
  * `GET /api/matchmaking/directory` (Fetches matching candidate list).
* **Empty States**: Filters too restrictive -> show "No Matching Profiles Found", primary button "Reset Filters".
* **Loading**: Staggered skeleton card grids with soft fading shimmer.
* **Errors**: Connection timeout -> show retry button in center of screen.
* **Accessibility**: Screen reader reads out anonymized detail card summaries ("Anonymized Profile 84A, Age 28, Dubai, 94% Compatibility").
* **Edge Cases**: Subscription expires while scrolling -> overlay blocks screen with redirect button to gateway paywall.

### Screen 2.4: Anonymized Profile Detail (`/main/khotbah/profile/:userId`)
* **Purpose**: Display detailed compatibility, personal lifestyle answers, family values, and send connection requests.
* **Core Components**:
  * Curved image collage (soft, editorial portraits).
  * Compatibility Breakdown chart (Gradients showing core matches).
  * Editorial layout of Q&A blocks: Career, Values, Hobbies.
  * Bottom Action Bar: "Connect" button vs "Skip" icon.
* **Interactions**: Scroll profile sections, tap connect, input short text request.
* **Animations**: Fade in images, spring bounce of connection button on tap.
* **Backend APIs**:
  * `GET /api/matchmaking/profile/{userId}` (Fetches user detail info).
  * `POST /api/matchmaking/connect` (Sends connection/chat request).
* **Empty States**: Not applicable.
* **Loading**: Editorial layout placeholders (lines of varying widths) shimmer.
* **Errors**: Profile not found -> show error modal and redirect back to directory.
* **Accessibility**: Close/back button has a minimum tap target of `48dp`. High contrast Q&A text.
* **Edge Cases**: Partner user deletes account while viewing -> connection request returns "User Profile is no longer active" toast alert, returns to directory.

### Screen 2.5: Zahbah Marketplace Catalog (`/main/zahbah/shop`)
* **Purpose**: Browse and purchase wedding products (attire, accessories, invitation designs).
* **Core Components**:
  * Horizontal Category Pills (Dresses, Jewelry, Invitations).
  * Search Bar: input field with micro-search icon.
  * Product grid list: high-quality editorial image, product brand, title, cost in AED, review rating.
  * Floating Cart Icon (Badge counter overlay).
* **Interactions**: Toggle category pills, type in search input, scroll product list, tap product.
* **Animations**: Sliding scale of category indicator, scale card on tap, cart badge numbers tick upward on add.
* **Backend APIs**:
  * `GET /api/store/products` (Fetches e-commerce listings with query params).
* **Empty States**: "No products match your search". Prompts popular tags to reset search context.
* **Loading**: Grid blocks shimmer.
* **Errors**: Server error -> display error icon, text and retry control.
* **Accessibility**: All products have structural accessibility tags specifying item title, price, and manufacturer.
* **Edge Cases**: No internet connection -> fallback cache displays previously loaded product cards, hides price and cart addition button.

### Screen 2.6: Zahbah Product Detail (`/main/zahbah/product/:productId`)
* **Purpose**: Detailed specifications, reviews, variants selector, and cart addition controls.
* **Core Components**:
  * Image carousel (swipe indicators at bottom).
  * Brand profile section & reviews stars dropdown.
  * Size and variant chips (e.g. Color, Size).
  * Sticky Bottom Action Bar: "Add to Cart" button, price display.
* **Interactions**: Swipe images, tap variants, expand product description block, tap Add to Cart.
* **Animations**: Horizontal page swipe, button state change (Text morphs: "Add to Cart" -> "Added" with tick checkmark), cart icon bounce.
* **Backend APIs**:
  * `GET /api/store/product/{productId}` (Fetches product profile details).
  * `POST /api/store/cart/add` (Pushes item, quantity, and variant to cart).
* **Empty States**: Out of stock -> button displays "Out of Stock" (disabled state).
* **Loading**: Image box displays circular loader; detail page elements skeleton shimmer.
* **Errors**: Variant selection omitted -> button shake animation, highlights selecting variants container in accent warning color.
* **Accessibility**: Variant selector reads "Selected: Size Small" or "Unselected Size Medium". Keyboard navigation support for inputs.
* **Edge Cases**: Price changes while on details screen -> sync value on cart submission to match fresh backend data, notification to user if price changed.

### Screen 2.7: Zaffah Services Catalog (`/main/zaffah/catalog`)
* **Purpose**: Browse and filter venue halls, wedding planners, wedding photographers.
* **Core Components**:
  * Services search header (with calendar date range filter).
  * Map Toggle Button (transitions catalog view into map view showing pin drops).
  * Service listing cards: wide card containing cover photo, provider logo badge, capacity, pricing starting, location tag, rating.
* **Interactions**: Toggle map, slide price filters, select dates, scroll list.
* **Animations**: Map-to-list sliding transition. Pins drop dynamically on map reload.
* **Backend APIs**:
  * `GET /api/services/catalog` (Fetches provider profiles & listings).
* **Empty States**: "No service providers found for the selected date range".
* **Loading**: List items cards skeleton with shimmering outlines.
* **Errors**: Location access denied -> show location settings redirect link; default listing defaults to main city center.
* **Accessibility**: Map pins provide text equivalence for speech engines. Slider is adjustable via gesture swipes.
* **Edge Cases**: Date selection spans overlapping blockages -> listing filters out blocked dates automatically.

### Screen 2.8: Zaffah Service Detail (`/main/zaffah/service/:serviceId`)
* **Purpose**: Showcase venue details (photos, virtual 3D tour, location pins), review ratings, and custom booking intake form.
* **Core Components**:
  * Hero photo slider (3D tour overlay button).
  * Description block (expandable).
  * Custom Intake Booking Form: Date picker, Guest slider, Catering selection options, Custom comments.
  * Sticky Bottom: "Request Booking" (Primary action).
* **Interactions**: Spin virtual tour, adjust guest count slider, input booking notes.
* **Animations**: Smooth modal form slide-up, slider track fill gradient morph.
* **Backend APIs**:
  * `GET /api/services/detail/{serviceId}` (Fetches full vendor details & form scheme).
  * `POST /api/services/bookings/request` (Submits booking request with intake answers).
* **Empty States**: Not applicable.
* **Loading**: Skeleton images, placeholder form components.
* **Errors**: Incomplete fields -> highlights empty form fields, triggers short phone vibration (Haptic Error profile).
* **Accessibility**: Virtual tour has audio alternative; intake form inputs meet standard layout sizes.
* **Edge Cases**: Vendor modifies intake questionnaire structure -> page layout renders fields dynamically from schema JSON.

### Screen 2.9: Tawjeeh Specialists Directory (`/main/tawjeeh/specialists`)
* **Purpose**: List counseling experts categorized by psychological, marital, and legal categories.
* **Core Components**:
  * Category Switcher tabs (Top).
  * Search field (Find counselors by name or keyword).
  * Counselor cards: portrait avatar, specialty subtitle, rating, price per hour, active online indicator.
* **Interactions**: Tap category tab, scroll list, click counselor card.
* **Animations**: Staggered transition on category switch, online indicator pulse animation.
* **Backend APIs**:
  * `GET /api/counseling/specialists` (Fetches counselor listings).
* **Empty States**: "No specialists available in this category".
* **Loading**: Circular image placeholder circles, textual lines shimmer.
* **Errors**: Network connection timeout -> reload prompt button.
* **Accessibility**: Online indicator reads "Specialist is available now for booking".
* **Edge Cases**: Specialist goes offline while on screen -> indicator color changes from success green to neutral grey in real-time.

### Screen 2.10: Specialist Profile Detail (`/main/tawjeeh/specialist/:specialistId`)
* **Purpose**: Display bio details, video introduction placeholder, ratings, and a booking calendar.
* **Core Components**:
  * Bio details & specialization certificates list.
  * Video snippet container (plays short counselor intro clip).
  * Horizontal Calendar Strip (scrollable days of the month).
  * Hour Slot Grid (Available times shown as action chips).
  * Bottom Button: "Book Counseling Session" (Sticky).
* **Interactions**: Scroll calendar, select slot chip, play video, tap book session button.
* **Animations**: Calendar item shifts highlight state, hours grid animates in height based on date availability.
* **Backend APIs**:
  * `GET /api/counseling/specialist/{specialistId}` (Fetches counselor profile details).
  * `GET /api/counseling/specialist/{specialistId}/schedule?date={date}` (Fetches hours details for selected date).
  * `POST /api/counseling/bookings/create` (Requests appointment slot).
* **Empty States**: "No hours available on this date".
* **Loading**: Calendar strip and slots show fading boxes.
* **Errors**: Selected slot gets reserved by another user -> alert modal "Time slot no longer available, please select another time".
* **Accessibility**: Screen reader reads schedule dates (e.g. "Monday, July 27th, Available").
* **Edge Cases**: User attempts booking a time slot that starts in under 5 minutes -> system blocks selection, prompts to select later slot.

---

## 3. Shared & Transaction-Triggered Navigation Stack

### Screen 3.1: Universal Shopping Cart (`/shared/cart`)
* **Purpose**: Review selected e-commerce products and service/venue booking intents prior to checkout.
* **Core Components**:
  * Sectioned List: "Products in Cart" vs "Service Bookings Pending Review".
  * Cart Item Row: Photo, title, quantity control counter, price, delete button.
  * Price Summary Panel: Subtotal, VAT (5% UAE), total.
  * Checkout Action Button (Primary).
* **Interactions**: Adjust quantity counter, delete item, click checkout.
* **Animations**: Delete item slides row left and collapses height, sum total counts up/down dynamically on quantity edits.
* **Backend APIs**:
  * `GET /api/cart` (Fetches items).
  * `PUT /api/cart/item/{itemId}` (Updates item details: quantity).
  * `DELETE /api/cart/item/{itemId}` (Removes item).
* **Empty States**: "Your cart is currently empty". Banner displaying "Start planning your wedding" which links to Home.
* **Loading**: Shimmer loaders for summary items.
* **Errors**: Item stock levels insufficient -> item card highlights alert message "Only 2 items left in stock", button disables if cart invalid.
* **Accessibility**: Quantity adjusters have accessible labels ("Increase quantity", "Decrease quantity"). Cart totals announced after changes.
* **Edge Cases**: Cart contains mixed vendor currencies -> system auto-converts display total to primary AED currency.

### Screen 3.2: Checkout Information Screen (`/shared/checkout`)
* **Purpose**: Input delivery addresses, choose shipping speed, and submit order validation requests.
* **Core Components**:
  * Address selector component (Map pin picker, list of saved profiles).
  * Shipment carrier speed selector (Express vs Standard).
  * Booking confirmation terms list.
  * Button: "Submit Request for Supplier Approval" (Primary).
* **Interactions**: Tap select address, input new address details, click submit button.
* **Animations**: Slide in address input panel, button color shifts on focus.
* **Backend APIs**:
  * `GET /api/user/addresses` (Fetches saved locations).
  * `POST /api/user/addresses` (Saves new location entry).
  * `POST /api/checkout/submit` (Launches order validation pipeline).
* **Empty States**: No shipping addresses -> loads address configuration form.
* **Loading**: Full-page indicator spinner.
* **Errors**: Missing address -> text field glows red, displays warning message.
* **Accessibility**: Floating fields declare keyboard expectations (e.g. postal code input uses numeric layout).
* **Edge Cases**: System identifies invalid address coordinates -> triggers Google Maps suggestion dialog to auto-correct location details.

### Screen 3.3: Invoices & Payment Portal (`/shared/invoice/:invoiceId`)
* **Purpose**: Review transaction invoice breakdown (once approved by vendor) and submit payment via Stripe or Apple Pay.
* **Core Components**:
  * Invoice metadata card: Merchant details, Itemized items list, Total price.
  * Status Badge: "Awaiting Payment" vs "Paid".
  * Apple Pay button (Native iOS style).
  * Credit Card Input Form (Stripe Elements integration).
  * Bottom Button: "Pay Invoice: {Amount} AED".
* **Interactions**: Tap Apple Pay, input card numbers, click pay button.
* **Animations**: Stripe token validation progress spinner inside button. Splash success checkmark screen.
* **Backend APIs**:
  * `GET /api/invoices/{invoiceId}` (Fetches approved invoice details).
  * `POST /api/payments/charge` (Finalizes charge processing on server).
* **Empty States**: Not applicable.
* **Loading**: Apple Pay validation spinner overlays interface.
* **Errors**: Card validation fails -> visual alert card displaying detailed bank failure codes.
* **Accessibility**: Screen reader reads full transaction invoice cost prior to payment. High contrast buttons.
* **Edge Cases**: App session is killed mid-payment -> webhook listens to transaction state, updating DB record; app reopens directly to status update screen.

### Screen 3.4: Order & Booking Tracker (`/shared/orders/tracking`)
* **Purpose**: Monitor shipping status of products and reservation milestones of bookings.
* **Core Components**:
  * Visual progress tracker: vertical timeline dots indicating: *Requested -> Vendor Approved -> Paid -> Dispatched -> Completed*.
  * Courier tracking card: Delivery driver map, license plate, ETA.
  * Vendor chat shortcut button.
  * Post-fulfillment Review block (collapsible rating input).
* **Interactions**: Tap rate stars, message courier button, click tracking details.
* **Animations**: Pulse effect on active timeline milestone dot. Map updates driver position smoothly (interpolation animation).
* **Backend APIs**:
  * `GET /api/orders/track/{orderId}` (Fetches progress history & courier coordinates).
  * `POST /api/orders/review` (Submits product/service review rating stars).
* **Empty States**: No active bookings tracking -> displays text "You have no upcoming bookings".
* **Loading**: Timeline paths and map skeleton screen.
* **Errors**: GPS courier signal drop -> map hides driver node, text card displays status "Awaiting courier GPS signal update".
* **Accessibility**: Text equivalents for all status milestones. Map components support screen reader focus.
* **Edge Cases**: Courier cancels delivery -> tracking displays status "Shipment delayed, rescheduled for tomorrow", color indicator updates to warning color.

### Screen 3.5: Chat Requests Dashboard (`/shared/chat/requests`)
* **Purpose**: Manage matchmaking requests, review incoming invitation messages, and accept/decline connections.
* **Core Components**:
  * Tab Selector: "Received" (Badge count) vs "Sent".
  * Request Card list: Sender name/photo, intro message teaser, Accept button, Decline icon.
* **Interactions**: Tap tabs, click Accept (turns card green), click Decline (fades card away).
* **Animations**: Row slides out on decline, Accept shifts cards into active chat threads.
* **Backend APIs**:
  * `GET /api/matchmaking/requests` (Fetches incoming/outgoing requests).
  * `PUT /api/matchmaking/requests/{requestId}` (Sends accept/decline decision).
* **Empty States**: "You have no connection requests at this time".
* **Loading**: Horizontal list item skeleton placeholders.
* **Errors**: Network connection timeout -> reload icon.
* **Accessibility**: All list items readable sequentially. Action buttons clearly labeled ("Accept invitation from User 42A").
* **Edge Cases**: User accepts request that has been cancelled -> display modal "Connection request has already been revoked".

### Screen 3.6: Secure Chat Room (`/shared/chat/room/:chatRoomId`)
* **Purpose**: Private connection interface between matchmaking couples or users and service vendors.
* **Core Components**:
  * Header Panel: Partner details, Status indicator, Report Abuse button.
  * Message Bubble Scroll: Alternating side bubbles (Burgundy for current user, Soft Cream for partner).
  * Text Entry bar: Input field, Send button.
* **Interactions**: Type messages, press Send, scroll chat logs, tap Report.
* **Animations**: Inbound messages bounce from screen bottom, scroll list shifts smoothly, input bar expands on multiple lines.
* **Backend APIs**:
  * WebSocket connection handler `ws://chats` (Delivers real-time messages).
  * `GET /api/chat/messages/{chatRoomId}` (Fetches historical chat logs).
  * `POST /api/chat/report` (Flags user profile for safety violation).
* **Empty States**: "Say hello to start the conversation".
* **Loading**: Previous chat history loads with a circular spinning asset top of list.
* **Errors**: Link detection system -> message turns red, warning toast pops "Sharing contact coordinates is restricted for your safety".
* **Accessibility**: VoiceOver announces incoming messages, high contrast readability between bubble backdrops and texts.
* **Edge Cases**: Connection drop mid-chat -> top bar displays status "Reconnecting...", queue outbound messages to retry on reconnection.

### Screen 3.7: Live Session Video Room (`/shared/live/:sessionId`)
* **Purpose**: Peer-to-peer real-time video/audio room for pre-marital and legal consultations (Tawjeeh).
* **Core Components**:
  * Full-screen WebRTC video window (displays counselor feed).
  * Picture-in-picture floating frame (displays user front-camera feed).
  * Interaction Toolbar: Mic mute toggle, Camera toggle, Share Screen, End Call button.
  * Shared Notes sidebar (collapsible).
* **Interactions**: Drag user video window, toggle mic/camera buttons, tap end call.
* **Animations**: Drag gestures slide user video frame; toolbar transitions down on double tap screen (immersive mode).
* **Backend APIs**:
  * WebRTC signaling socket `ws://signaling/live` (Exchanges ICE candidates).
  * `POST /api/consultations/session/end` (Logs call termination details).
* **Empty States**: Not applicable.
* **Loading**: Counselor stream displays loading placeholder "Connecting to Specialist stream...".
* **Errors**: Camera permission denied -> display error screen "Camera and microphone permissions required to enter live consultation room".
* **Accessibility**: Session supports captioning stream; audio levels adjustable via system keys.
* **Edge Cases**: Counselor connection drops -> displays spinner "Specialist lost connection, holding call status...", system reconnects or ends call after 2 minutes.

### Screen 3.8: User Profile & Configuration (`/shared/profile`)
* **Purpose**: Manage personal settings, addresses, payment cards, subscription status, and role-specific dashboard views.
* **Core Components**:
  * User header card: Large avatar photo, verified badge, name.
  * Navigation Settings rows: "Personal Details", "Shipping Addresses", "Billing Methods", "Active Subscriptions", "Contact Support", "Switch to Provider Mode".
  * Sign Out Button (danger styling).
* **Interactions**: Tap settings rows, update fields, toggle switch modes.
* **Animations**: Staggered transition on settings expand, switcher slide animation.
* **Backend APIs**:
  * `GET /api/user/profile` (Fetches profile details).
  * `PUT /api/user/profile` (Updates profile details).
* **Empty States**: None.
* **Loading**: Form fields display shimmer overlays.
* **Errors**: Profile update validation failure -> red border accents on inputs.
* **Accessibility**: Form controls meet AA accessible contrast standards. Form fields have keyboard focus support.
* **Edge Cases**: Supplier switches to User view -> system resets tab route context, displaying the home user dashboard view.
