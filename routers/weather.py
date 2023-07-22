from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import uuid
import logging
from typing import List


router = APIRouter()


logger = logging.getLogger(__name__)


class Weather_details(BaseModel):
    weather_id: str
    temperature: int
    humidity: int
    weather_condition: str
    city: str


weather_data = [
    Weather_details(weather_id=uuid.uuid1().hex, temperature=31, humidity=40,
                    weather_condition="sunny", city="jammu"),
    Weather_details(weather_id=uuid.uuid1().hex, temperature=32, humidity=50,
                    weather_condition="rain", city="mumbai"),
    Weather_details(weather_id=uuid.uuid1().hex, temperature=35, humidity=65,
                    weather_condition="cloudy", city="pune"),
    Weather_details(weather_id=uuid.uuid1().hex, temperature=44, humidity=45,
                    weather_condition="sunny", city="delhi"),
    Weather_details(weather_id=uuid.uuid1().hex, temperature=14, humidity=85,
                    weather_condition="snow", city="barcelona"),
    Weather_details(weather_id=uuid.uuid1().hex, temperature=4, humidity=45,
                    weather_condition="windy", city="new york"),
    Weather_details(weather_id=uuid.uuid1().hex, temperature=40, humidity=35,
                    weather_condition="sunny", city="california"),
    Weather_details(weather_id=uuid.uuid1().hex, temperature=-4, humidity=25,
                    weather_condition="snow", city="london"),
    Weather_details(weather_id=uuid.uuid1().hex, temperature=29, humidity=95,
                    weather_condition="thunderstorm", city="bengaluru"),
]


@router.get("/weather_data", response_model=List[Weather_details], description="Returns a list of 10 fake weather data records with unique IDs, temperature, humidity, and weather conditions.", tags=["Weather"])
def read_weather_data():
    """Read weather data.

    This endpoint returns a list of 10 fake weather data records.

    Returns:
        dict: A dictionary containing the weather data records.

    """

    return weather_data


@router.get("/weather_data/{city}", response_model=Weather_details, description="Returns the weather data for a specific city.", tags=["Weather"])
def read_weather_data_by_city(city: str):
    """Read weather data by city.

    This endpoint returns the weather data for a specific city.

    Args:
        city (str): The city for which to retrieve weather data.

    Returns:
        dict: A dictionary containing the weather data for the city.

    """
    weather = next(
        (weather for weather in weather_data if weather.city == city), None)
    if weather is None:
        logger.error(f"Weather with city {city} not found")
        raise HTTPException(
            status_code=404, detail=f"Weather with city '{city}' not found")
    return weather


@router.get("/weather_data/{weather_id}", response_model=Weather_details, description="Returns a specific weather data record by ID.", tags=["Weather"])
def read_weather_data_by_id(weather_id: str):
    """Read weather data by ID.

    This endpoint returns a specific weather data record identified by its ID.

    Args:
        weather_id (str): The ID of the weather data record.

    Returns:
        dict: A dictionary containing the weather data record.

    """
    weather = next(
        (weather for weather in weather_data if weather.id == weather_id), None)
    if weather is None:
        logger.error(f"Weather with id {weather_id} not found")
        raise HTTPException(
            status_code=404, detail=f"Weather with id '{weather_id}' not found")
    return weather


@router.post("/weather_data", response_model=Weather_details, description="Creates a new weather Details.", tags=["Weather"])
def create_weather_details(weather_details: Weather_details):
    """Create a new Weather Data.

    This endpoint creates a new Weather Data and returns it.

    Returns:
        Weather Details: The created Weather Data.
    """
    weather_details.weather_id = uuid.uuid1().hex
    weather_data.append(weather_details)
    return weather_details


@router.put("/weather_data/{weather_id}", response_model=Weather_details, description="Updates a specific weather data record by ID.", tags=["Weather"])
def update_weather_data_by_id(weather_id: str, weather_details: Weather_details):
    """Update weather data by ID.

    This endpoint updates a specific weather data record identified by its ID.

    Args:
        weather_id (str): The ID of the weather data record.
        weather details : Weather detials for specific id.

    Returns:
        dict: A dictionary containing the updated weather data record.

    """
    index = next((index for index, existing_weather_details in enumerate(
        weather_data) if existing_weather_details.weather_id == weather_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Weather data not found")
    weather_data[index] = weather_details
    return weather_data[index]


@router.delete("/weather_data/{weather_id}", description="Delete the weather data for a specific id.", tags=["Weather"])
def delete_weather_data_by_id(weather_id: str):
    """Read weather data by city.

    This endpoint deletes weather data of a specific city.

    Args:
        Weather Id (str): The id for deleting weather data.

    Returns:
        dict: A dictionary containing deleted weather data.

    """
    logger.info(f"Deleting weather data for weather id: {weather_id}")
    for index, existing_weather_data in enumerate(weather_data):
        if existing_weather_data.weather_id == weather_id:
            del weather_data[index]
            return {"detail": "DELETED!. Weather Details deleted"}
    logger.error(f"Weather data for weather_id:{weather_id} not found")
    raise HTTPException(
        status_code=404, detail=f"Weather data for weather_id:{weather_id} not found")
