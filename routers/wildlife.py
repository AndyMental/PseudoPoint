from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

class WildlifeSighting(BaseModel):
    id:int
    species: str
    location: str
    date: str

wildlife_sightings = [
    WildlifeSighting(id=1,species="Bald Eagle", location="Yellowstone National Park", date="2021-07-01"),
    WildlifeSighting(id=2,species="Grizzly Bear", location="Glacier National Park", date="2021-06-15"),
    WildlifeSighting(id=3,species="Moose", location="Grand Teton National Park", date="2021-06-30"),
    WildlifeSighting(id=4,species="Gray Wolf", location="Yellowstone National Park", date="2021-07-05"),
    WildlifeSighting(id=5,species="Mountain Lion", location="Rocky Mountain National Park", date="2021-07-10"),
    WildlifeSighting(id=6,species="Bison", location="Yellowstone National Park", date="2021-07-02"),
    WildlifeSighting(id=7,species="Elk", location="Rocky Mountain National Park", date="2021-07-08"),
    WildlifeSighting(id=8,species="Pronghorn", location="Grand Teton National Park", date="2021-07-12"),
    WildlifeSighting(id=9,species="Black Bear", location="Glacier National Park", date="2021-06-20"),
    WildlifeSighting(id=10,species="Bighorn Sheep", location="Rocky Mountain National Park", date="2021-07-14"),
    WildlifeSighting(id=11,species="Saif Pasham", location="Vijaynagar", date="2021-07-14"),

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


@router.put("/{id}",response_model=WildlifeSighting,description="updated a species.",tags=["WildlifeSighting"])
def update_species(id:int,update:WildlifeSighting):
    for index, existing_species in enumerate(wildlife_sightings):
        if existing_species.id==id:
            wildlife_sightings[index]=update
            return update
    raise HTTPException(status_code=404,detail="Article Not Found")




@router.delete("/{id}", description="Delete a particular species", tags=["WildlifeSighting"])
def delete_species(id:int):
    global wildlife_sightings
    for index, existing_species in enumerate(wildlife_sightings):
        if existing_species.id == id:
            del wildlife_sightings[index]
            return "The item removed succesfully"
    else:
        raise HTTPException(status_code=200, detail="Species not found for deletion")


@router.post("/post", response_model=WildlifeSighting, description="Create a new species", tags=["WildlifeSighting"])
def create_species(species: WildlifeSighting):
    try:
        newid=max(species.id for species in wildlife_sightings)+1
        species.id=newid
        wildlife_sightings.append(species)
        return species
        # return  "Data Added Successfully"
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=422, detail="Unprocessable Entity")