from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

class OnlineCourse(BaseModel):
    title: str
    instructor: str
    description: str
    price: float
    duration: int
    prerequisites: List[str]

online_courses = [
    OnlineCourse(title="Introduction to Python", instructor="John Smith", description="Learn the basics of Python programming in this introductory course.", price=99.99, duration=30, prerequisites=["None"]),
    OnlineCourse(title="Web Development with HTML and CSS", instructor="Jane Doe", description="Learn how to build websites using HTML and CSS in this hands-on course.", price=149.99, duration=60, prerequisites=["None"]),
    OnlineCourse(title="Data Science with Python", instructor="Bob Johnson", description="Learn how to analyze and visualize data using Python in this comprehensive course.", price=199.99, duration=90, prerequisites=["Introduction to Python"]),
    OnlineCourse(title="JavaScript for Beginners", instructor="Alice Lee", description="Learn the fundamentals of JavaScript programming in this beginner-friendly course.", price=79.99, duration=20, prerequisites=["None"]),
    OnlineCourse(title="Machine Learning with Python", instructor="David Kim", description="Learn how to build and train machine learning models using Python in this advanced course.", price=299.99, duration=120, prerequisites=["Data Science with Python"]),
    OnlineCourse(title="React Native Development", instructor="Emily Chen", description="Learn how to build mobile apps using React Native in this cutting-edge course.", price=249.99, duration=90, prerequisites=["Web Development with HTML and CSS"]),
    OnlineCourse(title="Advanced Python Programming", instructor="Michael Brown", description="Take your Python skills to the next level with this advanced course on Python programming.", price=149.99, duration=60, prerequisites=["Introduction to Python"]),
    OnlineCourse(title="Full-Stack Web Development", instructor="Sarah Kim", description="Learn how to build full-stack web applications using the latest web technologies in this comprehensive course.", price=399.99, duration=180, prerequisites=["Web Development with HTML and CSS"]),
    OnlineCourse(title="Artificial Intelligence with Python", instructor="Kevin Lee", description="Learn how to build intelligent systems using Python in this cutting-edge course on artificial intelligence.", price=349.99, duration=120, prerequisites=["Data Science with Python"]),
    OnlineCourse(title="React Development", instructor="Olivia Wang", description="Learn how to build web applications using React in this comprehensive course on React development.", price=199.99, duration=90, prerequisites=["Web Development with HTML and CSS"])
]

@router.get("/{title}", response_model=OnlineCourse, description="Get an online course by title", tags=["Courses"])
def read_course_by_title(title: str):
    """Get an online course by title.

    This endpoint retrieves the details of an online course based on the provided title.

    Args:
        title (str): The title of the course.

    Returns:
        OnlineCourse: The course object containing the details.

    Raises:
        HTTPException: If the course is not found, a 404 error is raised.

    """
    logger.info(f"Fetching course with title {title}")
    course = next((course for course in online_courses if course.title == title), None)
    if course is None:
        logger.error(f"Course with title {title} not found")
        raise HTTPException(status_code=404, detail=f"Course with title '{title}' not found")
    return course

@router.get("/", response_model=List[OnlineCourse], description="Get a list of all online courses", tags=["Courses"])
def read_all_courses():
    """Get a list of all online courses.

    This endpoint returns a list of all available online courses.

    Returns:
        List[OnlineCourse]: A list containing all the online courses.

    """
    return online_courses

@router.post("/", response_model=OnlineCourse, description="Creates a new online course.", status_code=201, tags=["Courses"])
def create_course(course: OnlineCourse):
    """Creates a new online course.

    This endpoint creates a new online course and adds it to the list.

    Args:
        course (OnlineCourse): The course object to create.

    Returns:
        OnlineCourse: The created course object.

    """
    online_courses.append(course)
    return course


@router.put("/{title}", response_model=OnlineCourse, description="Updates an existing online course.", tags=["Courses"])
def update_course(title: str, course: OnlineCourse):
    """Update a specific online course.

    This endpoint updates a specific online course and returns it.

    Args:
        title (str): The title of the course.
        course (OnlineCourse): The new course data.

    Returns:
        OnlineCourse: The updated course.

    Raises:
        HTTPException: If the course is not found, a 404 error is raised.

    """
    logger.info(f"Updating course with title {title}")
    for index, existing_course in enumerate(online_courses):
        if existing_course.title == title:
            online_courses[index] = course
            return course
    logger.error(f"Course with title {title} not found")
    raise HTTPException(status_code=404, detail=f"Course with title '{title}' not found")

@router.delete("/{title}", description="Deletes a specific online course.", tags=["Courses"])
def delete_course(title: str):
    """Delete a specific online course.

    This endpoint deletes a specific online course.

    Args:
        title (str): The title of the course.

    Returns:
        dict: A dictionary containing a confirmation message.

    Raises:
        HTTPException: If the course is not found, a 404 error is raised.

    """
    logger.info(f"Deleting course with title {title}")
    for index, existing_course in enumerate(online_courses):
        if existing_course.title == title:
            del online_courses[index]
            return {"detail": "Course deleted"}
    logger.error(f"Course with title {title} not found")
    raise HTTPException(status_code=404, detail=f"Course with title '{title}' not found")