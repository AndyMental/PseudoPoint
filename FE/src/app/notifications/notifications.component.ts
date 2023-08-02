import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from '../shared/services/notifications.service';
import { NotificationData } from '../shared/model/notifications';
import { NotificationformComponent } from './notificationform/notificationform.component';
import { ToastService, TOAST_STATE } from '../shared/services/Toast.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  public notificationDataSource: MatTableDataSource<NotificationData>;
  private displayedColumns: string[] = ['id', 'title', 'message', 'action'];
  public formData: FormGroup;
  public editMode: boolean = false;
  @ViewChild(MatTable) notificationTable!: MatTable<any>;

  // Flag to keep track of whether the form is currently submitting
  private isFormSubmitting: boolean = false;

  constructor(
    private notificationsService: NotificationsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastservice: ToastService
  ) {}

  ngOnInit(): void {
    this.getnotificationdata();
    this.initializeForm();
  }

  private initializeForm(): void {
    this.formData = this.formBuilder.group({
      id: [0],
      title: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  private getnotificationdata(): void {
    this.notificationsService.getNotificationData().subscribe(
      (data) => {
        this.notificationDataSource = new MatTableDataSource<NotificationData>(data);
      },
      (error) => {
        console.error('Error fetching Notification data:', error);
      }
    );
  }

  public deleteNotification(notificationId: number): void {
    const userConfirmed = confirm('Are you sure you want to delete this item?');
    if (userConfirmed) {
      this.notificationsService.deleteNotification(notificationId).subscribe(
        () => {
          this.notificationDataSource.data = this.notificationDataSource.data.filter(
            (item) => item.id !== notificationId
          );
          this.toastservice.showToast(TOAST_STATE.success, 'Deleted Successfully');
        },
        (error) => {
          this.toastservice.showToast(TOAST_STATE.danger, `Error occurred while deleting Item: ${error}`);
        }
      );
    } else {
      alert('Delete cancelled by the user.');
    }
  }

  public createNotification(): void {
    if (!this.isFormSubmitting) {
      this.isFormSubmitting = true;
      this.openFormDialog();
    }
  }

  private openFormDialog(dataToEdit?: NotificationData): void {
    const dialogRef = this.dialog.open(NotificationformComponent, {
      width: '400px',
      data: { record: dataToEdit },
    });

    dialogRef.afterClosed().subscribe((result: NotificationData | undefined) => {
      this.isFormSubmitting = false; // Reset the flag when the dialog is closed

      if (result) {
        this.notificationsService.createNotification(result).subscribe(
          (newRecord: NotificationData) => {
            this.notificationDataSource.data.push(newRecord);
            this.notificationTable.renderRows();
            this.toastservice.showToast(TOAST_STATE.success, 'Data Added Successfully');
          },
          (error) => {
            console.error('Error adding record:', error);
          }
        );
      } else {
        // Handle the dialog cancellation
      }
    });
  }

  public updateNotification(notification: NotificationData): void {
    const existingRecord = this.notificationDataSource.data.find((item) => item.id === notification.id);
    if (existingRecord) {
      const dialogRef = this.dialog.open(NotificationformComponent, {
        width: '400px',
        data: { record: existingRecord },
      });
      dialogRef.afterClosed().subscribe((result: NotificationData | undefined) => {
        if (result) {
          this.notificationsService.updateNotification(result).subscribe(
            (updatedRecord: NotificationData) => {
              const index = this.notificationDataSource.data.findIndex((item) => item.id === result.id);
              if (index !== -1) {
                this.notificationDataSource.data[index] = updatedRecord;
                this.notificationTable.renderRows(); // Call renderRows() after updating data
                this.toastservice.showToast(TOAST_STATE.success, 'Data Edited Successfully');
              }
            },
            (error) => {
              this.toastservice.showToast(TOAST_STATE.danger, error.detail['msg']);
            }
          );
        }
      });
    } else {
      this.toastservice.showToast(TOAST_STATE.danger, 'Notification not found.');
    }
  }
}
