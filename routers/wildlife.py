from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

class WildlifeSighting(BaseModel):
    species: str
    location: str
    date: str

wildlife_sightings = [
    WildlifeSighting(species="Bald Eagle", location="Yellowstone National Park", date="2021-07-01"),
    WildlifeSighting(species="Grizzly Bear", location="Glacier National Park", date="2021-06-15"),
    WildlifeSighting(species="Moose", location="Grand Teton National Park", date="2021-06-30"),
    WildlifeSighting(species="Gray Wolf", location="Yellowstone National Park", date="2021-07-05"),
    WildlifeSighting(species="Mountain Lion", location="Rocky Mountain National Park", date="2021-07-10"),
    WildlifeSighting(species="Bison", location="Yellowstone National Park", date="2021-07-02"),
    WildlifeSighting(species="Elk", location="Rocky Mountain National Park", date="2021-07-08"),
    WildlifeSighting(species="Pronghorn", location="Grand Teton National Park", date="2021-07-12"),
    WildlifeSighting(species="Black Bear", location="Glacier National Park", date="2021-06-20"),
    WildlifeSighting(species="Bighorn Sheep", location="Rocky Mountain National Park", date="2021-07-14")
]

router = APIRouter()

@router.get("/sightings/{species}", response_model=List[WildlifeSighting], description="Returns a list of wildlife sightings for the given species.")
def read_sightings_by_species(species: str):
    """Get wildlife sightings for a specific species.

    This endpoint retrieves a list of wildlife sightings for the specified species.

    Args:
        species (str): The species to search for.

    Returns:
        List[WildlifeSighting]: A list of wildlife sightings for the specified species.

    Raises:
        HTTPException: Raised if no sightings are found for the species.

    """
    species = species.lower()
    species_sightings = [sighting for sighting in wildlife_sightings if sighting.species.lower() == species]
    if not species_sightings:
        raise HTTPException(status_code=404, detail="Sightings not found")
    return species_sightings

@router.get("/sightings", response_model=List[WildlifeSighting], description="Returns a list of all wildlife sightings.")
def read_all_sightings():
    """Get all wildlife sightings.

    This endpoint retrieves a list of all wildlife sightings.

    Returns:
        List[WildlifeSighting]: A list of all wildlife sightings.

    """
    return wildlife_sightings