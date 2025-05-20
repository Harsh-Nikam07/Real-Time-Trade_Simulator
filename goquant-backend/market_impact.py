# File: market_impact.py

def compute_almgren_chriss_impact(quantity: float, eta: float = 0.1, epsilon: float = 0.01) -> float:
    """
    Compute simplified Almgren-Chriss market impact.

    :param quantity: Base asset quantity traded
    :param eta: Permanent impact coefficient (default: 0.1)
    :param epsilon: Temporary impact coefficient (default: 0.01)
    :return: Estimated market impact in USD
    """
    return eta * quantity**2 + epsilon * quantity
