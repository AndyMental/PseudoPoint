import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteconfirmation-dialog',
  templateUrl: './deleteconfirmation-dialog.component.html',
  styleUrls: ['./deleteconfirmation-dialog.component.css']
})
export class DeleteconfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteconfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

}
