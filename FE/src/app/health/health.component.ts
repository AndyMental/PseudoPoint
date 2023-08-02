import { Component, OnInit } from '@angular/core';
import { Health } from '../shared/model/health';
import { HealthserviceService } from '../shared/services/healthservice.service';
import { FormsComponent } from './forms/forms.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService, TOAST_STATE } from '../shared/services/Toast.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css'],
})
export class HealthComponent implements OnInit {
  public errorMessage: string = '';
  public healths: Health[] = [];
  public newHealthRecord: Health = {
    id: 0,
    date: '',
    steps: 0,
    calories: 0,
    heart_rate: 0,
    distance: 0,
  };

  constructor(
    private healthservice: HealthserviceService,
    private toastservice: ToastService,
    public dialog: MatDialog
  ) {}

  public displayedColumns: string[] = [
    'id',
    'date',
    'steps',
    'calories',
    'distance',
    'heart_rate',
    'actions',
  ];
  ngOnInit():void {
    this.fetchHealthData();
  }

  public deleteItem(id: number):void {
      const index = this.healths.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.healthservice.delete(id).subscribe(() => {
          this.fetchHealthData();
          this.healths.splice(index, 1);
          this.toastservice.showToast(
            TOAST_STATE.success,
            'Record deleted successfully'
          );
        });
      }
    }
  

  private fetchHealthData():void {
    this.healthservice.getAllHealth().subscribe((data) => {
      this.healths = data;
    });
  }

  openDialog(action: string, healthData?: Health): void {
    const dialogRef = this.dialog.open(FormsComponent, {
      width: '360px',
      data: { action, healthData },
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          if (result.action === 'Submit') {
            this.healths.push(result)
            this.fetchHealthData();
            this.toastservice.showToast(
              TOAST_STATE.success,
              'Record added Successfully'
            );
          } else if (result.action === 'Update') {
            this.fetchHealthData();
            this.toastservice.showToast(
              TOAST_STATE.success,
              'Record updated Successfully'
            );
          }
        }
      },
      (error) => {
        if (error?.error?.detail?.length > 0) {
          const errorMessageObj = error.error.detail[0];
          const fieldName = errorMessageObj.loc[errorMessageObj.loc.length - 1];
          const errorMessage = `${fieldName} is not a valid field..!`;
          this.errorMessage = errorMessage;
        } else {
          this.errorMessage = 'An unexpected error occurred.';
        }
      }
    );
  }
}
