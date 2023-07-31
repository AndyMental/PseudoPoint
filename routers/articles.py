from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import logging
import uuid

logger = logging.getLogger(__name__)


class NewsArticle(BaseModel):
    article_id : str
    title: str
    author: str
    content: str
    tags: List[str]


news_articles = [
    NewsArticle(article_id=uuid.uuid1().hex, title="New Study Shows Benefits of Exercise", author="John Smith",
                content="A new study has found that regular exercise can improve overall health and reduce the risk of chronic diseases.", tags=["exercise", "health"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="Local Restaurant Wins Award for Best Pizza", author="Jane Doe",
                content="A local restaurant has won an award for serving the best pizza in town, according to a survey of local residents.", tags=["food", "restaurants"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="New Technology Helps Blind People See", author="Bob Johnson",
                content="A new technology has been developed that can help blind people see by converting visual information into sound.", tags=["technology", "health"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="City Council Approves New Bike Lanes", author="Alice Lee",
                content="The city council has approved a plan to add new bike lanes to city streets in an effort to promote alternative transportation.", tags=["transportation", "city council"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="New Study Shows Benefits of Meditation", author="David Kim",
                content="A new study has found that regular meditation can reduce stress and improve mental health.", tags=["meditation", "mental health"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="Local High School Wins State Championship", author="Emily Chen",
                content="A local high school has won the state championship in football, capping off an undefeated season.", tags=["sports", "high school"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="New Study Shows Benefits of Eating Vegetables", author="Michael Brown",
                content="A new study has found that eating a diet rich in vegetables can improve overall health and reduce the risk of chronic diseases.", tags=["vegetables", "health"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="City Launches New Recycling Program", author="Sarah Kim",
                content="The city has launched a new recycling program aimed at reducing waste and promoting sustainability.", tags=["recycling", "sustainability"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="New Technology Helps Deaf People Hear", author="Kevin Lee",
                content="A new technology has been developed that can help deaf people hear by converting sound into visual information.", tags=["technology", "health"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="Local Artist Wins National Award", author="Olivia Wang",
                content="A local artist has won a national award for her work in painting, according to a panel of judges.", tags=["art", "awards"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="New Study Shows Benefits of Reading", author="Sophia Miller",
                content="A new study has found that reading can improve overall health and reduce the risk of chronic diseases.", tags=["reading", "health"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="City Council Approves New Dog Park", author="James Davis",
                content="The city council has approved a plan to build a new dog park in the city, according to a press release.", tags=["dogs", "city council"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="New Study Shows Benefits of Drinking Water", author="Daniel Wilson",
                content="A new study has found that drinking water can improve overall health and reduce the risk of chronic diseases.", tags=["water", "health"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="Local High School Wins State Championship", author="Emily Chen",
                content="A local high school has won the state championship in basketball, capping off an undefeated season.", tags=["sports", "high school"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="New Study Shows Benefits of Eating Fruit", author="Michael Brown",
                content="A new study has found that eating a diet rich in fruit can improve overall health and reduce the risk of chronic diseases.", tags=["fruit", "health"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="City Launches New Bike Share Program", author="Sarah Kim",
                content="The city has launched a new bike share program aimed at reducing traffic congestion and promoting alternative transportation.", tags=["transportation", "city council"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="Local High School Wins State Championship", author="Emily Chen",
                content="A local high school has won the state championship in baseball, capping off an undefeated season.", tags=["sports", "high school"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="New Study Shows Benefits of Eating Vegetables", author="Michael Brown",
                content="A new study has found that eating a diet rich in vegetables can improve overall health and reduce the risk of chronic diseases.", tags=["vegetables", "health"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="City Council Approves New Recycling Program", author="Sarah Kim",
                content="The city council has approved a plan to build a new recycling program in the city, according to a press release.", tags=["recycling", "sustainability"]),
    NewsArticle(article_id=uuid.uuid1().hex, title="New Technology Helps Deaf People Hear", author="Kevin Lee",
                content="A new technology has been developed that can help deaf people hear by converting sound into visual information.", tags=["technology", "health"])
]

router = APIRouter()


@router.get("/{title}", response_model=NewsArticle, description="Returns a news article with the given title.", tags=["News Articles"])
def read_article_by_title(title: str):
    """Get a news article by title.

    This endpoint retrieves the details of a news article based on the provided title.

    Args:
        title (str): The title of the news article.

    Returns:
        NewsArticle: The news article object containing the details.

    Raises:
        HTTPException: If the news article is not found, a 404 error is raised.

    """
    logger.info(f"Fetching article with title {title}")
    article = next(
        (article for article in news_articles if article.title == title), None)
    if article is None:
        logger.error(f"Article with title {title} not found")
        raise HTTPException(
            status_code=404, detail=f"Article with title '{title}' not found")
    return article


@router.get("/", response_model=List[NewsArticle], description="Returns a list of all news articles.", tags=["News Articles"], response_model_exclude_unset=True, response_model_exclude_defaults=True, response_model_exclude_none=True)
def read_all_articles():
    """Get all news articles.

    This endpoint retrieves a list of all available news articles.

    Returns:
        List[NewsArticle]: A list of news articles.

    """
    return news_articles


@router.post("/", response_model=NewsArticle, description="Creates a new news article.", tags=["News Articles"])
def create_article(article: NewsArticle):
    """Create a new news article.

    This endpoint creates a new news article and returns it.

    Returns:
        NewsArticle: The created news article.
    """
    article.article_id = uuid.uuid1().hex
    news_articles.append(article)
    return article


@router.put("/{article_id}", response_model=NewsArticle, description="Updates a specific news article.", tags=["News Articles"])
def update_article(article_id: str, article: NewsArticle):
    """Update a specific news article.

    This endpoint updates a specific news article and returns it.

    Args:
        article_id (str): The article_id of the news article.
        article (NewsArticle): The new article data.

    Returns:
        NewsArticle: The updated news article.

    Raises:
        HTTPException: If the news article is not found, a 404 error is raised.

    """
    logger.info(f"Updating article with article Id {article_id}")
    for index, existing_article in enumerate(news_articles):
        if existing_article.article_id == article_id:
            news_articles[index] = article
            return article
    logger.error(f"Article with article_id {article_id} not found")
    raise HTTPException(
        status_code=404, detail=f"Article with article_id '{article_id}' not found")


@router.delete("/{article_id}", description="Deletes a specific news article.", tags=["News Articles"])
def delete_article(article_id: str):
    """Delete a specific news article.

    This endpoint deletes a specific news article.

    Args:
        article Id (str): The article_id of the news article.

    Returns:
        dict: A dictionary containing a confirmation message.

    Raises:
        HTTPException: If the news article is not found, a 404 error is raised.

    """
    logger.info(f"Deleting article with article_id {article_id}")
    for index, existing_article in enumerate(news_articles):
        if existing_article.article_id == article_id:
            del news_articles[index]
            return {"detail": "Article deleted"}
    logger.error(f"Article with article_id {article_id} not found")
    raise HTTPException(
        status_code=404, detail=f"Article with article_id '{article_id}' not found")
