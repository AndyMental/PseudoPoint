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


# class Response(BaseModel):
#     message: str


# class BulkDelete(BaseModel):
#     ids: List[int]


router = APIRouter()

billingData = [
    Billing(id=1, name="Water Bill", address="Hyderabad", credit_card="HDFC Bank"),
    Billing(id=2, name="Electricity Bill",
            address="Bangalore", credit_card="Union Bank"),
    Billing(id=3, name="Phone Bill", address="Mumbai", credit_card="Union Bank"),
    Billing(id=4, name="Internet Bill",
            address="Sri Lanka", credit_card="HDFC Bank"),
    Billing(id=5, name="Gas Bill", address="Jaipur", credit_card="Union Bank"),
    Billing(id=6, name="Rent Bill", address="Rajasthan", credit_card="SBI Bank"),
    Billing(id=7, name="Cable Bill",
            address="Andra Pradesh", credit_card="HDFC Bank"),
    Billing(id=8, name="CC Bill", address="Goa", credit_card="Union Bank"),
    Billing(id=9, name="Insurance Bill", address="Malnad", credit_card="SBI Bank"),
    Billing(id=10, name="Grocery Bill", address="Munnar", credit_card="HDFC Bank")
]


@router.get("/", response_model=List[Billing], description="Returns a list of billing records.")
def read_billing_records():
    """Get billing records.

    This endpoint returns a list of 10 fake billing records. Each record contains a unique ID, name, address, and credit card number.

    Returns:
        dict: A dictionary containing the billing records.

    """
    if billingData:
        logger.info("Fetching billing records")
        # billing_records = [Billing(id=i, name=f"Name {i}", address=f"Address {i}", credit_card=f"CreditCard {i}") for i in range(1, 11)]
        return billingData
    else:
        raise HTTPException(status_code=404,detail="No records found!")


@router.post("/billing", description="Creates a new billing record and returns a confirmation message.")
def create_billing_record(billing_record: Billing):
    """Create a new billing record.

    This endpoint creates a new billing record and returns a confirmation message. The ID and amount are randomly generated.

    Returns:
        dict: A dictionary containing a confirmation message.

    """
    # billingData.append(billing_record)
    # logger.info("Creating new billing record")
    try:
        if (billing_record):
            newID = max(billing_record.id for billing_record in billingData)+1
            billing_record.id = newID
            
            billingData.append(billing_record)
    except:
        raise HTTPException(status_code=404,detail="Invalid Record!")
        
    

@router.put("/billing-update/{id}", description="Updates a billing record with the given id and returns a confirmation message.")
def update_billing_record(id: int, record: Billing):
    """Update a billing record.
    This endpoint updates a billing record with the given id and returns a confirmation message. The ID and amount are randomly generated.
    Args:
        id (int): The ID of the billing record to update.
        record (Billing): The updated billing record.
    Returns:
        dict: A dictionary containing a confirmation message.
    """
    logger.info(f"Updating record with Id {id}")
    for index, existingRec in enumerate(billingData):
        if existingRec.id == id:
            billingData[index] = record
            return record
    logger.error(f"Record not found with the id {id}")
    raise HTTPException(status_code=404, detail=f"Id {id} not found!")




@router.delete("/{id}", description="Deletes a billing record with the given id and returns a confirmation message.")
def delete_billing_record(id: int):
    """Delete a billing record.
    This endpoint deletes a billing record with the given id and returns a confirmation message. The ID and amount are randomly generated.
    Args:
        billing_id (int): The ID of the billing record to delete.
    Returns:
        dict: A dictionary containing a confirmation message.
    """
    for i, existingData in enumerate(billingData):
        if existingData.id == id:
            del (billingData[i])
            return {"detail": "Billing Record deleted"}
    else:
        raise HTTPException(status_code=404, detail="Record not found")



# from fastapi import FastAPI, HTTPException
# from typing import List
# from pydantic import BaseModel

# app = FastAPI()

# # Temporary list to store billing data (replace this with your actual data source)
# billings = []

# class Billing(BaseModel):
#     id: int
#     name: str
#     address: str
#     credit_card: str

# class BillingCreate(BaseModel):
#     name: str
#     address: str
#     credit_card: str

# class BillingUpdate(BaseModel):
#     name: str
#     address: str
#     credit_card: str

# class BulkDeleteRequest(BaseModel):
#     ids: List[int]

# class ResponseMessage(BaseModel):
#     message: str


# # PUT (Update)
# @app.put("/billing/{billing_id}", response_model=Billing)
# def update_billing(billing_id: int, billing: BillingUpdate):
#     for item in billings:
#         if item["id"] == billing_id:
#             for key, value in billing.dict().items():
#                 item[key] = value
#             return item
#     raise HTTPException(status_code=404, detail="Billing not found")


# @app.delete("/billing/bulk", response_model=ResponseMessage)
# def bulk_delete_billing(request: BulkDeleteRequest):
#     global billings
#     billings = [item for item in billings if item["id"] not in request.ids]
#     return {"message": "Bulk delete successful"}


# @app.post("/billing/", response_model=Billing)
# def create_billing(billing: BillingCreate):
#     global billings
#     new_billing = billing.dict()
#     new_billing["id"] = len(billings) + 1
#     billings.append(new_billing)
#     return new_billing


# @app.get("/billing/{billing_id}", response_model=Billing)
# def get_billing(billing_id: int):
#     for item in billings:
#         if item["id"] == billing_id:
#             return item
#     raise HTTPException(status_code=404, detail="Billing not found")


# @app.get("/billing/", response_model=List[Billing])
# def get_all_billing():
#     return billings
