from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel

router = APIRouter()

class Recipe(BaseModel):
    id:int
    names: str
    ingredients:List[str]
    instructions:str

recipes = [
    Recipe(id=1,names="Spaghetti Carbonara",ingredients= ["spaghetti","parmesan cheese", "black pepper"],instructions= "Instructions 1"),
    Recipe(id=2,names="Chicken Tikka Masala", ingredients=["chicken", "yogurt", "cayenne pepper", "heavy cream"],instructions= "Instructions 2"),
    Recipe(id=3,names="Beef Stroganoff",ingredients= ["beef", "onion", "egg noodles"],instructions= "Instructions 3"),
    Recipe(id=4,names="Pad Thai",ingredients= ["rice noodles", "tofu", "soy sauce", ], instructions="Instructions 4"),
    Recipe(id=5,names="Chicken Alfredo", ingredients=["fettuccine", "garlic", "salt", "black pepper"], instructions="Instructions 5"),
    Recipe(id=6,names="Beef Tacos", ingredients=["beef",  "tomatoes", "cheddar cheese", "salsa"], instructions= "Instructions 6"),
    Recipe(id=7,names="Chicken Caesar Salad", ingredients=["chicken",  "croutons", "caesar dressing"], instructions= "Instructions 7"),
    Recipe(id=8,names="Beef Chili", ingredients=["beef", "onion" , "cayenne pepper",  "black pepper"],instructions= "Instructions 8"),
    Recipe(id=9,names="Chicken Enchiladas", ingredients=["chicken",  "green onions"], instructions="Instructions 9"),
    Recipe(id=10,names="Beef Burgers", ingredients=["hamburger buns","onion",  "mustard", "mayonnaise"],instructions= "Instructions 10")
]

latest_id=len(recipes)

@router.get("/{id}",response_model=Recipe, description="Returns the recipe for the given name.")
def read_recipe_by_id(id:int):
    recipe = next((recipe for recipe in recipes if recipe.id == id), None)
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@router.get("/names/{names}", response_model=Recipe, description="Returns the recipe for the given name.")
def read_recipe_by_name(names: str):
    """Get a recipe by name.

    This endpoint returns a recipe based on the given name.

    Args:
        name (str): The name of the recipe.

    Returns:
        Recipe: The recipe.

    Raises:
        HTTPException: If the recipe is not found.

    """
    recipe = next((recipe for recipe in recipes if recipe.names == names), None)
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

@router.post("/", response_model=Recipe, description="Adds a new recipe.", status_code=201)
def add_recipe(recipe: Recipe):
    """Add a new recipe.

    This endpoint adds a new recipe to the list of recipes.

    Args:
        recipe (Recipe): The recipe object containing the details.

    Returns:
        Recipe: The added recipe object.

    """
    # Assign a new unique id to the recipe
    global latest_id
    latest_id += 1
    recipe.id = latest_id
    recipes.append(recipe)
    return recipe

@router.put("/{id}", response_model=Recipe, description="Updates an existing recipe.")
def update_recipe(id: int, updated_recipe: Recipe):
    """Update an existing recipe.

    This endpoint updates an existing recipe in the list of recipes.

    Args:
        id (int): The ID of the recipe to be updated.
        updated_recipe (Recipe): The updated recipe object containing the new details.

    Returns:
        Recipe: The updated recipe object.

    Raises:
        HTTPException: If the recipe with the given ID is not found.

    """
    # index = next((index for index, recipe in enumerate(recipes) if recipe.id == id), None)
    # if index is None:
    #     raise HTTPException(status_code=404, detail="Recipe not found")

    # recipes[index] = updated_recipe
    # return updated_recipe
    for i , e in enumerate(recipes):
        if e.id == id:
            recipes[i]=updated_recipe
            return updated_recipe
    raise HTTPException(404)

@router.delete("/{id}", response_model=Recipe, description="Delete an existing recipe.")
def delete_recipe(id: int):
    # logger.info(f"Deleting course with id {id}")
        index = next((index for index, existing_recipe in enumerate(recipes) if existing_recipe.id == id), None)
        if index is None:
            raise HTTPException(status_code=404, detail="Recipe not found")
        deleted_recipe = recipes.pop(index)
        return deleted_recipe

