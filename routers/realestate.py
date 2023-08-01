from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel

router = APIRouter()

class RealEstateListing(BaseModel):
    id: int
    address: str
    price: float
    bedrooms: int
    bathrooms: int
    square_feet: int
    description: str

real_estate_listings = [
    RealEstateListing(id=1, address="123 Main St", price=250000.0, bedrooms=3, bathrooms=2, square_feet=1500, description="Charming 3 bedroom, 2 bathroom home in a quiet neighborhood."),
    RealEstateListing(id=2, address="456 Elm St", price=350000.0, bedrooms=4, bathrooms=3, square_feet=2000, description="Spacious 4 bedroom, 3 bathroom home with a large backyard."),
    RealEstateListing(id=3, address="789 Oak St", price=500000.0, bedrooms=5, bathrooms=4, square_feet=3000, description="Luxurious 5 bedroom, 4 bathroom home with a pool and spa."),
    RealEstateListing(id=4, address="321 Maple St", price=150000.0, bedrooms=2, bathrooms=1, square_feet=1000, description="Cozy 2 bedroom, 1 bathroom home with a fenced yard."),
    RealEstateListing(id=5, address="654 Pine St", price=400000.0, bedrooms=3, bathrooms=2, square_feet=1800, description="Beautiful 3 bedroom, 2 bathroom home with hardwood floors."),
    RealEstateListing(id=6, address="987 Cedar St", price=600000.0, bedrooms=4, bathrooms=3, square_feet=2500, description="Stunning 4 bedroom, 3 bathroom home with a gourmet kitchen."),
    RealEstateListing(id=7, address="246 Birch St", price=200000.0, bedrooms=2, bathrooms=1, square_feet=1200, description="Adorable 2 bedroom, 1 bathroom home with a covered porch."),
    RealEstateListing(id=8, address="135 Walnut St", price=450000.0, bedrooms=3, bathrooms=2, square_feet=2200, description="Lovely 3 bedroom, 2 bathroom home with a fireplace."),
    RealEstateListing(id=9, address="864 Cherry St", price=550000.0, bedrooms=4, bathrooms=3, square_feet=2800, description="Gorgeous 4 bedroom, 3 bathroom home with a backyard oasis."),
    RealEstateListing(id=10, address="975 Ash St", price=300000.0, bedrooms=3, bathrooms=2, square_feet=1600, description="Updated 3 bedroom, 2 bathroom home with a modern kitchen.")
]

@router.get("/listings", response_model=List[RealEstateListing], description="Returns a list of real estate listings.")
def get_all_listings():
    """Get all real estate listings.

    This endpoint returns a list of all real estate listings.

    Returns:
        List[RealEstateListing]: A list of all real estate listings.

    """
    return real_estate_listings

@router.post("/listings", response_model=RealEstateListing, description="Creates a new real estate listing.")
def create_listing(new_listing: RealEstateListing):
    new_id = max(listing.id for listing in real_estate_listings) + 1
    new_listing.id = new_id
    real_estate_listings.append(new_listing)
    return new_listing

@router.put("/listings/{listing_id}", response_model=RealEstateListing, description="Updates a real estate listing with the given id.")
def update_listing(listing_id: int, updated_listing: RealEstateListing):
    """Update a real estate listing by id.

    This endpoint allows updating the details of a real estate listing based on its id.

    Args:
        listing_id (int): The id of the real estate listing to be updated.
        updated_listing (RealEstateListing): The updated data for the real estate listing.

    Returns:
        RealEstateListing: The updated real estate listing object.

    Raises:
        HTTPException: If the real estate listing is not found, a 404 error is raised.

    """
    for index, listing in enumerate(real_estate_listings):
        if listing.id == listing_id:
            real_estate_listings[index] = updated_listing
            return updated_listing
    raise HTTPException(status_code=404, detail="Listing not found")


@router.delete("/listings/{listing_id}", response_model=RealEstateListing, description="Deletes a real estate listing with the given id.")
def delete_listing(listing_id: int):
    """Delete a real estate listing by id.

    This endpoint allows the deletion of a real estate listing based on its id.

    Args:
        listing_id (int): The id of the real estate listing to be deleted.

    Returns:
        RealEstateListing: The deleted real estate listing object.

    Raises:
        HTTPException: If the real estate listing is not found, a 404 error is raised.

    """
    for index, listing in enumerate(real_estate_listings):
        if listing.id == listing_id:
            deleted_listing = real_estate_listings.pop(index)
            return deleted_listing
    raise HTTPException(status_code=404, detail="Listing not found")

