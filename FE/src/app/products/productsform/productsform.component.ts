import { Component, Input, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductData } from 'src/app/shared/model/products';
import { ProductsService } from 'src/app/shared/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-productsform',
  templateUrl: './productsform.component.html',
  styleUrls: ['./productsform.component.css'],
})
export class ProductsformComponent {
  @Input() productToEdit: ProductData | null = null;
  public editMode: boolean = false;
  public formData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProductsformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean; record?: ProductData }
  ) {
    this.formData = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (data && data.editMode && data.record) {
      this.editMode = true;
      this.formData.patchValue(data.record);
    }
  }

  public productFormSubmit() {
    if (this.formData.valid) {
      this.dialogRef.close(this.formData.value);
    } else {
      this.formData.markAllAsTouched();
    }
  }

  public productFormCancel(): void {
    this.dialogRef.close();
  }
}





























