import { Component, Inject,ViewChild } from '@angular/core';
import { EventData } from '../../shared/model/events';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { EventsService } from 'src/app/shared/services/events.service';

@Component({
  selector: 'app-eventform',
  templateUrl: './eventform.component.html',
  styleUrls: ['./eventform.component.css'],
})
export class EventformComponent {
  public form: FormGroup;
  public event: EventData;
  public editMode: boolean = false;
  @ViewChild('myForm', { static: false }) myForm!: NgForm;
  public formData: EventData = {
    event_id: 0,
    names: '',
    date: '',
    location:'',
    description:'',
  }

  constructor(
    private eventservice: EventsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EventformComponent>,
    @Inject(MAT_DIALOG_DATA)  public data: { editMode: boolean, record?: EventData }
  ) {
    
    this.form=this.fb.group({
    event_id: [null],
    names: [null, [Validators.required,Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[A-Za-z]+([\'.\\s]?[A-Za-z]+)*$')]],
    date: [null, [Validators.required]],
    location:[null,[Validators.required,Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[A-Za-z]+([\'.\\s]?[A-Za-z]+)*$')]],
    description:[null,[Validators.required,Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[A-Za-z]+([\'.\\s]?[A-Za-z]+)*$')]],
    });
    if (data && data.record) {
      this.form.patchValue(data.record);
    }
    this.editMode = data.editMode;
   }

  public submitEvent(form: any): void {
    if (this.form.valid){
      this.formData = { ...this.form.value };
    if (this.editMode) {
      this.eventservice.updateEvent(this.formData).subscribe(
        (updatedEvent: EventData) => {
          
          this.dialogRef.close(updatedEvent);
          this.myForm.resetForm();
          this.editMode = false;
        },
        (error) => {
          
        }
      );
    } else {
      this.eventservice.addEvent(this.formData).subscribe(
        (newEvent: EventData) => {
          
          this.dialogRef.close(newEvent);
          this.myForm.resetForm();
          this.editMode = false;
        },
        (error) => {
          
        }
      );
    }
  }
}

  public cancelEvent() {
    this.dialogRef.close();
    this.myForm.resetForm();
  }
}

