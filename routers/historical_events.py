from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class HistoricalEvent(BaseModel):
    year: int
    event: str

historical_events = [
    HistoricalEvent(year=1066, event="Battle of Hastings"),
    HistoricalEvent(year=1492, event="Columbus discovers America"),
    HistoricalEvent(year=1776, event="Declaration of Independence"),
    HistoricalEvent(year=1861, event="American Civil War begins"),
    HistoricalEvent(year=1914, event="World War I begins"),
    HistoricalEvent(year=1929, event="Stock market crash"),
    HistoricalEvent(year=1941, event="Pearl Harbor attack"),
    HistoricalEvent(year=1969, event="Apollo 11 moon landing"),
    HistoricalEvent(year=1989, event="Fall of the Berlin Wall"),
    HistoricalEvent(year=2001, event="September 11 attacks")
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
