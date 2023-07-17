from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel

router = APIRouter()

class Vehicle(BaseModel):
    make: str
    model: str
    year: int
    mileage: int

vehicles = [
    Vehicle(make="Toyota", model="Camry", year=2018, mileage=50000),
    Vehicle(make="Honda", model="Accord", year=2019, mileage=40000),
    Vehicle(make="Ford", model="F-150", year=2020, mileage=30000),
    Vehicle(make="Chevrolet", model="Silverado", year=2017, mileage=60000),
    Vehicle(make="Nissan", model="Altima", year=2016, mileage=70000),
    Vehicle(make="Jeep", model="Wrangler", year=2015, mileage=80000),
    Vehicle(make="Dodge", model="Charger", year=2014, mileage=90000),
    Vehicle(make="BMW", model="3 Series", year=2013, mileage=100000),
    Vehicle(make="Mercedes-Benz", model="C-Class", year=2012, mileage=110000),
    Vehicle(make="Audi", model="A4", year=2011, mileage=120000)
]

@router.get("/vehicles/{make}", response_model=List[Vehicle], description="Returns a list of vehicles for the given make.")
def read_vehicles_by_make(make: str):
    """Get vehicles by make.

    This endpoint returns a list of vehicles for the given make.

    Args:
        make (str): The make of the vehicles to retrieve.

    Returns:
        List[Vehicle]: A list of vehicles matching the given make.

    Raises:
        HTTPException: If no vehicles are found for the given make.

    """
    make_vehicles = [vehicle for vehicle in vehicles if vehicle.make == make]
    if not make_vehicles:
        raise HTTPException(status_code=404, detail="Vehicles not found")
    return make_vehicles

@router.get("/vehicles", response_model=List[Vehicle], description="Returns a list of all vehicles.")
def read_all_vehicles():
    """Get all vehicles.

    This endpoint returns a list of all vehicles.

    Returns:
        List[Vehicle]: A list of all vehicles.

    """
    return vehicles
