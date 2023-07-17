from fastapi import APIRouter
from faker import Faker

fake = Faker()

router = APIRouter()

@router.get("/", description="Returns a list of 10 fake user records with unique IDs, names, and emails.")
def read_users():
    """Get a list of fake user records.

    This endpoint returns a list of 10 fake user records with unique IDs, names, and emails.

    Returns:
        dict: A dictionary containing the list of fake user records.

    """
    users = [{"id": i, "name": fake.name(), "email": fake.email()} for i in range(1, 11)]
    return {"users": users}

@router.post("/", description="Creates a new user record and returns a confirmation message.")
def create_user():
    """Create a new user record.

    This endpoint creates a new user record and returns a confirmation message.

    Returns:
        dict: A dictionary containing a confirmation message.

    """
    return {"user": "created"}

@router.put("/{user_id}", description="Updates a user record with the given id and returns a confirmation message.")
def update_user(user_id: int):
    """Update a user record.

    This endpoint updates a user record with the given id and returns a confirmation message.

    Args:
        user_id (int): The ID of the user record to update.

    Returns:
        dict: A dictionary containing a confirmation message.

    """
    return {"user": "updated"}

@router.delete("/{user_id}", description="Deletes a user record with the given id and returns a confirmation message.")
def delete_user(user_id: int):
    """Delete a user record.

    This endpoint deletes a user record with the given id and returns a confirmation message.

    Args:
        user_id (int): The ID of the user record to delete.

    Returns:
        dict: A dictionary containing a confirmation message.

    """
    return {"user": "deleted"}
