from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

class Celebrity(BaseModel):
    name: str
    occupation: str
    birth_year: int
    nationality: str

celebrities = [
    Celebrity(name="Tom Hanks", occupation="Actor", birth_year=1956, nationality="American"),
    Celebrity(name="Beyonce", occupation="Singer", birth_year=1981, nationality="American"),
    Celebrity(name="Elon Musk", occupation="Entrepreneur", birth_year=1971, nationality="South African"),
    Celebrity(name="Serena Williams", occupation="Tennis player", birth_year=1981, nationality="American"),
    Celebrity(name="Emma Watson", occupation="Actress", birth_year=1990, nationality="British"),
    Celebrity(name="Cristiano Ronaldo", occupation="Footballer", birth_year=1985, nationality="Portuguese"),
    Celebrity(name="Oprah Winfrey", occupation="TV host", birth_year=1954, nationality="American"),
    Celebrity(name="David Beckham", occupation="Footballer", birth_year=1975, nationality="British"),
    Celebrity(name="Angelina Jolie", occupation="Actress", birth_year=1975, nationality="American"),
    Celebrity(name="Bill Gates", occupation="Entrepreneur", birth_year=1955, nationality="American")
]

router = APIRouter()

@router.get("/{name}", response_model=Celebrity, description="Returns information about the given celebrity.", tags=["Celebrities"])
def read_celebrity_by_name(name: str):
    """Get celebrity by name.

    This endpoint retrieves information about a celebrity based on the provided name.

    Args:
        name (str): The name of the celebrity.

    Returns:
        Celebrity: The celebrity object containing the details.

    Raises:
        HTTPException: If the celebrity is not found, a 404 error is raised.

    """
    matching_celebrities = [celebrity for celebrity in celebrities if celebrity.name.lower() == name.lower()]
    if not matching_celebrities:
        raise HTTPException(status_code=404, detail="Celebrity not found")
    return matching_celebrities[0]

@router.get("/", response_model=List[Celebrity], description="Returns a list of all celebrities.", tags=["Celebrities"])
def read_all_celebrities():
    """Get all celebrities.

    This endpoint retrieves a list of all available celebrities.

    Returns:
        List[Celebrity]: The list of all celebrities.

    """
    return celebrities

@router.post("/", response_model=Celebrity, description="Creates a new celebrity.", status_code=201, tags=["Celebrities"])
def create_celebrity(celebrity: Celebrity):
    """Creates a new celebrity.

    This endpoint creates a new celebrity and adds it to the list.

    Args:
        celebrity (Celebrity): The celebrity object to create.

    Returns:
        Celebrity: The created celebrity object.

    """
    celebrities.append(celebrity)
    return celebrity


@router.put("/{name}", response_model=Celebrity, description="Updates an existing celebrity.", tags=["Celebrities"])
def update_celebrity(name: str, celebrity: Celebrity):
    """Updates an existing celebrity.

    This endpoint updates an existing celebrity based on the provided name.

    Args:
        name (str): The name of the celebrity to update.
        celebrity (Celebrity): The new celebrity object to replace the existing one.

    Returns:
        Celebrity: The updated celebrity object.

    Raises:
        HTTPException: If the celebrity is not found, a 404 error is raised.

    """
    for index, existing_celebrity in enumerate(celebrities):
        if existing_celebrity.name.lower() == name.lower():
            celebrities[index] = celebrity
            return celebrity
    raise HTTPException(status_code=404, detail="Celebrity not found")


@router.delete("/{name}", response_model=None, description="Deletes an existing celebrity.", status_code=204, tags=["Celebrities"])
def delete_celebrity(name: str):
    """Deletes an existing celebrity.

    This endpoint deletes an existing celebrity based on the provided name.

    Args:
        name (str): The name of the celebrity to delete.

    Raises:
        HTTPException: If the celebrity is not found, a 404 error is raised.

    """
    for index, existing_celebrity in enumerate(celebrities):
        if existing_celebrity.name.lower() == name.lower():
            celebrities.pop(index)
            return
    raise HTTPException(status_code=404, detail="Celebrity not found")