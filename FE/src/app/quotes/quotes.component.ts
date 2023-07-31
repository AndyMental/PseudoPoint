import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { QuotesDetails } from '../shared/services/quotes.service';
import { Quotes } from '../shared/model/quotes';
import { FormsComponent } from './forms/forms.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TOAST_STATE,ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent implements OnInit {
  public dataSource = new MatTableDataSource<Quotes>([]);
  public displayedColumns: string[] = ['id', 'text', 'author', 'actions'];
  @Input() public showCoursesTable: boolean = false;
  @ViewChild(FormsComponent, { static: false }) public formComponent: FormsComponent;
  public showForm = false;

  public showDeleteConfirmationModal:boolean=false;
  public eventToDelete:number;
  public newQuote: Quotes = {
    id: null,
    text: '',
    author: '',
  };

  public selectedQuote: Quotes = {
    id: null,
    text: '',
    author: '',
  };
  public searchAuthor: Quotes;
  public quotes: Quotes[] = []; 
  
  public filteredQuotes: Quotes[] = []; 
  public isLoading: boolean;

  constructor(private quotesdetails: QuotesDetails,public dialog: MatDialog,private toastservice:ToastService) {}

  public ngOnInit() {
    
    this.quotesdetails.getAllQuotes().subscribe(
      (quotes) => {
        this.quotes = quotes;
       
        this.filteredQuotes = this.quotes;
      },
      (error) => {
        console.error('Error occurred while fetching quotes:', error);
      }
    );
  }
  public deleteQuote(id: number) {
    this.eventToDelete = id;
    this.showDeleteConfirmationModal = true
}
    
    closeDeleteConfirmationModal() {
      this.showDeleteConfirmationModal = false;
      
    }
    delete_Quote_Confirmation(){
      this.showDeleteConfirmationModal=false;
      this.quotesdetails.delete(this.eventToDelete).subscribe(() => {
            this.quotes = this.quotes.filter((item) => item.id !== this.eventToDelete);
            this.showForm = false;
           
            this.toastservice.showToast(TOAST_STATE.danger, 'Data Deleted Successfully');
          });
        }

 

  public on_updating_quote(updatedQuote: Quotes) {
    this.quotesdetails.updateQuote(updatedQuote).subscribe(
      (response: Quotes) => {
       
        const index = this.quotes.findIndex((q) => q.id === updatedQuote.id);
        if (index !== -1) {
          this.quotes[index] = { ...response };
        }
        this.formComponent.resetForm();
        this.selectedQuote = { id: null, text: '', author: '' }; 
        this.ngOnInit();
  
        this.toastservice.showToast(TOAST_STATE.success, 'Data Updated Successfully');
      },
      (error) => {
        console.error('Error occurred while updating quote:', error);
      }
    );
  }

  on_adding_new_quote(newQuoteEntry: Quotes) {
    this.quotesdetails.post_data(newQuoteEntry).subscribe(
      (response: Quotes[]) => {
        

        this.quotes.push(newQuoteEntry);
        this.ngOnInit();
        this.showForm = false;
      
        this.toastservice.showToast(TOAST_STATE.success, 'Data Added Successfully');
      },
      (error) => {
        console.error('Error occurred while adding Quotes:', error);
      }
    );
  }

  on_Search_author(searchValue: string) {
    
    if (searchValue.trim() === '') {
      this.filteredQuotes = this.quotes;
    } else {
      this.quotesdetails.searchQuotes(searchValue).subscribe(
        (filteredQuotes) => {
          this.filteredQuotes = this.quotes.filter((quote) =>
            quote.author.toLowerCase().includes(searchValue.toLowerCase())
          );
          
          
        },
        (error) => {
          console.error('Error occurred while searching quotes:', error);
        }
      );
    }
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(FormsComponent, {
      width: '500px',
      data: { quote: this.newQuote, isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result: Quotes) => {
      if (result) {
        this.on_adding_new_quote(result);
      }
    });
  }

  public editQuote(quote: Quotes) {
    const dialogRef = this.dialog.open(FormsComponent, {
      width: '500px',
      data: { quote, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result: Quotes) => {
      if (result) {
        this.on_updating_quote(result);
      }
    });
  }
}


