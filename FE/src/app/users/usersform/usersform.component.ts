import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersData } from '../../shared/model/users';
import { UsersService } from '../../shared/services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-usersform',
  templateUrl: './usersform.component.html',
  styleUrls: ['./usersform.component.css']
})
export class UsersformComponent {
  // @Input() userData: UsersData;
  // @Output() onSubmitForm: EventEmitter<UsersData> = new EventEmitter<UsersData>();
  // @Output() onCancelForm: EventEmitter<any> = new EventEmitter<any>();

  public formData: FormGroup;
  public editMode:boolean = false;

  constructor(
    public formBuilder: FormBuilder,private dialogRef: MatDialogRef<UsersformComponent>,
    public usersService: UsersService ,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean; record?: UsersData }// Inject the service
  ) {
    this.formData = this.formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      email: ['',Validators.required]
    });
    if (data && data.editMode && data.record){
      this.editMode = true;
      this.formData.patchValue(data.record);
    }
  }



  
  userFormSubmit() {
    if (this.formData.valid) {
      const formData = this.formData.value;
      if (this.editMode) {
        // Edit mode, hit PUT method
        // formData.id = this.formData.id;
        this.usersService.updateUser(this.formData.value).subscribe(
          (updatedUser: UsersData) => {
            console.log(updatedUser);
            this.dialogRef.close(updatedUser);
            // this.onSubmitForm.emit(updatedNotification);
            // this.form.reset();
          },
          (error) => {
           
          }
        );
      } else {
        // Add mode, hit POST method
        this.usersService.createUser(this.formData.value).subscribe(
          (newRecord: UsersData) => {
          
            this.dialogRef.close(newRecord);
            // this.onSubmitForm.emit(newNotification);
            // this.form.reset();
          },
          (error) => {
           
          }
        );
      }
    } else {
      this.formData.markAllAsTouched();
    }
  }

  userFormCancel(): void {
    this.dialogRef.close();

 
  }
}













  