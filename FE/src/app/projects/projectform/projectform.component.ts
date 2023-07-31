import { Component, Inject } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/project.services';
import { ProjectInterface } from 'src/app/shared/model/project.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-projectform',
  templateUrl: './projectform.component.html',
  styleUrls: ['./projectform.component.css'],
})
export class ProjectformComponent {
  showSuccessMessage: boolean = false;
  successMessage: string = '';
  isEdit: boolean = false;
  editMode: boolean = false;
  formData: ProjectInterface = {
    id: null,
    project_name: '',
    company: '',
  };
  projectForm: FormGroup;

  constructor(
    private projectservice: ProjectService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProjectformComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { editMode: boolean; record?: ProjectInterface }
  ) {
    if (data) {
      this.editMode = data.editMode;
      if (data.record) {
        this.formData = { ...data.record };
      }
    }
    this.projectForm = this.fb.group({
      id: [
        { value: this.formData.id, disabled: this.editMode },
        [Validators.required, Validators.min(1)], 
      ],
      project_name: [
        this.formData.project_name,
        [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\\s]*$')],
      ],
      company: [
        this.formData.company,
        [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\\s]*$')],
      ],
    });
  }

  submitForm(form: any): void {
    //Required for updation saif
    this.formData = this.projectForm.getRawValue();

    if (this.editMode) {
      this.projectservice
        .updateProject(this.formData.id, this.formData)
        .subscribe(
          (updatedRecord: ProjectInterface) => {
            this.dialogRef.close(updatedRecord);
            this.editMode = false;
            this.isEdit = false;
            form.reset();
          },
          (error) => {
            console.error('Error updating record:', error);
          }
        );
    } else {
      this.projectservice.addProject(this.formData).subscribe(
        (newRecord: ProjectInterface) => {
          this.dialogRef.close(newRecord);
          this.isEdit = false;
          form.reset();
          this.editMode = false;
        },
        (error) => {
          console.error('Error adding record:', error);
        }
      );
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
