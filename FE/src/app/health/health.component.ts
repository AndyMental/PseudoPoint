import { Component, OnInit } from '@angular/core';
import { Health } from '../shared/model/health';
import { HealthserviceService } from '../shared/services/healthservice.service';
import { FormsComponent } from './forms/forms.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService,TOAST_STATE } from '../shared/services/Toast.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css'],
})
export class HealthComponent implements OnInit {
  errorMessage: string = '';
  showSuccessMessage: boolean = false;
  successMessage: string = '';
  healths: Health[] = [];
  newHealthRecord: Health = {
    id: 0,
    date: '',
    steps: 0,
    calories: 0,
    heart_rate: 0,
    distance: 0,
  };

  constructor(
    private healthservice: HealthserviceService,
    private toastservice:ToastService,
    public dialog: MatDialog
  ) {}

  displayedColumns: string[] = ['id', 'date', 'steps', 'calories', 'distance', 'heart_rate', 'actions'];
  ngOnInit() {
    this.fetchHealthData();
  }

  deleteItem(id: number) {
    const userConfirmed = confirm('Are you sure you want to delete this item?');
    if (userConfirmed) {
      const index = this.healths.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.healthservice.delete(id).subscribe(() => {
          this.healths.splice(index, 1);
          this.showSuccessMessage = true;
          this.successMessage = 'Record deleted successfully!';
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        });
      }
    }
  }
  

  updateItem(id: number) {
    const existingRecord = this.healths.find((item) => item.id === id);
    this.openDialog('Update', existingRecord);
  }

  fetchHealthData() {
    this.healthservice.getAllHealth().subscribe((data) => {
      this.healths = data;
    });
  }

  addRecordPost() {
    this.healthservice.addHealthRecord(this.newHealthRecord).subscribe(
      (response: Health) => {
        this.healths.push(response)
        this.toastservice.showToast(TOAST_STATE.success, 'Data Edited Successfully')
      },
      (error) => {
        this.toastservice.showToast(TOAST_STATE.danger, 'Error Generated')
      }
    );
  }

  openDialog(action: string, healthData?: Health): void {
    const dialogRef = this.dialog.open(FormsComponent, {
      width: '360px',
      data: { action, healthData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'Submit') {
          this.fetchHealthData();
          this.showSuccessMessage = true;
          this.successMessage = 'Record added successfully!';
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        } else if (result.action === 'Update') {
          this.fetchHealthData();
          this.showSuccessMessage = true;
          this.successMessage = 'Record updated successfully!';
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        }
      }
    },
    (error) => {
      if (error?.error?.detail?.length > 0) {
        const errorMessageObj = error.error.detail[0];
        const fieldName = errorMessageObj.loc[errorMessageObj.loc.length - 1]; // Get the last field name causing the error
        const errorMessage = `${fieldName} is not a valid field..!`;
        this.errorMessage = errorMessage;
      } else {
        this.errorMessage = 'An unexpected error occurred.';
      }
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
    });
  }
}
