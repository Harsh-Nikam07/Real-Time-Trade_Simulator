# File: logger.py

import csv
import os

LOG_FILE = "logs/ticks.csv"

def init_csv():
    """
    Initializes the CSV file and creates headers if it doesn't exist.
    Also ensures the logs/ directory is present.
    """
    if not os.path.exists("logs"):
        os.makedirs("logs")
    if not os.path.isfile(LOG_FILE):
        with open(LOG_FILE, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow([
                "timestamp", "order_value", "avg_price", "mid_price",
                "btc_executed", "slippage", "predicted_slippage",
                "fee", "market_impact", "latency_ms"
            ])

def log_tick(
    timestamp: str, order_value: float, avg_price: float, mid_price: float,
    total_qty: float, slippage: float, predicted: float,
    fee: float, market_impact: float, latency_ms: float
):
    """
    Appends a row of trade simulation data to the CSV log file.
    """
    with open(LOG_FILE, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            timestamp, order_value, avg_price, mid_price,
            total_qty, slippage, predicted,
            fee, market_impact, latency_ms
        ])
