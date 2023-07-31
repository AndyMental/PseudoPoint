from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from typing import Dict

router = APIRouter()


class WeightConversionRequest(BaseModel):
    weight: float


class WeightConversionResponse(BaseModel):
    celestial_object: str
    weight: float



conversion_factors = {
    "Mercury": 0.378,
    "Venus": 0.907,
    "Mars": 0.377,
    "Jupiter": 2.36,
    "Saturn": 0.916,
    "Uranus": 0.889,
    "Neptune": 1.12,
    "Moon": 0.165,
    "Sun": 27.9,
    "Sirius": 1.03,
    "Alpha Centauri A": 1.1,
    "Alpha Centauri B": 0.907
}

weight_on_celestial_objects = []


@router.post("/weight_conversion", response_model=List[WeightConversionResponse], description="Converts weight from Earth to other celestial objects.")
def convert_weight(weight_request: WeightConversionRequest):
    """Convert weight from Earth to other celestial objects.

    This endpoint takes a weight value in kilograms on Earth and converts it to the weights on various celestial objects.

    Args:
        weight_request (WeightConversionRequest): The weight conversion request containing the weight on Earth.

    Returns:
        List[WeightConversionResponse]: A list of weight conversion responses containing the celestial object names and their respective weights.

    """
    weight = weight_request.weight

    for celestial_object, factor in conversion_factors.items():
        weight_on_object = weight * factor
        weight_on_celestial_objects.append(WeightConversionResponse(
            celestial_object=celestial_object, weight=weight_on_object))

    return weight_on_celestial_objects


@router.get("/{celestial}", response_model=WeightConversionResponse, description="Getting for a ")
def read_celestial(celestial: str, weight: float):
    if celestial not in conversion_factors:
        raise HTTPException(
            status_code=404, detail="Celestial object not found")
    weight_on_object = weight * conversion_factors[celestial]
    return WeightConversionResponse(celestial_object=celestial, weight=weight_on_object)


@router.post("/add_celestial_factor", description="Add a new celestial object and its conversion factor.")
def add_celestial_factor(data: WeightConversionResponse):
    if data.celestial_object in conversion_factors:
        raise HTTPException(
            status_code=400, detail="Celestial object already exists.")
    return data

@router.put("/edit_celestial/{celestial}", response_model=WeightConversionResponse, description="Edit a celestial object and its conversion factor.")
def edit_celestial(celestial: str, data: WeightConversionResponse):
    if celestial not in conversion_factors:
        raise HTTPException(
            status_code=404, detail="Celestial object not found.")
    conversion_factors[celestial] = data.weight
    return WeightConversionResponse(celestial_object=celestial, weight=data.weight)

@router.get("/", description="Add a new celestial object and its conversion factor.")
def get_celestial():
    return conversion_factors


@router.delete("/delete_celestial_factor/{celestial}", response_model=Dict[str, str], description="Delete a celestial object and its conversion factor.")
def delete_celestial_factor(celestial: str):
    if celestial not in conversion_factors:
        raise HTTPException(
            status_code=404, detail="Celestial object not found.")
    del conversion_factors[celestial]

    return {"message": f"Celestial object '{celestial}' and its conversion factor deleted successfully."}



