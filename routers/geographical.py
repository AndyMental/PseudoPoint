from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from math import radians, sin, cos, sqrt, atan2

class Location(BaseModel):
    latitude: float
    longitude: float

class Feature(BaseModel):
    id:int
    name: str
    location: Location

geographical_features = [
    Feature(id=1,name="Mount Everest", location=Location(latitude=27.988056, longitude=86.925278)),
    Feature(id=2,name="Grand Canyon", location=Location(latitude=36.106944, longitude=-112.1125)),
    Feature(id=3,name="Great Barrier Reef", location=Location(latitude=-18.286111, longitude=147.7)),
    Feature(id=4,name="Niagara Falls", location=Location(latitude=43.082778, longitude=-79.074722)),
    Feature(id=5,name="Machu Picchu", location=Location(latitude=-13.163056, longitude=-72.545556)),
    Feature(id=5,name="Victoria Falls", location=Location(latitude=-17.924722, longitude=25.8575)),
    Feature(id=6,name="Yellowstone National Park", location=Location(latitude=44.428, longitude=-110.588)),
    Feature(id=7,name="Galapagos Islands", location=Location(latitude=-0.9, longitude=-89.6)),
    Feature(id=8,name="Uluru / Ayers Rock", location=Location(latitude=-25.344722, longitude=131.036667)),
    Feature(id=9,name="Serengeti National Park", location=Location(latitude=-2.333333, longitude=34.833333))
]

router = APIRouter()


@router.get("/geographical_features", response_model=list[Feature], description="Returns the list of geographical features.")
def get_geographical_features():
    return geographical_features


@router.post("/features", description="Creates a new geographical feature.", tags=["Geographical Features"])
def create_feature(feature: Feature):
    if any(existing_feature.name == feature.name for existing_feature in geographical_features):
        raise HTTPException(status_code=400, detail="Feature with this name already exists")
    newid=max(feature.id for feature in geographical_features)+1
    feature.id=newid
    geographical_features.append(feature)
    return feature


@router.get("/features", response_model=List[Feature], description="Returns a list of geographical features near the given location.", tags=["Geographical Features"])
def read_features_near_location(location: Location, radius: float = 100):
    """Get geographical features near a location.

    This endpoint retrieves a list of geographical features that are within the specified radius of the given location.

    Args:
        location (Location): The center location.
        radius (float, optional): The radius in kilometers. Defaults to 100.

    Returns:
        List[Feature]: A list of geographical feature objects.

    """
    features_near_location = [feature for feature in geographical_features if distance(feature.location, location) <= radius]
    return features_near_location

@router.put("/features/{id}", response_model=Feature, description="Updates a specific geographical feature.", tags=["Geographical Features"])
def update_feature(id:int, feature: Feature):
    for index, existing_feature in enumerate(geographical_features):
        if existing_feature.id == id:
            geographical_features[index] = feature
            return feature
    raise HTTPException(status_code=404, detail="Feature not found")

@router.delete("/features/{id}", description="Deletes a specific geographical feature.", tags=["Geographical Features"])
def delete_feature(id:int):
    global geographical_features 
    index_to_delete = None
    for index, feature in enumerate(geographical_features):
        if feature.id == id:
            index_to_delete = index
            break

    if index_to_delete is not None:
        del geographical_features[index_to_delete]
        return {"detail": "Feature deleted"}
    else:
        raise HTTPException(status_code=404, detail="Feature not found")

def distance(location1: Location, location2: Location) -> float:
    """Calculate the distance between two locations using the haversine formula.

    Args:
        location1 (Location): The first location.
        location2 (Location): The second location.

    Returns:
        float: The distance in kilometers.

    """
    # approximate radius of the Earth in km
    R = 6373.0

    lat1 = radians(location1.latitude)
    lon1 = radians(location1.longitude)
    lat2 = radians(location2.latitude)
    lon2 = radians(location2.longitude)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c

    return distance
