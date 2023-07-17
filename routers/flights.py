from fastapi import APIRouter, HTTPException
from typing import List, Optional

class Flight:
    def __init__(self, flight_number: str, airline: str, origin: str, destination: str, departure_time: str, arrival_time: str):
        self.flight_number = flight_number
        self.airline = airline
        self.origin = origin
        self.destination = destination
        self.departure_time = departure_time
        self.arrival_time = arrival_time

flights = [
    Flight("AA123", "American Airlines", "New York", "Los Angeles", "2022-01-01 08:00:00", "2022-01-01 11:00:00"),
    Flight("DL456", "Delta Air Lines", "Los Angeles", "New York", "2022-01-01 12:00:00", "2022-01-01 15:00:00"),
    Flight("UA789", "United Airlines", "Chicago", "San Francisco", "2022-01-01 10:00:00", "2022-01-01 13:00:00"),
    Flight("WN012", "Southwest Airlines", "Dallas", "Denver", "2022-01-01 09:00:00", "2022-01-01 10:00:00"),
    Flight("B6123", "JetBlue Airways", "Boston", "Miami", "2022-01-01 11:00:00", "2022-01-01 14:00:00"),
    Flight("AS456", "Alaska Airlines", "Seattle", "Portland", "2022-01-01 13:00:00", "2022-01-01 14:00:00"),
    Flight("F9123", "Frontier Airlines", "Denver", "Las Vegas", "2022-01-01 15:00:00", "2022-01-01 16:00:00"),
    Flight("NK456", "Spirit Airlines", "Orlando", "Newark", "2022-01-01 16:00:00", "2022-01-01 19:00:00"),
    Flight("SY789", "Sun Country Airlines", "Minneapolis", "Phoenix", "2022-01-01 14:00:00", "2022-01-01 17:00:00"),
    Flight("G0123", "Allegiant Air", "Las Vegas", "Bellingham", "2022-01-01 18:00:00", "2022-01-01 20:00:00")
]

router = APIRouter()

@router.get("/{flight_number}", response_model=Flight, description="Returns a flight with the given flight number.", tags=["Flights"])
def read_flight_by_flight_number(flight_number: str):
    """Get a flight by flight number.

    This endpoint retrieves the details of a flight based on the provided flight number.

    Args:
        flight_number (str): The flight number.

    Returns:
        Flight: The flight object containing the details.

    Raises:
        HTTPException: If the flight is not found, a 404 error is raised.

    """
    flight = next((flight for flight in flights if flight.flight_number == flight_number), None)
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
