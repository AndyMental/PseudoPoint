import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Health } from 'src/app/shared/model/health';
import { HealthserviceService } from 'src/app/shared/services/healthservice.service';
import {
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent {
  public errorMessage: string = '';
  public isEdit: boolean = false;
  public editMode: boolean = false;
  private formData: Health = {
    id: null,
    date: '',
    calories: null,
    steps: null,
    heart_rate: null,
    distance: null,
  };
  public healthForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormsComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { action: string; healthData?: Health },
    private healthservice: HealthserviceService
  ) {
    this.healthForm = this.fb.group({
      id: 0,
      // { value: this.formData.id, disabled: this.editMode },
      // [Validators.required, Validators.min(1)],
      date: ['', [Validators.required, this.dateValidator]],
      steps: [null, [Validators.required]],
      calories: 0,
      distance: [null, [Validators.required]],
      heart_rate: [null, [Validators.required]],
    });

    if (data && data.action === 'Update' && data.healthData) {
      this.editMode = true;
      this.formData = { ...data.healthData };
      this.healthForm.patchValue(this.formData);
      this.isEdit = true;
    }
  }

  public submitForm(form):void {
    if (this.editMode) {
      this.healthservice
        .update(this.formData.id, this.healthForm.value)
        .subscribe(
          (response: any) => {
            this.isEdit = false;
            this.dialogRef.close({ action: 'Update', data: response });
          },
          (error) => {
            if (error?.error?.detail?.length > 0) {
              const errorMessageObj = error.error.detail[0];
              const fieldName =
                errorMessageObj.loc[errorMessageObj.loc.length - 1];
              const errorMessage = `${fieldName} is not a valid field..!`;
              this.errorMessage = errorMessage;
            } else {
              this.errorMessage = 'An unexpected error occurred.';
            }
            setTimeout(() => {
              this.errorMessage = '';
            }, 5000);
          }
        );
    } else {
      this.healthservice
        .addHealthRecord(this.healthForm.value)
        .subscribe((response: any) => {
          this.isEdit = false;
          this.dialogRef.close({ action: 'Submit', data: response });
        });
    }
  }

  public cancel():void {
    this.dialogRef.close();
  }
  private dateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      return { futureDate: true };
    }
    return null;
  }
}
