import { Component, OnInit, Inject ,Input} from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HistoryEvents } from 'src/app/shared/model/event';


@Component({
  selector: 'app-hevent-form',
  templateUrl: './hevent-form.component.html',
  styleUrls: ['./hevent-form.component.css'],
})

export class HeventFormComponent implements OnInit {
 public newEventForm: FormGroup;
 public isEditMode: boolean = false;
  @Input() historicalEvents: HistoryEvents[];

  constructor(
    public dialogRef: MatDialogRef<HeventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean; eventEntry: HistoryEvents },
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.isEditMode = this.data.editMode;
    if (!this.isEditMode && this.historicalEvents && this.historicalEvents.length > 0) {
   //this.patchID();
    } else if (this.isEditMode && this.data.eventEntry) {
      this.patchForm(this.data.eventEntry);
    }
  }

  private initForm(): void {
    this.newEventForm = this.fb.group({
      ID: 0,
      year: [null, [Validators.required, Validators.max(this.getYear())]],
      event: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  patchID(): void {
    const maxID = Math.max(...this.historicalEvents.map((event) => event.ID), 0);
    this.newEventForm.patchValue({ ID: maxID + 1 });
  }

  private patchForm(eventEntry: HistoryEvents): void {
    this.newEventForm.patchValue(eventEntry);
  }

  onSave(): void {
    if (this.newEventForm.valid) {
      const formValue = this.newEventForm.value;
      this.dialogRef.close(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getYear() {
    const today = new Date();
    return today.getFullYear();
  }
}
