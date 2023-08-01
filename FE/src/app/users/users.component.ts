import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersData } from '../shared/model/users';
import { UsersService } from '../shared/services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UsersformComponent } from './usersform/usersform.component';
import { MatTable } from '@angular/material/table';
import { TOAST_STATE, ToastService } from '../shared/services/Toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersDataSource: MatTableDataSource<UsersData>;
  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  editMode: boolean = false;
  formData: FormGroup;
  @ViewChild(MatTable) UsersTable!: MatTable<any>;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastservice: ToastService
  ) {}

  ngOnInit(): void {
    this.getUsersData();
  }

  private getUsersData(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.usersDataSource = new MatTableDataSource<UsersData>(data);
      },
      (error) => {
        console.error('Error fetching users data:', error);
      }
    );
  }

  public deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.usersDataSource.data = this.usersDataSource.data.filter((item) => item.id !== userId);
        this.toastservice.showToast(TOAST_STATE.success, 'Deleted Successfully');
      },
      (error) => {
        this.toastservice.showToast(
          TOAST_STATE.danger,
          `Error occurred while deleting Item: ${error}`
        );
      }
    );
  }

  public createUser(): void {
    this.openFormDialog();
  }

  public updateUser(user: UsersData): void {
    const existingRecord = this.usersDataSource.data.find((item) => item.id === user.id);
    if (existingRecord) {
      this.openFormDialog(existingRecord);
    }
  }

  private openFormDialog(dataToEdit?: UsersData): void {
    const dialogRef = this.dialog.open(UsersformComponent, {
      width: '400px',
      data: { editMode: !!dataToEdit, record: dataToEdit },
    });

    dialogRef.afterClosed().subscribe((result: UsersData | undefined) => {
      if (result) {
        if (dataToEdit) {
          // Update mode
          this.userService.updateUser(result).subscribe(
            (updatedRecord: UsersData) => {
              const index = this.usersDataSource.data.findIndex((item) => item.id === updatedRecord.id);
              if (index !== -1) {
                this.usersDataSource.data[index] = updatedRecord;
                this.toastservice.showToast(TOAST_STATE.success, 'Data Edited Successfully');
              }
            },
            (error) => {
              console.error('Error updating record:', error);
            }
          );
        } else {
          // Add mode (not needed here)
        }
      } else {
        // Handle the dialog cancellation
      }
    });
  }
}