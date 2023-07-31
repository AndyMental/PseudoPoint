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
  @Input() productToEdit: ProductData | null = null; // null is used as the default value when no product is being edited
  public editMode: boolean = false;
  public formData: FormGroup;

  constructor(
    private productservice: ProductsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProductsformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean; record?: ProductData }// Inject the service
    ) {
      this.formData = this.formBuilder.group({
        id: [0],
        name: ['', Validators.required],
        price: ['',Validators.required],
        description: ['',Validators.required],

      });
      if (data && data.editMode && data.record){
        this.editMode = true;
        this.formData.patchValue(data.record);
      }
    }



    public productFormSubmit() {
      if (this.formData.valid) {
        const formData = this.formData.value;
        if (this.editMode) {
          // Edit mode, hit PUT method
          // formData.id = this.formData.id;
          this.productservice.update(this.formData.value).subscribe(
            (updatedNotification: ProductData) => {
             
              this.dialogRef.close(updatedNotification);
              // this.onSubmitForm.emit(updatedNotification);
              // this.form.reset();
            },
            (error) => {
             
            }
          );
        } else {
          // Add mode, hit POST method
          this.productservice.create(this.formData.value).subscribe(
            (newRecord: ProductData) => {
              ;
              this.dialogRef.close(newRecord);
              // this.onSubmitForm.emit(newNotification);
              // this.form.reset();
            },
            (error) => {
          
            }
          );
        }
      } else {
        this.formData.markAllAsTouched();
      }
    }
  
    productFormCancel(): void {
      this.dialogRef.close();
  
   
    }
  }
































































