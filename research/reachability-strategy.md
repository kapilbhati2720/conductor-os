# Reachability Strategy — One-Handed Ergonomics

## Thumb Zone Mapping (Right-Handed Hold)

```
┌─────────────────────────────┐
│  🔴 HARD       🔴 HARD      │  ← Top corners: NO critical actions
│                              │
│  🟡 STRETCH    🟡 STRETCH    │  ← Status info only (route, time)
│                              │
│─────────────────────────────│
│                              │
│  🟢 NATURAL    🟢 NATURAL    │  ← Destination grid here
│                              │
│  🟢 NATURAL    🟢 NATURAL    │  ← Passenger count here
│                              │
│  🟢🟢🟢 PRIME ZONE 🟢🟢🟢    │  ← ISSUE TICKET button here
│                              │
│  🟢 UNDO       🟢 REPEAT    │  ← Quick actions here
└─────────────────────────────┘
```

## Key Ergonomic Decisions

### 1. Bottom-Heavy Layout
- **Why**: The thumb naturally rests in the bottom-center of the phone
- **How**: All interactive elements are in the bottom 65% of the screen
- **Top 35%**: Read-only status information (route, current stop, time)

### 2. Center-Aligned Primary CTA
- **Why**: Works for both left-handed and right-handed users
- **How**: "ISSUE TICKET" button is full-width, centered, in the prime thumb zone
- **Height**: 64px tall — impossible to miss, even in a bouncy bus

### 3. Generous Spacing Between Tap Targets
- **Why**: Jerky bus = accidental taps. Standard 8px spacing is too tight.
- **How**: Minimum 12px gap between all interactive elements
- **Grid cards**: 16px gap between destination cards

### 4. Destination Grid (Not List)
- **Why**: Grid allows spatial memory — conductor learns "Majestic is top-left"
- **How**: 2×4 grid of 8 most common stops, each card ~80px tall
- **Fallback**: "All Stops" button opens full scrollable list with search

### 5. Swipe Gestures for Secondary Actions
- **Why**: Swipe is natural one-handed, doesn't require precise aiming
- **How**: 
  - Swipe right on last ticket → Undo
  - Swipe left → Quick repeat
  - Swipe down from top → Shift dashboard

### 6. Haptic Feedback Pattern
- **Why**: In a noisy bus, audio confirmation is unreliable. Visual alone requires looking.
- **How**:
  - Short vibration (50ms) → Tap acknowledged
  - Double vibration (50ms + 50ms) → Ticket issued successfully
  - Long vibration (200ms) → Error/warning

### 7. Accidental Press Prevention
- **Why**: The bus jolts. Phantom touches happen.
- **How**:
  - "Issue Ticket" requires deliberate tap (not just touch)
  - 300ms debounce on all buttons
  - Cancel/undo is always 1 tap away (no "are you sure?" modals during core flow)

---

## Phone Hold Analysis

### Scenario: Conductor in a Moving Bus
```
         ┌──────────┐
         │          │
         │  PHONE   │
    ┌────│          │
    │    │          │    Right hand holds phone
    │    │          │    Thumb reaches bottom 65%
    │    │          │    
    │    └──────────┘
    │   /
    └──/  ← Cash, change, ticket rolls in LEFT hand
      /
```

### Design Implication
- Phone is held in the **dominant hand** (right for most)
- Left hand holds cash, gives change, tears tickets
- Phone must be operable with **thumb only** — no two-finger interactions
- No pinch-to-zoom, no two-finger swipes, no long-press (requires stability)

---

## Screen Zones (Mapped to Functions)

| Zone | Position | Content | Interaction |
|------|----------|---------|-------------|
| **Status Bar** | Top 10% | Route, direction, time, battery | Read-only |
| **Context Strip** | 10-20% | Current stop (GPS), next stop | Read-only |
| **Destination Grid** | 20-60% | 8 popular stops with fares | Tap to select |
| **Ticket Config** | 60-75% | Passenger count, payment mode | Tap to adjust |
| **Action Zone** | 75-90% | ISSUE TICKET button | Tap to confirm |
| **Quick Actions** | 90-100% | Undo, Repeat | Tap for quick access |
