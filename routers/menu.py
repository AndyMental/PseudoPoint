from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel

class MenuItem(BaseModel):
    name: str
    description: str
    price: float

class MenuCategory(BaseModel):
    name: str
    items: List[MenuItem]

class RestaurantMenu(BaseModel):
    name: str
    categories: List[MenuCategory]

    
menu_items = [
    MenuItem(name="Cheeseburger", description="A classic cheeseburger with lettuce, tomato, and onion.", price=9.99),
    MenuItem(name="Caesar Salad", description="Romaine lettuce, croutons, and Parmesan cheese with Caesar dressing.", price=7.99),
    # Add other menu items here
]

menu_categories = [
    MenuCategory(name="Burgers", items=[menu_items[0], menu_items[1]]),  # Corrected the indices
    MenuCategory(name="Salads", items=[menu_items[1]]),
    # Add other menu categories here
]

restaurant_menu = RestaurantMenu(name="My Restaurant", categories=menu_categories)

router = APIRouter()

@router.get("/restaurant-menu", response_model=RestaurantMenu)
async def get_restaurant_menu():
    return restaurant_menu

@router.get("/{item_name}", response_model=MenuItem, description="Returns a menu item with the given name.", tags=["Menu Items"])
def read_menu_item_by_name(item_name: str):
    """Get a menu item by name.

    This endpoint retrieves the details of a menu item based on the provided name.

    Args:
        item_name (str): The name of the menu item.

    Returns:
        MenuItem: The menu item object containing the details.

    Raises:
        HTTPException: If the menu item is not found, a 404 error is raised.

    """
    item = next((item for category in restaurant_menu.categories for item in category.items if item.name == item_name), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# @router.get("/", response_model=List[MenuItem], description="Returns a list of all menu items.", tags=["Menu Items"])
# def read_all_menu_items():
#     """Get all menu items.

#     This endpoint retrieves a list of all available menu items.

#     Returns:
#         List[MenuItem]: The list of all menu items.

#     """
#     # items = [item for category in restaurant_menu.categories for item in category.items]
#     return restaurant_menu

# @router.get("/categories/{category_name}", response_model=MenuCategory, description="Returns a menu category with the given name.", tags=["Menu Categories"])
# def read_menu_category_by_name(category_name: str):
#     """Get a menu category by name.

#     This endpoint retrieves the details of a menu category based on the provided name.

#     Args:
#         category_name (str): The name of the menu category.

#     Returns:
#         MenuCategory: The menu category object containing the details.

#     Raises:
#         HTTPException: If the menu category is not found, a 404 error is raised.

#     """
#     category = next((category for category in restaurant_menu.categories if category.name == category_name), None)
#     if category is None:
#         raise HTTPException(status_code=404, detail="Category not found")
#     return category


@router.post("/menu-items/", response_model=MenuItem, description="Create a new menu item.", tags=["Menu Items"])
def create_menu_item(new_item: MenuItem):
    """
    Create a new menu item.

    This endpoint allows the creation of a new menu item.

    Args:
        new_item (MenuItem): The data for the new menu item, including name, description, price, and category_name.

    Returns:
        MenuItem: The newly created menu item object.

    Raises:
        HTTPException: If the specified category_name does not exist in the restaurant_menu.

    """
    # Check if the specified category_name exists in the restaurant_menu
    category_exists = any(category.name == new_item.category_name for category in restaurant_menu.categories)

    if not category_exists:
        raise HTTPException(status_code=404, detail="Category not found")

    # Add the new item to the corresponding category
    for category in restaurant_menu.categories:
        if category.name == new_item.category_name:
            category.items.append(new_item)
            return new_item

    # This should not be reached, but raising an exception just in case
    raise HTTPException(status_code=500, detail="Internal Server Error")

# Rest of the code (GET methods, etc.) remains the same.

@router.put("/{item_name}", response_model=MenuItem, description="Update a menu item by name.", tags=["Menu Items"])
def update_menu_item_by_name(item_name: str, updated_item: MenuItem):
    """
    Update a menu item by name.

    This endpoint allows updating the details of a menu item based on its name.

    Args:
        item_name (str): The name of the menu item to be updated.
        updated_item (MenuItem): The updated data for the menu item, including name, description, and price.

    Returns:
        MenuItem: The updated menu item object.

    Raises:
        HTTPException: If the menu item is not found, a 404 error is raised.

    """
    for category in restaurant_menu.categories:
        for item in category.items:
            if item.name == item_name:
                item.name = updated_item.name
                item.description = updated_item.description
                item.price = updated_item.price
                return item  # Return the updated item
    raise HTTPException(status_code=404, detail="Item not found")

@router.delete("/{item_name}", response_model=MenuItem, description="Delete a menu item by name.", tags=["Menu Items"])
def delete_menu_item_by_name(item_name: str):
    """
    Delete a menu item by name.

    This endpoint allows the deletion of a menu item based on its name.

    Args:
        item_name (str): The name of the menu item to be deleted.

    Returns:
        MenuItem: The deleted menu item object.

    Raises:
        HTTPException: If the menu item is not found, a 404 error is raised.

    """
    for category in restaurant_menu.categories:
        for item in category.items:
            if item.name == item_name:
                category.items.remove(item)
                return item  # Return the deleted item
    raise HTTPException(status_code=404, detail="Item not found")