import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Geolocation } from '../model/geolocation.model';
import { Geolocation } from '../model/geolocation.moel';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(private http: HttpClient) {}
  getLocations(): Observable<Geolocation[]> {
    return this.http.get<Geolocation[]>('http://127.0.0.1:8000/geolocation');
  }


  deleteLocation(id:number):Observable<Geolocation[]>{
    const url = `http://127.0.0.1:8000/geolocation/${id}`
    return this.http.delete<Geolocation[]>(url);
  }

  addLocation(newlocation:Geolocation):Observable<Geolocation>{
        console.log(newlocation)
        const url = 'http://127.0.0.1:8000/geolocation'
        return this.http.post<Geolocation>(url,newlocation)
  }

  updateLocation(id: number, record: Geolocation): Observable<Geolocation> {
    const url = `http://localhost:8000/geolocation/${id}`;
    return this.http.put<Geolocation>(url, record);
  }
  
}


