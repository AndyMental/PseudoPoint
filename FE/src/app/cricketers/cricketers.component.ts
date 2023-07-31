import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Cricketers } from '../shared/model/cricketers';
import { CricketersformsComponent } from './cricketersforms/cricketersforms.component';
import { CricketersService } from '../shared/services/cricketers.service';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TOAST_STATE, ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-cricketers',
  templateUrl: './cricketers.component.html',
  styleUrls: ['./cricketers.component.css'],
})
export class CricketersComponent implements OnInit {
  public Crick: Cricketers[] = [];
  public showDeleteConfirmationModal: boolean = false;
  public eventToDelete: number;
  public dataSource = new MatTableDataSource<Cricketers>([]);
  public displayedColumns: string[] = ['id', 'name', 'age', 'nation', 'actions'];
  @ViewChild(CricketersformsComponent, { static: false })
  public formComponent: CricketersformsComponent;
  public showForm = false;
  public errorMessage = '';
  public newcricks: Cricketers = {
    id: null,
    name: '',
    age: null,
    nation: '',
  };
  public updateCelebs: Cricketers = {
    id: null,
    name: '',
    age: null,
    nation: '',
  };

  constructor(
    private crick: CricketersService,
    public dialog: MatDialog,
    private toastservice: ToastService
  ) {}
  public ngOnInit() {
    this.crick.getAllCricketers().subscribe((data) => {
      this.Crick = data;
    });
  }
  public delete_cricketers_details(id: number) {
    this.eventToDelete = id;
    this.showDeleteConfirmationModal = true;
  }

  closeDeleteConfirmationModal() {
    this.showDeleteConfirmationModal = false;
  }
  delete_Cricketer_Confirmation() {
    this.showDeleteConfirmationModal = false;
    this.crick.delete(this.eventToDelete).subscribe(() => {
      this.Crick = this.Crick.filter((item) => item.id !== this.eventToDelete);
      this.showForm = false;

      this.toastservice.showToast(
        TOAST_STATE.danger,
        'Data Deleted Successfully'
      );
    });
  }

  public On_Add_Cricketers_Details(newCricks: Cricketers) {
    this.crick.post_data(newCricks).subscribe(
      (response: Cricketers[]) => {
        this.Crick.push(newCricks);

        this.showForm = false;

        this.toastservice.showToast(
          TOAST_STATE.success,
          'Data Added Successfully'
        );
      },
      (error) => {
        console.error('Error saving real estate property:', error);
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
      }
    );
  }

  public On_Update_Cricketers_Details(updatedCrick: Cricketers) {
    console.log('hello');
    this.crick.updateCrick(updatedCrick).subscribe(
      (response: Cricketers) => {
        // Replace the updated
        this.Crick = this.Crick.map((crick) =>
          crick.id === updatedCrick.id ? response : crick
        );
        this.toastservice.showToast(
          TOAST_STATE.danger,
          'Data Updated Successfully'
        );
      },
      (error) => {
        console.error('Error saving real estate property:', error);
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
      }
    );
  }
  public openDialog(): void {
    const dialogRef = this.dialog.open(CricketersformsComponent, {
      width: '500px',
      data: { crick: this.newcricks, isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result: Cricketers) => {
      if (result) {
        this.On_Add_Cricketers_Details(result);
      }
    });
  }

  public editCricks(crick: Cricketers) {
    const dialogRef = this.dialog.open(CricketersformsComponent, {
      width: '500px',
      data: { crick, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result: Cricketers) => {
      if (result) {
        this.On_Update_Cricketers_Details(result);
      }
    });
  }
}
