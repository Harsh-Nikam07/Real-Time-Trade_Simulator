class OrderBook:
    def __init__(self):
        self.bids = []
        self.asks = []
        self.timestamp = None

    def update(self, data):
        self.timestamp = data.get("timestamp", None)
        self.bids = [(float(price), float(size)) for price, size in data["bids"]]
        self.asks = [(float(price), float(size)) for price, size in data["asks"]]

        self.print_summary()

    def print_summary(self):
        best_bid = self.bids[0] if self.bids else (0, 0)
        best_ask = self.asks[0] if self.asks else (0, 0)
        print(f"Top of Book - Bid: {best_bid[0]} ({best_bid[1]}), Ask: {best_ask[0]} ({best_ask[1]})")
