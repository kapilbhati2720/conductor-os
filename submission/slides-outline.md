# Submission Slides Outline — Google Slides Deck

## Slide Deck Title
**ConductorOS — Reimagining Bus Ticketing**  
Product Design Internship Assignment | Brief 1 | [Your Name]

---

## Slide-by-Slide Structure

### Slide 1: Title Slide
- "ConductorOS — Reimagining Bus Ticketing for India's Conductors"
- Your name, date
- Nielsen Product Design Internship — Brief 1
- *Minimal, clean, strong typography*

### Slide 2: The Problem
- Image: Old thermal ETM machine
- "Worn buttons. Unreadable screens. 8-hour shifts. A jerky bus. One free hand."
- The brief's core challenge statement
- *Emotional, empathetic framing*

### Slide 3: The Conductor's World
- Visual: Day-in-the-life storyboard (4 panels)
  - 4:30 AM — arrives at depot
  - Rush hour — packed bus, one hand full of cash
  - ETM fails — blank ticket, frustrated passenger
  - End of shift — manual cash reconciliation
- *Show deep understanding of the user*

### Slide 4: User Research Insights
- Key findings from research (3-4 bullet points):
  - Conductors issue hundreds of tickets per shift
  - Most passengers go to 6-8 common destinations per route
  - Cash is still 80%+ of transactions
  - "Every extra second cascades into delays for the whole bus"
- *Data-driven empathy*

### Slide 5: Design Principles
- 6 principles with icons:
  1. 🎯 Thumb-First, Always
  2. ⚡ Sub-Second Taps
  3. 👁️ Glance-and-Go
  4. 🛡️ Forgiveness by Default
  5. 📊 Signal Over Noise
  6. 💪 Muscle Memory Friendly
- *One line explanation for each*

### Slide 6: Reachability Strategy
- Thumb zone heat map on phone silhouette
- Zone labels: Status (read-only) → Destinations → Config → Action
- "All actions in the bottom 65% — designed for the thumb of a single hand"
- *Visual diagram — this is what Nielsen means by "navigation/reachability strategy"*

### Slide 7: Information Architecture
- Tiered pyramid:
  - Tier 1 (Always visible): Current stop, route, destinations
  - Tier 2 (One tap): Passenger count, payment, last ticket
  - Tier 3 (Accessible): Fare breakdown, trip summary
  - Tier 4 (Hidden): Reports, settings, help
- *"Signal over noise for split-second decisions"*

### Slide 8: The Core Flow
- Step-by-step visual flow (3 frames):
  1. TAP destination card (0.5s)
  2. TAP passenger count (1.0s)
  3. TAP Issue Ticket (1.5s)
- "3 passengers, 1 destination, ~3.5 seconds. 3 taps."
- *This is the money slide — shows you hit the < 4 second constraint*

### Slide 9-11: UI Screens (High-Fidelity)
- Slide 9: Main Screen — Destination grid with route context
- Slide 10: Ticket Config — Passenger count, payment, fare summary
- Slide 11: Success State — Confirmation + auto-reset
- *Screenshots from the prototype, annotated with design rationale*

### Slide 12: Design Details
- Close-up annotations:
  - Touch target sizes (56px min)
  - Color contrast ratios
  - Typography scale
  - Spacing rhythm
- *Shows attention to detail*

### Slide 13: Edge Cases
- Grid of 4 edge cases handled:
  - Wrong destination → Undo (1 tap, no modal)
  - Same destination again → Repeat (1 tap pre-loaded)
  - Offline mode → Full functionality, sync later
  - Low battery → Warning bar, non-essential UI dimmed
- *This is the "polish" they're looking for*

### Slide 14: Interactive Prototype
- QR code / link to the deployed HTML prototype
- "Try the 3-passenger flow yourself"
- Screenshot of the demo controls + timer
- *The differentiator — most candidates won't have this*

### Slide 15: Reflection & Next Steps
- What I'd do with more time:
  - User testing with actual BMTC conductors
  - Accessibility audit (WCAG AA)
  - Multi-language support (Kannada, Hindi, etc.)
  - Integration with existing BMTC backend systems
  - Shift management dashboard
- *Shows maturity and awareness of real-world constraints*

### Slide 16: Thank You
- "Thank you for your time"
- Contact info
- Prototype link repeated
- *Clean close*

---

## Visual Guidelines for Slides
- **Background**: Dark (#0A0A1A) — matches the prototype
- **Typography**: Inter (Google Fonts) — matches the prototype
- **Accent Colors**: Green (#00E676), Blue (#448AFF)
- **Max text per slide**: 30-40 words
- **Every slide has a visual** — no text-only slides
- **Consistent layout**: Title top-left, visual center/right
