from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

class WineRating(BaseModel):
    wine: str
    vintage: int
    rating: float

wine_ratings = [
    WineRating(wine="Chateau Margaux", vintage=2010, rating=98),
    WineRating(wine="Opus One", vintage=2015, rating=95),
    WineRating(wine="Screaming Eagle", vintage=2012, rating=97),
    WineRating(wine="Penfolds Grange", vintage=2010, rating=96),
    WineRating(wine="Vega Sicilia Unico", vintage=2009, rating=94),
    WineRating(wine="Sassicaia", vintage=2016, rating=93),
    WineRating(wine="Dominus Estate", vintage=2013, rating=96),
    WineRating(wine="Gaja Barbaresco", vintage=2015, rating=94),
    WineRating(wine="Chateau Latour", vintage=2005, rating=97),
    WineRating(wine="Clos des Papes", vintage=2016, rating=95)
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

@router.get("/", response_model=List[WineRating], description="Returns a list of all wine ratings.")
def read_all_ratings():
    """Get all wine ratings.

    This endpoint retrieves a list of all wine ratings.

    Returns:
        List[WineRating]: A list of all wine ratings.

    """
    return wine_ratings
