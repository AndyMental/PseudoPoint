import { Component, OnInit } from '@angular/core';
import { Oauth1Data } from '../shared/model/oauth1';
import { Oauth1Service } from '../shared/services/oauth1.service';
import { MatDialog } from '@angular/material/dialog';
import { Oauth1formComponent } from './oauth1form/oauth1form.component';
import { ToastService, TOAST_STATE  } from '../shared/services/toast.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-oauth1',
  templateUrl: './oauth1.component.html',
  styleUrls: ['./oauth1.component.css'],
})
export class Oauth1Component implements OnInit {
  public dataSource: Oauth1Data[] = [];
  public displayedColumns: string[] = ['id', 'names', 'email', 'access_token', 'action'];
  public oauthDataSource:MatTableDataSource<Oauth1Data>
  constructor(private dialog: MatDialog, private oauth1Service: Oauth1Service,  private toastservice: ToastService) {}

  ngOnInit() {
    this.getOAuthData();
  }


  private getOAuthData(): void {
    this.oauth1Service.getOAuthData().subscribe(
      (data) => (this.dataSource = data),
      (error) => console.error('Error fetching OAuth data:', error)
    );
    this.refreshData();
   
  }

  public deleteOAuth(names: string): void {
    const userConfirmed = confirm('Are you sure you want to delete this item?');
    if (userConfirmed) {
      this.oauth1Service.deleteOAuth(names).subscribe(
        () => {
          this.dataSource = this.dataSource.filter((item) => item.names !== names);
          this.refreshData();
          this.toastservice.showToast(
            TOAST_STATE.success,
            'Deleted Successfully'
          );
        },
        (error) => {
          this.toastservice.showToast(
            TOAST_STATE.danger,
            `Error occurred while deleting Item: ${error}`
          ); 
        }
      );
    } else {
      alert('Delete cancelled by the user.');
    }
  }

  public createOAuth(): void {
    this.openFormDialog();
  }

  public updateOAuth(oauth: Oauth1Data): void {
    const userConfirm = confirm('Are you sure you want to update?');
    if (userConfirm) {
      const existingRecord = this.dataSource.find((item) => item.id === oauth.id);
      if (existingRecord) {
        const dialogRef = this.dialog.open(Oauth1formComponent, {
          width: '400px',
          data: { editMode: true, record: existingRecord },
        });
  
        dialogRef.afterClosed().subscribe((result: Oauth1Data | undefined) => {
          if (result) {
            const index = this.dataSource.findIndex((item) => item.id === result.id);
            if (index !== -1) {
              this.dataSource[index] = result;
              this.toastservice.showToast(TOAST_STATE.success, 'Data Edited Successfully')
            }
          }
        }, (error) => { // Move this error handling block inside the inner subscribe
          this.toastservice.showToast(TOAST_STATE.danger, error.detail['msg']);
        });
      }
    }
  }
  

  private openFormDialog(dataToEdit?: Oauth1Data): void {
    const dialogRef = this.dialog.open(Oauth1formComponent, {
      width: '400px', // Adjust the width as per your requirement
      data: { editMode: !!dataToEdit, record: dataToEdit }, // Pass the data to the dialog if editing, null if adding
    });

    // Handle the dialog result
    dialogRef.afterClosed().subscribe((result: Oauth1Data | undefined) => {
      if (result) {
        // If a result is returned, handle the form data submission
        if (dataToEdit) {
          // Editing existing data
          this.oauth1Service.updateOAuth(result).subscribe(
            (updatedRecord: Oauth1Data) => {
             
              // Handle the update logic and data refresh here
              this.refreshData();
            },
            (error) => {
              this.toastservice.showToast(TOAST_STATE.danger, error.detail['msg']);
            }
          );
        } else {
          // Adding new data
          this.oauth1Service.createOAuth(result).subscribe(
            (newRecord: Oauth1Data) => {
            
              this.oauthDataSource.data.push(newRecord);
              // Handle the add logic and data refresh here
              this.refreshData();
              this.toastservice.showToast(TOAST_STATE.success, 'Data Added Successfully');
            },
            (error) => {
              console.error('Error adding record:', error);
            }
          );
        }
      } else {
        // Handle the dialog cancellation
      }
    });
  }

  private refreshData(): void {
    this.oauth1Service.getOAuthData().subscribe(
      (data) => (this.dataSource = data),
      (error) => console.error('Error fetching OAuth data:', error)
    );
  }
}