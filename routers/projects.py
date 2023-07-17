from fastapi import APIRouter
from pydantic import BaseModel
from faker import Faker

fake = Faker()

class Project(BaseModel):
    id: int
    project_name: str
    company: str
    description: str

router = APIRouter()

@router.get("/", description="Returns a list of 10 fake project records with unique IDs, project names, company names, and project descriptions.")
def read_projects():
    """Get all projects.

    This endpoint returns a list of 10 fake project records with unique IDs, project names, company names, and project descriptions.

    Returns:
        dict: A dictionary containing the list of project records.

    """
    projects = [Project(id=i, project_name=fake.catch_phrase(), company=fake.company(), description=fake.text()) for i in range(1, 11)]
    return {"projects": projects}

@router.post("/", description="Creates a new project and returns a confirmation message.", status_code=201)
def create_project() -> dict:
    """Create a new project.

    This endpoint creates a new project record and returns a confirmation message.

    Returns:
        dict: A dictionary containing the confirmation message.

    """
    return {"project": "created"}

@router.put("/{project_id}", description="Updates a project with the given id and returns a confirmation message.", status_code=200)
def update_project(project_id: int) -> dict:
    """Update a project.

    This endpoint updates a project record with the given id and returns a confirmation message.

    Args:
        project_id (int): The ID of the project to update.

    Returns:
        dict: A dictionary containing the confirmation message.

    """
    return {"project": "updated"}

from fastapi import HTTPException

@router.get("/{project_id}", description="Returns a single project record with the given ID.")
def read_project(project_id: int) -> dict:
    """Get a single project.

    This endpoint returns a single project record with the given ID.

    Args:
        project_id (int): The ID of the project to get.

    Returns:
        dict: A dictionary containing the project record.

    """
    project = Project(id=project_id, project_name=fake.catch_phrase(), company=fake.company(), description=fake.text())
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"project": project}

@router.delete("/{project_id}", description="Deletes a project with the given id and returns a confirmation message.")
def delete_project(project_id: int):
    """Delete a project.

    This endpoint deletes a project record with the given id and returns a confirmation message.

    Args:
        project_id (int): The ID of the project to delete.

    Returns:
        dict: A dictionary containing the confirmation message.

    """
    return {"project": "deleted"}
