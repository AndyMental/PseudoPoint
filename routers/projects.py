from fastapi import HTTPException
from fastapi import APIRouter
from pydantic import BaseModel
import logging
logger = logging.getLogger(__name__)
# from faker import Faker

# fake = Faker()


class Project(BaseModel):
    id: int
    project_name: str
    company: str


projectData = [
    Project(id=1, project_name="Aetrex", company="Trigent"),
    Project(id=2, project_name="CanPrev", company="Microsoft"),
    Project(id=3, project_name="elaw", company="Google"),
    Project(id=4, project_name="Navistar", company="google"),
    Project(id=5, project_name="Naptha", company="Trigent"),
    Project(id=6, project_name="WherestheBus", company="Google"),
    Project(id=7, project_name="Space", company="Adobe"),
    Project(id=8, project_name="Jupiter", company="Oracle"),
    Project(id=9, project_name="Pluto", company="Flipkart"),
    Project(id=10, project_name="Neptune", company="Ajio")
]
router = APIRouter()


@router.get("/", description="Returns a list of 10 fake project records with unique IDs, project names, company names, and project descriptions.")
def read_projects():
    """Get all projects.

    This endpoint returns a list of 10 fake project records with unique IDs, project names, company names, and project descriptions.

    Returns:
        dict: A dictionary containing the list of project records.

    """
    if projectData:
        return projectData
    else:
        raise HTTPException(status_code=404,detail="No data found")

@router.post("/", description="Creates a new project and returns a confirmation message.", status_code=201)
def create_project(newProj: Project) -> dict:
    """Create a new project.

    This endpoint creates a new project record and returns a confirmation message.

    Returns:
        dict: A dictionary containing the confirmation message.

    """
    for i in projectData:
        if i.id == newProj.id:
            logger.info("Duplication not allowed!")
    else:
        projectData.append(newProj)
        logger.info(200, "Project pushed successfully")
        return newProj

# NW


@router.put("/{id}", description="Updates a project with the given id and returns a confirmation message.", status_code=200)
def update_project(id: int, projRecord:Project):
    """Update a project.

    This endpoint updates a project record with the given id and returns a confirmation message.

    Args:
        project_id (int): The ID of the project to update.

    Returns:
        dict: A dictionary containing the confirmation message.

    """
    # def update_record(id: int, record: HealthData):
    # logger.info(f"Updating record with Id {id}")
    # for index, existingRec in enumerate(health_data):
    #     if existingRec.id == id:
    #         health_data[index] = record
    #         return record
    # logger.error(f"Record not found with the id {id}")
    # raise HTTPException(status_code=404, detail=f"Id {id} not found!")
    logger.info(f"Updating record with Id {id}")
    for index, existingData in enumerate(projectData):
        if existingData.id == id:
            projectData[index] = projRecord
            return projRecord
    logger.error(f"Record not found with id {id}")
    raise HTTPException(status_code=404,detail="f{id} not found!")
    


@router.get("/{id}", description="Returns a single project record with the given ID.")
def read_project(id: int) -> dict:
    """Get a single project.

    This endpoint returns a single project record with the given ID.

    Args:
        project_id (int): The ID of the project to get.

    Returns:
        dict: A dictionary containing the project record.

    """
    for index, existingData in enumerate(projectData):
        if existingData.id == id:
            return projectData[index]
    raise HTTPException(status_code=404, detail="Project not found")


@router.delete("/{id}", description="Deletes a project with the given id and returns a confirmation message.")
def delete_project(id: int):
    """Delete a project.

    This endpoint deletes a project record with the given id and returns a confirmation message.

    Args:
        project_id (int): The ID of the project to delete.

    Returns:
        dict: A dictionary containing the confirmation message.

    """
    for i, existingData in enumerate(projectData):
        if existingData.id == id:
            del projectData[i]
            return {"detail": "Project deleted"}
    else:
        raise HTTPException(status_code=404, detail="Project not found")
