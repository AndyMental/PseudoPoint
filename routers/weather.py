from fastapi import APIRouter
from faker import Faker

fake = Faker()

router = APIRouter()

@router.get("/weather_data", description="Returns a list of 10 fake weather data records with unique IDs, temperature, humidity, and weather conditions.")
def read_weather_data():
    """Read weather data.

    This endpoint returns a list of 10 fake weather data records.

    Returns:
        dict: A dictionary containing the weather data records.

    """
    weather_data = []
    for i in range(1, 11):
        record = {
            "id": i,
            "temperature": fake.random_int(min=-30, max=50),
            "humidity": fake.random_int(min=0, max=100),
            "weather_condition": fake.random_element(elements=("Sunny", "Cloudy", "Rainy", "Snowy"))
        }
        weather_data.append(record)

    return {"weather_data": weather_data}

@router.put("/weather_data/{weather_id}", description="Updates a specific weather data record by ID.")
def update_weather_data_by_id(weather_id: int, temperature: int, humidity: int, weather_condition: str):
    """Update weather data by ID.

    This endpoint updates a specific weather data record identified by its ID.

    Args:
        weather_id (int): The ID of the weather data record.
        temperature (int): The updated temperature value.
        humidity (int): The updated humidity value.
        weather_condition (str): The updated weather condition.

    Returns:
        dict: A dictionary containing the updated weather data record.

    """
    weather_data = {
        "id": weather_id,
        "temperature": temperature,
        "humidity": humidity,
        "weather_condition": weather_condition
    }

    return {"updated_weather_data": weather_data}

@router.get("/weather_data/city/{city}", description="Returns the weather data for a specific city.")
def read_weather_data_by_city(city: str):
    """Read weather data by city.

    This endpoint returns the weather data for a specific city.

    Args:
        city (str): The city for which to retrieve weather data.

    Returns:
        dict: A dictionary containing the weather data for the city.

    """
    weather_data = {
        "city": city,
        "temperature": fake.random_int(min=-30, max=50),
        "humidity": fake.random_int(min=0, max=100),
        "weather_condition": fake.random_element(elements=("Sunny", "Cloudy", "Rainy", "Snowy"))
    }

    return {"weather_data": weather_data}

@router.get("/weather_data/{weather_id}", description="Returns a specific weather data record by ID.")
def read_weather_data_by_id(weather_id: int):
    """Read weather data by ID.

    This endpoint returns a specific weather data record identified by its ID.

    Args:
        weather_id (int): The ID of the weather data record.

    Returns:
        dict: A dictionary containing the weather data record.

    """
    weather_data = {
        "id": weather_id,
        "temperature": fake.random_int(min=-30, max=50),
        "humidity": fake.random_int(min=0, max=100),
        "weather_condition": fake.random_element(elements=("Sunny", "Cloudy", "Rainy", "Snowy"))
    }

    return {"weather_data": weather_data}
