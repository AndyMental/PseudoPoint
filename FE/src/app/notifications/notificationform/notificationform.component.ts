import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationData } from '../../shared/model/notifications';
import { NotificationsService } from '../../shared/services/notifications.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notificationform',
  templateUrl: './notificationform.component.html',
  styleUrls: ['./notificationform.component.css']
  
})
export class NotificationformComponent {

  editMode: boolean = false;
  formData: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<NotificationformComponent>,
    public notificationsService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean; record?: NotificationData }// Inject the service
  ) {
    this.formData = this.formBuilder.group({
      id: [0],
      title: ['', Validators.required],
      message: ['',Validators.required]
    });
    if (data && data.editMode && data.record){
      this.editMode = true;
      this.formData.patchValue(data.record);
    }
  }



  public notificationFormSubmit() {
    if (this.formData.valid) {
      const formData = this.formData.value;
      if (this.editMode) {
        // Edit mode, hit PUT method
        // formData.id = this.formData.id;
        this.notificationsService.updateNotification(this.formData.value).subscribe(
          (updatedNotification: NotificationData) => {
            
            this.dialogRef.close(updatedNotification);
            // this.onSubmitForm.emit(updatedNotification);
            // this.form.reset();
          },
          (error) => {
          
          }
        );
      } else {
        // Add mode, hit POST method
        this.notificationsService.createNotification(this.formData.value).subscribe(
          (newRecord: NotificationData) => {
         
            this.dialogRef.close(newRecord);
            // this.onSubmitForm.emit(newNotification);
            // this.form.reset();
          },
          (error) => {
           
          }
        );
      }
    } else {
      this.formData.markAllAsTouched();
    }
  }

  public notificationFormCancel(): void {
    this.dialogRef.close();

 
  }
}