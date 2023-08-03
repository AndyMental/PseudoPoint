from fastapi import APIRouter, HTTPException
from pydantic import BaseModel  #BaseModel: This is a Pydantic class used for data validation and serialization.
import logging 
from typing import List

logger = logging.getLogger(__name__)

class Celebrity(BaseModel):
    id: int
    name: str
    occupation: str
    birth_year: int
    nationality: str

celebrities = [
    Celebrity(id=1,name="Tom Hanks", occupation="Actor", birth_year=1956, nationality="American"),
    Celebrity(id=2,name="Beyonce", occupation="Singer", birth_year=1981, nationality="American"),
    Celebrity(id=3,name="Elon Musk", occupation="Entrepreneur", birth_year=1971, nationality="South African"),
    Celebrity(id=4,name="Serena Williams", occupation="Tennis player", birth_year=1981, nationality="American"),
    Celebrity(id=5,name="Emma Watson", occupation="Actress", birth_year=1990, nationality="British"),
    Celebrity(id=6,name="Cristiano Ronaldo", occupation="Footballer", birth_year=1985, nationality="Portuguese"),
    Celebrity(id=7,name="Oprah Winfrey", occupation="TV host", birth_year=1954, nationality="American"),
    Celebrity(id=8,name="David Beckham", occupation="Footballer", birth_year=1975, nationality="British"),
    Celebrity(id=9,name="Angelina Jolie", occupation="Actress", birth_year=1975, nationality="American"),
    Celebrity(id=10,name="Bill Gates", occupation="Entrepreneur", birth_year=1955, nationality="American")
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
    logger.info(f"Fetching celebrity with name {name}")
    matching_celebrities = [celebrity for celebrity in celebrities if celebrity.name.lower() == name.lower()]
    if not matching_celebrities:
        logger.error(f"Celebrity with name {name} not found")
        raise HTTPException(status_code=404, detail=f"Celebrity with name {name} not found")
    return matching_celebrities[0]

@router.get("/", response_model=List[Celebrity], description="Returns a list of all celebrities.", tags=["Celebrities"])
def read_all_celebrities():
    """Get all celebrities.

    This endpoint retrieves a list of all available celebrities.

    Returns:
        List[Celebrity]: The list of all celebrities.

    """
    return celebrities




@router.get("/nation/{nationality}", response_model=List[Celebrity], description="Returns list of Celebrities from a specific nation")
def read_celeb_by_nation(nationality: str):
    """Get celebs from a specific nation.

    This endpoint retrieves a list of celebs for the specified nation.

    Args:
        nationality (str): The nationality of the celebs to search for.

    Returns:
        List[Celebrity]: A list of celebs for the specified nation.

    Raises:
        HTTPException: Raised if no celebs are found for the nation.

    """
    
    filtered_celebrities = [celeb for celeb in celebrities if celeb.nationality.lower() == nationality.lower()]
    if not filtered_celebrities:
        raise HTTPException(status_code=404, detail="No celebs found from this nation.")
    return filtered_celebrities




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


@router.put("/{id}", response_model=Celebrity, description="Updates an existing celebrity.", tags=["Celebrities"])
def update_celebrity(id: int, celebrity: Celebrity):
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
    logger.info(f"Updating celebrity with name {id}")
    for index, existing_celebrity in enumerate(celebrities):
        if existing_celebrity.id == id:
            celebrities[index] = celebrity
            return celebrity
    logger.error(f"Celebrity with name {id} not found")
    raise HTTPException(status_code=404, detail=f"Celebrity with id {id} not found")

@router.delete("/{id}", response_model=None, description="Deletes an existing celebrity.", status_code=204, tags=["Celebrities"])
def delete_celebrity(id: int):
    """Deletes an existing celebrity.

    This endpoint deletes an existing celebrity based on the provided name.

    Args:
        name (str): The name of the celebrity to delete.

    Raises:
        HTTPException: If the celebrity is not found, a 404 error is raised.

    """
    logger.info(f"Deleting celebrity with id {id}")
    for index, existing_celebrity in enumerate(celebrities):
        if existing_celebrity.id == id:
            celebrities.pop(index)
            return
    logger.error(f"Celebrity with id {id} not found")
    raise HTTPException(status_code=404, detail=f"Celebrity with id {id} not found")