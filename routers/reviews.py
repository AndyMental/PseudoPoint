from fastapi import APIRouter, HTTPException
from typing import List
import logging
from pydantic import BaseModel
import uuid

logger = logging.getLogger(__name__)


class Review(BaseModel):
    review_id: str
    title: str
    reviewer: str
    rating: float
    review_text: str


movie_reviews = [
    Review(review_id=uuid.uuid1().hex, title="The Godfather", reviewer="Roger Ebert", rating=5,
           review_text="The Godfather is a brilliant work of art."),
    Review(review_id=uuid.uuid1().hex, title="The Shawshank Redemption", reviewer="Gene Siskel",
           rating=4, review_text="The Shawshank Redemption is a powerful movie."),
    Review(review_id=uuid.uuid1().hex, title="The Dark Knight", reviewer="Peter Travers", rating=4,
           review_text="The Dark Knight is a thrilling ride."),
    Review(review_id=uuid.uuid1().hex, title="Pulp Fiction", reviewer="Richard Roeper",
           rating=5, review_text="Pulp Fiction is a masterpiece."),
    Review(review_id=uuid.uuid1().hex, title="The Godfather: Part II", reviewer="Leonard Maltin", rating=5,
           review_text="The Godfather: Part II is a rare sequel that surpasses the original."),
    Review(review_id=uuid.uuid1().hex, title="Schindler's List", reviewer="David Ansen", rating=5,
           review_text="Schindler's List is a monumental achievement."),
    Review(review_id=uuid.uuid1().hex, title="Forrest Gump", reviewer="Janet Maslin", rating=4,
           review_text="Forrest Gump is a heartwarming movie."),
    Review(review_id=uuid.uuid1().hex, title="Inception", reviewer="Kenneth Turan", rating=4,
           review_text="Inception is a mind-bending movie."),
    Review(review_id=uuid.uuid1().hex, title="The Lord of the Rings: The Fellowship of the Ring", reviewer="Todd McCarthy", rating=5,
           review_text="The Lord of the Rings: The Fellowship of the Ring is a stunning achievement."),
    Review(review_id=uuid.uuid1().hex, title="Star Wars: Episode IV - A New Hope", reviewer="Vincent Canby", rating=4,
           review_text="Star Wars: Episode IV - A New Hope is a thrilling adventure."),
    Review(review_id=uuid.uuid1().hex, title="The Lord of the Rings: The Return of the King", reviewer="James Berardinelli",
           rating=5, review_text="The Lord of the Rings: The Return of the King is a triumphant conclusion."),
    Review(review_id=uuid.uuid1().hex, title="The Empire Strikes Back", reviewer="Roger Ebert", rating=5,
           review_text="The Empire Strikes Back is a thrilling sequel."),
    Review(review_id=uuid.uuid1().hex, title="The Dark Knight Rises", reviewer="Peter Travers", rating=4,
           review_text="The Dark Knight Rises is a satisfying conclusion."),
    Review(review_id=uuid.uuid1().hex, title="The Matrix", reviewer="Richard Roeper", rating=4,
           review_text="The Matrix is a groundbreaking movie."),
    Review(review_id=uuid.uuid1().hex, title="The Lord of the Rings: The Two Towers", reviewer="Leonard Maltin", rating=5,
           review_text="The Lord of the Rings: The Two Towers is a thrilling adventure."),
    Review(review_id=uuid.uuid1().hex, title="One Flew Over the Cuckoo's Nest", reviewer="David Ansen",
           rating=5, review_text="One Flew Over the Cuckoo's Nest is a powerful movie."),
    Review(review_id=uuid.uuid1().hex, title="Goodfellas", reviewer="Janet Maslin",
           rating=5, review_text="Goodfellas is a masterpiece."),
    Review(review_id=uuid.uuid1().hex, title="The Usual Suspects", reviewer="Kenneth Turan",
           rating=4, review_text="The Usual Suspects is a thrilling ride."),
    Review(review_id=uuid.uuid1().hex, title="Se7en", reviewer="Todd McCarthy", rating=4,
           review_text="Se7en is a dark and disturbing movie."),
    Review(review_id=uuid.uuid1().hex, title="The Silence of the Lambs", reviewer="Vincent Canby",
           rating=5, review_text="The Silence of the Lambs is a chilling movie.")
]

router = APIRouter()


@router.get("/{title}", description="Returns a review with the given title.", tags=["Reviews"])
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
    review = next(
        (review for review in movie_reviews if review.title == title), None)
    if review is None:
        raise HTTPException(status_code=404, detail="Review not found")
    return review


@router.get("/", description="Returns a list of all reviews.", tags=["Reviews"])
def read_all_reviews():
    """Get all movie reviews.

    This endpoint returns a list of all movie reviews.

    Returns:
        List[Review]: A list of all movie reviews.

    """
    return movie_reviews


@router.post("/", response_model=Review, description="Creates a new Movie Review.", tags=["Reviews"])
def create__review(review: Review):
    """Create a new Movie review.

    This endpoint creates a new Movie Review and returns it.

    Returns:
        Review: The created Movie Review.
    """
    review.review_id = uuid.uuid1().hex
    movie_reviews.append(review)
    return review


@router.put("/{review_id}", response_model=Review, description="Updates a specific movie review by title.", tags=["Reviews"])
def update_movie_review_by_title(review_id: str, review: Review):
    """Update Movie Review by title.

    This endpoint updates a specific Movie Review record entified by its title.

    Args:
        title (str): The Title of the Movie Review record.

    Returns:
        dict: A dictionary containing the updated Movie Review record.

    """
    index = next((index for index, existing_movie_review in enumerate(
        movie_reviews) if existing_movie_review.review_id == review_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Review data not found")
    movie_reviews[index] = review
    return movie_reviews[index]


@router.delete("/{review_id}", description="Delete the movie review by title.", tags=["Reviews"])
def delete__movie_review_by_title(review_id: str):
    """Read Movie review by title.

    This endpoint deletes Movie review of a specific title.

    Args:
        Movie Id (str): The id for deleting Movie review.

    Returns:
        dict: A dictionary containing deleted Movie review.

    """
    logger.info(f"Deleting Movie Review for title : {review_id}")
    for index, existing_movie_review in enumerate(movie_reviews):
        if existing_movie_review.review_id == review_id:
            del movie_reviews[index]
            return {"detail": "DELETED!. Movie Review deleted"}
    logger.error(f"Movie Review for movie review_id {review_id} not found")
    raise HTTPException(
        status_code=404, detail=f"Movie Review for review_id {review_id} not found")