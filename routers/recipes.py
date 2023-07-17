from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter()

class Recipe:
    def __init__(self, name: str, ingredients: List[str], instructions: str):
        self.name = name
        self.ingredients = ingredients
        self.instructions = instructions

recipes = [
    Recipe("Spaghetti Carbonara", ["spaghetti", "pancetta", "eggs", "parmesan cheese", "black pepper"], "Instructions 1"),
    Recipe("Chicken Tikka Masala", ["chicken", "yogurt", "tomatoes", "onion", "garlic", "ginger", "garam masala", "turmeric", "cumin", "paprika", "cayenne pepper", "heavy cream"], "Instructions 2"),
    Recipe("Beef Stroganoff", ["beef", "onion", "mushrooms", "sour cream", "beef broth", "egg noodles"], "Instructions 3"),
    Recipe("Pad Thai", ["rice noodles", "chicken", "tofu", "eggs", "bean sprouts", "green onions", "peanuts", "lime", "fish sauce", "soy sauce", "sugar", "tamarind paste"], "Instructions 4"),
    Recipe("Chicken Alfredo", ["fettuccine", "chicken", "heavy cream", "butter", "parmesan cheese", "garlic", "salt", "black pepper"], "Instructions 5"),
    Recipe("Beef Tacos", ["beef", "taco seasoning", "taco shells", "lettuce", "tomatoes", "cheddar cheese", "sour cream", "salsa"], "Instructions 6"),
    Recipe("Chicken Caesar Salad", ["chicken", "romaine lettuce", "parmesan cheese", "croutons", "caesar dressing"], "Instructions 7"),
    Recipe("Beef Chili", ["beef", "onion", "bell pepper", "garlic", "tomatoes", "kidney beans", "chili powder", "cumin", "paprika", "cayenne pepper", "salt", "black pepper"], "Instructions 8"),
    Recipe("Chicken Enchiladas", ["chicken", "tortillas", "enchilada sauce", "cheddar cheese", "sour cream", "green onions"], "Instructions 9"),
    Recipe("Beef Burgers", ["ground beef", "hamburger buns", "lettuce", "tomatoes", "onion", "cheddar cheese", "ketchup", "mustard", "mayonnaise"], "Instructions 10")
]

@router.get("/{name}", response_model=Recipe, description="Returns the recipe for the given name.")
def read_recipe_by_name(name: str):
    """Get a recipe by name.

    This endpoint returns a recipe based on the given name.

    Args:
        name (str): The name of the recipe.

    Returns:
        Recipe: The recipe.

    Raises:
        HTTPException: If the recipe is not found.

    """
    recipe = next((recipe for recipe in recipes if recipe.name == name), None)
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@router.get("/", response_model=List[Recipe], description="Returns a list of all recipes.")
def read_all_recipes():
    """Get all recipes.

    This endpoint returns a list of all recipes.

    Returns:
        List[Recipe]: A list of all recipes.

    """
    return recipes
