from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import random

router = APIRouter()

class Quote(BaseModel):
    id:int
    text: str
    author: str

quotes = [
    Quote(id=1,text="Be the change that you wish to see in the world.", author="Mahatma Gandhi"),
    Quote(id=2,text="An eye for an eye makes the whole world blind.", author="Mahatma Gandhi"),
    Quote(id=3,text="Live as if you were to die tomorrow.", author="Mahatma Gandhi"),
    Quote(id=4,text="In a gentle way, you can shake the world.", author="Mahatma Gandhi"),
    Quote(id=5,text="Where there is love, there is life.", author="Mahatma Gandhi"),
    Quote(id=6,text="In three words I can sum up everything I've learned about life: it goes on.", author="Robert Frost"),
    Quote(id=7,text="The only way to do great work is to love what you do.", author="Steve Jobs"),
    Quote(id=8,text="Stay hungry, stay foolish.", author="Steve Jobs"),
    Quote(id=9,text="Your work is going to fill a large part of your life.", author="Steve Jobs"),
    Quote(id=10,text="You miss 100% of the shots you don't take.", author="Wayne Gretzky"),
    Quote(id=11,text="Believe you can and you're halfway there.", author="Theodore Roosevelt"),
    Quote(id=12,text="I have not failed. I've just found 10,000 ways that won't work.", author="Thomas Edison"),
    Quote(id=13,text="Success is not final, failure is not fatal: it is the courage to continue that counts.", author="Winston Churchill"),
    Quote(id=14,text="The best way to predict the future is to invent it.", author="Alan Kay"),
    Quote(id=15,text="If you want to go fast, go alone. If you want to go far, go together.", author="African Proverb"),
    Quote(id=16,text="The only true wisdom is in knowing you know nothing.", author="Socrates")
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


@router.get("/{text}", response_model=Quote, description="Returns a quote for the given text.")
def read_quote(text: str):
    """Get a quote for a specific text.

    This endpoint retrieves a quote that matches the specified text.

    Args:
        text (str): The text of the quote to search for.

    Returns:
        Quote: A quote that matches the specified text.

    Raises:
        HTTPException: Raised if no quote is found for the text.

    """
    quote = (q for q in quotes if q.text.lower() == text.lower())
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    return quote

@router.get("/authname/{author}", response_model=List[Quote], description="Returns quotes for an author.")
def read_authors_quotes(author: str):
    """Get quotes for a specific author.

    This endpoint retrieves quotes that match the specified author.

    Args:
        author (str): The author of the quotes to search for.

    Returns:
        List[Quote]: A list of quotes that match the specified author.

    Raises:
        HTTPException: Raised if no quotes are found for the author.

    """
    quotes_by_auth = [q for q in quotes if q.author.lower() == author.lower()]
    if not quotes_by_auth:
        raise HTTPException(status_code=404, detail="Author not found in this list of quotes")
    return quotes_by_auth
@router.get("/", response_model=List[Quote], description="Returns a list of all quotes.")
def read_all_quotes():
    """Get all quotes.

    This endpoint returns a list of all quotes.

    Returns:
        List[Quote]: A list of all quotes.

    """
    return quotes
@router.post("/", response_model=Quote, description="Write a new Quote.", tags=["Quotes"])
def create_quote(quote: Quote):
    """Create a new news article.

    This endpoint creates a new news article and returns it.

    Returns:
        NewsArticle: The created news article.
    """
    quotes.append(quote)
    return quote

@router.put("/{id}", response_model=Quote, description="Update a quote.", tags=["Quotes"])
def update_quote(id: int , quote: Quote):
    """Update a specific news article.

    This endpoint updates a specific news article and returns it.

    Returns:
        NewsArticle: The updated news article.
    """
    for index, existing_quote in enumerate(quotes):
        if existing_quote.id == id:
            quotes[index] = quote
            return quote
   
    raise HTTPException(status_code=404, detail="Article not found")

@router.delete("/{id}", description="Deletes a specific quote.", tags=["Quotes"])
def delete_article(id: int):
    """Delete a specific news article.

    This endpoint deletes a specific news article.

    Returns:
        dict: A dictionary containing a confirmation message.
    """
    for index, existing_quote in enumerate(quotes):
        if existing_quote.id == id:
            del quotes[index]
            return {"detail": "quote deleted"}
    raise HTTPException(status_code=404, detail="Article not found")
