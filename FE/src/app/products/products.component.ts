import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductData } from '../shared/model/products';
import { ProductsService } from '../shared/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductsformComponent } from './productsform/productsform.component';
import { DialogRef } from '@angular/cdk/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService, TOAST_STATE  } from '../shared/services/toast.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productdataSource: MatTableDataSource<ProductData>;
  public displayedColumns: string[] = ['id', 'name', 'price', 'description', 'action'];
  public editMode: boolean = false;
  public formData: FormGroup;

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private toastservice: ToastService
  ) {}

  ngOnInit(): void {
    this.getnotificationdata();
  }



  private getnotificationdata(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.productdataSource = new MatTableDataSource<ProductData>(data);
      },
      (error) => {
        console.error('Error fetching Notification data:', error);
      }
    );
  }


  public deleteProduct(productId: number): void {
    const userConfirmed = confirm('Are you sure you want to delete this item?');
    if (userConfirmed) {
      this.productService.delete(productId).subscribe(
        () => {
          this.productdataSource.data = this.productdataSource.data.filter(
            (item) => item.id !== productId
          );
          this.toastservice.showToast(
            TOAST_STATE.success,
            'Deleted Successfully'
          );
          

          
      
        },
        (error) => {
          this.toastservice.showToast(
            TOAST_STATE.danger,
            `Error occurred while deleting Item: ${error}`
          );
        }
      );
    } else {
      alert('Delete cancelled by the product.');
    }
  }


  public createProduct(): void {
    this.openFormDialog();
  }

  private openFormDialog(dataToEdit?: ProductData): void {
    const dialogRef = this.dialog.open(ProductsformComponent, {
      width: '400px',
      data: { editMode: !!dataToEdit, record: dataToEdit },
    });

    dialogRef.afterClosed().subscribe((result: ProductData | undefined) => {
      if (result) {
        if (dataToEdit) {
          this.productService.update(result).subscribe(
            (updatedRecord: ProductData) => {
              this.toastservice.showToast(TOAST_STATE.success, 'Data Edited Successfully')
              
            },
            (error) => {
              this.toastservice.showToast(TOAST_STATE.danger, error.detail['msg']);
            }
          );
        } else {
          this.productService.create(result).subscribe(
            (newRecord: ProductData) => {
             
              this.productdataSource.data.push(newRecord); // Add the new record to the existing data source
            },
            (error) => {
              console.error('Error adding record:', error);
            }
          );
          
          this.refreshData();
        }
      } else {
        // Handle the dialog cancellation
      }
    });
  }




  public updateProduct(product: ProductData): void {
    const existingRecord = this.productdataSource.data.find((item) => item.id===product.id);
    if(existingRecord) {
      const dialogRef = this.dialog.open(ProductsformComponent,{
        width: '400px',
        data: { editMode:true, record: existingRecord },
      });
      dialogRef.afterClosed().subscribe((result: ProductData | undefined) => {
        if (result){
          const index = this.productdataSource.data.findIndex((item) => item.id===result.id);
          if (index !==-1){
            this.productdataSource.data[index] = result;
          }
        }
        this.refreshData();
      });
    } else {
     
    }
  }




  // cancel(): void {
  //   this.editMode = false;
  //   this.formData.reset();
  // }



  private refreshData(): void {
    this.productService.getAllProducts().subscribe(
      (data) => (this.productdataSource.data = data),
      (error) => console.error('Error fetching oauth data:', error)
    );
  }
}








