import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EcommerceService } from '../shared/services/ecommerce.service';
import { Product } from '../shared/model/ecommerce';
import { EcommerceFormComponent } from '../ecommerce-form/ecommerce-form.component';
import { ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import { ToastService,TOAST_STATE} from '../shared/services/toast.service';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css'],
})
export class EcommerceComponent implements OnInit {
  public products: Product[] = [];
  @ViewChild(MatTable) ecommerceTable: MatTable<Product>;

  constructor(
    private ecommerceService: EcommerceService,
    private dialog: MatDialog,
    private toastservice:ToastService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts(): void {
    this.ecommerceService.getProducts().subscribe(
      (data) => {
        this.products = data;
      }
    );
  }

 public openFormDialog(product: Product | null): void {
    const dialogRef = this.dialog.open(EcommerceFormComponent, {
      width: '400px',
      data: { editingProduct: product },
    });

    dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (result) {
        if (product) {
          this.ecommerceService.updateProduct(product.id, result).subscribe(
            (updatedProduct) => {
              const index = this.products.findIndex((p) => p.id === product.id);
              if (index !== -1) {
                this.products[index] = updatedProduct;
                this.ecommerceTable.renderRows();
              }
              this.toastservice.showToast(TOAST_STATE.success, 'Data updated Successfully');
            },
            (error) => {
              if (error?.error?.detail?.length > 0) {
                this.toastservice.showToast(TOAST_STATE.danger, 'An unexpected error occurred.');
              }
            }
          );
        } else {
          this.ecommerceService.createProduct(result).subscribe(
            (createdProduct) => {
              this.products.push(createdProduct);
              this.ecommerceTable.renderRows();
              this.toastservice.showToast(TOAST_STATE.success, 'Data added Successfully');
            },
            (error) => {
              if (error?.error?.detail?.length > 0) {
                this.toastservice.showToast(TOAST_STATE.danger, 'An unexpected error occurred.');
              }
            }
          );
        }
      }
    });
  }

  public onDeleteItem(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this item?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.ecommerceService.deleteProduct(id).subscribe(
          () => {
            this.products = this.products.filter((product) => product.id !== id);
            this.ecommerceTable.renderRows();
            this.toastservice.showToast(TOAST_STATE.success, 'Data deleted Successfully');
          },
          (error) => {
            if (error?.error?.detail?.length > 0) {
              this.toastservice.showToast(TOAST_STATE.danger, 'An unexpected error occurred.');
            }
          }
        );
      }
    });
  }
}
