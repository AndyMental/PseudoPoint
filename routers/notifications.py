from fastapi import APIRouter

router = APIRouter()

@router.get("/", description="Returns an empty list of notifications.")
def read_notifications():
    """Get notifications.

    This endpoint returns an empty list of notifications.

    Returns:
        dict: An empty list of notifications.

    """
    return {"notifications": []}

@router.post("/", description="Creates a new notification and returns a confirmation message.")
def create_notification():
    """Create notification.

    This endpoint creates a new notification and returns a confirmation message.

    Returns:
        dict: A confirmation message indicating that the notification was created.

    """
    return {"notification": "created"}
