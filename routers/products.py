from fastapi import APIRouter
from faker import Faker

fake = Faker()

router = APIRouter()

@router.get("/", description="Returns a list of 10 fake product records with unique IDs, names, and prices.")
def read_products():
    """Get all products.

    This endpoint returns a list of 10 fake product records with unique IDs, names, and prices.

    Returns:
        dict: A dictionary containing the list of product records.

    """
    products = [{"id": i, "name": fake.word(), "price": fake.pyfloat(left_digits=2, right_digits=2, positive=True)} for i in range(1, 11)]
    return {"products": products}

@router.post("/", description="Creates a new product record and returns a confirmation message.")
def create_product():
    """Create a new product.

    This endpoint creates a new product record and returns a confirmation message.

    Returns:
        dict: A dictionary containing the confirmation message.

    """
    return {"product": "created"}

@router.put("/{product_id}", description="Updates a product record with the given id and returns a confirmation message.")
def update_product(product_id: int):
    """Update a product.

    This endpoint updates a product record with the given id and returns a confirmation message.

    Args:
        product_id (int): The ID of the product to update.

    Returns:
        dict: A dictionary containing the confirmation message.

    """
    return {"product": "updated"}

@router.delete("/{product_id}", description="Deletes a product record with the given id and returns a confirmation message.")
def delete_product(product_id: int):
    """Delete a product.

    This endpoint deletes a product record with the given id and returns a confirmation message.

    Args:
        product_id (int): The ID of the product to delete.

    Returns:
        dict: A dictionary containing the confirmation message.

    """
    return {"product": "deleted"}
