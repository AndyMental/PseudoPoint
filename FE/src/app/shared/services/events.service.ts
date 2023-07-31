import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventData } from '../model/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  
  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<EventData[]> {
    const url = ('http://127.0.0.1:8000/events');
    return this.http.get<EventData[]>(url);
  }

  deleteEvent(event_id: number): Observable<EventData> {
    const url = `http://127.0.0.1:8000/events/${event_id}`;
    return this.http.delete<EventData>(url);
  }

  addEvent(event: EventData): Observable<EventData> {
    const url = `http://127.0.0.1:8000/events/posting`;
    return this.http.post<EventData>(url, event);
  }

  updateEvent(event: EventData): Observable<EventData> {
    const url = `http://127.0.0.1:8000/events/${event.event_id}`;
    return this.http.put<EventData>(url, event);
  }
}
