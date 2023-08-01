from fastapi import APIRouter, HTTPException
# from faker import Faker
from typing import Dict, Optional
from pydantic import BaseModel
import logging
logger = logging.getLogger(__name__)
# fake = Faker()

router = APIRouter()

# I'm using a dictionary to simulate a database for the example
# database: Dict[int, Dict[str, float]] = {}

# Let's create 10 geolocation records to start
# for i in range(1, 11):
#     geolocation = {"id": i, "latitude": fake.latitude(), "longitude": fake.longitude()}
#     database[i] = geolocation


class Data(BaseModel):
    id: int
    latitude: float
    longitude: float


geoData = [
    Data(id=1, latitude=50.6709, longitude=10000.654),
    Data(id=2, latitude=205.667, longitude=8000.456),
    Data(id=3, latitude=2000.0987, longitude=12000.65),
    Data(id=4, latitude=3000.456, longitude=9000.3456),
    Data(id=5, latitude=4000.3456, longitude=11000.65),
    Data(id=6, latitude=5000.456, longitude=7000.0987),
    Data(id=7, latitude=6000.6543, longitude=13000.654),
    Data(id=8, latitude=7000.3456, longitude=10000.345),
    Data(id=9, latitude=8000.345, longitude=8000.345),
    Data(id=10, latitude=9000.345, longitude=12000.345)
]


@router.get("/", description="Returns a list of all fake geolocation records.", tags=["Geolocation"])
def read_geolocation():
    """Get fake geolocation records.

    This endpoint retrieves a list of all fake geolocation records.

    Returns:
        dict: A dictionary containing the list of geolocation records.
    """
    if geoData:
        return geoData
    else:
        raise HTTPException(404,"No data found!")

@router.get("/{id}", description="Returns a specific geolocation record.", tags=["Geolocation"])
def get_geolocation(id: int):
    """Get a specific geolocation record.

    This endpoint retrieves a specific geolocation record.

    Returns:
        dict: A dictionary containing the geolocation record.
    """
    for index, existingData in enumerate(geoData):
        if existingData.id == id:
            return geoData[index]
    raise HTTPException(status_code=404, detail="Geolocation not found")



@router.post("/", description="Creates a new geolocation record and returns it.", tags=["Geolocation"])
def create_geolocation(newRecord: Data):
    """Create a new geolocation record.

    This endpoint creates a new geolocation record and returns it.

    Returns:
        dict: A dictionary containing the geolocation record.
    """
    for i in geoData:
        if i.id == newRecord.id:
            logger.info("Duplicate Record!")
        else:
            geoData.append(newRecord)
            logger.info(200, "Record pushed successfully!")
            return newRecord



@router.put("/{id}", description="Updates a specific geolocation record and returns it.", tags=["Geolocation"])
def update_geolocation(id: int, record:Data):
    """Update a specific geolocation record.

    This endpoint updates a specific geolocation record and returns it.

    Returns:
        dict: A dictionary containing the updated geolocation record.
    """
    logger.info(f"Updating record with Id {id}")
    for index, existingRec in enumerate(geoData):
        if existingRec.id == id:
            geoData[index] = record
            return record
        else:
            logger.error(f"Record not found with the id {id}")
    raise HTTPException(status_code=404, detail="Geolocation not found.")

            


@router.delete("/{id}", description="Deletes a specific geolocation record.", tags=["Geolocation"])
def delete_geolocation(id: int):
    """Delete a specific geolocation record.

    This endpoint deletes a specific geolocation record.

    Returns:
        dict: A dictionary containing a confirmation message.
    """
    for i, existingData in enumerate(geoData):
            if existingData.id == id:
                del geoData[i]
                return {"detail": "Geolocation deleted"}
    raise HTTPException(status_code=404, detail="Geolocation not found")
    
