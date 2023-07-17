from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class WeightConversionRequest(BaseModel):
    weight: float

class WeightConversionResponse(BaseModel):
    celestial_object: str
    weight: float

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
    for celestial_object, factor in conversion_factors.items():
        weight_on_object = weight * factor
        weight_on_celestial_objects.append(WeightConversionResponse(celestial_object=celestial_object, weight=weight_on_object))

    return weight_on_celestial_objects
