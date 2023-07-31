import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import { Geolocation } from 'src/app/shared/model/geolocation.moel';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-geoform',
  templateUrl: './geoform.component.html',
  styleUrls: ['./geoform.component.css'],
})
export class GeoformComponent {
  showSuccessMessage: boolean = false;
  successMessage: string = '';
  isEdit: boolean = false;
  editMode: boolean = false;
  formData: Geolocation = {
    id: null,
    latitude: null,
    longitude: null,
  };
  geoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GeoformComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { locations: Geolocation[]; record?: Geolocation },
    private geolocationService: GeolocationService
  ) {
    if (data && data.record) {
      this.formData = { ...data.record };
      this.editMode = true;
      this.isEdit = true;
    }

    this.geoForm = this.fb.group({
      id: [
        { value: this.formData.id, disabled: this.editMode },
        [Validators.required, Validators.min(1)],
      ],
      latitude: [
        this.formData.latitude,
        [Validators.required, this.noSpacesOrSpecialChars],
      ],
      longitude: [
        this.formData.longitude,
        [Validators.required, this.noSpacesOrSpecialChars],
      ],
    });
  }
  resetForm() {
    this.geoForm.reset();
  }

  submitForm(form): void {
    this.formData = this.geoForm.getRawValue();
    if (this.editMode) {
      this.geolocationService
        .updateLocation(this.formData.id, this.formData)
        .subscribe(
          (updatedRecord: Geolocation) => {
            this.isEdit = false; // Disable the ID field after updating
            this.dialogRef.close(updatedRecord);
          },
          (error) => {
            console.error('Error updating geolocation record:', error);
          }
        );
    } else {
      this.geolocationService.addLocation(this.formData).subscribe(
        (newRecord: Geolocation) => {
          this.geoForm.reset();
          this.isEdit = false; // Disable the ID field after adding
          this.editMode = false;
          this.dialogRef.close();
        },
        (error) => {
          this.showSuccessMessage = true;
          this.successMessage = 'Error encountered!';
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        }
      );
    }
  }

  cancel() {
    this.dialogRef.close();
  }
  noSpacesOrSpecialChars(): ValidatorFn {
    const companyRegex = /^[A-Za-z]+( +[A-Za-z]+)*$/; // Only letters (uppercase or lowercase) with up to two spaces allowed
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim(); // Trim the input value to remove leading/trailing spaces
      if (value && !companyRegex.test(value)) {
        return { invalidCompany: true };
      }
      return null;
    };
  }
}
