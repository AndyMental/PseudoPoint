import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleModel } from '../model/vehicle';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http:HttpClient) { }
  
  getVehicles() : Observable<VehicleModel[]>{
    return this.http.get<VehicleModel[]>('http://127.0.0.1:8000/vehicles');
    
  }
  deleteVehicle(vehicle_id: number): Observable<VehicleModel[]> {
    const url = `http://127.0.0.1:8000/vehicles/${vehicle_id}`;
    return this.http.delete<VehicleModel[]>(url);
  }

  addVehicle(vehicle: VehicleModel): Observable<VehicleModel> {
    const url = `http://127.0.0.1:8000/vehicles/`;
    return this.http.post<VehicleModel>(url, vehicle);
  }
  
  updateVehicle(vehicle: VehicleModel): Observable<VehicleModel> {
    const url = `http://127.0.0.1:8000/vehicles/${vehicle.vehicle_id}`;
    return this.http.put<VehicleModel>(url, vehicle);
  }
}
