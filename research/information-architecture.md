# Information Architecture

## The Hierarchy: What Matters Most

### Tier 1 — Always Visible (Hero Zone)
These are shown on the main ticketing screen at all times:
- **Current Stop** (GPS auto-detected) — "Where am I?"
- **Route Number + Direction** — "Which bus is this?"
- **Quick Destination Grid** — Top 6-8 most frequent stops for this route

### Tier 2 — One Tap Away
- **Full Stop List** — All stops on the route (scrollable, searchable)
- **Passenger Count** — Quick selector (1-5+)
- **Payment Mode** — Cash (default) / UPI / Pass
- **Last Ticket Info** — Quick repeat for same destination

### Tier 3 — Accessible but Not Prominent
- **Fare Breakdown** — Auto-calculated, shown for transparency
- **Trip Summary** — Running total for current trip
- **Shift Dashboard** — Tickets issued, revenue collected
- **Settings** — Language, brightness, route change

### Tier 4 — Hidden (Overflow/Menu)
- **Passenger Manifest** — Full log of issued tickets
- **Shift Reports** — End-of-shift accounting
- **Device Settings** — Connectivity, printer, battery
- **Help/Support** — FAQ, report issue

---

## Screen Map

```
┌─────────────────────────────────────────────┐
│                MAIN SCREEN                   │
│                                              │
│  ┌─────────────────────────────────────┐     │
│  │  Route 335E  →  Majestic            │ T1  │
│  │  Current: Silk Board (Stage 4)      │     │
│  └─────────────────────────────────────┘     │
│                                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │Majest│ │Korama│ │BTM   │ │Whitef│  T1   │
│  │-ic   │ │ngala │ │Layout│ │ield  │       │
│  │ ₹15  │ │ ₹25  │ │ ₹10  │ │ ₹30  │       │
│  └──────┘ └──────┘ └──────┘ └──────┘       │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │Eletr │ │Indira│ │Market│ │Yelaha│  T1   │
│  │onic C│ │nagar │ │      │ │nka   │       │
│  │ ₹20  │ │ ₹35  │ │ ₹12  │ │ ₹40  │       │
│  └──────┘ └──────┘ └──────┘ └──────┘       │
│                                              │
│  ┌─────────────────────────────────────┐     │
│  │  [All Stops ▼]    Passengers: [1]   │ T2  │
│  └─────────────────────────────────────┘     │
│                                              │
│  ┌─────────────────────────────────────┐     │
│  │     🎟️  ISSUE TICKET  (₹15 × 1)    │ CTA │
│  └─────────────────────────────────────┘     │
│                                              │
│  ┌──────────────────┐ ┌──────────────┐      │
│  │  ↩️ UNDO LAST     │ │ 🔄 REPEAT    │ T2  │
│  └──────────────────┘ └──────────────┘      │
└─────────────────────────────────────────────┘
```

---

## The 4-Second Flow (3 Passengers to Same Destination)

```
Time 0.0s  →  Conductor sees grid of popular destinations
Time 0.5s  →  TAP 1: Taps "Majestic ₹15"  
Time 1.0s  →  Destination selected, passenger count appears
Time 1.5s  →  TAP 2: Taps "3" on passenger count 
Time 2.0s  →  Total updates: "₹15 × 3 = ₹45"
Time 2.5s  →  TAP 3: Taps "ISSUE TICKET"
Time 3.0s  →  ✅ Tickets issued, haptic confirmation
Time 3.5s  →  Screen resets to main, ready for next passenger

Total: ~3.5 seconds, 3 taps
```

## The "Repeat" Flow (Same Destination, Different Group)

```
Time 0.0s  →  Conductor taps "🔄 REPEAT"  
Time 0.5s  →  Last ticket config loaded (Majestic × 3)
Time 1.0s  →  Adjusts passenger count if needed
Time 1.5s  →  TAP: "ISSUE TICKET"
Time 2.0s  →  ✅ Done

Total: ~2 seconds, 2 taps
```

## Data Model

```
Ticket {
  id: UUID
  route_id: "335E"
  from_stage: 4 (GPS auto)
  from_stop: "Silk Board"
  to_stage: 7
  to_stop: "Majestic"  
  passenger_count: 3
  fare_per_passenger: 15
  total_fare: 45
  payment_mode: "CASH" | "UPI" | "PASS"
  timestamp: ISO 8601
  conductor_id: "C-1234"
  bus_reg: "KA-01-FA-1234"
}
```
