from typing import List, Tuple

def simulate_market_order(asks: List[Tuple[float, float]], usd_quantity: float) -> Tuple[float, float, float]:
    """
    Simulate a market buy order by sweeping asks until USD quantity is filled.

    :param asks: List of (price, quantity) tuples sorted ascending by price.
    :param usd_quantity: USD amount to spend.
    :return: Tuple of (avg_execution_price, base_quantity_bought, total_cost)
    """
    remaining_usd = usd_quantity
    total_base_qty = 0.0
    total_cost = 0.0

    for price, qty in asks:
        level_cost = price * qty
        if level_cost <= remaining_usd:
            # Take full quantity at this level
            total_base_qty += qty
            total_cost += level_cost
            remaining_usd -= level_cost
        else:
            # Partial fill at this level
            partial_qty = remaining_usd / price
            total_base_qty += partial_qty
            total_cost += remaining_usd
            remaining_usd = 0.0
            break

    avg_execution_price = total_cost / total_base_qty if total_base_qty > 0 else 0.0
    return avg_execution_price, total_base_qty, total_cost

def calculate_slippage(avg_execution_price: float, mid_price: float) -> float:
    """
    Calculate slippage as percentage difference between avg execution price and mid price.

    :param avg_execution_price: Average execution price from simulation.
    :param mid_price: Mid price between best bid and ask.
    :return: Slippage in percentage.
    """
    if mid_price == 0:
        return 0.0
    slippage = (avg_execution_price - mid_price) / mid_price * 100
    return slippage

def calculate_fee(base_qty: float, avg_execution_price: float, fee_rate: float) -> float:
    """
    Calculate trading fee.

    :param base_qty: Quantity of base asset bought.
    :param avg_execution_price: Average price paid.
    :param fee_rate: Fee rate as decimal (e.g. 0.001 for 0.1%).
    :return: Fee amount in USD.
    """
    return base_qty * avg_execution_price * fee_rate

def compute_slippage_and_fee(
    asks: List[Tuple[float, float]],
    mid_price: float,
    usd_quantity: float,
    fee_rate: float
) -> Tuple[float, float, float]:
    """
    Helper function to compute avg execution price, slippage percentage, and fee.

    :param asks: Order book asks
    :param mid_price: Mid price between best bid and ask
    :param usd_quantity: USD amount to buy
    :param fee_rate: Fee rate decimal (e.g. 0.001)
    :return: Tuple(avg_execution_price, slippage_pct, fee)
    """
    avg_price, base_qty, _ = simulate_market_order(asks, usd_quantity)
    slippage = calculate_slippage(avg_price, mid_price)
    fee = calculate_fee(base_qty, avg_price, fee_rate)
    return avg_price, slippage, fee
