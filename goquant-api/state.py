# File: state.py

latest_tick = {
    "timestamp": "",
    "order_value": 0,
    "avg_price": 0,
    "mid_price": 0,
    "btc_executed": 0,
    "slippage": 0,
    "predicted_slippage": 0,
    "fee": 0,
    "market_impact": 0,
    "latency_ms": 0
}

def update_tick(data: dict):
    global latest_tick
    latest_tick = data

def get_latest_tick():
    return latest_tick
