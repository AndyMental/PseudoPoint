from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Product(BaseModel):
    id: int
    title: str
    color: str
    description: str
    price: int

products_new = [
    Product(id=1, title="Shorts", color="black", description="It is a black cotton shorts", price=1000),
    Product(id=2, title="T-Shirt", color="white", description="A stylish white t-shirt", price=800),
    # Add more products...
]

@router.get("/", response_model=List[Product], description="Returns a list of products.", tags=["Products"])
def read_products():
    return products_new

@router.get("/{product_id}", response_model=Product, description="Get a product by ID.", tags=["Products"])
def get_product_by_id(product_id: int):
    product = next((p for p in products_new if p.id == product_id), None)
    if product is None:
        raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found")
    return product

@router.post("/new_item", response_model=Product, description="Creates a new product.", tags=["Products"])
def create_product(product: Product):
    
    new_id = max(product.id for product in products_new )+1
    product.id = new_id
    products_new.append(product)

    return product

@router.put("/{product_id}", response_model=Product, description="Updates a product by ID.", tags=["Products"])
def update_product(product_id: int, product: Product):
    for index, existing_product in enumerate(products_new):
        if existing_product.id == product_id:
            product.id = product_id
            products_new[index] = product
            return product
    raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found")

@router.delete("/{product_id}", description="Deletes a product by ID.", tags=["Products"])
def delete_product(product_id: int):
    global products_new
    products_new = [p for p in products_new if p.id != product_id]
    return {"detail": "Product deleted"}


