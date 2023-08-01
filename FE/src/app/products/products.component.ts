import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductData } from '../shared/model/products';
import { ProductsService } from '../shared/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductsformComponent } from './productsform/productsform.component';
import { ToastService, TOAST_STATE } from '../shared/services/toast.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productdataSource: MatTableDataSource<ProductData>;
  public displayedColumns: string[] = ['id', 'name', 'price', 'description', 'action'];

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private toastservice: ToastService
  ) {}

  ngOnInit(): void {
    this.getProductsData();
  }

  private getProductsData(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.productdataSource = new MatTableDataSource<ProductData>(data);
      },
      (error) => {
        console.error('Error fetching Product data:', error);
      }
    );
  }

  public deleteProduct(productId: number): void {
    // const userConfirmed = confirm('Are you sure you want to delete this item?');
    // if (userConfirmed) {
      this.productService.delete(productId).subscribe(
        () => {
          this.productdataSource.data = this.productdataSource.data.filter((item) => item.id !== productId);
          this.toastservice.showToast(TOAST_STATE.success, 'Deleted Successfully');
        },
        (error) => {
          this.toastservice.showToast(TOAST_STATE.danger, `Error occurred while deleting Item: ${error}`);
        }
      );
  //   } else {
  //     alert('Delete cancelled by the product.');
  //   }
  }

  public createProduct(): void {
    this.openFormDialog();
  }

  public updateProduct(product: ProductData): void {
    this.openFormDialog(product);
  }

  private openFormDialog(dataToEdit?: ProductData): void {
    const dialogRef = this.dialog.open(ProductsformComponent, {
      width: '400px',
      data: { editMode: !!dataToEdit, record: dataToEdit },
    });

    dialogRef.afterClosed().subscribe((result: ProductData | undefined) => {
      if (result) {
        if (result.id) {
          // Edit mode
          this.productService.update(result).subscribe(
            (updatedRecord: ProductData) => {
              const index = this.productdataSource.data.findIndex((item) => item.id === updatedRecord.id);
              if (index !== -1) {
                this.productdataSource.data[index] = updatedRecord;
                this.toastservice.showToast(TOAST_STATE.success, 'Data Edited Successfully');
              }
            },
            (error) => {
              this.toastservice.showToast(TOAST_STATE.danger, error.detail['msg']);
            }
          );
        } else {
          // Add mode
          this.productService.create(result).subscribe(
            (newRecord: ProductData) => {
              this.productdataSource.data.push(newRecord);
              this.toastservice.showToast(TOAST_STATE.success, 'Data Added Successfully');
            },
            (error) => {
              console.error('Error adding record:', error);
            }
          );
        }
      }
    });
  }
}
