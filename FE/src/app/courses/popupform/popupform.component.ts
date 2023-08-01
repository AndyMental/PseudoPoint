import { Component, Inject, ViewChild } from '@angular/core';
import { CoursesModel } from '../../shared/model/courses';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-popupform',
  templateUrl: './popupform.component.html',
  styleUrls: ['./popupform.component.css'],
})
export class PopupFormComponent {
  public form: FormGroup;
  public course: CoursesModel;
  public editMode: boolean = false;
  @ViewChild('myForm', { static: false }) myForm!: NgForm;
  public formData: CoursesModel = {
    course_id: 0,
    title: '',
    instructor: '',
    description: '',
    price: 0,
    duration: 0,
    prerequisites: '',
  };

  constructor(
    private coursesService: CoursesService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean; record?: CoursesModel }
  ) {
    this.form = this.fb.group({
      course_id: [null],
      title: [null, [Validators.required,Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[A-Za-z]+([\'.\\s]?[A-Za-z]+)*$')]],
      instructor: [null, [Validators.required,Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[A-Za-z]+([\'.\\s]?[A-Za-z]+)*$')]],
      description: [null, [Validators.required,Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[A-Za-z]+([\'.\\s]?[A-Za-z]+)*$')]],
      price: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      prerequisites: [null, [Validators.required]],
    });
    if (data && data.record) {
      this.form.patchValue(data.record);
    }
    this.editMode = data.editMode;
  }

  public submitCourse(form: any): void {
    if (this.form.valid) {
      this.formData = { ...this.form.value };
      if (this.editMode) {
        this.coursesService.updateCourse(this.formData).subscribe(
          (updatedCourse: CoursesModel) => {
            
            this.dialogRef.close(updatedCourse);
            this.myForm.resetForm();
            this.editMode = false;
          },
          
        );
      } else {
        this.coursesService.addCourse(this.formData).subscribe(
          (newCourse: CoursesModel) => {
            
            this.dialogRef.close(newCourse);
            this.myForm.resetForm();
            this.editMode = false;
          },
          
        );
      }
    }
  }

  public cancelCourse():void {
    this.dialogRef.close();
    this.myForm.resetForm();
  }
}
