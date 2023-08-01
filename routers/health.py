from fastapi import APIRouter, HTTPException
from datetime import datetime
from typing import List
from pydantic import BaseModel
import logging
logger = logging.getLogger(__name__)

router = APIRouter()


class HealthData(BaseModel):
    id: int
    date: str
    steps: int
    calories: int
    distance: float
    heart_rate: int


health_data = [
    HealthData(id=1, date="2021-01-01", steps=10000,
               calories=2000, distance=5.0, heart_rate=70),
    HealthData(id=2, date="2021-01-02", steps=8000,
               calories=1800, distance=4.0, heart_rate=72),
    HealthData(id=3, date="2021-01-03", steps=12000,
               calories=2200, distance=6.0, heart_rate=68),
    HealthData(id=4, date="2021-01-04", steps=9000,
               calories=1900, distance=4.5, heart_rate=75),
    HealthData(id=5, date="2021-01-05", steps=11000,
               calories=2100, distance=5.5, heart_rate=71),
    HealthData(id=6, date="2021-01-06", steps=7000,
               calories=1600, distance=3.5, heart_rate=73),
    HealthData(id=7, date="2021-01-07", steps=13000,
               calories=2300, distance=7.0, heart_rate=67),
    HealthData(id=8, date="2021-01-08", steps=10000,
               calories=2000, distance=5.0, heart_rate=70),
    HealthData(id=9, date="2021-01-09", steps=8000,
               calories=1800, distance=4.0, heart_rate=72),
    HealthData(id=10, date="2021-01-10", steps=12000,
               calories=2200, distance=6.0, heart_rate=68)
]


@router.put("/health-data/{id}", response_model=HealthData, description="Updating the data", tags=["Health Data"])
def update_record(id: int, record: HealthData):
    logger.info(f"Updating record with Id {id}")
    for index, existingRec in enumerate(health_data):
        if existingRec.id == id:
            health_data[index] = record
            return record
    logger.error(f"Record not found with the id {id}")
    raise HTTPException(status_code=404, detail=f"Id {id} not found!")


# deletes a Record
@router.delete("/health-data/{id}", response_model=List[HealthData], description="Deletes the Row", tags=["Health Data"])
def delete_data_date(id: int):
    logger.info(f"Deleting record with the ID: {id}")
    for index, existingData in enumerate(health_data):
        if existingData.id == id:
            del health_data[index]
            logger.info("Record deleted!")
    return health_data

# create_record(record)
# record = HealthData(id=11,date="2021-01-10", steps=12000,calories=2200, distance=6.0, heart_rate=68)


@router.post("/health/health-data", response_model=HealthData, description="Creates a neRecord.", tags=["Health Data"])
def create_record(record: HealthData):
    for i in health_data:
        if i.id == record.id :#or i.calories == record.calories or i.heart_rate == record.heart_rate or i.steps == record.steps or i.distance == record.distance:
            logger.info("Duplicate Record!")

            raise HTTPException(404, detail="Duplicate record!")
        else:
            newId = max(record.id for record in health_data ) +1
            record.id = newId
            health_data.append(record)
            logger.info(200, "Record pushed successfully!")
            return (record)


@router.get("/health-data/{id}", response_model=HealthData, description="Returns health and fitness data for the given ID.", tags=["Health Data"])
def read_health_data_by_id(id: int):
    """Get health and fitness data for a specific ID.

    This endpoint retrieves health and fitness data for the given ID.

    Args:
        id (int): The ID for which the data is requested.

    Returns:
        HealthData: The health and fitness data for the specified ID.

    Raises:
        HTTPException: If data is not found for the given ID, a 404 error is raised.

    """
    for existingData in health_data:
        if existingData.id == id:
            return existingData
    else:
        raise HTTPException(404, detail="Record not found!")

    # try:
    #     return next((data for data in health_data if data.date == date.strftime("%Y-%m-%d")))
    # except StopIteration:
    #     raise HTTPException(status_code=404, detail="Data not found")


@router.get("/health-data", response_model=List[HealthData], description="Returns a list of all health and fitness data.", tags=["Health Data"])
def read_all_health_data():
    """Get all health and fitness data.

    This endpoint retrieves a list of all available health and fitness data.

    Returns:
        List[HealthData]: The list of all health and fitness data.

    """
    return health_data
