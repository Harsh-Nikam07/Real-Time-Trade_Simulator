# GoQuant Trade Simulator — Full Stack Project

This repository contains a full-stack real-time cryptocurrency trade simulator developed as part of the GoQuant recruitment assignment.

The application connects to OKX's L2 order book WebSocket, simulates $100 market buy orders, and provides live trading metrics via a backend service (FastAPI) and a responsive frontend dashboard (React + Vite).

---

## 🚀 Live Features

- Real-time WebSocket connection to OKX
- Simulation of $100 market buy order
- Metrics:
  - Average execution price
  - Slippage (actual vs mid price)
  - Exchange fee
  - Market impact (Almgren-Chriss model)
  - Predicted slippage (linear regression)
  - Internal latency per tick
- REST API for live tick
- React frontend dashboard with cards and charts
- Context + useReducer architecture

---

## 🔌 How to Run the Project

### Backend Setup (FastAPI)

1. Navigate to backend folder:
```bash
./
```
2. Create and activate a virtual environment:
```bash
python -m venv goquant-env
source goquant-env/bin/activate  # or goquant-env\Scripts\activate
```
3. Install dependencies:
```bash
pip install -r requirements.txt
```
4. Run the WebSocket simulator:
```bash
python main.py
```
5. Run FastAPI server in another terminal:
```bash
uvicorn api:app --reload --port 8000
```

Visit: http://localhost:8000/latest-tick

---

### Frontend Setup (React)

1. Navigate to frontend folder:
```bash
cd goquant-ui
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
4. Open your browser at:
```
http://localhost:5173
```

---

## 🧠 Design Decisions

- Inputs (Exchange, Order Type, Quantity) are visually rendered but not wired to simulation, per assignment scope
- Simulation parameters (100 USD, Tier 1 fee) are fixed in backend
- Backend stores the latest tick in memory and serves it to frontend
- Recharts used to visualize metrics like price, slippage, etc.

---

## 📄 Assignment Coverage

- ✅ L2 Order Book WebSocket connection
- ✅ Market order simulation (100 USD)
- ✅ Slippage, Fee, Market Impact, Latency
- ✅ Real-time dashboard UI (React)
- ✅ Left panel inputs displayed (static)
- ✅ Bonus: Live charting, trend detection

---

