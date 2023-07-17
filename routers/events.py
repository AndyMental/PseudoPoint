from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter()

class Event:
    def __init__(self, name: str, date: str, location: str, description: str):
        self.name = name
        self.date = date
        self.location = location
        self.description = description

events = [
    Event("Adele Live Concert", "2023-08-01", "Madison Square Garden, New York", "Adele returns to the stage with her soulful voice."),
    Event("Star Wars Convention", "2023-08-12", "Los Angeles Convention Center, Los Angeles", "A gathering of Star Wars fans with cosplay, panels, and exclusive merch."),
    Event("Tokyo Game Show", "2023-09-20", "Makuhari Messe, Chiba City", "One of the largest video game expos in the world."),
    Event("Broadway Premiere: The Tempest", "2023-10-15", "Broadway, New York", "The premiere of a new rendition of Shakespeare's 'The Tempest'."),
    Event("Montreal Jazz Festival", "2023-07-01", "Montreal, Canada", "The world's largest jazz festival with performances by renowned artists."),
    Event("Olympic Winter Games", "2023-02-04", "PyeongChang, South Korea", "Winter Olympics featuring various winter sports competitions."),
    Event("Cannes Film Festival", "2023-05-17", "Cannes, France", "A prestigious film festival showcasing films of all genres from around the world."),
    Event("San Diego Comic-Con", "2023-07-21", "San Diego Convention Center, San Diego", "A major convention for comics and related popular artforms."),
    Event("Eurovision Song Contest", "2023-05-13", "Rotterdam, The Netherlands", "Annual international TV song competition."),
    Event("Super Bowl LVII", "2023-02-05", "Allegiant Stadium, Las Vegas", "The 57th Super Bowl and the 53rd modern-era National Football League championship game.")
]

@router.get("/{date}", response_model=Event, description="Returns the event for the given date.", tags=["Events"])
def read_event_by_date(date: str):
    """Get an event by date.

    This endpoint retrieves the details of an event based on the provided date.

    Args:
        date (str): The date of the event in the format "YYYY-MM-DD".

    Returns:
        Event: The event object containing the details.

    Raises:
        HTTPException: If the event is not found, a 404 error is raised.

    """
    event = next((event for event in events if event.date == date), None)
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.get("/", response_model=List[Event], description="Returns a list of all events.", tags=["Events"])
def read_all_events():
    """Get all events.

    This endpoint returns a list of all available events.

    Returns:
        List[Event]: A list of event objects containing the details.

    """
    return events

@router.get("/{name}", response_model=Event, description="Returns the event for the given name.", tags=["Events"])
def read_event_by_name(name: str):
    """Get an event by name.

    This endpoint retrieves the details of an event based on the provided name.

    Args:
        name (str): The name of the event.

    Returns:
        Event: The event object containing the details.

    Raises:
        HTTPException: If the event is not found, a 404 error is raised.

    """
    event = next((event for event in events if event.name == name), None)
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.post("/", response_model=Event, description="Adds a new event.", tags=["Events"])
def add_event(event: Event):
    """Add a new event.

    This endpoint adds a new event to the list of events.

    Args:
        event (Event): The event object containing the details.

    Returns:
        Event: The added event object.

    """
    events.append(event)
    return event

@router.put("/{name}", response_model=Event, description="Updates an existing event.", tags=["Events"])
def update_event(name: str, event: Event):
    """Update an existing event.

    This endpoint updates the details of an existing event.

    Args:
        name (str): The name of the event to update.
        event (Event): The event object containing the updated details.

    Returns:
        Event: The updated event object.

    Raises:
        HTTPException: If the event is not found, a 404 error is raised.

    """
    index = next((index for index, existing_event in enumerate(events) if existing_event.name == name), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Event not found")
    events[index] = event
    return event

@router.delete("/{name}", response_model=Event, description="Deletes an existing event.", tags=["Events"])
def delete_event(name: str):
    """Delete an existing event.

    This endpoint deletes an existing event from the list of events.

    Args:
        name (str): The name of the event to delete.

    Returns:
        Event: The deleted event object.

    Raises:
        HTTPException: If the event is not found, a 404 error is raised.

    """
    index = next((index for index, existing_event in enumerate(events) if existing_event.name == name), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Event not found")
    deleted_event = events.pop(index)
    return deleted_event
