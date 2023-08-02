from fastapi import APIRouter, HTTPException,status
from typing import List
from pydantic import BaseModel

router = APIRouter()

class ValidationException(HTTPException):
    def __init__(self, detail: str):
        super().__init__(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=detail)

class Vehicle(BaseModel):
    vehicle_id:int
    make: str
    model: str
    year: int
    mileage: int

vehicles = [
    Vehicle(vehicle_id=1,make="Toyota", model="Camry", year=2018, mileage=50000),
    Vehicle(vehicle_id=2,make="Honda", model="Accord", year=2019, mileage=40000),
    Vehicle(vehicle_id=3,make="Ford", model="F-150", year=2020, mileage=30000),
    Vehicle(vehicle_id=4,make="Chevrolet", model="Silverado", year=2017, mileage=60000),
    Vehicle(vehicle_id=5,make="Nissan", model="Altima", year=2016, mileage=70000),
    Vehicle(vehicle_id=6,make="Jeep", model="Wrangler", year=2015, mileage=80000),
    Vehicle(vehicle_id=7,make="Dodge", model="Charger", year=2014, mileage=90000),
    Vehicle(vehicle_id=8,make="BMW", model="3 Series", year=2013, mileage=100000),
    Vehicle(vehicle_id=9,make="Mercedes-Benz", model="C-Class", year=2012, mileage=110000),
    Vehicle(vehicle_id=10,make="Audi", model="A4", year=2011, mileage=120000)
]

latest_vehicle_id=len(vehicles)

@router.get("/{vehicle_id}", response_model=Vehicle, description="Returns a vehicle by its ID.")
def read_vehicle_by_id(vehicle_id: int):
    vehicle = next((vehicle for vehicle in vehicles if vehicle.vehicle_id == vehicle_id), None)
    if vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

@router.get("/make/{make}", response_model=List[Vehicle], description="Returns a list of vehicles for the given make.")
def read_vehicles_by_make(make: str):
#     """Get vehicles by make.

#     This endpoint returns a list of vehicles for the given make.

#     Args:
#         make (str): The make of the vehicles to retrieve.

#     Returns:
#         List[Vehicle]: A list of vehicles matching the given make.

#     Raises:
#         HTTPException: If no vehicles are found for the given make.

#     """
    make_vehicles = [vehicle for vehicle in vehicles if vehicle.make == make]
    if not make_vehicles:
        raise HTTPException(status_code=404, detail="Vehicles not found")
    return make_vehicles

@router.get("/", response_model=List[Vehicle], description="Returns a list of all vehicles.")
def read_all_vehicles():
#     """Get all vehicles.

#     This endpoint returns a list of all vehicles.

#     Returns:
#         List[Vehicle]: A list of all vehicles.

#     """
    return vehicles

@router.post("/", response_model=Vehicle, description="Adds a new vehicle.", status_code=201)
def add_vehicle(vehicle: Vehicle):
    global latest_vehicle_id
    latest_vehicle_id += 1
    vehicle.vehicle_id = latest_vehicle_id
    vehicles.append(vehicle)
    return vehicle

@router.put("/{vehicle_id}", response_model=Vehicle, description="Updates an existing vehicle.")
def update_vehicle(vehicle_id: int, updated_vehicle: Vehicle):
    index = next((index for index, vehicle in enumerate(vehicles) if vehicle.vehicle_id == vehicle_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    vehicles[index] = updated_vehicle
    return updated_vehicle

@router.delete("/{vehicle_id}", response_model=Vehicle, description="Deletes a vehicle by its ID.")
def delete_vehicle(vehicle_id: int):
    index = next((index for index, vehicle in enumerate(vehicles) if vehicle.vehicle_id == vehicle_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    deleted_vehicle = vehicles.pop(index)
    return deleted_vehicle

