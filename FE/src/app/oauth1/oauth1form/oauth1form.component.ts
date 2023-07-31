import { Component, Inject,OnInit } from '@angular/core';
import { Oauth1Data } from '../../shared/model/oauth1';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Oauth1Service } from '../../shared/services/oauth1.service';



@Component({
  selector: 'app-oauth1form',
  templateUrl: './oauth1form.component.html',
  styleUrls: ['./oauth1form.component.css']
})
export class Oauth1formComponent {
  public formData: FormGroup;
  public editMode: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<Oauth1formComponent>,
    private formBuilder: FormBuilder,
    private oauth1Service: Oauth1Service, // Inject your OAuth1 service here
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean; record?: Oauth1Data }
  ) {
    this.formData = this.formBuilder.group({
      id: [0],
      names: ['', Validators.required],
      email: ['', Validators.required],
      access_token: ['', Validators.required]
    });

    if (data && data.editMode && data.record) {
      // When in edit mode, copy the existing record's data to the form data
      this.editMode = true;
      this.formData.patchValue(data.record);
    }
  }

  public oauthSubmitForm(): void {
    if (this.formData.valid) {
      if (this.editMode) {
        // Perform update for OAuth1 record
        this.oauth1Service.updateOAuth(this.formData.value).subscribe(
          (updatedRecord: Oauth1Data) => {
         
            alert('Record updated successfully!');
            this.dialogRef.close(updatedRecord);
          },
          (error) => {
            console.error('Error updating record:', error);
          }
        );
      } else {
        // Perform add for new OAuth1 record
        this.oauth1Service.createOAuth(this.formData.value).subscribe(
          (newRecord: Oauth1Data) => {
           
            alert('Record added successfully!');
            this.dialogRef.close(newRecord); // Pass the new record to the parent component
          },
          (error) => {
            console.error('Error adding record:', error);
          }
        );
      }
    } else {
      // Mark all form fields as touched to show validation errors
      this.formData.markAllAsTouched();
    }
  }
  

  public formCancel() {
    this.dialogRef.close();
  }
}
