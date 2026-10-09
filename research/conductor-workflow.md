# Conductor Workflow — Current State Research

## How Bus Conductors Work Today

### The Conductor's Daily Routine
- Shift starts as early as **4:00–4:30 AM**
- Reports to depot, collects: ticket roll/ETM device, cash float for change, Traffic Register (TR)
- Works **8-10 hour shifts** across multiple trips on assigned routes
- End of shift: balance accounts, submit cash, sign off documentation

### The Ticketing Flow (Current ETM Process)
```
Passenger boards → Tells destination → Conductor inputs on ETM
                                          ↓
                              ETM calculates fare (stage-based)
                                          ↓
                              Payment: Cash / UPI QR / Card
                                          ↓
                              Thermal printer issues ticket
                                          ↓
                              Data synced to central server (GPS/5G)
```

### Stage-Based Fare System
- Routes are divided into **stages** (fixed distance units, ~2 km in Bengaluru)
- Fare = function(number of stages traveled)
- Conductor selects **"from" stage** (auto-detected by GPS) and **"to" stage** (passenger's destination)
- Prices in multiples of base fare (e.g., ₹5) to simplify cash handling
- **Pass holders**: Daily/weekly/monthly passes bypass stage-based ticketing

### Current ETM Machines (Android-based Smart ETMs)
- Handheld POS device with built-in thermal printer
- GPS-enabled for automatic location/stage detection
- Generates **dynamic QR codes** for each UPI transaction
- Supports: Cash, UPI, NCMC (National Common Mobility Card), smart cards, digital passes
- Real-time data transmission to BMTC central server

### Peak Hour Reality
- **Morning rush**: 7:00 AM – 11:00 AM
- **Evening rush**: 3:00 PM – 7:00 PM
- Buses packed to capacity — conductor struggles to move through aisles
- Must issue tickets BEFORE bus crosses next stage boundary
- Free travel scheme passengers need document verification + zero-value tickets

### Physical Demands
- Standing/moving in a jerky, crowded bus for 8+ hours
- One hand holds cash/change, other operates device
- Exposed to noise pollution, air pollution, vibration
- Musculoskeletal issues (legs, back) are common
- High rates of stress, anxiety, depression documented in studies

## Key Insight for Our Design
> The conductor's cognitive and physical bandwidth is **extremely limited**. 
> Every extra tap, every moment of confusion, every glance at the screen 
> costs real-world seconds that cascade into delays for an entire bus of people.
> 
> Our design must feel like an **extension of muscle memory**, not a tool to be "figured out."
