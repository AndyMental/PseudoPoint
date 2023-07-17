from fastapi import APIRouter, HTTPException
from datetime import datetime
from typing import List
from pydantic import BaseModel

router = APIRouter()

class HealthData(BaseModel):
    date: str
    steps: int
    calories: int
    distance: float
    heart_rate: int

health_data = [
    HealthData(date="2021-01-01", steps=10000, calories=2000, distance=5.0, heart_rate=70),
    HealthData(date="2021-01-02", steps=8000, calories=1800, distance=4.0, heart_rate=72),
    HealthData(date="2021-01-03", steps=12000, calories=2200, distance=6.0, heart_rate=68),
    HealthData(date="2021-01-04", steps=9000, calories=1900, distance=4.5, heart_rate=75),
    HealthData(date="2021-01-05", steps=11000, calories=2100, distance=5.5, heart_rate=71),
    HealthData(date="2021-01-06", steps=7000, calories=1600, distance=3.5, heart_rate=73),
    HealthData(date="2021-01-07", steps=13000, calories=2300, distance=7.0, heart_rate=67),
    HealthData(date="2021-01-08", steps=10000, calories=2000, distance=5.0, heart_rate=70),
    HealthData(date="2021-01-09", steps=8000, calories=1800, distance=4.0, heart_rate=72),
    HealthData(date="2021-01-10", steps=12000, calories=2200, distance=6.0, heart_rate=68)
]

@router.get("/health-data/{date}", response_model=HealthData, description="Returns health and fitness data for the given date.", tags=["Health Data"])
def read_health_data_by_date(date: datetime = datetime.strptime("1970-01-01", "%Y-%m-%d")):
    """Get health and fitness data for a specific date.

    This endpoint retrieves health and fitness data for the given date.

    Args:
        date (datetime): The date for which the data is requested. (default: 1970-01-01)

    Returns:
        HealthData: The health and fitness data for the specified date.

    Raises:
        HTTPException: If data is not found for the given date, a 404 error is raised.

    """
    try:
        return next((data for data in health_data if data.date == date.strftime("%Y-%m-%d")))
    except StopIteration:
        raise HTTPException(status_code=404, detail="Data not found")

@router.get("/health-data", response_model=List[HealthData], description="Returns a list of all health and fitness data.", tags=["Health Data"])
def read_all_health_data():
    """Get all health and fitness data.

    This endpoint retrieves a list of all available health and fitness data.

    Returns:
        List[HealthData]: The list of all health and fitness data.

    """
    return health_data
