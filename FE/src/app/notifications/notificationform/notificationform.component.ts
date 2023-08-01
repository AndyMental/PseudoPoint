import { Component, Inject } from '@angular/core';
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
  formData: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<NotificationformComponent>,
    public notificationsService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: { record?: NotificationData }
  ) {
    this.formData = this.formBuilder.group({
      id: [0],
      title: ['', Validators.required],
      message: ['', Validators.required]
    });
    if (data && data.record) {
      this.formData.patchValue(data.record);
    }
  }

  public notificationFormSubmit() {
    if (this.formData.valid) {
      const formData = this.formData.value;
      if (this.data.record) {
        // Editing existing notification
        this.notificationsService.updateNotification(formData).subscribe(
          (updatedNotification: NotificationData) => {
            this.dialogRef.close(updatedNotification);
          },
          (error) => {
            // Handle error if necessary
          }
        );
      } else {
        // Adding new notification
        this.notificationsService.createNotification(formData).subscribe(
          (newRecord: NotificationData) => {
            this.dialogRef.close(newRecord);
          },
          (error) => {
            // Handle error if necessary
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
