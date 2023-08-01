import { Component,Inject,ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleModel } from 'src/app/shared/model/vehicle';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { VehicleService } from 'src/app/shared/services/vehicle.service';
@Component({
  selector: 'app-vehicleform',
  templateUrl: './vehicleform.component.html',
  styleUrls: ['./vehicleform.component.css']
})
export class VehicleformComponent  {
  public  form: FormGroup;
  public vehicle: VehicleModel;
  public editMode: boolean = false;
  @ViewChild('myForm', { static: false }) myForm!: NgForm;
  public formData: VehicleModel = {
    vehicle_id: 0,
    make: '',
    model: '',
    year:0,
    mileage:0,
  }

  constructor(
    private vehicleservice: VehicleService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VehicleformComponent>,
    @Inject(MAT_DIALOG_DATA)  public data: { editMode: boolean, record?: VehicleModel }
  ) {
    
    this.form=this.fb.group({
    vehicle_id: [null],
    make: [null, [Validators.required]],
    model: [null, [Validators.required]],
    year:[null,[Validators.required]],
    mileage:[null,[Validators.required]],
    });
    if (data && data.record) {
      this.form.patchValue(data.record);
    }
    this.editMode = data.editMode;
   }

  public submitVehicle(form: any): void {
    if (this.form.valid){
      this.formData = { ...this.form.value };
    if (this.editMode) {
      this.vehicleservice.updateVehicle(this.formData).subscribe(
        (updatedVehicle: VehicleModel) => {
          
          this.dialogRef.close(updatedVehicle);
          this.myForm.resetForm();
          this.editMode = false;
        },
        
      );
    } else {
      this.vehicleservice.addVehicle(this.formData).subscribe(
        (newVehicle: VehicleModel) => {
          
          this.dialogRef.close(newVehicle);
          this.myForm.resetForm();
          this.editMode = false;
        },
        
      );
    }
  }
}

  public cancelVehicle():void {
    this.dialogRef.close();
    this.myForm.resetForm();

  }
}

