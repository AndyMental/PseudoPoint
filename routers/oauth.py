from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class OAuthData(BaseModel):
    id:int
    names: str
    email: str
    access_token: str

oauth_data_list = [
    OAuthData(id="1",names="Alice", email="alice@example.com", access_token="ab$c123"),
    OAuthData(id="2",names="Bob", email="bob@example.com", access_token="def45*6"),
    OAuthData(id="3",names="Prathi", email="prathi@example.com", access_token="jkk%ihf456"),
    OAuthData(id="4",names="neha", email="neha@example.com", access_token="js#kk6"),
    OAuthData(id="5",names="Charlie", email="charlie@example.com", access_token="ghi7@89"),
]

@router.post("/", description="Returns a confirmation message for OAuth.")
def create_oauth(oauth_data: OAuthData):
    """OAuth endpoint.

    This endpoint creates an OAuth record and returns a confirmation message indicating that the OAuth process was successful.

    Args:
        oauth_data (OAuthData): Data received from the user in the request body.

    Returns:
        dict: A confirmation message indicating that the OAuth process was successful.

    """
    oauth_id=len(oauth_data_list)+1
    new_oauth__data =OAuthData(id=oauth_id, names=oauth_data.names, email=oauth_data.email, access_token=oauth_data.access_token)
    oauth_data_list.append(new_oauth__data)

    return {
        "oauth": "created",
        "names": oauth_data.names,
        "email": oauth_data.email,
        "access_token": oauth_data.access_token
    }

@router.get("/", response_model=List[OAuthData], description="Returns the OAuth data.")
def get_oauth():
    """GET method for OAuth endpoint.

    Returns the OAuth data.

    Returns:
        dict: The OAuth data.

    """
    if not oauth_data_list:
        raise HTTPException(status_code=404, detail="OAuth data not found")

    return oauth_data_list

@router.put("/{id}", description="Updates the OAuth data for a specific entry.")
def update_oauth(id: int, updated_data: OAuthData):
    """PUT method for OAuth endpoint to update a specific entry.

    Args:
        names (str): The identifier (names) of the entry to update.
        updated_data (OAuthData): The updated data for the entry.

    Returns:
        dict: A message indicating the successful update of the specified entry.

    """
    for index, existing_data in enumerate(oauth_data_list):
        if existing_data.id == id:
            oauth_data_list[index] = updated_data
            return {"message": "OAuth data for '{}' updated successfully.".format(id)}
    
    raise HTTPException(status_code=404, detail="Entry with names '{}' not found for update.".format(names))


@router.delete("/{names}", description="Delete a particular names", tags=["OAuthData"])
def delete_oauth(names: str):
    global oauth_data_list
    index_to_remove = None
    for index, existing_species in enumerate(oauth_data_list):
        if existing_species.names == names:
            del oauth_data_list[index]
            return {"message": "The item was removed successfully."}, 204
    else:
        raise HTTPException(status_code=404, detail="Species not found for deletion.")
   
   





    """DELETE method for OAuth endpoint.

    Deletes the OAuth data.

    Returns:
        dict: A message indicating the successful deletion of OAuth data.

    """




    # if not oauth_data_list:
    #     raise HTTPException(status_code=404, detail="OAuth data not found")

    # oauth_data_list.pop()

    # return {"message": "OAuth data deleted successfully."}

