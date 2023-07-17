from fastapi import APIRouter, HTTPException
from typing import List

class MenuItem:
    def __init__(self, name: str, description: str, price: float):
        self.name = name
        self.description = description
        self.price = price

class MenuCategory:
    def __init__(self, name: str, items: List[MenuItem]):
        self.name = name
        self.items = items

class RestaurantMenu:
    def __init__(self, name: str, categories: List[MenuCategory]):
        self.name = name
        self.categories = categories

menu_items = [
    MenuItem("Cheeseburger", "A classic cheeseburger with lettuce, tomato, and onion.", 9.99),
    MenuItem("Caesar Salad", "Romaine lettuce, croutons, and Parmesan cheese with Caesar dressing.", 7.99),
    MenuItem("Margherita Pizza", "Tomato sauce, fresh mozzarella, and basil.", 12.99),
    MenuItem("Spaghetti and Meatballs", "Spaghetti with homemade meatballs and marinara sauce.", 14.99),
    MenuItem("Fish and Chips", "Beer-battered cod with French fries and tartar sauce.", 11.99),
    MenuItem("Grilled Chicken Sandwich", "Grilled chicken breast with bacon, avocado, and chipotle mayo.", 10.99),
    MenuItem("Veggie Burger", "A vegetarian burger patty with lettuce, tomato, and onion.", 8.99),
    MenuItem("Fettuccine Alfredo", "Fettuccine pasta with creamy Alfredo sauce.", 12.99),
    MenuItem("New York Strip Steak", "A 12-ounce New York strip steak with mashed potatoes and green beans.", 24.99),
    MenuItem("Chicken Parmesan", "Breaded chicken breast with marinara sauce and melted mozzarella cheese.", 16.99)
]

menu_categories = [
    MenuCategory("Burgers", [menu_items[0], menu_items[6]]),
    MenuCategory("Salads", [menu_items[1]]),
    MenuCategory("Pizza", [menu_items[2]]),
    MenuCategory("Pasta", [menu_items[3], menu_items[7]]),
    MenuCategory("Seafood", [menu_items[4]]),
    MenuCategory("Sandwiches", [menu_items[5]]),
    MenuCategory("Entrees", [menu_items[8], menu_items[9]])
]

restaurant_menu = RestaurantMenu("My Restaurant", menu_categories)

router = APIRouter()

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

@router.get("/", response_model=List[MenuItem], description="Returns a list of all menu items.", tags=["Menu Items"])
def read_all_menu_items():
    """Get all menu items.

    This endpoint retrieves a list of all available menu items.

    Returns:
        List[MenuItem]: The list of all menu items.

    """
    items = [item for category in restaurant_menu.categories for item in category.items]
    return items

@router.get("/categories/{category_name}", response_model=MenuCategory, description="Returns a menu category with the given name.", tags=["Menu Categories"])
def read_menu_category_by_name(category_name: str):
    """Get a menu category by name.

    This endpoint retrieves the details of a menu category based on the provided name.

    Args:
        category_name (str): The name of the menu category.

    Returns:
        MenuCategory: The menu category object containing the details.

    Raises:
        HTTPException: If the menu category is not found, a 404 error is raised.

    """
    category = next((category for category in restaurant_menu.categories if category.name == category_name), None)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.get("/categories", response_model=List[MenuCategory], description="Returns a list of all menu categories.", tags=["Menu Categories"])
def read_all_menu_categories():
    """Get all menu categories.

    This endpoint retrieves a list of all available menu categories.

    Returns:
        List[MenuCategory]: The list of all menu categories.

    """
    return restaurant_menu.categories
