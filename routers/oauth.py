from fastapi import APIRouter

router = APIRouter()

@router.post("/", description="Returns a confirmation message for OAuth.")
def oauth():
    """OAuth endpoint.

    This endpoint returns a confirmation message indicating that the OAuth process was successful.

    Returns:
        dict: A confirmation message indicating that the OAuth process was successful.

    """
    return {"oauth": "created"}
