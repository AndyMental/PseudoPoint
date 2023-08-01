import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StockService } from '../shared/services/stocks.service';
import { Stocks } from '../shared/model/stocks';
import { StockFormComponent } from '../stock-form/stock-form.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ToastService,TOAST_STATE} from '../shared/services/toast.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  public stocks: Stocks[];
  public errorMessage:string = '';
  @ViewChild(MatTable) stocksTable: MatTable<Stocks>;

  constructor(
    private stockService: StockService,
    private dialog: MatDialog,
    private toastservice:ToastService
  ) { }

  ngOnInit(): void {
    this.loadStocks();
  }

  public loadStocks(): void {
    this.stockService.getStocks().subscribe(
      (data) => {
        this.stocks = data;
      },
      (error) => {
        console.error('Error fetching stocks:', error);
      }
    );
  }

  public addNewStock(): void {
    this.openStockForm();
  }

  public editStock(stock: Stocks): void {
    this.openStockForm(stock);
  }

  public deleteStock(stock: Stocks): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this stock?'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.stockService.deleteStock(stock.id).subscribe(
          () => {
            this.stocks = this.stocks.filter((item) => item.id !== stock.id);
            this.loadStocks();
            this.toastservice.showToast(TOAST_STATE.success, 'Data deleted Successfully');
          },
          (error) => {
            if (error?.error?.detail?.length > 0) {
              const errorMessageObj = error.error.detail[0];
              const fieldName = errorMessageObj.loc[errorMessageObj.loc.length - 1];
              const errorMessage = `${fieldName} is not a valid field..!`;
              this.errorMessage = errorMessage;
            } else {
              this.errorMessage = 'An unexpected error occurred.';
            }
            setTimeout(() => {
              this.errorMessage = '';
            }, 5000);
          }
        );
      }
    });
  }

  private openStockForm(stock?: Stocks): void {
    const dialogRef = this.dialog.open(StockFormComponent, {
      width: '400px',
      data: stock
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (stock) {
          const updatedStockIndex = this.stocks.findIndex(s => s.id === stock.id);
          if (updatedStockIndex !== -1) {
            this.stocks[updatedStockIndex] = result;
            this.stocksTable.renderRows();
            this.toastservice.showToast(TOAST_STATE.success, 'Data Edited Successfully');
          }
        } else {
          this.stocks.push(result);
          this.stocksTable.renderRows();
          this.toastservice.showToast(TOAST_STATE.success, 'Data added Successfully');
        }
      }
    });
  }
}

