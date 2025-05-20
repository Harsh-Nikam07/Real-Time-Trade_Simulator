# File: main.py (Trading Simulator)

import asyncio
import websockets
import json
import time
import sys
import os
import requests

from simulation import compute_slippage_and_fee
from models import SlippageModel
from market_impact import compute_almgren_chriss_impact
from logger import init_csv, log_tick

slippage_model = SlippageModel()

async def process_ticks():
    uri = "wss://ws.okx.com:8443/ws/v5/public"
    async with websockets.connect(uri) as ws:
        sub_msg = {
            "op": "subscribe",
            "args": [{"channel": "books", "instId": "BTC-USDT"}]
        }
        await ws.send(json.dumps(sub_msg))

        init_csv()

        while True:
            try:
                start_time = time.perf_counter()
                msg = await ws.recv()
                end_time = time.perf_counter()

                data = json.loads(msg)
                if "data" not in data:
                    continue
                orderbook = data["data"][0]

                bids = orderbook.get("bids", [])
                asks = orderbook.get("asks", [])

                if not bids or not asks:
                    continue

                bids_float = [(float(b[0]), float(b[1])) for b in bids if len(b) >= 2]
                asks_float = [(float(a[0]), float(a[1])) for a in asks if len(a) >= 2]

                if not bids_float or not asks_float:
                    continue

                mid_price = (bids_float[0][0] + asks_float[0][0]) / 2

                usd_quantity = 100.0
                fee_rate = 0.001
                avg_price, slippage, fee = compute_slippage_and_fee(
                    asks_float, mid_price, usd_quantity, fee_rate
                )

                total_qty = usd_quantity / avg_price if avg_price > 0 else 0.0

                market_impact = compute_almgren_chriss_impact(total_qty)

                slippage_model.add_data(total_qty, slippage)
                predicted = slippage_model.predict(total_qty)
                latency_ms = (end_time - start_time) * 1000

                tick_payload = {
                    "timestamp": orderbook.get("ts", "n/a"),
                    "order_value": usd_quantity,
                    "avg_price": avg_price,
                    "mid_price": mid_price,
                    "btc_executed": total_qty,
                    "slippage": slippage,
                    "predicted_slippage": predicted,
                    "fee": fee,
                    "market_impact": market_impact,
                    "latency_ms": latency_ms
                }

                try:
                    requests.post("http://localhost:8000/update-tick", json=tick_payload)
                except Exception as e:
                    print(f"Failed to send tick to API: {e}")

                log_tick(
                    timestamp=orderbook.get("ts", "n/a"),
                    order_value=usd_quantity,
                    avg_price=avg_price,
                    mid_price=mid_price,
                    total_qty=total_qty,
                    slippage=slippage,
                    predicted=predicted,
                    fee=fee,
                    market_impact=market_impact,
                    latency_ms=latency_ms
                )

                print("--- Tick Summary ---")
                print(f"Order Side: Buy")
                print(f"Order Value: ${usd_quantity}")
                print(f"Total BTC Executed: {total_qty:.6f}")
                print(f"Average Price: {avg_price:.2f}")
                print(f"Mid Price: {mid_price:.2f}")
                print(f"Slippage: {slippage:.4f}%")
                print(f"Predicted Slippage: {predicted:.4f}%")
                print(f"Fee: ${fee:.4f}")
                print(f"Market Impact: ${market_impact:.4f}")
                print(f"Latency: {latency_ms:.2f} ms")
                print("---------------------\n")

            except Exception as e:
                print(f"Error: {e}")
                continue

if __name__ == "__main__":
    try:
        asyncio.run(process_ticks())
    except KeyboardInterrupt:
        print("Exited cleanly.")
