# File: models.py

import numpy as np
from sklearn.linear_model import LinearRegression

class SlippageModel:
    def __init__(self):
        self.X = []
        self.y = []
        self.model = LinearRegression()

    def add_data(self, total_qty: float, slippage: float):
        """
        Add a new (total_qty, slippage) data point and re-train the model.
        """
        self.X.append([total_qty])
        self.y.append(slippage)
        if len(self.X) > 1:  # Train only when we have at least 2 points
            self.model.fit(self.X, self.y)

    def predict(self, total_qty: float) -> float:
        """
        Predict slippage for a given total base quantity.
        """
        if len(self.X) <= 1:
            return 0.0  # Not enough data
        return self.model.predict([[total_qty]])[0]
