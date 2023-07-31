from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import logging

router = APIRouter()

class HistoricalEvent(BaseModel):
    ID:int
    year: int
    event: str

historical_events = [
    HistoricalEvent(ID=1,year=1066, event="Battle of Hastings"),
    HistoricalEvent(ID=2,year=1492, event="Columbus discovers America"),
    HistoricalEvent(ID=3,year=1776, event="Declaration of Independence"),
    HistoricalEvent(ID=4,year=1861, event="American Civil War begins"),
    HistoricalEvent(ID=5,year=1914, event="World War I begins"),
    HistoricalEvent(ID=6,year=1929, event="Stock market crash"),
    HistoricalEvent(ID=7,year=1941, event="Pearl Harbor attack"),
    HistoricalEvent(ID=8,year=1969, event="Apollo 11 moon landing"),
    HistoricalEvent(ID=9,year=1989, event="Fall of the Berlin Wall"),
    HistoricalEvent(ID=10,year=2001, event="September 11 attacks")
]

@router.get("/{year}", response_model=List[HistoricalEvent], description="Returns a list of historical events for the given year.", tags=["Historical Events"])
def read_events_by_year(year: int):
    """Get historical events for a specific year.

    This endpoint retrieves a list of historical events that occurred in the given year.

    Args:
        year (int): The year for which the events are requested.

    Returns:
        List[HistoricalEvent]: The list of historical events for the specified year.

    Raises:
        HTTPException: If events are not found for the given year, a 404 error is raised.

    """
    events_by_year = [event for event in historical_events if event.year == year]
    if not events_by_year:
        raise HTTPException(status_code=404, detail="Events not found")
    return events_by_year

@router.get("/", response_model=List[HistoricalEvent], description="Returns a list of all historical events.", tags=["Historical Events"])
def read_all_historical_events():
    """Get all historical events.

    This endpoint retrieves a list of all available historical events.

    Returns:
        List[HistoricalEvent]: The list of all historical events.

    """
    return historical_events

@router.delete("/{ID}",description="Delete the event by year",tags=["historical_events"])
def delete_event(ID:int):
   for index,event in enumerate(historical_events):
       if event.ID==ID:
           del historical_events[index]
           return {"detail":"Historical Event Deleted"}
   raise HTTPException(status_code=404,detail=" Event not found in this year")


@router.post("/", response_model=HistoricalEvent, description="Add a new historical event.", tags=["Historical Events"])
async def create_historical_event(event: HistoricalEvent):
    if any(item.event == event.event for item in historical_events):
        raise HTTPException(status_code=400, detail="Event already exists")
    newid=max(event.ID for event in historical_events)+1
    event.ID=newid
    historical_events.append(event)
    return event


@router.put("/fetchby/{ID}", response_model=HistoricalEvent, description="Update an existing historical event.", tags=["Historical Events"])
async def update_historical_event(ID: int, event: HistoricalEvent):
    for index, item in enumerate(historical_events):
        if item.ID == ID:
            historical_events[index] = event
            return event
    raise HTTPException(status_code=404, detail="Event not found")