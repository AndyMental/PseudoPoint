import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RealEstateListing } from '../shared/model/real-estate';

@Component({
  selector: 'app-real-estate-form',
  templateUrl: './real-estate-form.component.html',
  styleUrls: ['./real-estate-form.component.css'],
})
export class RealEstateFormComponent implements OnInit {
  public propertyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RealEstateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RealEstateListing | null
  ) {
    this.propertyForm = this.formBuilder.group({
      id: [data ? data.id : 0],
      address: [data ? data.address : '', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      price: [data ? data.price : 0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0), Validators.max(1000000)]],
      bedrooms: [data ? data.bedrooms : 0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1), Validators.max(10)]],
      bathrooms: [data ? data.bathrooms : 0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1), Validators.max(5)]],
      square_feet: [data ? data.square_feet : 0, [Validators.required, Validators.min(500), Validators.max(10000)]],
      description: [data ? data.description : '', [Validators.required]],
    });
  }

  ngOnInit() {}

  public isControlInvalid(controlName: string): boolean {
    const control = this.propertyForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  public save() {
    if (this.propertyForm.valid) {
      const propertyData = this.propertyForm.value;
      this.dialogRef.close(propertyData);
    } else {
      this.markFormControlsAsTouched();
    }
  }

  public onCancel() {
    this.dialogRef.close();
  }

  private markFormControlsAsTouched() {
    Object.keys(this.propertyForm.controls).forEach((controlName) => {
      const control = this.propertyForm.get(controlName);
      control?.markAsTouched();
    });
  }
}





