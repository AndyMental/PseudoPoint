import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WilldLife } from 'src/app/shared/model/wildlife';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  newWildLifeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean; wildlifeEntry: WilldLife },
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log('Received Data:', this.data); 
    this.initForm();
    if (this.data.editMode && this.data.wildlifeEntry) {
      this.patchForm(this.data.wildlifeEntry);
    }
  }

  private initForm(): void {
    this.newWildLifeForm = this.fb.group({
      id: 0,
      species: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+')
      ]),
      location: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+')
      ]),
      date: new FormControl('', Validators.required)
    });
  }

  private patchForm(wildlifeEntry: WilldLife): void {
    this.newWildLifeForm.patchValue(wildlifeEntry);
  }

  onSave(): void {
    if (this.newWildLifeForm.valid) {
      const formValue = this.newWildLifeForm.value;
      this.dialogRef.close(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based
    const day = today.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return formattedDate;
  }
}
