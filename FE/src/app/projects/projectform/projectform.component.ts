import { Component, Inject } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/project.services';
import { ProjectInterface } from 'src/app/shared/model/project.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService,TOAST_STATE } from 'src/app/shared/services/Toast.service';

@Component({
  selector: 'app-projectform',
  templateUrl: './projectform.component.html',
  styleUrls: ['./projectform.component.css'],
})
export class ProjectformComponent {
  public isEdit: boolean = false;
  public editMode: boolean = false;
  private formData: ProjectInterface = {
    id: null,
    project_name: '',
    company: '',
  };
  public projectForm: FormGroup;

  constructor(
    private toastservice:ToastService,
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

  public submitForm(form: any): void {
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
            this.toastservice.showToast(
              TOAST_STATE.danger,
              'Error occured'
            );
          }
        );
    } else {
      this.projectservice.addProject(this.formData).subscribe(
        (newRecord: ProjectInterface) => {
          this.toastservice.showToast(
            TOAST_STATE.success,
            'Record added successfully'
          );
          this.dialogRef.close(newRecord);
          this.isEdit = false;
          form.reset();
          this.editMode = false;
        },
        (error) => {
          this.toastservice.showToast(
            TOAST_STATE.danger,
            'Error occured'
          );
        }
      );
    }
  }

  public cancel():void  {
    this.dialogRef.close();
  }
}
