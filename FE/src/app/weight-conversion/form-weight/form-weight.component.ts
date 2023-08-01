import { Component,Inject, OnInit} from '@angular/core';
import { WeightConversionRequest,WeightConversionResponse } from 'src/app/shared/model/weight';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-weight',
  templateUrl: './form-weight.component.html',
  styleUrls: ['./form-weight.component.css']
})
export class FormWeightComponent implements OnInit{
  celestialObjectForm:FormGroup;
  celestialData: any;

  constructor(
    public dialogRef: MatDialogRef<FormWeightComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean; celestialEntry:WeightConversionResponse,celestialData: any;},
    private fb: FormBuilder,
  ) {
    this.celestialData = data.celestialData;
  }

 ngOnInit():void{
  this.celestialObjectForm = this.fb.group({
        celestialObject: ['', Validators.required],
        weightInput: ['', [Validators.required, Validators.min(0)]]
      });
 }
 onSave(): void {
  if (this.celestialObjectForm.valid) {
    const formValue = this.celestialObjectForm.value;
    const newCelestial: WeightConversionResponse = {
      celestial_object: formValue.celestialObject,
       weight:formValue.weightInput
    }
      this.dialogRef.close(newCelestial);
    }
  }
onCancel(): void {
  this.dialogRef.close();
}
}
