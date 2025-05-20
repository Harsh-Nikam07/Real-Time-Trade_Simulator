# GoQuant Trade Simulator — Backend

This is the backend implementation of the GoQuant real-time cryptocurrency trade simulator built for the GoQuant recruitment assignment. It connects to OKX L2 order book data over WebSocket, simulates a $100 market order in real time, computes trading metrics, and exposes the results via a REST API.

---

## 📉 Features

- Connects to OKX WebSocket stream for BTC-USDT order book
- Simulates a market buy order worth ~$100 USD
- Calculates:
  - Average execution price
  - Slippage (actual vs mid price)
  - Exchange fee (Tier 1 taker fee)
  - Market impact (Almgren-Chriss model)
  - Predicted slippage (linear regression model)
  - Latency (ms per tick)
- Logs each tick to CSV
- Stores the latest tick in memory and serves it via FastAPI

---

## 🚀 Tech Stack

- Python 3.10+
- FastAPI
- Websockets
- Scikit-learn (for regression model)
- NumPy / Pandas (for calculation)

---

## 📁 Project Structure

```
goquant-api/
├── main.py                 # WebSocket client, simulation logic, tick update
├── api.py                  # FastAPI app for exposing endpoints
├── state.py                # In-memory shared state for tick data
├── simulation.py           # Market order simulation, fee and slippage
├── market_impact.py        # Almgren-Chriss market impact model
├── models.py               # Slippage prediction model (linear regression)
├── logger.py               # CSV logger for tick events
├── requirements.txt
```

---

## 🔌 Endpoints (FastAPI)

- GET /latest-tick
  - Returns the most recent simulation result

  Example:
  ```json
  {
    "timestamp": "2025-05-04T10:39:13Z",
    "order_value": 100,
    "avg_price": 102850.50,
    "mid_price": 102849.75,
    "btc_executed": 0.000972,
    "slippage": 0.00073,
    "predicted_slippage": 0.00121,
    "fee": 0.10,
    "market_impact": 0.0023,
    "latency_ms": 34.7
  }
  ```

---

## 📊 How to Run Backend Locally

1. Create a virtual environment:
```bash
python -m venv goquant-env
source goquant-env/bin/activate  # or goquant-env\Scripts\activate on Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the WebSocket simulator:
```bash
python main.py
```

4. In a separate terminal, run the FastAPI server:
```bash
uvicorn api:app --reload --port 8000
```

Then visit: http://localhost:8000/latest-tick

---

## 📖 Design & Models

- Fee = base_qty * price * 0.001 (0.1% OKX Tier 1 taker fee)
- Slippage = (avg_execution_price - mid_price) / mid_price * 100
- Predicted Slippage: Simple linear regression model trained on recent ticks
- Market Impact: Almgren-Chriss model approximation based on order size
- Latency: Time between tick received and fully processed (ms)

---

## ✉️ Submission Notes

- Backend integrates tightly with frontend via /latest-tick
- Built in modular Python structure with clear separation of concerns
- Designed for maintainability and real-time performance
- Inputs such as quantity and fee tier are currently fixed but can be parameterized

---
