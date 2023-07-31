import { Component, Inject } from '@angular/core';
import { BillingInterface } from 'src/app/shared/model/billing.model';
import { BillingService } from 'src/app/shared/services/billing.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-billingform',
  templateUrl: './billingform.component.html',
  styleUrls: ['./billingform.component.css'],
})
export class BillingformComponent {
  errorMessage: string = '';
  showSuccessMessage: boolean = false;
  successMessage: string = '';
  isEdit: boolean = false;
  editMode: boolean = false;
  formData: BillingInterface = {
    id: null,
    name: '',
    address: '',
    credit_card: '',
  };
  billingForm: FormGroup;

  constructor(
    private billingsevice: BillingService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BillingformComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { editMode: boolean; record?: BillingInterface }
  ) {
    if (data) {
      this.editMode = data.editMode;
      if (data.record) {
        this.formData = { ...data.record };
      }
    }
    this.billingForm = this.fb.group({
      id: [
        { value: this.formData.id, disabled: this.editMode },
        [Validators.required, Validators.min(1)],
      ],
      name: [
        this.formData.name,
        [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\\s]*$')],
      ],
      address: [
        this.formData.address,
        [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\\s]*$')],
      ],
      credit_card: [
        this.formData.credit_card,
        [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\\s]*$')],
      ],
    });
  }

  //Saif form haiving it!
  submitForm(form: any) {
    this.formData = this.billingForm.getRawValue();
    if (this.editMode) {
      this.billingsevice.updateBill(this.formData.id, this.formData).subscribe(
        (updatedRecord: BillingInterface) => {
          this.showSuccessMessage = true;
          this.successMessage = 'Record updated successfully!';
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
          this.isEdit = false;
          this.editMode = false;
          form.reset();
          this.dialogRef.close();
        },
        (error) => {
          if (error?.error?.detail?.length > 0) {
            const errorMessageObj = error.error.detail[0];
            const fieldName =
              errorMessageObj.loc[errorMessageObj.loc.length - 1]; // Get the last field name causing the error
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
      this.billingsevice.addBill(this.formData).subscribe(
        (newbill: BillingInterface) => {
          this.showSuccessMessage = true;
          this.successMessage = 'Record added successfully!';
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
          this.editMode = false;
          form.reset();
          this.dialogRef.close();
          this.isEdit = false;
        },
        (error) => {
          if (error?.error?.detail?.length > 0) {
            const errorMessageObj = error.error.detail[0];
            const fieldName =
              errorMessageObj.loc[errorMessageObj.loc.length - 1]; // Get the last field name causing the error
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
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
