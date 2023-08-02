import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../model/flights';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private urlObj: { [key: string]: string } = environment.apiUrls.flights;

  constructor(private http: HttpClient) {}

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.urlObj.url);
  }

  deleteFlight(flightId: string): Observable<any> {
    return this.http.delete(`${this.urlObj.url}${flightId}`);
  }

  addFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.urlObj.url, flight);
  }

  updateFlight(flightId: string, flight: Flight) {
    return this.http.put(`${this.urlObj.url}${flightId}`, flight);
  }
}
