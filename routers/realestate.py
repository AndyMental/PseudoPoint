from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter()

class RealEstateListing:
    def __init__(self, address: str, price: float, bedrooms: int, bathrooms: int, square_feet: int, description: str):
        self.address = address
        self.price = price
        self.bedrooms = bedrooms
        self.bathrooms = bathrooms
        self.square_feet = square_feet
        self.description = description

real_estate_listings = [
    RealEstateListing("123 Main St", 250000.0, 3, 2, 1500, "Charming 3 bedroom, 2 bathroom home in a quiet neighborhood."),
    RealEstateListing("456 Elm St", 350000.0, 4, 3, 2000, "Spacious 4 bedroom, 3 bathroom home with a large backyard."),
    RealEstateListing("789 Oak St", 500000.0, 5, 4, 3000, "Luxurious 5 bedroom, 4 bathroom home with a pool and spa."),
    RealEstateListing("321 Maple St", 150000.0, 2, 1, 1000, "Cozy 2 bedroom, 1 bathroom home with a fenced yard."),
    RealEstateListing("654 Pine St", 400000.0, 3, 2, 1800, "Beautiful 3 bedroom, 2 bathroom home with hardwood floors."),
    RealEstateListing("987 Cedar St", 600000.0, 4, 3, 2500, "Stunning 4 bedroom, 3 bathroom home with a gourmet kitchen."),
    RealEstateListing("246 Birch St", 200000.0, 2, 1, 1200, "Adorable 2 bedroom, 1 bathroom home with a covered porch."),
    RealEstateListing("135 Walnut St", 450000.0, 3, 2, 2200, "Lovely 3 bedroom, 2 bathroom home with a fireplace."),
    RealEstateListing("864 Cherry St", 550000.0, 4, 3, 2800, "Gorgeous 4 bedroom, 3 bathroom home with a backyard oasis."),
    RealEstateListing("975 Ash St", 300000.0, 3, 2, 1600, "Updated 3 bedroom, 2 bathroom home with a modern kitchen.")
]

@router.get("/listings/{address}", response_model=RealEstateListing, description="Returns a real estate listing with the given address.")
def read_listing_by_address(address: str):
    """Get a real estate listing by address.

    This endpoint returns a real estate listing based on the given address.

    Args:
        address (str): The address of the listing.

    Returns:
        RealEstateListing: The real estate listing.

    Raises:
        HTTPException: If the listing is not found.

    """
    listing = next((listing for listing in real_estate_listings if listing.address == address), None)
    if listing is None:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing

@router.get("/listings", response_model=List[RealEstateListing], description="Returns a list of all real estate listings.")
def read_all_listings():
    """Get all real estate listings.

    This endpoint returns a list of all real estate listings.

    Returns:
        List[RealEstateListing]: A list of all real estate listings.

    """
    return real_estate_listings
