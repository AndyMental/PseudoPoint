from typing import List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import logging

logger = logging.getLogger(__name__)

class Billing(BaseModel):
    id: int
    name: str
    address: str
    credit_card: str

class Response(BaseModel):
    message: str

class BulkDelete(BaseModel):
    ids: List[int]

router = APIRouter()

@router.get("/billing", response_model=List[Billing], description="Returns a list of billing records.")
def read_billing_records():
    """Get billing records.

    This endpoint returns a list of 10 fake billing records. Each record contains a unique ID, name, address, and credit card number.

    Returns:
        dict: A dictionary containing the billing records.

    """
    logger.info("Fetching billing records")
    billing_records = [Billing(id=i, name=f"Name {i}", address=f"Address {i}", credit_card=f"CreditCard {i}") for i in range(1, 11)]
    return billing_records

@router.post("/billing", response_model=Response, description="Creates a new billing record and returns a confirmation message.")
def create_billing_record(billing_record: Billing):
    """Create a new billing record.

    This endpoint creates a new billing record and returns a confirmation message. The ID and amount are randomly generated.

    Returns:
        dict: A dictionary containing a confirmation message.

    """
    logger.info("Creating new billing record")
    return Response(message="Billing record created")

@router.put("/billing/{billing_id}", response_model=Response, description="Updates a billing record with the given id and returns a confirmation message.")
def update_billing_record(billing_id: int, billing_record: Billing):
    """Update a billing record.

    This endpoint updates a billing record with the given id and returns a confirmation message. The ID and amount are randomly generated.

    Args:
        billing_id (int): The ID of the billing record to update.

    Returns:
        dict: A dictionary containing a confirmation message.

    """
    logger.info(f"Updating billing record with id {billing_id}")
    return Response(message="Billing record updated")

@router.delete("/billing", response_model=Response, description="Deletes a billing record with the given id and returns a confirmation message.")
def delete_billing_record(bulk_delete: BulkDelete):
    """Delete a billing record.

    This endpoint deletes a billing record with the given id and returns a confirmation message. The ID and amount are randomly generated.

    Args:
        billing_id (int): The ID of the billing record to delete.

    Returns:
        dict: A dictionary containing a confirmation message.

    """
    logger.info(f"Deleting billing record with id {bulk_delete.ids}")
    return Response(message="Billing record deleted")