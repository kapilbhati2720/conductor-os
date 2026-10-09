# Edge Cases & Error States

## Ticket-Related Edge Cases

| Scenario | Design Response |
|----------|----------------|
| **Wrong destination selected** | "Undo Last" button always visible — cancels last ticket, refunds if digital payment |
| **Wrong passenger count** | Undo + re-issue (faster than edit-in-place) |
| **Passenger changes mind mid-ride** | "Extend Ticket" option in ticket history — charges difference |
| **Pass holder boards** | Dedicated "Pass" button in payment mode — scans pass, issues zero-fare ticket |
| **Free-scheme passenger** | "Scheme" category — simplified verification, auto-logs for audit |
| **Child fare (half ticket)** | "½" toggle next to passenger count — applies 50% discount |
| **Senior citizen / student discount** | Category selector in payment → auto-applies applicable discount |
| **Passenger disputes fare** | Fare breakdown shown clearly: "Stage 4 → Stage 7 = 3 stages × ₹5 = ₹15" |
| **Multiple destinations in one group** | Each destination is a separate ticket (quick repeat speeds this up) |

## Technical/Device Edge Cases

| Scenario | Design Response |
|----------|----------------|
| **No network / offline mode** | App works fully offline — tickets stored locally, synced when back online |
| **GPS failure** | Manual stage selection falls back (dropdown of all stages) |
| **Low battery (< 15%)** | Warning bar + auto-dim non-essential UI, prioritize ticketing |
| **Battery dies mid-shift** | All data persisted to local storage continuously |
| **Printer paper runs out** | Digital ticket shown on screen + conductor's record still saved |
| **App crash / restart** | Auto-recovery: last state restored, no data loss |
| **Software update needed** | Never during shift — updates only at depot (overnight) |

## Environmental Edge Cases

| Scenario | Design Response |
|----------|----------------|
| **Extreme sunlight / glare** | Dark theme (default) + high contrast mode toggle |
| **Nighttime / low light** | Auto-dim with ambient sensor, maintain contrast |
| **Very crowded bus** | All actions doable without extending arm — bottom-screen focused |
| **Rain / wet hands** | Large touch targets, no precision gestures needed |
| **Bus at terminus (route change)** | Route change flow: confirm new route → stop grid refreshes |

## Shift Management Edge Cases

| Scenario | Design Response |
|----------|----------------|
| **Shift start** | Simple login (PIN or biometric), route auto-assigned from depot schedule |
| **Shift end** | "End Shift" → summary dashboard (total tickets, cash, digital, discrepancies) |
| **Conductor swap mid-route** | Quick switch: new conductor PINs in, previous session closes, new session starts |
| **Inspector check** | "Inspector Mode" — shows today's log, can verify any ticket by ID |
| **Cash mismatch at end of shift** | Summary highlights discrepancy: expected vs actual cash |

## Error State Visual Language

| State | Visual Treatment |
|-------|-----------------|
| **Success** | Green flash + checkmark icon + double haptic vibration |
| **Warning** | Amber banner at top + single haptic vibration |
| **Error** | Red banner + shake animation + long haptic vibration |
| **Loading** | Subtle pulse animation on action button (never blocks UI) |
| **Offline** | Small "offline" indicator in status bar — no blocking modals |
| **Undo available** | Toast notification at bottom: "Ticket cancelled. Undo?" (5s timeout) |
