import { Component, OnInit } from '@angular/core';
import { BillingInterface } from '../shared/model/billing.model';
import { BillingService } from '../shared/services/billing.service';
import { MatDialog } from '@angular/material/dialog';
import { BillingformComponent } from './billingform/billingform.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  
})
export class BillingComponent implements OnInit {
  showSuccessMessage: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  bill: MatTableDataSource<BillingInterface>;

  displayedColumns: string[] = ['id', 'name', 'address', 'credit_card', 'actions'];

  constructor(
    private billingservice: BillingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.billingservice.getBills().subscribe((data) => {
      this.bill = new MatTableDataSource(data);
    });
  }

  openAddRecordForm() {
    const dialogRef = this.dialog.open(BillingformComponent, {
      width: '360px',
    });

    dialogRef.afterClosed().subscribe((result: BillingInterface | undefined) => {
      if (result) {
        this.billingservice.addBill(result).subscribe(
          (response: BillingInterface) => {
            this.showSuccessMessage = true;
            this.successMessage = 'Record added successfully!';
            setTimeout(() => {
              this.showSuccessMessage = false;
            }, 3000);
            this.fetchData();
          },
          (error) => {
            this.showSuccessMessage = true;
            this.successMessage = error.error.detail[0].msg;
            setTimeout(() => {
              this.showSuccessMessage = false;
            }, 3000);
          }
        );
      }
    });
  }

  deleteBillrec(id: number) {
    const userConfirmed = confirm('Are you sure you want to delete this item?');
    if (userConfirmed) {
      this.billingservice.deleteBill(id).subscribe(() => {
        this.showSuccessMessage = true;
        this.successMessage = 'Deleted successfully';
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
        this.fetchData();
      });
    } else {
      this.showSuccessMessage = true;
      this.successMessage = 'Delete cancelled!';
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }
  }

  updateBillrec(id: number) {
    const existingRecord = this.bill.filteredData.find((item) => item.id === id);
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
                this.showSuccessMessage = true;
                this.successMessage = 'Update successfull!';
                setTimeout(() => {
                  this.showSuccessMessage = false;
                }, 3000);
                this.fetchData();
              },
              (error) => {
                this.showSuccessMessage = true;
                this.successMessage = 'An unexpected error occurred.';
                setTimeout(() => {
                  this.showSuccessMessage = false;
                }, 3000);
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
              ]; // Get the last field name causing the error
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
