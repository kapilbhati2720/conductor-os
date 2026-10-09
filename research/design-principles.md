# Design Principles

These principles guide every decision in our design. Each is directly derived from the 
assignment constraints and our user research.

---

## 1. 🎯 Thumb-First, Always
> Design for the thumb of a single hand holding a phone in a jerky bus.

- All primary actions in the **bottom 60%** of the screen (natural thumb zone)
- Minimum touch target: **56x56px** (larger than standard 48px to account for bus vibration)
- No critical actions in top corners (red zone)
- Center-aligned primary CTAs for ambidextrous use

## 2. ⚡ Sub-Second Taps
> Each interaction step must complete in under 1 second. Total flow < 4 seconds for 3 passengers.

- **2-tap maximum** for the most common flow (destination → passenger count → done)
- Pre-loaded route stops (no typing/searching)
- Passenger count selector: simple +/- stepper or quick-select (1, 2, 3, 4, 5+)
- Batch ticketing: one action for multiple passengers to same destination

## 3. 👁️ Glance-and-Go
> Every screen must communicate its purpose within 0.5 seconds of looking at it.

- **High contrast**: Off-black (#1A1A2E) on off-white (#F0F0F5), or inverse
- Typography: **20px minimum** for body, **28px+** for primary values (fare, destination)
- No decorative elements — every pixel earns its place
- Color coding: Green = confirm, Red = cancel, Blue = info (universal, not culturally dependent)
- Bold sans-serif font (Inter or system font for performance)

## 4. 🛡️ Forgiveness by Default
> In a bouncing bus, accidental taps will happen. The design must absorb mistakes gracefully.

- **Undo** instead of "Are you sure?" modals (faster recovery)
- Swipe-to-confirm for irreversible actions (harder to do accidentally than a tap)
- Visual + haptic feedback on every action (no silent failures)
- Last-ticket-repeat function (many passengers going to same stop)

## 5. 📊 Signal Over Noise
> Show only what the conductor needs RIGHT NOW. Everything else is hidden.

- Home screen shows: **current stop (GPS), route number, last ticket issued**
- Fare is auto-calculated — conductor never manually enters amount
- Payment mode defaults to cash (80%+ of transactions)
- Digital payment is secondary flow, not equal visual weight

## 6. 💪 Muscle Memory Friendly
> After day 1, the conductor should be able to use this without looking at the screen.

- Consistent layout across all screens
- Same position for "confirm" button always
- Same position for "back/cancel" always
- Spatial consistency: destination always top, fare always middle, action always bottom

---

## Design Token Summary

| Token | Value | Rationale |
|-------|-------|-----------|
| Primary BG | `#0A0A1A` (deep navy) | Non-reflective, high contrast base |
| Surface | `#12122A` | Card/container backgrounds |
| Surface Elevated | `#1E1E40` | Slightly brighter, less mirror-like in sunlight |
| Primary Text | `#F0F0F5` | Off-white, reduces glare vs pure white |
| **Fare/Info Text** | `#F0F0F5` (white) | **Neutral** — fares are info, not actions |
| **Action (Confirm)** | `#00E676` (green) | **ONLY** for the Issue Ticket button — nothing else |
| Action (Undo) | `#FF5252` (red) | Prominent undo mode after ticket issue |
| Info | `#448AFF` (blue) | Selected passenger count, route badge |
| Warning | `#FFD740` (amber) | Alerts, low battery, connectivity issues |
| Font | `Inter` or system sans-serif | Clean, legible, widely available |
| Min touch target | `56px` | Exceeds 48px standard for vibration tolerance |
| Min body text | `20px` | Readable in glare + at arm's length |
| Min heading text | `28px` | Glanceable route/fare numbers |
| Border radius | `16px` | Friendly, easy-to-distinguish from sharp edges |
| Spacing unit | `8px` | Consistent rhythm |

> **Key v2 Decision**: Green is reserved EXCLUSIVELY for the primary action button. 
> Fare numbers are neutral white. This ensures the conductor's eye is drawn to the ACTION, 
> not the price — because the price is auto-calculated and the conductor trusts it.
