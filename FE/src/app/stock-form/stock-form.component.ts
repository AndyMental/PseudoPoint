import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../shared/services/stocks.service';
import { Stocks } from '../shared/model/stocks';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  public stockForm: FormGroup;
  public isEditing: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<StockFormComponent>,
    private formBuilder: FormBuilder,
    private stockService: StockService,
    @Inject(MAT_DIALOG_DATA) private data: Stocks | null
  ) { 
    if (data) {
      this.isEditing = true;
    }
  }

  ngOnInit(): void {
    this.isEditing = !!this.data;
    this.initForm();
  }

  private initForm(): void {
    this.stockForm = this.formBuilder.group({
      id: [this.isEditing ? this.data?.id : null],
      symbol: [this.isEditing ? this.data?.symbol : '', Validators.required],
      name: [this.isEditing ? this.data?.name : '', Validators.required],
      price: [this.isEditing ? this.data?.price : '', Validators.required],
      change: [this.isEditing ? this.data?.change : '', Validators.required]
    });
  }

  public saveStock(): void {
    if (this.stockForm.valid) {
      const newStock: Stocks = this.stockForm.value;
      if (this.isEditing) {
        this.stockService.updateStock(newStock.id, newStock).subscribe(
          (updatedStock) => {
            this.dialogRef.close(updatedStock);
          },
          (error) => {
            console.error('Error updating stock:', error);
          }
        );
      } else {
        this.stockService.addStock(newStock).subscribe(
          (addedStock) => {
            this.dialogRef.close(addedStock);
          },
          (error) => {
            console.error('Error adding stock:', error);
          }
        );
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}


