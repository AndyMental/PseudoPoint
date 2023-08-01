from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class UserData(BaseModel):
    id: int
    name: str
    email: str

users = [
    UserData(id=1, name="John ", email="john@example.com"),
    UserData(id=2, name="Jane Smith", email="jane@example.com"),
    UserData(id=3, name="Bob Johnson", email="bob@example.com"),
    UserData(id=4, name="Alice Brown", email="alice@example.com"),
    UserData(id=5, name="Eve Davis", email="eve@example.com"),
    UserData(id=6, name="Michael Lee", email="michael@example.com"),
    UserData(id=7, name="Emily Kim", email="emily@example.com"),
    UserData(id=8, name="Daniel Wilson", email="daniel@example.com"),
    UserData(id=9, name="Olivia Lee", email="olivia@example.com"),
    UserData(id=10, name="William Brown", email="william@example.com"),
]

@router.get("/", response_model=List[UserData], description="Returns a list of fake user records.")
def read_users():
    """Get a list of fake user records.

    Returns:
        List[UserData]: A list of UserData objects containing the fake user records.
    """
    return users

@router.post("/", response_model=UserData, description="Creates a new user record and returns the new user data.")
def create_user(user_data: UserData):
    """Create a new user record.

    Args:
        user_data (UserData): Data received from the user in the request body.

    Returns:
        UserData: The created user data.
    """
    user_id = len(users) + 1
    new_user = UserData(id=user_id, name=user_data.name, email=user_data.email)
    users.append(new_user)

    return new_user

@router.put("/{user_id}", description="Updates a user record with the given id and returns a confirmation message.")
def update_user(user_id: int, updated_data: UserData):
    """Update a user record.

    Args:
        user_id (int): The ID of the user record to update.
        updated_data (dict): Updated data received from the user in the request body.

    Returns:
        dict: A confirmation message indicating that the user record was updated successfully.

    """
    for index,data in enumerate(users):
        if data.id==user_id:
            users[index]==updated_data
            return {"message": "OAuth data for '{}' updated successfully.".format(user_id)}
    else:
        raise HTTPException(status_code=404, detail="User not found")

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
