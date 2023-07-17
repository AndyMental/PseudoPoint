from fastapi import APIRouter, HTTPException
from faker import Faker
from typing import Dict, Optional

fake = Faker()

router = APIRouter()

# I'm using a dictionary to simulate a database for the example
database: Dict[int, Dict[str, float]] = {}

# Let's create 10 geolocation records to start
for i in range(1, 11):
    geolocation = {"id": i, "latitude": fake.latitude(), "longitude": fake.longitude()}
    database[i] = geolocation

@router.get("/", description="Returns a list of all fake geolocation records.", tags=["Geolocation"])
def read_geolocation():
    """Get fake geolocation records.

    This endpoint retrieves a list of all fake geolocation records.

    Returns:
        dict: A dictionary containing the list of geolocation records.
    """
    geolocations = [value for key, value in database.items()]
    return {"geolocations": geolocations}

@router.get("/{geolocation_id}", description="Returns a specific geolocation record.", tags=["Geolocation"])
def get_geolocation(geolocation_id: int):
    """Get a specific geolocation record.

    This endpoint retrieves a specific geolocation record.

    Returns:
        dict: A dictionary containing the geolocation record.
    """
    geolocation = database.get(geolocation_id)
    if not geolocation:
        raise HTTPException(status_code=404, detail="Geolocation not found")
    return {"geolocation": geolocation}

@router.post("/", description="Creates a new geolocation record and returns it.", tags=["Geolocation"])
def create_geolocation():
    """Create a new geolocation record.

    This endpoint creates a new geolocation record and returns it.

    Returns:
        dict: A dictionary containing the geolocation record.
    """
    id = len(database) + 1
    geolocation = {"id": id, "latitude": fake.latitude(), "longitude": fake.longitude()}
    database[id] = geolocation
    return {"geolocation": geolocation}

@router.put("/{geolocation_id}", description="Updates a specific geolocation record and returns it.", tags=["Geolocation"])
def update_geolocation(geolocation_id: int, latitude: Optional[float] = None, longitude: Optional[float] = None):
    """Update a specific geolocation record.

    This endpoint updates a specific geolocation record and returns it.

    Returns:
        dict: A dictionary containing the updated geolocation record.
    """
    geolocation = database.get(geolocation_id)
    if not geolocation:
        raise HTTPException(status_code=404, detail="Geolocation not found")
    if latitude is not None:
        geolocation["latitude"] = latitude
    if longitude is not None:
        geolocation["longitude"] = longitude
    database[geolocation_id] = geolocation
    return {"geolocation": geolocation}

@router.delete("/{geolocation_id}", description="Deletes a specific geolocation record.", tags=["Geolocation"])
def delete_geolocation(geolocation_id: int):
    """Delete a specific geolocation record.

    This endpoint deletes a specific geolocation record.

    Returns:
        dict: A dictionary containing a confirmation message.
    """
    if geolocation_id not in database:
        raise HTTPException(status_code=404, detail="Geolocation not found")
    del database[geolocation_id]
    return {"detail": "Geolocation deleted"}
