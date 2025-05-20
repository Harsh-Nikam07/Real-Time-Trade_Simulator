# GoQuant Trade Simulator — Frontend

This is the frontend implementation of a real-time cryptocurrency trade simulator built as part of the GoQuant recruitment assignment. The user interface is designed to display live trading metrics such as slippage, fee, market impact, and latency using a clear dashboard layout, while providing visual inputs on the left panel.

This frontend connects to a FastAPI backend that simulates market orders in real-time using live L2 order book data from OKX.

---

## 📸 Live Preview

- Real-time metrics update every second
- Includes mid price, average execution price, slippage %, fee, predicted slippage, market impact, latency, etc.
- Responsive and styled using Tailwind CSS

---

## 🛠️ Tech Stack

- React (via Vite)
- Tailwind CSS
- Recharts (for visual data)
- Context API + useReducer (for state management)
- Lucide React Icons (for UI icons)

---

## 📁 Project Structure

```
src/
├── App.jsx
├── index.css
├── main.jsx
├── context/
│   └── TickContext.jsx         # Global tick data state
├── components/
│   ├── LeftPanel.jsx           # Static input UI
│   ├── RightPanel.jsx          # Output metric display
│   ├── MetricCard.jsx          # Reusable metric tiles
│   ├── Chart.jsx               # Recharts line chart
│   └── StatusIndicator.jsx     # Live status banner
└── pages/
    └── Dashboard.jsx           # Main UI layout
```

---

## ✅ Features Implemented

### ✔️ Assignment-Compliant UI Layout

- Left Panel (Input Parameters):
  - Exchange selector (OKX)
  - Spot Asset (BTC-USDT)
  - Order Type (Market)
  - Quantity (~100 USD)
  - Fee Tier (Tier 1)

- Right Panel (Processed Output):
  - Mid Price
  - Average Price
  - BTC Executed
  - Slippage
  - Predicted Slippage
  - Market Impact
  - Fee
  - Latency
  - Real-time update every 1 second

---

### ✔️ Real-Time Dashboard

- Fetches /latest-tick from backend API (FastAPI)
- Context API + Reducer for clean state management
- Includes live trend detection between ticks
- Color-coded status (Live / Loading / Error)

---

### ✔️ Chart Integration

- Recharts line chart for:
  - Mid Price
  - Average Price
  - Slippage
  - BTC Executed
- Stores and displays last 50 ticks

---

### ✔️ UX Enhancements

- Responsive (desktop → mobile)
- Fully styled with Tailwind
- Supports dark mode
- Icons from Lucide React
- Smooth animations and transitions

---

## 🥪 How to Run Locally

1. Clone the repository

```bash
git clone https://github.com/Harsh-Nikam07/Real-Time-Trade_Simulator/edit/master/goQuant-ui
cd goquant-trade-frontend
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser at

```
http://localhost:5173
```

---

## 📡 API Requirement

Ensure the backend (Python + FastAPI) is running and exposing:

- GET http://localhost:8000/latest-tick — serves live tick data
- (optional) POST /update-tick — used by backend WebSocket push

---

## 🧐 Design Notes

- Inputs in the left panel are static per assignment scope
- Simulation parameters are fixed at 100 USD / Tier 1 Fee / BTC-USDT
- Can be extended with dynamic input → backend binding (bonus)

---

## 📄 Assignment Compliance

- UI structure and data points follow assignment spec exactly
- Bonus: Includes charting and trend calculation
- Modular, readable codebase with reusable components
- No public deployment (as per confidentiality instructions)

---
