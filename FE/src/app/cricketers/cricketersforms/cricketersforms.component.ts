import { Component, Input, Output, EventEmitter, OnInit,Inject} from '@angular/core';
import { Cricketers } from 'src/app/shared/model/cricketers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Import the FormGroup, FormBuilder, and Validators
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cricketersforms',
  templateUrl: './cricketersforms.component.html',
  styleUrls: ['./cricketersforms.component.css'],
})
export class CricketersformsComponent implements OnInit {
  @Input() public showFormInput: boolean;
  @Output() public showFormOutput = new EventEmitter<boolean>();
  @Output() public addNewCricks = new EventEmitter<Cricketers>();
  @Output() public updateCricks = new EventEmitter<Cricketers>();
  public cricketersForm: FormGroup;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { crick: Cricketers; isEdit: boolean },public dialogRef: MatDialogRef<CricketersformsComponent>) {} // Inject FormBuilder
  isEdit = false;
  showBanIcon = false;
  formData: Cricketers = {
    
    id: null,
    name: '',
    age: null,
    nation: '',
  };

  public ngOnInit() {
    this.initForm();
   if(this.data.isEdit){
    this.showEditForm(this.data.crick)
   }
  }

  private initForm() {
    this.cricketersForm = this.fb.group({
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
      age: [
        null,
        [Validators.required, Validators.min(19), Validators.max(45)],
      ],
      nation: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
        ],
      ],
    });
  }

  public showEditForm(cricks: Cricketers) {
    this.isEdit = true;
    this.cricketersForm.patchValue({
      id: cricks.id,
      name: cricks.name,
      age: cricks.age,
      nation: cricks.nation,
    });
  }
 
  public add_new_record() {
    if (this.cricketersForm.valid) {
      const newCricketer: Cricketers = {
        id: this.cricketersForm.value.id,
        name: this.cricketersForm.value.name,
        age: this.cricketersForm.value.age,
        nation: this.cricketersForm.value.nation,
      };
      this.addNewCricks.emit(newCricketer);
      this.cricketersForm.reset();
      this.isEdit = false;
    }
  }

  public update_details() {
    if (this.cricketersForm.valid) {
      const updatedCricketer: Cricketers = {
        id: this.cricketersForm.value.id,
        name: this.cricketersForm.value.name,
        age: this.cricketersForm.value.age,
        nation: this.cricketersForm.value.nation,
      };
      this.updateCricks.emit(updatedCricketer);
      this.cricketersForm.reset();
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
