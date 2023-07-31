import { Component, Input, Output, EventEmitter, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WineRatings } from 'src/app/shared/model/wineratings';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-wineratingsform',
  templateUrl: './wineratingsform.component.html',
  styleUrls: ['./wineratingsform.component.css'],
})
export class WineratingsformComponent implements OnInit {
  @Input() public showFormInput: boolean;
  @Output() public showFormOutput = new EventEmitter<boolean>();
  @Output() public addNewWines = new EventEmitter<WineRatings>();
  @Output() public updateWines = new EventEmitter<WineRatings>();
  public wineratingsForm: FormGroup;
  public currentYear: number;
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { wines: WineRatings; isEdit: boolean },public dialogRef: MatDialogRef<WineratingsformComponent>) {
    this.currentYear = new Date().getFullYear();
  }
  public isEdit = false;
  public formData: WineRatings = {
    
    id: null,
    wine: '',
    vintage: null,
    rating: null,
  };

  public ngOnInit(): void {
    this.initForm();
    if(this.data.isEdit){
      this.showEditForm(this.data.wines)
    }
  }

  private initForm() {
    this.wineratingsForm = this.formBuilder.group({
      id: [null, Validators.required],
      wine: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
        ],
      ],
      vintage: [
        null,
        [
          Validators.required,
          Validators.min(1800),
          Validators.max(this.currentYear),
        ],
      ],
      rating: [
        null,
        [Validators.required, Validators.min(10), Validators.max(100)],
      ],
    });
  }

  public resetForm() {
    throw new Error('Method not implemented.');
  }


  public showEditForm(wines: WineRatings) {
    this.isEdit = true;
    this.wineratingsForm.patchValue({
      id: wines.id,
      wine: wines.wine,
      vintage: wines.vintage,
      rating: wines.rating,
    });
  
  }

  public add_new_wine_details() {
    
    if (this.wineratingsForm.valid) {
      const newwines: WineRatings = {
        id: this.wineratingsForm.value.id,
        wine: this.wineratingsForm.value.wine,
        vintage: this.wineratingsForm.value.vintage,
        rating: this.wineratingsForm.value.rating,
      };
      this.addNewWines.emit(newwines);
      this.wineratingsForm.reset();
      this.isEdit = false;
    }
  }

  public update_wine_details() {
    if (this.wineratingsForm.valid) {
      const updatedWines: WineRatings = {
        id: this.wineratingsForm.value.id,
        wine: this.wineratingsForm.value.wine,
        vintage: this.wineratingsForm.value.vintage,
        rating: this.wineratingsForm.value.rating,
      };

      this.updateWines.emit(updatedWines);
      this.wineratingsForm.reset();
      this.isEdit = false;
    }
  }
  public onNoClick(): void {
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }
 
}
