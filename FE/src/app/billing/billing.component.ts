import { Component, OnInit } from '@angular/core';
import { BillingInterface } from '../shared/model/billing.model';
import { BillingService } from '../shared/services/billing.service';
import { MatDialog } from '@angular/material/dialog';
import { BillingformComponent } from './billingform/billingform.component';
import { ToastService,TOAST_STATE } from '../shared/services/Toast.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  
})
export class BillingComponent implements OnInit {
  public errorMessage: string = '';
  public bill:BillingInterface[] = []

  displayedColumns: string[] = ['id', 'name', 'address', 'credit_card', 'actions'];

  constructor(
    private toastservice:ToastService,
    private billingservice: BillingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData():void {
    this.billingservice.getBills().subscribe((data) => {
      this.bill = data;
    });
  }

  public openAddRecordForm():void {
    const dialogRef = this.dialog.open(BillingformComponent, {
      width: '360px',
    });

    dialogRef.afterClosed().subscribe((result: BillingInterface | undefined) => {
      if (result) {
        this.billingservice.addBill(result).subscribe(
          (response: BillingInterface) => {
            this.bill.push(result)
          },
          (error) => {
            this.toastservice.showToast(
              TOAST_STATE.success,
              'Error occured!'
            );
          }
        );
      }
    });
  }

  public deleteBillrec(id: number):void {
    const userConfirmed = confirm('Are you sure you want to delete this item?');
    if (userConfirmed) {
      this.billingservice.deleteBill(id).subscribe(() => {
        this.toastservice.showToast(
          TOAST_STATE.success,
          'Record deleted successfully'
        );
        this.fetchData();
      });
    } else {
      this.toastservice.showToast(
        TOAST_STATE.success,
        'Record deleted cancelled'
      );
    }
  }

  public updateBillrec(id: number):void {
    const existingRecord = this.bill.find((item) => item.id === id);
    if (existingRecord) {
      const dialogRef = this.dialog.open(BillingformComponent, {
        width: '360px',
        data: { editMode: true, record: existingRecord },
      });
  
      dialogRef.afterClosed().subscribe(
        (result: BillingInterface | undefined) => {
          if (result) {
            this.billingservice.updateBill(result.id, result).subscribe(
              (response: BillingInterface) => {
              },
              (error) => {
                this.toastservice.showToast(
                  TOAST_STATE.success,
                  'error occured'
                );
              }
            );
          }
        },
        (error) => {
          if (error?.error?.detail?.length > 0) {
            const errorMessageObj = error.error.detail[0];
            const fieldName =
              errorMessageObj.loc[
                errorMessageObj.loc.length - 1
              ]; 
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
}
