from fastapi import APIRouter, HTTPException
from typing import List

class Review:
    def __init__(self, title: str, reviewer: str, rating: int, review_text: str):
        self.title = title
        self.reviewer = reviewer
        self.rating = rating
        self.review_text = review_text

movie_reviews = [
    Review("The Godfather", "Roger Ebert", 5, "The Godfather is a brilliant work of art."),
    Review("The Shawshank Redemption", "Gene Siskel", 4, "The Shawshank Redemption is a powerful movie."),
    Review("The Dark Knight", "Peter Travers", 4, "The Dark Knight is a thrilling ride."),
    Review("Pulp Fiction", "Richard Roeper", 5, "Pulp Fiction is a masterpiece."),
    Review("The Godfather: Part II", "Leonard Maltin", 5, "The Godfather: Part II is a rare sequel that surpasses the original."),
    Review("Schindler's List", "David Ansen", 5, "Schindler's List is a monumental achievement."),
    Review("Forrest Gump", "Janet Maslin", 4, "Forrest Gump is a heartwarming movie."),
    Review("Inception", "Kenneth Turan", 4, "Inception is a mind-bending movie."),
    Review("The Lord of the Rings: The Fellowship of the Ring", "Todd McCarthy", 5, "The Lord of the Rings: The Fellowship of the Ring is a stunning achievement."),
    Review("Star Wars: Episode IV - A New Hope", "Vincent Canby", 4, "Star Wars: Episode IV - A New Hope is a thrilling adventure."),
    Review("The Lord of the Rings: The Return of the King", "James Berardinelli", 5, "The Lord of the Rings: The Return of the King is a triumphant conclusion."),
    Review("The Empire Strikes Back", "Roger Ebert", 5, "The Empire Strikes Back is a thrilling sequel."),
    Review("The Dark Knight Rises", "Peter Travers", 4, "The Dark Knight Rises is a satisfying conclusion."),
    Review("The Matrix", "Richard Roeper", 4, "The Matrix is a groundbreaking movie."),
    Review("The Lord of the Rings: The Two Towers", "Leonard Maltin", 5, "The Lord of the Rings: The Two Towers is a thrilling adventure."),
    Review("One Flew Over the Cuckoo's Nest", "David Ansen", 5, "One Flew Over the Cuckoo's Nest is a powerful movie."),
    Review("Goodfellas", "Janet Maslin", 5, "Goodfellas is a masterpiece."),
    Review("The Usual Suspects", "Kenneth Turan", 4, "The Usual Suspects is a thrilling ride."),
    Review("Se7en", "Todd McCarthy", 4, "Se7en is a dark and disturbing movie."),
    Review("The Silence of the Lambs", "Vincent Canby", 5, "The Silence of the Lambs is a chilling movie.")
]

router = APIRouter()

@router.get("/{title}", response_model=Review, description="Returns a review with the given title.")
def read_review_by_title(title: str):
    """Get a movie review by title.

    This endpoint returns a movie review based on the given title.

    Args:
        title (str): The title of the movie.

    Returns:
        Review: The movie review.

    Raises:
        HTTPException: If the movie review is not found.

    """
    review = next((review for review in movie_reviews if review.title == title), None)
    if review is None:
        raise HTTPException(status_code=404, detail="Review not found")
    return review

@router.get("/", response_model=List[Review], description="Returns a list of all reviews.")
def read_all_reviews():
    """Get all movie reviews.

    This endpoint returns a list of all movie reviews.

    Returns:
        List[Review]: A list of all movie reviews.

    """
    return movie_reviews
