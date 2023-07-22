import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../model/flights'

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  

  constructor(private http: HttpClient) { 
    
  }

getAllFlights() : Observable<Flight[]>{
  return this.http.get<Flight[]>('http://127.0.0.1:8000/flights/');
  
} 

deleteFlight(flightId: string) : Observable<any>{
  return this.http.delete(`http://127.0.0.1:8000/flights/${flightId}`)
}

addFlight(flight: Flight): Observable<Flight>{
  return this.http.post<Flight>('http://127.0.0.1:8000/flights/', flight)

}

updateFlight(flightId: string , flight: Flight) {
  return this.http.put(`http://127.0.0.1:8000/flights/${flightId}`, flight)
}

}
