# KOSHA Product Specification: 13 - Payments & Financial Studio

## Vision
Payments in KOSHA abandons clinical checkout forms and intimidating invoices. It creates **The Luxury Payment Studio**—an empowering, transparent financial workspace where high-value wedding transactions (venue deposits, designer dress payments, specialist retainers) are reviewed, scheduled in installments, and completed with luxury visual fanfare (Apple Pay, credit cards, Tabby/Tamara installments in AED).

## User Goals
- Review itemized invoice breakdowns, VAT taxes (5% UAE), vendor payment terms, and deposit milestones clearly.
- Pay securely using native Apple Pay, credit cards, or flexible wedding installment schedules.
- Receive official gold-stamped digital receipts and immediate status updates on the Zaffa Dream Roadmap.

## UX Problems
- Checkout pages look like intimidating billing forms that induce anxiety during large purchases.
- Lack of clear installment scheduling for high-ticket venue and catering contracts.
- Invoices hide hidden fees or lack detailed itemization.

## Proposed Solution
- **The Invoice Breakdown Studio**: Invoices displayed inside Arch-Contoured Floating Islands featuring vendor branding, gold status crests (*Awaiting Payment, Deposit Paid, Fully Settled*), and clear itemized rows.
- **Installment Milestone Arc**: Visual milestone progress bar showing payment breakdown (e.g. *30% Booking Deposit -> 40% Stage Assembly -> 30% Post-Event Balance*).
- **Luxury Payment Triggers**: Native Apple Pay integration alongside Velvet Ribbon primary action buttons with integrated loading wave animations.
- **Gold-Stamped Receipt Canvas**: Upon successful payment, unveils a gold-embossed digital receipt card with download/share controls.

## Design Concepts
- **Gold-Stamped Receipt**: High-luxury digital voucher featuring gold metallic border sheen, official merchant seal, and transaction hash.
- **Installment Progress Arc**: SVG curve filled with golden gradient representing settled vs upcoming payment milestones.

## Wireframe Description
```
+-------------------------------------------------------------+
|  LUXURY PAYMENT STUDIO                                      |
|  [ Back to Zaffa ]                           ( Help / FAQ ) |
|                                                             |
|  INVOICE BREAKDOWN CARD: INVOICE #KSH-9042                  |
|  +-------------------------------------------------------+  |
|  |  MERCHANT: Royal St Regis Ballroom Dubai              |  |
|  |  ITEM: Grand Ballroom Venue Reservation               |  |
|  |                                                       |  |
|  |  Subtotal:                                120,000 AED |  |
|  |  UAE VAT (5%):                              6,000 AED |  |
|  |  ---------------------------------------------------  |  |
|  |  TOTAL DUE:                               126,000 AED |  |
|  |  [ STATUS: 30% Booking Deposit Due: 37,800 AED ]      |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  INSTALLMENT MILESTONE ARC                                  |
|  ( Step 1: Deposit 37.8k AED )===( Step 2: 50.4k )===( 3 ) |
|  [=== 33% Settled ===]                                      |
|                                                             |
|  PAYMENT METHOD SELECTION                                   |
|  (•) Apple Pay   ( ) Credit / Debit Card   ( ) Installments |
|                                                             |
|  (=== [Icon] PAY 37,800 AED WITH APPLE PAY (Pill) ===)     |
+-------------------------------------------------------------+
```

## Component Behaviour
- **Apple Pay Tap**: Launches native iOS payment sheet seamlessly over blurred background.
- **Installment Selection**: Tapping installment option calculates monthly schedule and displays terms inline without modal redirection.

## Animation Behaviour
- **Payment Success Celebration**: Successful transaction triggers golden confetti burst, plays haptic success double-pulse, and stamps receipt with animated gold seal.
- **Progress Fill Ease**: Installment arc fills smoothly over `800ms` as payment processes.

## Accessibility
- **Financial Amount Audio Readout**: Screen reader speaks exact total: "Total payment due: 37,800 United Arab Emirates Dirhams including VAT."
- **High Contrast Action Button**: Primary payment button maintains 7:1 contrast.

## Edge Cases
- **Payment Declined**: Displays gentle error toast: "Transaction paused by bank. Tap to retry or select alternative payment method."

## AI Suggestions
- **AI Budget Tracker**: Automatically adjusts overall Zaffa wedding budget balance upon successful payment receipt.

## Developer Notes
- Payment processing integrated with Stripe SDK / Apple Pay API `/api/payments/charge`.
- Transactions backed by TLS 1.3 encryption and PCI-DSS compliance.

## Fable Implementation Notes
- Use `<KoshaPaymentStudio invoice={invoiceData} onSuccess={handleSuccess} />`.
