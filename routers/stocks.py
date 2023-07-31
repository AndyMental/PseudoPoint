from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel, validator
router = APIRouter()

class Stock(BaseModel):
    id: int = None
    symbol: str
    name: str
    price: float
    change: float

stocks = [
    Stock(id=1,symbol="AAPL", name="Apple Inc.", price =150.25, change =1.25),
    Stock(id=2,symbol="GOOG", name="Alphabet Inc.", price =2500.50, change =-0.50),
    Stock(id=3,symbol="MSFT",name="Microsoft Corporation",price = 300.75, change =2.75),
    Stock(id=4,symbol="AMZN",name="Amazon.com, Inc.", price =3500.00, change =-5.00),
    Stock(id=5,symbol="FB", name="Facebook, Inc.", price =350.25, change =0.25),
    Stock(id=6,symbol="TSLA",name="Tesla, Inc.", price =750.50,change = 5.50),
    Stock(id=7,symbol="NVDA",name="NVIDIA Corporation",price = 200.75, change =-1.75),
    Stock(id=8,symbol="JPM", name="JPMorgan Chase & Co.",price = 150.00, change =0.00),
    Stock(id=9,symbol="BAC", name="Bank of America Corporation", price =40.25,change = 0.25),
    Stock(id=10,symbol="NFLX", name="Netflix Inc.", price=560.75, change=3.75),
    Stock(id=11,symbol="DIS", name="The Walt Disney Company", price=170.50, change=-2.00),
    Stock(id=12,symbol="V", name="Visa Inc.", price=250.25, change=1.25),
    Stock(id=13,symbol="MA", name="Mastercard Incorporated", price=380.00, change=-0.50),
    Stock(id=14,symbol="PYPL", name="PayPal Holdings, Inc.", price=300.25, change=2.75),
    Stock(id=15,symbol="GOOGL", name="Alphabet Inc.", price=2950.50, change=-1.00),
    Stock(id=16,symbol="NFLX", name="Netflix Inc.", price=560.75, change=3.75),
    Stock(id=17,symbol="WMT",name="Walmart Inc.", price =150.50,change = -0.50)
    # Existing stock data (you can add more stocks if needed)
]

@router.get("/stocks", response_model=List[Stock])
async def get_stocks():
    return stocks

@router.get("/stocks/{stock_id}", response_model=Stock)
async def get_stock(stock_id: int):
    for stock in stocks:
        if stock.id == stock_id:
            return stock
    raise HTTPException(status_code=404, detail="Stock not found")

@router.post("/stocks", response_model=Stock)
async def add_stock(stock: Stock):
    new_id = max(stock.id for stock in stocks) + 1 if stocks else 1
    stock.id = new_id
    stocks.append(stock)
    return stock

@router.put("/stocks/{stock_id}", response_model=Stock)
async def update_stock(stock_id: int, updated_stock: Stock):
    for index, stock in enumerate(stocks):
        if stock.id == stock_id:
            stocks[index] = updated_stock
            return updated_stock
    raise HTTPException(status_code=404, detail="Stock not found")

@router.delete("/stocks/{stock_id}", response_model=Stock)
async def delete_stock(stock_id: int):
    for index, stock in enumerate(stocks):
        if stock.id == stock_id:
            deleted_stock = stocks.pop(index)
            return deleted_stock
    raise HTTPException(status_code=404, detail="Stock not found")
