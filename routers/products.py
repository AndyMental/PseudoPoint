from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class ProductData(BaseModel):
    id: int
    name: str
    price: float
    description: str

products = [
    ProductData(id=1, name="Product 1", price=9.99, description="Description of Product 1"),
    ProductData(id=2, name="Product 2", price=19.99, description="Description of Product 2"),
    ProductData(id=3, name="Product 3", price=29.99, description="Description of Product 3"),
    ProductData(id=4, name="Product 4", price=39.99, description="Description of Product 4"),
    ProductData(id=5, name="Product 5", price=49.99, description="Description of Product 5"),
    ProductData(id=6, name="Product 6", price=59.99, description="Description of Product 6"),
    ProductData(id=7, name="Product 7", price=69.99, description="Description of Product 7"),
    ProductData(id=8, name="Product 8", price=79.99, description="Description of Product 8"),
    ProductData(id=9, name="Product 9", price=89.99, description="Description of Product 9"),
    ProductData(id=10, name="Product 10", price=99.99, description="Description of Product 10"),
    ProductData(id=114, name="Shampu", price=456, description="The product is good and it reduces hair fall."),
]


@router.get("/", response_model=List[ProductData], description="Returns a list of fake product records.")
def read_products():
    """Get a list of fake product records.

    Returns:
        List[ProductData]: A list of ProductData objects containing the fake product records.
    """
    return products

# Other endpoints (create_product, update_product, delete_product) remain the same as before.
@router.post("/", response_model=ProductData, description="Creates a new product record and returns the new product data.")
def create_product(product_data: ProductData):
    """Create a new product record.

    Args:
        product_data (ProductData): Data received from the user in the request body.

    Returns:
        ProductData: The created product data.
    """
    product_id = len(products) + 1
    new_product = ProductData(id=product_id, name=product_data.name, price=product_data.price, description=product_data.description)
    products.append(new_product)

    return {
        "name":product_data.name,
        "price":product_data.price,
        "description":product_data.description
    }

@router.put("/{product_id}", description="Updates a product record with the given id and returns a confirmation message.")
def update_product(product_id: int, updated_data: ProductData):
    """Update a product record.

    Args:
        product_id (int): The ID of the product record to update.
        updated_data (ProductData): Updated data received from the user in the request body.

    Returns:
        dict: A confirmation message indicating that the product record was updated successfully.

    """
    for index, data in enumerate(products):
        if data.id == product_id:
            products[index] = updated_data
            return {"message": "Product data for '{}' updated successfully.".format(product_id)}
    else:
        raise HTTPException(status_code=404, detail="Product not found")

@router.delete("/{product_id}", description="Deletes a product record with the given id and returns a confirmation message.")
def delete_product(product_id: int):
    """Delete a product record.

    This endpoint deletes a product record with the given id and returns a confirmation message.

    Args:
        product_id (int): The ID of the product record to delete.

    Returns:
        dict: A dictionary containing a confirmation message.

    """
    return {"product": "deleted"}