import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Feature } from 'src/app/shared/model/geograpgy';

@Component({
  selector: 'app-geo-form',
  templateUrl: './geo-form.component.html',
  styleUrls: ['./geo-form.component.css'],
})
export class GeoFormComponent implements OnInit {
  public newFeatureForm: FormGroup;
  public isEditMode: boolean = false;
  @Input() features: Feature[] = [];

  constructor(
    public dialogRef: MatDialogRef<GeoFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { editMode: boolean; geographyEntry: Feature },
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.isEditMode = this.data.editMode;
    if (this.isEditMode && this.data.geographyEntry) {
      this.patchForm(this.data.geographyEntry);
    }
  }

  private initForm(): void {
    this.newFeatureForm = this.fb.group({
      id: 0,
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
        ],
      ],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
    });
  }

  private patchForm(geoEntry: Feature): void {
    this.newFeatureForm.patchValue({
      id: geoEntry.id,
      name: geoEntry.name,
      latitude: geoEntry.location.latitude,
      longitude: geoEntry.location.longitude,
    });
  }

  public onSave(): void {
    if (this.newFeatureForm.valid) {
      const formValue = this.newFeatureForm.value;
      const newFeature: Feature = {
        id: formValue.id,
        name: formValue.name,
        location: {
          latitude: formValue.latitude,
          longitude: formValue.longitude,
        },
      };
      this.dialogRef.close(newFeature);
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
