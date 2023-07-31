import { Component, OnInit } from '@angular/core';
import { UsersData } from '../shared/model/users';
import { UsersService } from '../shared/services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TOAST_STATE, ToastService } from '../shared/services/toast.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UsersformComponent } from './usersform/usersform.component';
import { NotificationData } from '../shared/model/notifications';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersDataSource: MatTableDataSource<UsersData>;
  displayedColumns: string[] = ['id','name', 'email', 'action'];
  editMode: boolean = false;
  formData: FormGroup;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastservice: ToastService
  ) {}

  ngOnInit(): void {
    this.getusersdata();
  }

  private getusersdata(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.usersDataSource = new MatTableDataSource<UsersData>(data);
      },
      (error) => {
        console.error('Error fetching users data:', error);
      }
    );
  }

  public deleteuser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.usersDataSource.data = this.usersDataSource.data.filter((item) => item.id !== userId);
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
  }

  public createuser(): void {
    this.openFormDialog();
  }

  private openFormDialog(dataToEdit?: UsersData): void {
    const dialogRef = this.dialog.open(UsersformComponent, {
      width: '400px',
      data: { editMode: !!dataToEdit, record: dataToEdit },
    });

    dialogRef.afterClosed().subscribe((result: UsersData | undefined) => {
      if (result) {
        if (dataToEdit) {
          this.userService.updateUser(result).subscribe(
            (updatedRecord: UsersData) => {
              
            },
            (error) => {
              console.error('Error updating record:', error);
            }
          );
        } else {
          this.userService.createUser(result).subscribe(
            (newRecord: UsersData) => {
            
              this.usersDataSource.data.push(newRecord); // Add the new record to the existing data source
            },
            (error) => {
              console.error('Error adding record:', error);
            }
          );
          
          this.refreshData();
        }
      } else {
        // Handle the dialog cancellation
      }
    });
  }
  public updateUser(user: UsersData): void {
    const existingRecord = this.usersDataSource.data.find((item) => item.id===user.id);
    if(existingRecord) {
      const dialogRef = this.dialog.open(UsersformComponent,{
        width: '400px',
        data: { editMode:true, record: existingRecord },
      });
      dialogRef.afterClosed().subscribe((result: UsersData | undefined) => {
        if (result){
          const index = this.usersDataSource.data.findIndex((item) => item.id===result.id);
          if (index !==-1){
            this.usersDataSource.data[index] = result;
            this.toastservice.showToast(TOAST_STATE.success, 'Data Edited Successfully')
          }
        }
        this.refreshData();
        this.toastservice.showToast(TOAST_STATE.success, 'Data Added Successfully');
      });
    } (error) => {
      this.toastservice.showToast(TOAST_STATE.danger, error.detail['msg']);
    }
  }


  private refreshData(): void {
    this.userService.getUsers().subscribe(
      (data) => (this.usersDataSource.data = data),
      (error) => console.error('Error fetching users data:', error)
    );
  }
}








    