from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import random

# class CricketScore(BaseModel):
#     id: int
#     team1: str
#     team2: str
#     score1: int
#     score2: int

# class CricketStat(BaseModel):
#     id: int
#     player: str
#     team: str
#     runs: int
#     wickets: int
#     catches: int

class Cricket(BaseModel):
    id:int
    name: str
    age:int
    nation : str



cricket = [
    Cricket(id=1,name="Virat Kohli", age=35, nation="India"),
    Cricket(id=2,name="Mayank Markande",age=25, nation="India"),
    Cricket(id=3,name=" Kemar Roach",age=35, nation="West Indies"),
    Cricket(id=4,name="Jhye Richardson",age=26, nation="Australia"),
    Cricket(id=5,name="Simon Harmer", age=34, nation="South Africa"),
    Cricket(id=6,name="Steven Finn",age=34, nation="England"),
    Cricket(id=7,name="Ravi Rampaul",age=38, nation="West Indies"),
    Cricket(id=8,name="Dhawal Kulkarni", age=34, nation="India"),
    Cricket(id=9,name="Jake Balle", age=32, nation="England"),
    Cricket(id=10,name="Taskin Ahmed", age=28, nation="Bangladesh"),
    Cricket(id=11,name="Kaleemullah", age=32,nation="Oman"),
    Cricket(id=12,name="Jasprit Bumrah", age=29, nation="India"),
    Cricket(id=13,name="Hardik Pandya", age=29, nation="India"),
    Cricket(id=14,name="K L Rahul ", age=31, nation="India"),
    Cricket(id=15,name="M S Dhoni ", age=42, nation="India"),

]

router = APIRouter()



@router.get("/random", response_model=Cricket, description="Returns a random cricketers.")
def read_random_cricketers():
    """Get a random quote.

    This endpoint returns a random quote from the list of quotes.

    Returns:
        Quote: A random quote.

    """
    random_cricketers = random.choice()
    return random_cricketers



@router.get("/{name}", response_model=Cricket, description="Returns a details for the given text.")
def read_cricketers(name: str):
    """Get a name 

    This endpoint retrieves a names that matches the specified name.

    Args:
        name (str): The text of the name to search for.

    Returns:
        Cricket: A name that matches the specified text.

    Raises:
        HTTPException: Raised if no name is found for the name entered.

    """
    player = next((crickname for crickname in cricket if crickname.name.lower() == name.lower()), None)
    if not player:
        raise HTTPException(status_code=404, detail="Quote not found")
    return player

@router.get("/nationality/{nation}", response_model=List[Cricket], description="Returns quotes for an nation.")
def read_nation_cricketers(nation: str):
    """Get players for a specific nation.

    This endpoint retrieves players that match the specified nation.

    Args:
        nation (str): The nation of the players to search for.

    Returns:
        List[Cricket]: A list of players that match the specified nation.

    Raises:
        HTTPException: Raised if no players are found for the nation.

    """
    criketers_by_nation = [player for player in cricket if player.nation.lower() == nation.lower()]
    if not criketers_by_nation:
        raise HTTPException(status_code=404, detail="Author not found in this list of quotes")
    return criketers_by_nation
@router.get("/", response_model=List[Cricket], description="Returns a list of all quotes.")
def read_all_cricketers():
    """Get all crickerters.

    This endpoint returns a list of all players.

    Returns:
        List[Cricket]: A list of all players.

    """
    return cricket
@router.post("/", response_model=Cricket, description="Write a new players details.", tags=["Quotes"])
def create_creaters(crickets: Cricket):
    """Create a new cricket .

    This endpoint creates a new player list and returns it.

    Returns:
     crickets: The created news players list.
    """
    cricket.append(crickets)
    return crickets

@router.put("/{id}", response_model=Cricket, description="Update a details.", tags=["Cricket"])
def update_cricket(id: int , crickets: Cricket):
    """Update a specific news article.

    This endpoint updates a specific news article and returns it.

    Returns:
        NewsArticle: The updated news article.
    """
    for index, existing_cricket in enumerate(cricket):
        if existing_cricket.id == id:
            cricket[index] = crickets
            return crickets
   
    raise HTTPException(status_code=404, detail="Article not found")

@router.delete("/{id}", description="Deletes a specific detail.", tags=["Cricket"])
def delete_crickety(id: int):
    """Delete a specific player details.

    This endpoint deletes a specific player.

    Returns:
        dict: A dictionary containing a confirmation message.
    """
    for index, existing_cricket in enumerate(cricket):
        if existing_cricket.id == id:
            del cricket[index]
            return {"detail": "quote deleted"}
    raise HTTPException(status_code=404, detail="Article not found")
