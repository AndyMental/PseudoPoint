from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class NotificationData(BaseModel):
    id: int
    title: str
    message: str


notifications = [
    NotificationData(id=1, title="New Feature Added", message="We have added an exciting new feature to our platform!"),
    NotificationData(id=2, title="Upcoming Event", message="Join us for our annual event on July 30th."),
    NotificationData(id=3, title="Product Sale", message="Huge sale on all products this weekend!"),
    NotificationData(id=4, title="System Maintenance", message="Scheduled maintenance on August 5th."),
    NotificationData(id=5, title="User Survey", message="Please take a moment to participate in our user survey."),
    NotificationData(id=6, title="Summer Promotion", message="Get ready for our summer promotion starting next week."),
    NotificationData(id=7, title="Service Interruption", message="We apologize for any service interruption experienced earlier today."),
    NotificationData(id=8, title="Product Launch", message="Exciting new product launching on August 15th."),
    NotificationData(id=9, title="Office Relocation", message="We are moving to a new office on August 20th."),
    NotificationData(id=10, title="Customer Appreciation", message="Thank you for being our valued customer!"),
    NotificationData(id=11, title="Weekly Newsletter", message="Check out our latest weekly newsletter for updates."),
    NotificationData(id=12, title="Holiday Sale", message="Celebrate the holidays with our special sale."),
    NotificationData(id=13, title="Important Announcement", message="Stay tuned for an important announcement next week."),
]

@router.get("/", response_model=List[NotificationData], description="Returns a list of fake notifications.")
def read_notifications():
    """Get a list of fake notifications.

    Returns:
        List[NotificationData]: A list of NotificationData objects containing the fake notifications.
    """
    return notifications

@router.post("/", response_model=NotificationData, description="Creates a new notification and returns the new notification data.")
def create_notification(notification_data: NotificationData):
    """Create a new notification.

    Args:
        notification_data (NotificationData): Data received from the user in the request body.

    Returns:
        NotificationData: The created notification data.
    """
    notification_id = len(notifications) + 1
    new_notification = NotificationData(id=notification_id, title=notification_data.title, message=notification_data.message)
    notifications.append(new_notification)

    return new_notification

@router.put("/{notification_id}", description="Updates a notification with the given id and returns a confirmation message.")
def update_notification(notification_id: int, updated_data: NotificationData):
    """Update a notification.

    Args:
        notification_id (int): The ID of the notification to update.
        updated_data (NotificationData): Updated data received from the user in the request body.

    Returns:
        dict: A confirmation message indicating that the notification was updated successfully.

    """
    for index, data in enumerate(notifications):
        if data.id == notification_id:
            notifications[index] = updated_data
            return {"message": "Notification data for '{}' updated successfully.".format(notification_id)}
    else:
        raise HTTPException(status_code=404, detail="Notification not found")

@router.delete("/{notification_id}", description="Deletes a notification with the given id and returns a confirmation message.")
def delete_notification(notification_id: int):
    """Delete a notification.

    This endpoint deletes a notification with the given id and returns a confirmation message.

    Args:
        notification_id (int): The ID of the notification to delete.

    Returns:
        dict: A dictionary containing a confirmation message.

    """
    return {"notification": "deleted"}
