import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quotes } from 'src/app/shared/model/quotes';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  @Input() public showFormInput: boolean;
  @Output() public showFormOutput = new EventEmitter<boolean>();
  @Output() public addNewQuery = new EventEmitter<Quotes>();
  @Output() public updateQuotes = new EventEmitter<Quotes>();
  public quotesForm: FormGroup;
  public isEdit = false;

  public formData: Quotes = {
    id: null,
    text: null,
    author: null,
  };

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { quote: Quotes; isEdit: boolean },
    public dialogRef: MatDialogRef<FormsComponent>
  ) {}

  public ngOnInit(): void {
    this.initForm();

    if (this.data.isEdit) {
      this.showEditForm(this.data.quote);
    }
  }

  public initForm() {
    this.quotesForm = this.formBuilder.group({
      id: [null, Validators.required],
      text: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(85),
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
        ],
      ],
      author: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
        ],
      ],
    });
  }
  public showEditForm(quote: Quotes) {
    
    this.isEdit = true;
    this.quotesForm.patchValue({
      id: quote.id,
      text: quote.text,
      author: quote.author,
    });
  }

  public add_new_quote() {
    if (this.quotesForm.valid) {
      const newquotes: Quotes = {
        id: this.quotesForm.value.id,
        text: this.quotesForm.value.text,
        author: this.quotesForm.value.author,
      };

      this.addNewQuery.emit(newquotes);
      this.quotesForm.reset();
      this.isEdit = false;
    }
  }

  public update_existing_quote() {
    if (this.quotesForm.valid) {
      const updateQuote: Quotes = {
        id: this.quotesForm.value.id,
        text: this.quotesForm.value.text,
        author: this.quotesForm.value.author,
      };

      this.updateQuotes.emit(updateQuote);
      this.quotesForm.reset();
      this.isEdit = false;
      this.showFormOutput.emit(false);
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
