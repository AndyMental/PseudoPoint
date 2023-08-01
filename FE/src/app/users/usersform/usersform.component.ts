import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersData } from '../../shared/model/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usersform',
  templateUrl: './usersform.component.html',
  styleUrls: ['./usersform.component.css'],
})
export class UsersformComponent implements OnInit {
  formData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UsersformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean; record: UsersData | undefined }
  ) {
    this.formData = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });

    if (data.editMode && data.record) {
      this.formData.patchValue(data.record);
    }
  }

  ngOnInit(): void {}

  userFormCancel(): void {
    this.dialogRef.close();
  }

  userFormSubmit(): void {
    if (this.formData.valid) {
      this.dialogRef.close(this.formData.value);
    }
  }
}
