// import { Injectable } from '@angular/core';
// import { VehicleModel } from '../model/vehicle';
// import { BehaviorSubject, catchError, throwError } from 'rxjs';
// import { VehicleService } from './vehicle.service';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class VehicleformService {
//   vehicle: VehicleModel[] = [];
//   private showModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

//   constructor(private vehicleService: VehicleService,private http: HttpClient) {}

//   openVehicleform() {
//     this.showModal$.next(true);
//   }

//   closeVehicleform() {
//     this.showModal$.next(false);
//   }

//   getShowModal$(){
//     return this.showModal$.asObservable();
//   }

//   addVehicle(vehicle: VehicleModel) {
//     // Call the addVehicle method from the VehicleService to save the new vehicle
//     this.vehicleService.addVehicle(vehicle).pipe(
//       catchError((error: HttpErrorResponse) => {
//         console.error('Error occurred while adding the vehicle:', error);
//         // Handle the error, display an error message, etc.
//         return throwError('Failed to add vehicle. Please try again later.');
//       })
//     ).subscribe(
//       (addedVehicle: VehicleModel) => {
//         // Handle success, if needed
//         this.vehicle.push(addedVehicle);
//       }
//     );
//   }
  
//   updateVehicle(updatedVehicle: VehicleModel): void {
//     const url = `http://127.0.0.1:8000/vehicles/${updatedVehicle.vehicle_id}`;
//     this.http.put<VehicleModel>(url, updatedVehicle).subscribe(
//       (response: VehicleModel) => {
//         console.log('Updated successfully:', response);
//       },
//       (error) => {
//         console.error('Error occurred while updating the vehicle:', error);
//       }
//     );
//   }
// }


  