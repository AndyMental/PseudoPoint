import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Celebrities } from 'src/app/shared/model/celebrities';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-celebritesform',
  templateUrl: './celebritesform.component.html',
  styleUrls: ['./celebritesform.component.css'],
})
export class CelebritesformComponent implements OnInit {
  @Input() public showFormInput: boolean;
  @Input() public formData: Celebrities;
  @Output() public showFormOutput = new EventEmitter<boolean>();
  @Output() public addNewCelebs = new EventEmitter<Celebrities>();
  @Output() public updateCelebs = new EventEmitter<Celebrities>();
  public celebritiesForm: FormGroup;
  public currentYear: number;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { celebs: Celebrities; isEdit: boolean },
    public dialogRef: MatDialogRef<CelebritesformComponent>
  ) {
    this.currentYear = new Date().getFullYear();
  }
  public isEdit = false;
  public formDatas: Celebrities = {
    id: null,
    name: '',
    occupation: '',
    birth_year: null,
    nationality: '',
  };

  public ngOnInit(): void {
    this.initForm();
    if (this.data.isEdit) {
      this.showEditForm(this.data.celebs);
    }
  }

  private initForm() {
    this.celebritiesForm = this.formBuilder.group({
      id: [null, Validators.required],
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
        ],
      ],
      occupation: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
        ],
      ],
      birth_year: [
        null,
        [
          Validators.required,
          Validators.min(1950),
          Validators.max(this.currentYear),
        ],
      ],
      nationality: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
        ],
      ],
    });
  }
  public showEditForm(celebs: Celebrities) {
    console.log('celebs', celebs);
    this.isEdit = true;

    this.celebritiesForm.patchValue({
      id: celebs.id,
      name: celebs.name,
      occupation: celebs.occupation,
      birth_year: celebs.birth_year,
      nationality: celebs.nationality,
    });
  }

  public add_Celebrities_Details() {
    if (this.celebritiesForm.valid) {
      const newcelebss: Celebrities = {
        id: this.celebritiesForm.value.id,
        name: this.celebritiesForm.value.name,
        occupation: this.celebritiesForm.value.occupation,
        birth_year: this.celebritiesForm.value.birth_year,
        nationality: this.celebritiesForm.value.nationality,
      };

      this.addNewCelebs.emit(newcelebss);
      this.celebritiesForm.reset();
      this.isEdit = false;
    }
  }

  public update_Celebrity_Details() {
    if (this.celebritiesForm.valid) {
      const updatedCelebs: Celebrities = {
        id: this.celebritiesForm.value.id,
        name: this.celebritiesForm.value.name,
        occupation: this.celebritiesForm.value.occupation,
        birth_year: this.celebritiesForm.value.birth_year,
        nationality: this.celebritiesForm.value.nationality,
      };

      this.updateCelebs.emit(updatedCelebs);
      this.celebritiesForm.reset();
      this.isEdit = false;
    }
  }
  public resetForm() {
    throw new Error('Not Implementing');
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }
}
