from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import random

router = APIRouter()

class Quote(BaseModel):
    text: str
    author: str

quotes = [
    Quote(text="Be the change that you wish to see in the world.", author="Mahatma Gandhi"),
    Quote(text="In three words I can sum up everything I've learned about life: it goes on.", author="Robert Frost"),
    Quote(text="The only way to do great work is to love what you do.", author="Steve Jobs"),
    Quote(text="You miss 100% of the shots you don't take.", author="Wayne Gretzky"),
    Quote(text="Believe you can and you're halfway there.", author="Theodore Roosevelt"),
    Quote(text="I have not failed. I've just found 10,000 ways that won't work.", author="Thomas Edison"),
    Quote(text="Success is not final, failure is not fatal: it is the courage to continue that counts.", author="Winston Churchill"),
    Quote(text="The best way to predict the future is to invent it.", author="Alan Kay"),
    Quote(text="If you want to go fast, go alone. If you want to go far, go together.", author="African Proverb"),
    Quote(text="The only true wisdom is in knowing you know nothing.", author="Socrates")
]

@router.get("/random", response_model=Quote, description="Returns a random quote.")
def read_random_quote():
    """Get a random quote.

    This endpoint returns a random quote from the list of quotes.

    Returns:
        Quote: A random quote.

    """
    random_quote = random.choice(quotes)
    return random_quote

@router.get("/", response_model=List[Quote], description="Returns a list of all quotes.")
def read_all_quotes():
    """Get all quotes.

    This endpoint returns a list of all quotes.

    Returns:
        List[Quote]: A list of all quotes.

    """
    return quotes
