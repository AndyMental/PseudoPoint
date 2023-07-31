from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

class WineRating(BaseModel):
    id:int
    wine: str
    vintage: int
    rating: float

wine_ratings = [
    WineRating(id=1,wine="Chateau Margaux", vintage=2010, rating=98),
    WineRating(id=2,wine="Opus One", vintage=2015, rating=95),
    WineRating(id=3,wine="Screaming Eagle", vintage=2012, rating=97),
    WineRating(id=4,wine="Penfolds Grange", vintage=2010, rating=96),
    WineRating(id=5,wine="Vega Sicilia Unico", vintage=2009, rating=94),
    WineRating(id=6,wine="Sassicaia", vintage=2016, rating=93),
    WineRating(id=7,wine="Dominus Estate", vintage=2013, rating=96),
    WineRating(id=8,wine="Gaja Barbaresco", vintage=2015, rating=94),
    WineRating(id=9,wine="Chateau Latour", vintage=2005, rating=97),
    WineRating(id=10,wine="Clos des Papes", vintage=2016, rating=95),
    WineRating(id=11,wine="Alvaro Palacios", vintage=2005, rating=99),
    WineRating(id=12,wine=" Giacomo Conterno", vintage=2006, rating=95),
    WineRating(id=13,wine=" Egon Muller ", vintage=2007, rating=94)
    

]

router = APIRouter()

@router.get("/{wine}", response_model=List[WineRating], description="Returns a list of wine ratings for the given wine.")
def read_ratings_by_wine(wine: str):
    """Get wine ratings for a specific wine.

    This endpoint retrieves a list of wine ratings for the specified wine.

    Args:
        wine (str): The name of the wine to search for.

    Returns:
        List[WineRating]: A list of wine ratings for the specified wine.

    Raises:
        HTTPException: Raised if no ratings are found for the wine.

    """
    wine = wine.lower()
    ratings_by_wine = [rating for rating in wine_ratings if rating.wine.lower() == wine]
    if not ratings_by_wine:
        raise HTTPException(status_code=404, detail="Ratings not found")
    return ratings_by_wine

@router.get("/vintage/{vintage}", response_model=List[WineRating], description="Returns a list of wine ratings which is older than the specified wine")
def vintage_collection(vintage: int):
    """Get wine's vintage for a specific wine.

    This endpoint retrieves a list of older wines for the specified wine.

    Args:
        vintage (int): The year of the wine to search for.

    Returns:
        List[WineRating]: A list of wine ratings for the specified vintage wine.

    Raises:
        HTTPException: Raised if no ratings are found for the wine.

    """
    vintage_by_wine = [old for old in wine_ratings if old.vintage <= vintage]
    
    if not vintage_by_wine:
        raise HTTPException(status_code=404, detail="Collections are Done")
    return vintage_by_wine







@router.get("/", response_model=List[WineRating], description="Returns a list of all wine ratings.")
def read_all_ratings():
    """Get all wine ratings.

    This endpoint retrieves a list of all wine ratings.

    Returns:
        List[WineRating]: A list of all wine ratings.

    """
    return wine_ratings

@router.post("/", response_model=WineRating, description="Creates a new wine rating.", tags=["Wine Ratings"])
def create_wine(winee: WineRating):
    """Create a new Wine ratings.

    This endpoint creates a new Wine ratings and returns it.

    Returns:
        WineRatings: The created Wine ratings.
    """
    # winee.id = len(wine_ratings)+1

    wine_ratings.append(winee)
    return winee

@router.put("/{id}", response_model=WineRating, description="Updates a specific wine ratings.", tags=["Wine Ratings"])
def update_wine(id: int, winee: WineRating):
    """Update a specific Wine ratings.

    This endpoint updates a specific Wine ratings and returns it.

    Returns:
        WineRatings: The updated Wine ratings.
    """
    for index, existing_wine in enumerate(wine_ratings):
        if existing_wine.id == id:
            wine_ratings[index] = winee
            return winee
    raise HTTPException(status_code=404, detail="Wine Rating not found")

@router.delete("/{id}", description="Deletes a specific Wine ratings.", tags=["Wine Ratings"])
def delete_article(id: int):
    """Delete a specific Wine ratings.

    This endpoint deletes a specific Wine ratings.

    Returns:
        dict: A dictionary containing a confirmation message.
    """
    for index, existing_art in enumerate(wine_ratings):
        if existing_art.id == id:
            wine_ratings.pop(index)
            return
    raise HTTPException(status_code=404, detail="Wine Ratings not found")













'''Using the response_model parameter allows
 us to define the expected structure and types of our API responses, enabling automatic validation, serialization, and documentation generation in FastAPI.'''
