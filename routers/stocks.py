from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter()

class Stock:
    def __init__(self, symbol: str, name: str, price: float, change: float):
        self.symbol = symbol
        self.name = name
        self.price = price
        self.change = change

stocks = [
    Stock("AAPL", "Apple Inc.", 150.25, 1.25),
    Stock("GOOG", "Alphabet Inc.", 2500.50, -0.50),
    Stock("MSFT", "Microsoft Corporation", 300.75, 2.75),
    Stock("AMZN", "Amazon.com, Inc.", 3500.00, -5.00),
    Stock("FB", "Facebook, Inc.", 350.25, 0.25),
    Stock("TSLA", "Tesla, Inc.", 750.50, 5.50),
    Stock("NVDA", "NVIDIA Corporation", 200.75, -1.75),
    Stock("JPM", "JPMorgan Chase & Co.", 150.00, 0.00),
    Stock("BAC", "Bank of America Corporation", 40.25, 0.25),
    Stock("WMT", "Walmart Inc.", 150.50, -0.50)
]

@router.get("/{symbol}", response_model=Stock, description="Returns a stock with the given symbol.")
def read_stock_by_symbol(symbol: str):
    """Get a stock by symbol.

    This endpoint returns a stock based on the given symbol.

    Args:
        symbol (str): The symbol of the stock.

    Returns:
        Stock: The stock with the given symbol.

    Raises:
        HTTPException: If the stock is not found.

    """
    stock = next((stock for stock in stocks if stock.symbol == symbol), None)
    if stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    return stock

@router.get("/", response_model=List[Stock], description="Returns a list of all stocks.")
def read_all_stocks():
    """Get all stocks.

    This endpoint returns a list of all stocks.

    Returns:
        List[Stock]: A list of all stocks.

    """
    return stocks
