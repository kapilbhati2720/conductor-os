/* ============================================
   ConductorOS — Application Logic (v2)
   Redesigned with User Obsession
   ============================================ */

// ==========================================
// ROUTE DATA (Simulated: Route 335E)
// ==========================================
const ROUTE_DATA = {
    routeId: '335E',
    direction: 'Kempegowda Bus Station',
    currentStageIndex: 3, // 0-indexed, Stage 4
    stops: [
        { name: 'BTM Layout',          stage: 1, fare: 0  },
        { name: 'Silk Institute',       stage: 2, fare: 5  },
        { name: 'Bommanahalli',         stage: 3, fare: 10 },
        { name: 'Silk Board Jn.',       stage: 4, fare: 0  }, // CURRENT — fare is relative
        { name: 'HSR Layout',           stage: 5, fare: 5  },
        { name: 'Koramangala',          stage: 5, fare: 10 },
        { name: 'Madiwala',             stage: 6, fare: 10 },
        { name: 'BTM 2nd Stage',        stage: 6, fare: 15 },
        { name: 'Jayanagar',            stage: 7, fare: 15 },
        { name: 'Lalbagh Gate',         stage: 8, fare: 20 },
        { name: 'K.R. Market',          stage: 9, fare: 25 },
        { name: 'Majestic',             stage: 10, fare: 25 },
        { name: 'Kempegowda BS',        stage: 11, fare: 30 },
    ]
};

// Popular destinations — TOP 4 are most frequent (shown larger)
const POPULAR_DESTINATIONS = [
    { name: 'Majestic',        fare: 25, stages: 6, popular: true  },
    { name: 'Koramangala',     fare: 10, stages: 2, popular: true  },
    { name: 'Jayanagar',       fare: 15, stages: 3, popular: true  },
    { name: 'K.R. Market',     fare: 25, stages: 5, popular: true  },
    { name: 'Madiwala',        fare: 10, stages: 2, popular: false },
    { name: 'Lalbagh Gate',    fare: 20, stages: 4, popular: false },
    { name: 'Kempegowda BS',   fare: 30, stages: 7, popular: false },
    { name: 'BTM 2nd Stage',   fare: 15, stages: 3, popular: false },
];

// ==========================================
// STATE
// ==========================================
let state = {
    selectedDestination: null,
    passengerCount: 1,
    paymentMode: 'cash',
    lastTicket: null,
    totalTickets: 0,
    tapCount: 0,
    flowStartTime: null,
    timerRunning: false,
    timerInterval: null,
    showTimer: false,
    autoResetTimeout: null, // Track timeout to prevent race condition
    isUndoWindow: false,    // Are we in the post-ticket undo window?
};

// ==========================================
// DOM REFERENCES
// ==========================================
const $ = id => document.getElementById(id);

const screens = {
    destination: $('screenDestination'),
    ticketConfig: $('screenTicketConfig'),
    allStops: $('screenAllStops'),
    success: $('screenSuccess'),
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 1000);
    renderDestinationGrid();
    renderAllStops();
    bindEvents();
});

// ==========================================
// CLOCK
// ==========================================
function updateClock() {
    const now = new Date();
    $('currentTime').textContent = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

// ==========================================
// RENDER — Destination Grid (Pareto-optimized)
// ==========================================
function renderDestinationGrid() {
    const grid = $('destinationGrid');
    const topDests = POPULAR_DESTINATIONS.filter(d => d.popular);
    const otherDests = POPULAR_DESTINATIONS.filter(d => !d.popular);
    
    // Top 4 — larger cards
    let html = '<div class="dest-grid-top">';
    html += topDests.map((dest, i) => `
        <button class="dest-card dest-card-top" data-index="${i}" aria-label="${dest.name}, fare ${dest.fare} rupees">
            <span class="dest-card-name">${dest.name}</span>
            <span class="dest-card-fare">₹${dest.fare}</span>
            <span class="dest-card-stages">${dest.stages} stages</span>
        </button>
    `).join('');
    html += '</div>';
    
    // Bottom 4 — smaller, compact row
    html += '<div class="dest-grid-bottom">';
    html += otherDests.map((dest, i) => `
        <button class="dest-card dest-card-sm" data-index="${i + topDests.length}" aria-label="${dest.name}, fare ${dest.fare} rupees">
            <span class="dest-card-name">${dest.name}</span>
            <span class="dest-card-fare">₹${dest.fare}</span>
        </button>
    `).join('');
    html += '</div>';
    
    grid.innerHTML = html;
}

function renderAllStops() {
    const list = $('stopsList');
    const currentIdx = ROUTE_DATA.currentStageIndex;
    
    list.innerHTML = ROUTE_DATA.stops.map((stop, i) => {
        let className = 'stop-item';
        if (i < currentIdx) className += ' past';
        if (i === currentIdx) className += ' current';
        
        const fareText = i <= currentIdx ? '—' : `₹${stop.fare}`;
        
        return `
            <div class="${className}" data-stop-index="${i}" ${i <= currentIdx ? '' : `role="button" tabindex="0"`}>
                <span>${stop.name}</span>
                <span class="stop-fare">${fareText}</span>
            </div>
        `;
    }).join('');
}

// ==========================================
// SCREEN NAVIGATION
// ==========================================
function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
    
    // Update action button based on screen
    if (screenName === 'destination') {
        if (state.isUndoWindow) {
            // Show prominent undo in the action zone
            showUndoMode();
        } else {
            updateIssueButton(false, 'Select Destination');
        }
    } else if (screenName === 'ticketConfig') {
        updateTicketConfig();
    } else if (screenName === 'success') {
        updateIssueButton(false, 'Ticket Issued ✓');
    } else if (screenName === 'allStops') {
        updateIssueButton(false, 'Select a Stop');
    }
}

// ==========================================
// DESTINATION SELECTION
// ==========================================
function selectDestination(dest) {
    // Cancel any pending auto-reset
    clearAutoReset();
    state.isUndoWindow = false;
    
    state.selectedDestination = dest;
    state.passengerCount = 1;
    
    // Start flow timer on first meaningful interaction
    if (!state.flowStartTime) {
        startFlowTimer();
    }
    
    countTap();
    showScreen('ticketConfig');
    triggerHaptic('tap');
}

function selectFromAllStops(stopIndex) {
    const stop = ROUTE_DATA.stops[stopIndex];
    if (stopIndex <= ROUTE_DATA.currentStageIndex) return; // Can't go backward
    
    const dest = {
        name: stop.name,
        fare: stop.fare,
        stages: stop.stage - ROUTE_DATA.stops[ROUTE_DATA.currentStageIndex].stage
    };
    
    selectDestination(dest);
}

// ==========================================
// TICKET CONFIGURATION
// ==========================================
function updateTicketConfig() {
    const dest = state.selectedDestination;
    if (!dest) return;
    
    $('destName').textContent = dest.name;
    $('destStages').textContent = `${dest.stages} stage${dest.stages !== 1 ? 's' : ''}`;
    $('destFare').textContent = `₹${dest.fare}`;
    
    // Update passenger buttons
    document.querySelectorAll('.pax-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.count) === state.passengerCount);
    });
    
    // Update payment buttons
    document.querySelectorAll('.pay-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === state.paymentMode);
    });
    
    // Update fare summary
    const total = dest.fare * state.passengerCount;
    $('fareCalc').textContent = `₹${dest.fare} × ${state.passengerCount}`;
    $('fareTotal').textContent = `₹${total}`;
    
    // Enable issue button
    updateIssueButton(true, `Issue Ticket — ₹${total}`);
}

function setPassengerCount(count) {
    state.passengerCount = count;
    countTap();
    
    if (!state.flowStartTime) {
        startFlowTimer();
    }
    
    updateTicketConfig();
    triggerHaptic('tap');
}

function setPaymentMode(mode) {
    state.paymentMode = mode;
    countTap();
    updateTicketConfig();
    triggerHaptic('tap');
}

// ==========================================
// ISSUE TICKET
// ==========================================
function issueTicket() {
    if (!state.selectedDestination) return;
    
    countTap();
    const dest = state.selectedDestination;
    const total = dest.fare * state.passengerCount;
    const elapsed = stopFlowTimer();
    
    // Save last ticket for repeat
    state.lastTicket = {
        destination: { ...dest },
        passengerCount: state.passengerCount,
        paymentMode: state.paymentMode,
        ticketCount: state.passengerCount, // for undo accounting
    };
    
    state.totalTickets += state.passengerCount;
    
    // Show success
    const payLabel = state.paymentMode.charAt(0).toUpperCase() + state.paymentMode.slice(1);
    $('successDetail').textContent = `${state.passengerCount} × ${dest.name} — ₹${total} ${payLabel}`;
    $('successTime').textContent = elapsed ? `Completed in ${elapsed}s` : '';
    
    showScreen('success');
    triggerHaptic('success');
    
    // Update stats
    updateStats(elapsed);
    
    // Enable undo & repeat
    $('undoBtn').disabled = false;
    $('repeatBtn').disabled = false;
    
    // Enter undo window — auto-return to destination with prominent undo
    state.isUndoWindow = true;
    clearAutoReset(); // Clear any previous timeout
    state.autoResetTimeout = setTimeout(() => {
        state.autoResetTimeout = null;
        resetToDestination(true); // true = keep undo window active
    }, 2000);
}

// ==========================================
// UNDO & REPEAT (with race condition fix)
// ==========================================
function undoLastTicket() {
    if (!state.lastTicket) return;
    
    // Cancel any pending auto-reset
    clearAutoReset();
    
    state.totalTickets -= state.lastTicket.ticketCount;
    if (state.totalTickets < 0) state.totalTickets = 0;
    $('statTickets').textContent = state.totalTickets;
    
    showToast('↩ Ticket cancelled');
    triggerHaptic('error');
    
    state.lastTicket = null;
    state.isUndoWindow = false;
    $('undoBtn').disabled = true;
    
    resetToDestination(false);
}

function repeatLastTicket() {
    if (!state.lastTicket) return;
    
    // Cancel any pending auto-reset
    clearAutoReset();
    state.isUndoWindow = false;
    
    state.selectedDestination = { ...state.lastTicket.destination };
    state.passengerCount = state.lastTicket.passengerCount;
    state.paymentMode = state.lastTicket.paymentMode;
    
    startFlowTimer();
    countTap();
    showScreen('ticketConfig');
    triggerHaptic('tap');
    
    showToast('📋 Loaded — tap Issue to confirm');
}

function clearAutoReset() {
    if (state.autoResetTimeout) {
        clearTimeout(state.autoResetTimeout);
        state.autoResetTimeout = null;
    }
}

// ==========================================
// UI HELPERS
// ==========================================
function resetToDestination(keepUndoWindow = false) {
    state.selectedDestination = null;
    state.passengerCount = 1;
    state.flowStartTime = null;
    state.tapCount = 0;
    
    if (!keepUndoWindow) {
        state.isUndoWindow = false;
    }
    
    showScreen('destination');
    
    // If in undo window, show undo-mode action zone then auto-dismiss after 5s
    if (keepUndoWindow && state.isUndoWindow) {
        showUndoMode();
        // Dismiss undo mode after 5s
        clearAutoReset();
        state.autoResetTimeout = setTimeout(() => {
            state.isUndoWindow = false;
            state.autoResetTimeout = null;
            updateIssueButton(false, 'Select Destination');
        }, 5000);
    }
}

function showUndoMode() {
    // Transform the issue button into a prominent undo button
    const btn = $('issueBtn');
    btn.disabled = false;
    btn.classList.add('undo-mode');
    $('issueText').textContent = '↩  Undo Last Ticket';
    
    // Temporarily rebind to undo
    btn.onclick = () => {
        btn.classList.remove('undo-mode');
        btn.onclick = issueTicket; // restore original handler
        undoLastTicket();
    };
}

function updateIssueButton(enabled, text) {
    const btn = $('issueBtn');
    btn.disabled = !enabled;
    btn.classList.remove('undo-mode');
    $('issueText').textContent = text;
    btn.onclick = issueTicket; // ensure correct handler
}

function showToast(message) {
    const toast = $('toast');
    $('toastText').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ==========================================
// BACK NAVIGATION from Ticket Config
// ==========================================
function goBackFromConfig() {
    clearAutoReset();
    state.isUndoWindow = false;
    state.selectedDestination = null;
    state.passengerCount = 1;
    stopFlowTimer();
    showScreen('destination');
    triggerHaptic('tap');
}

// ==========================================
// FLOW TIMER
// ==========================================
function startFlowTimer() {
    state.flowStartTime = performance.now();
    state.tapCount = 0;
    
    if (state.showTimer) {
        $('timerOverlay').classList.add('active');
        state.timerInterval = setInterval(() => {
            const elapsed = ((performance.now() - state.flowStartTime) / 1000).toFixed(1);
            $('timerValue').textContent = `${elapsed}s`;
        }, 100);
    }
}

function stopFlowTimer() {
    if (!state.flowStartTime) return null;
    
    const elapsed = ((performance.now() - state.flowStartTime) / 1000).toFixed(1);
    
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    
    $('timerOverlay').classList.remove('active');
    state.flowStartTime = null;
    
    return elapsed;
}

function countTap() {
    state.tapCount++;
    $('statTaps').textContent = state.tapCount;
}

function updateStats(elapsed) {
    if (elapsed) {
        $('statTime').textContent = `${elapsed}s`;
    }
    $('statTickets').textContent = state.totalTickets;
}

// ==========================================
// HAPTIC FEEDBACK (vibration API)
// ==========================================
function triggerHaptic(type) {
    if (!navigator.vibrate) return;
    
    switch (type) {
        case 'tap':
            navigator.vibrate(30);
            break;
        case 'success':
            navigator.vibrate([30, 50, 30]);
            break;
        case 'error':
            navigator.vibrate(150);
            break;
    }
}

// ==========================================
// SEARCH / FILTER STOPS
// ==========================================
function filterStops(query) {
    const items = document.querySelectorAll('.stop-item');
    const q = query.toLowerCase().trim();
    
    items.forEach(item => {
        const name = item.querySelector('span').textContent.toLowerCase();
        if (!q || name.includes(q)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// ==========================================
// AUTO-DEMO (Autoplay the 3-passenger flow)
// ==========================================
async function runAutoDemo() {
    clearAutoReset();
    state.isUndoWindow = false;
    resetToDestination(false);
    await sleep(500);
    
    // Step 1: Tap "Majestic" 
    const majesticCard = document.querySelector('.dest-card[data-index="0"]');
    flashElement(majesticCard);
    await sleep(600);
    selectDestination(POPULAR_DESTINATIONS[0]);
    await sleep(800);
    
    // Step 2: Tap "3" passengers
    const pax3Btn = document.querySelector('.pax-btn[data-count="3"]');
    flashElement(pax3Btn);
    await sleep(400);
    setPassengerCount(3);
    await sleep(600);
    
    // Step 3: Tap "Issue Ticket"
    const issueBtn = $('issueBtn');
    flashElement(issueBtn);
    await sleep(400);
    issueTicket();
}

function flashElement(el) {
    el.style.transition = 'box-shadow 0.15s';
    el.style.boxShadow = '0 0 0 3px rgba(255,215,64,0.8)';
    setTimeout(() => {
        el.style.boxShadow = '';
    }, 400);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==========================================
// PAYMENT TOGGLE
// ==========================================
function togglePaymentOptions() {
    const container = $('paymentExpandable');
    container.classList.toggle('expanded');
}

// ==========================================
// EVENT BINDINGS
// ==========================================
function bindEvents() {
    // Destination grid clicks
    $('destinationGrid').addEventListener('click', (e) => {
        const card = e.target.closest('.dest-card');
        if (!card) return;
        const index = parseInt(card.dataset.index);
        selectDestination(POPULAR_DESTINATIONS[index]);
    });
    
    // Passenger count
    document.querySelectorAll('.pax-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setPassengerCount(parseInt(btn.dataset.count));
        });
    });
    
    // Payment mode
    document.querySelectorAll('.pay-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setPaymentMode(btn.dataset.mode);
        });
    });
    
    // Issue ticket
    $('issueBtn').addEventListener('click', issueTicket);
    
    // Undo
    $('undoBtn').addEventListener('click', undoLastTicket);
    
    // Repeat
    $('repeatBtn').addEventListener('click', repeatLastTicket);
    
    // All stops
    $('allStopsBtn').addEventListener('click', () => {
        countTap();
        showScreen('allStops');
        $('stopSearch').focus();
    });
    
    // Back from all stops
    $('backFromStops').addEventListener('click', () => {
        showScreen('destination');
    });
    
    // Back from ticket config
    $('backFromConfig').addEventListener('click', goBackFromConfig);
    
    // Payment toggle
    $('paymentToggle').addEventListener('click', togglePaymentOptions);
    
    // Stop search
    $('stopSearch').addEventListener('input', (e) => {
        filterStops(e.target.value);
    });
    
    // Stop item clicks
    $('stopsList').addEventListener('click', (e) => {
        const item = e.target.closest('.stop-item:not(.past):not(.current)');
        if (!item) return;
        const index = parseInt(item.dataset.stopIndex);
        selectFromAllStops(index);
    });
    
    // Demo controls
    $('demoTimerToggle').addEventListener('click', () => {
        state.showTimer = !state.showTimer;
        $('demoTimerToggle').textContent = state.showTimer ? '⏱️ Hide Flow Timer' : '⏱️ Show Flow Timer';
        if (!state.showTimer) {
            $('timerOverlay').classList.remove('active');
        }
    });
    
    $('demoReset').addEventListener('click', () => {
        clearAutoReset();
        state.isUndoWindow = false;
        state.totalTickets = 0;
        state.lastTicket = null;
        $('undoBtn').disabled = true;
        $('repeatBtn').disabled = true;
        $('statTaps').textContent = '0';
        $('statTime').textContent = '0.0s';
        $('statTickets').textContent = '0';
        resetToDestination(false);
        showToast('🔄 Reset complete');
    });
    
    $('demoAutoplay').addEventListener('click', runAutoDemo);
}
