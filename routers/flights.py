from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel
import uuid
import logging

logger = logging.getLogger(__name__)


class Flight(BaseModel):
    flight_id: str
    flight_number: str
    airline: str
    origin: str
    destination: str
    departure_time: str
    arrival_time: str


flights = [
    Flight(flight_id=uuid.uuid1().hex, flight_number="AA123", airline="American Airlines", origin="New York", destination="Los Angeles",
           departure_time="2022-01-01 08:00:00", arrival_time="2022-01-01 11:00:00"),
    Flight(flight_id=uuid.uuid1().hex, flight_number="DL456", airline="Delta Air Lines", origin="Los Angeles", destination="New York",
           departure_time="2022-01-01 12:00:00", arrival_time="2022-01-01 15:00:00"),
    Flight(flight_id=uuid.uuid1().hex, flight_number="UA789", airline="United Airlines", origin="Chicago", destination="San Francisco",
           departure_time="2022-01-01 10:00:00", arrival_time="2022-01-01 13:00:00"),
    Flight(flight_id=uuid.uuid1().hex, flight_number="WN012", airline="Southwest Airlines", origin="Dallas", destination="Denver",
           departure_time="2022-01-01 09:00:00", arrival_time="2022-01-01 10:00:00"),
    Flight(flight_id=uuid.uuid1().hex, flight_number="B6123", airline="JetBlue Airways", origin="Boston", destination="Miami",
           departure_time="2022-01-01 11:00:00", arrival_time="2022-01-01 14:00:00"),
    Flight(flight_id=uuid.uuid1().hex, flight_number="AS456", airline="Alaska Airlines", origin="Seattle", destination="Portland",
           departure_time="2022-01-01 13:00:00", arrival_time="2022-01-01 14:00:00"),
    Flight(flight_id=uuid.uuid1().hex, flight_number="F9123", airline="Frontier Airlines", origin="Denver", destination="Las Vegas",
           departure_time="2022-01-01 15:00:00", arrival_time="2022-01-01 16:00:00"),
    Flight(flight_id=uuid.uuid1().hex, flight_number="NK456", airline="Spirit Airlines", origin="Orlando", destination="Newark",
           departure_time="2022-01-01 16:00:00", arrival_time="2022-01-01 19:00:00"),
    Flight(flight_id=uuid.uuid1().hex, flight_number="SY789", airline="Sun Country Airlines", origin="Minneapolis", destination="Phoenix",
           departure_time="2022-01-01 14:00:00", arrival_time="2022-01-01 17:00:00"),
    Flight(flight_id=uuid.uuid1().hex, flight_number="G0123", airline="Allegiant Air", origin="Las Vegas", destination="Bellingham",
           departure_time="2022-01-01 18:00:00", arrival_time="2022-01-01 20:00:00")
]

router = APIRouter()


@router.get("/{flight_id}", response_model=Flight, description="Returns a flight with the given flight ID.",
            tags=["Flights"])
def read_flight_by_flight_id(flight_id: str):
    """Get a flight by flight id.

    This endpoint retrieves the details of a flight based on the provided flight ID.

    Args:
        flight_id (str): The flight ID.

    Returns:
        Flight: The flight object containing the details.

    Raises:
        HTTPException: If the flight is not found, a 404 error is raised.

    """
    flight = next(
        (flight for flight in flights if flight.flight_id == flight_id), None)
    if flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")
    return flight


@router.get("/", response_model=List[Flight], description="Returns a list of all flights.", tags=["Flights"])
def read_all_flights():
    """Get all flights.

    This endpoint returns a list of all available flights.

    Returns:
        List[Flight]: A list of flight objects containing the details.

    """
    return flights


@router.post("/", description="Returns the details of flight", tags=['Flights'])
def add_flight(flight: Flight):
    """Add a flight to flights list.

  This endpoint adds a flight to flights List.

  Args:
    FLight dict you need to to add to existing list.

    Returns:
        FLight: The added flight dictionary.

    Raises:
        HTTPException: If the flight dict is 
#     """
    logger.info(flight)
    flight.flight_id = uuid.uuid1().hex
    # logger.info(flight)
    flights.append(flight)
    return flight


# @router.delete("/", response_model=Flight, description="Returns teh deleted flight data", tags=['Flights'])
# def delete_flight():
# #     print(flight_id)
# #     for i in range(len(flights)):
# #         if flights[i]['flight_id'] == flight_id:
# #             del flights[i]
# #             break
#     return flights


@router.delete("/{flight_id}", description="Deletes a specific flight.", tags=["Flights"])
def delete_article(flight_id:str):
    """Delete a specific flight.

    This endpoint deletes a specific flight.

    Returns:
        dict: A dictionary containing a confirmation message.
    """
    for index, existing_flight in enumerate(flights):
        if existing_flight.flight_id == flight_id:
            del flights[index]
            return {"detail": "Flight deleted"}
    raise HTTPException(status_code=404, detail="Flight not found")

@router.put("/{flight_id}", response_model=Flight, description="Update a specific flight details", tags=["Flights"])
def update_flights(flight_id: str, flight_dict: Flight):
    """Update an existing flight details.

  This endpoint updates the details of an existing flight details.

    Args:
        flight_id (str): The flight ID of the flight to update.
        flight (Flight): The flight object containing the updated details.

    Returns:
        FLight: The updated flight object.

    Raises:
        HTTPException: If the flight is not found, a 404 error is raised.
#     """
    index = next((index for index, existing_flight in enumerate(flights) if existing_flight.flight_id == flight_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Event not found")
    flights[index] = flight_dict
    return flights[index]