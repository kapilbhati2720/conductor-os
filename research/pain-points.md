# Pain Points — Current ETM Machines

## Hardware Issues
| Problem | Impact | Frequency |
|---------|--------|-----------|
| **Worn buttons/keypads** | Missed inputs, repeated presses, wrong destinations | Very Common |
| **Unreadable screens** | Can't see fare/destination in sunlight or after wear | Very Common |
| **Printer failures** | Blank/illegible tickets, paper jams, print head issues | Common |
| **Battery drain** | Device dies mid-shift, forced to use manual paper tickets | Common |
| **System lag** | Slow response times, especially during peak hours | Common |

## Software/Process Issues
| Problem | Impact |
|---------|--------|
| **Sequential QR generation** | Creates bottleneck — each passenger needs individual QR code |
| **Network dependency** | UPI payments fail in poor connectivity areas |
| **GPS stage mismatch** | If payment delays, bus crosses stage boundary → wrong (higher) fare charged |
| **Complex menu navigation** | Too many taps to reach common actions |
| **No batch ticketing** | Can't issue tickets for multiple passengers going to same destination quickly |
| **Document verification** | Free-pass schemes require checking ID docs — huge time sink during rush |

## Environmental Issues
| Problem | Design Implication |
|---------|-------------------|
| **Jerky, swaying bus** | Large tap targets, accidental-press prevention |
| **Crowded aisles** | One-handed operation is mandatory, not optional |
| **High glare/sunlight** | High contrast, bold typography, no subtle colors |
| **Noise** | Visual confirmation needed (can't rely on audio feedback) |
| **Cash + device juggling** | Device must be operable with thumb of holding hand |
| **Time pressure** | Every interaction must be < 1 second per tap |

## Human Issues
| Problem | Design Implication |
|---------|-------------------|
| **Fatigue (8+ hour shifts)** | Minimize cognitive load, use muscle memory patterns |
| **Stress from passengers** | Clear, unambiguous UI prevents conductor-passenger disputes |
| **Varying tech literacy** | Interface must be intuitive without training |
| **Multilingual needs** | Icons > text where possible; support local language |

## The #1 Opportunity
> **Batch ticketing** — the ability to quickly issue tickets for multiple passengers 
> going to the same destination is the single biggest time-saving feature missing 
> from current ETMs. This is our key innovation to hit the "3 passengers in < 4 seconds" constraint.
