from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class Event(BaseModel):
    event_id:int
    names: str
    date: str
    location: str
    description: str

events = [
    Event(event_id=1,names="Adele Live Concert",date= "2023-08-01",location="Madison Square Garden, New York",description= "Adele returns to the stage with her soulful voice."),
    Event(event_id=2,names="Star Wars Convention",date= "2023-08-12",location= "Los Angeles Convention Center, Los Angeles",description= "A gathering of Star Wars fans with cosplay, panels, and exclusive merch."),
    Event(event_id=3,names="Tokyo Game Show",date= "2023-09-20",location= "Makuhari Messe, Chiba City",description= "One of the largest video game expos in the world."),
    Event(event_id=4,names="Broadway Premiere: The Tempest",date= "2023-10-15",location= "Broadway, New York",description= "The premiere of a new rendition of Shakespeare's 'The Tempest'."),
    Event(event_id=5,names="Montreal Jazz Festival",date= "2023-07-01",location= "Montreal, Canada",description= "The world's largest jazz festival with performances by renowned artists."),
    Event(event_id=6,names="Olympic Winter Games",date= "2023-02-04",location= "PyeongChang, South Korea",description= "Winter Olympics featuring various winter sports competitions."),
    Event(event_id=7,names="Cannes Film Festival",date= "2023-05-17",location= "Cannes, France",description= "A prestigious film festival showcasing films of all genres from around the world."),
    Event(event_id=8,names ="San Diego Comic-Con",date= "2023-07-21",location= "San Diego Convention Center, San Diego",description= "A major convention for comics and related popular artforms."),
    Event(event_id=9,names="Eurovision Song Contest",date= "2023-05-13",location= "Rotterdam, The Netherlands",description= "Annual international TV song competition."),
    Event(event_id=10,names="Super Bowl LVII",date= "2023-02-05",location= "Allegiant Stadium, Las Vegas",description= "The 57th Super Bowl and the 53rd modern-era National Football League championship game.")
]

latest_event_id=len(events)

@router.get("/{event_id}", response_model=Event, description="Returns the event for the given enent id.", tags=["Events"])
def read_event_by_id(event_id: int):
    event = next((event for event in events if event.event_id == event_id), None)
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.get("/{date}", response_model=Event, description="Returns the event for the given date.", tags=["Events"])
def read_event_by_date(date: str):
# #     """Get an event by date.

# #     This endpoint retrieves the details of an event based on the provided date.

# #     Args:
# #         date (str): The date of the event in the format "YYYY-MM-DD".

# #     Returns:
# #         Event: The event object containing the details.

# #     Raises:
# #         HTTPException: If the event is not found, a 404 error is raised.

# #     """
    event = next((event for event in events if event.date == date), None)
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.get("/", response_model=List[Event], description="Returns a list of all events.", tags=["Events"])
def read_all_events():
#     """Get all events.

#     This endpoint returns a list of all available events.

#     Returns:
#         List[Event]: A list of event objects containing the details.

#     """
    return events

@router.get("/names/{names}", response_model=Event, description="Returns the event for the given name.", tags=["Events"])
def read_event_by_name(names: str):
# #     """Get an event by name.

# #     This endpoint retrieves the details of an event based on the provided name.

# #     Args:
# #         name (str): The name of the event.

# #     Returns:
# #         Event: The event object containing the details.

# #     Raises:
# #         HTTPException: If the event is not found, a 404 error is raised.

# #     """
    event = next((event for event in events if event.names == names), None)
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.post("/posting", response_model=Event, description="Adds a new event.", tags=["Events"], status_code=201)
def add_event(event: Event):
    """Add a new event.

    This endpoint adds a new event to the list of events.

    Args:
        event (Event): The event object containing the details.

    Returns:
        Event: The added event object.

    """
    global latest_event_id
    latest_event_id += 1
    event.event_id = latest_event_id
    events.append(event)
    return event

@router.get("/location/{location}", response_model=Event, description="Returns the event for the given date.", tags=["Events"])
def read_event_by_location(location: str):
    event = next((event for event in events if event.location == location), None)
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.put("/names/{names}", response_model=Event, description="Updates an existing event.", tags=["Events"])
def updated_event(names: str, updated_event: Event):
# #     """Update an existing event.

# #     This endpoint updates the details of an existing event.

# #     Args:
# #         name (str): The name of the event to update.
# #         event (Event): The event object containing the updated details.

# #     Returns:
# #         Event: The updated event object.

# #     Raises:
# #         HTTPException: If the event is not found, a 404 error is raised.

# #     """
    index = next((index for index, existing_event in enumerate(events) if existing_event.names == names), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Event not found")
    events[index] = updated_event
    return updated_event

@router.put("/{event_id}", response_model=Event, description="Updates an existing event.", tags=["Events"])
def updated_event(updated_event: Event):
    index = next((index for index, existing_event in enumerate(events) if existing_event.event_id == updated_event.event_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Event not found")
    events[index] = updated_event
    return updated_event

@router.put("/date/{date}", response_model=Event, description="Updates an existing event.", tags=["Events"])
def updated_event(date: str, updated_event: Event):
    index = next((index for index, existing_event in enumerate(events) if existing_event.date == date), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Event not found")
    events[index] = updated_event
    return updated_event

@router.put("/location/{location}", response_model=Event, description="Updates an existing event.", tags=["Events"])
def update_event(location: str, updated_event: Event):
    index = next((index for index, existing_event in enumerate(events) if existing_event.location == location), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Event not found")
    events[index] = updated_event
    return updated_event

@router.delete("/{event_id}", response_model=Event, description="Deletes an existing event.", tags=["Events"])
def delete_event(event_id: int):
    index = next((index for index, existing_event in enumerate(events) if existing_event.event_id == event_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Event not found")
    deleted_event = events.pop(index)
    return deleted_event


@router.delete("/names/{names}", response_model=Event, description="Deletes an existing event.", tags=["Events"])
def delete_event(names: str):
# #     """Delete an existing event.

# #     This endpoint deletes an existing event from the list of events.

# #     Args:
# #         name (str): The name of the event to delete.

# #     Returns:
# #         Event: The deleted event object.

# #     Raises:
# #         HTTPException: If the event is not found, a 404 error is raised.

# #     """
    index = next((index for index, existing_event in enumerate(events) if existing_event.names == names), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Event not found")
    deleted_event = events.pop(index)
    return deleted_event

@router.delete("/date/{date}", response_model=Event, description="Deletes an existing event.", tags=["Events"])
def delete_event(date: str):
    index = next((index for index, existing_event in enumerate(events) if existing_event.date == date), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Event not found")
    deleted_event = events.pop(index)
    return deleted_event

@router.delete("/location/{location}", response_model=Event, description="Deletes an existing event.", tags=["Events"])
def delete_event(location: str):
    index = next((index for index, existing_event in enumerate(events) if existing_event.location == location), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Event not found")
    deleted_event = events.pop(index)
    return deleted_event