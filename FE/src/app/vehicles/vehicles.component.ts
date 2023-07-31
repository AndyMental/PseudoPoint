import { Component,OnInit,ViewChild } from '@angular/core';
import { VehicleService } from '../shared/services/vehicle.service';
import { VehicleModel } from '../shared/model/vehicle';
import { MatDialog } from '@angular/material/dialog';
import { VehicleformComponent } from './vehicleform/vehicleform.component';
import { DeleteconfirmationDialogComponent } from '../deleteconfirmation-dialog/deleteconfirmation-dialog.component';
import { ToastService, TOAST_STATE } from '../shared/services/toast.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent {
  public displayedColumns: string[] = ['vehicle_id', 'make', 'model', 'year', 'mileage','actions'];
  public vehicle:VehicleModel[] = [];
  @ViewChild('vehicleTable') vehicleTable: any;
  public newVehicle:VehicleModel = {
    vehicle_id:0,
    make:'',
    model:'',
    year:0,
    mileage:0,
  }
             
  constructor(private vehicleservice:VehicleService, private dialog:MatDialog,private toastservice:ToastService){}
  ngOnInit() {
    this.vehicleservice.getVehicles().subscribe((data)=>{
      this.vehicle = data;
      
    })
  }

  private refreshData() {
    this.vehicleservice.getVehicles().subscribe((data) => {
      this.vehicle = data;
    });
  }

  public openAddVehicle() {
    const dialogRef = this.dialog.open(VehicleformComponent, {
      width: '400px',
      data: { editMode: false, record:{ ...this.newVehicle }, vehicleTable: this.vehicleTable }
    });
    dialogRef.afterClosed().subscribe((result: VehicleModel|undefined) => {
      
      if (result) {
        this.refreshData()
      }
      
    });
    
  }


  private addNewVehicle(newVehicleData: VehicleModel): void {
    const newVehicle: VehicleModel = {
      vehicle_id: 0, // Set the initial ID to 0 or generate an appropriate ID
      make: newVehicleData.make,
      model: newVehicleData.model,
      year: newVehicleData.year,
      mileage: newVehicleData.mileage,
    };
  
    this.vehicleservice.addVehicle(newVehicle).subscribe(
      (response: VehicleModel) => {
        
        this.vehicle.push(response);
        this.refreshData();
        this.toastservice.showToast(TOAST_STATE.success, 'Data Added Successfully');
      },
      (error) => {
        
        this.toastservice.showToast(
          TOAST_STATE.danger,
          `Error occurred while adding new Course: ${error}`
        );
      }
    );
  }
  
  public updateExistingVehicle(vehicle_id: number) {
    const userConfirm = confirm("Are you sure you want to update?");
    if (userConfirm) {
      const existingVehicle = this.vehicle.find((item) => item.vehicle_id === vehicle_id);
      if (existingVehicle) {
        const dialogRef = this.dialog.open(VehicleformComponent, {
          width: '400px',
          data: { editMode: true, record: existingVehicle }
        });
  
        dialogRef.afterClosed().subscribe((result: VehicleModel | undefined) => {
          if (result) {
            const index = this.vehicle.findIndex((item) => item.vehicle_id === result.vehicle_id);
            if (index !== -1) {
              this.vehicle[index] = result;
              this.toastservice.showToast(TOAST_STATE.success, 'Data Updated Successfully');
            }
          } 
          if (result) {
            this.updateVehicle(result);
          }
          
        });
        
      } else {
        
      }
    }
  }
  public updateVehicle(updatedVehicle: VehicleModel): void {
    this.vehicleservice.updateVehicle(updatedVehicle).subscribe(
      (response: VehicleModel) => {
        
        this.refreshData();
      },
      (error) => {
        
      }
    );
  }
  public deleteVehicle(vehicle_id: number) {
    const dialogRef = this.dialog.open(DeleteconfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete this vehicle?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.vehicleservice.deleteVehicle(vehicle_id).subscribe(
          () => {
            this.vehicle = this.vehicle.filter((item) => item.vehicle_id !== vehicle_id);
            this.refreshData();
            this.toastservice.showToast(TOAST_STATE.success, 'Deleted Successfully');
          },
          (error) => {
            
            this.toastservice.showToast(
              TOAST_STATE.danger,
              `Error occurred while deleting Item: ${error}`
            );
          }
        );
      }
    });
  }
}