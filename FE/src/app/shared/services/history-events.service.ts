import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HistoryEvents } from '../model/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryEventsService {
  private apiUrl = 'http://localhost:8000/historical_events'; 
  constructor(private http: HttpClient) { }

  getAllHistoricalEvents(): Observable<HistoryEvents[]> {
    // const url = `${this.apiUrl}/historical-events`;
    return this.http.get<HistoryEvents[]>(this.apiUrl);
  }

  deleteHistoricalEvent(eventID: number): Observable<any> {
    const url = `${this.apiUrl}/${eventID}`;
    return this.http.delete(url);
  }

  createHistoricalEvent(event: HistoryEvents): Observable<HistoryEvents> {
    return this.http.post<HistoryEvents>(this.apiUrl, event);
  }

  updateHistoricalEvent(event: HistoryEvents): Observable<HistoryEvents> {
    const url = `${this.apiUrl}/fetchby/${event.ID}`;
    return this.http.put<HistoryEvents>(url, event);
  }
}
