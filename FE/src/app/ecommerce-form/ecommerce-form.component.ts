import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../shared/model/ecommerce';


@Component({
  selector: 'app-ecommerce-form',
  templateUrl: './ecommerce-form.component.html',
  styleUrls: ['./ecommerce-form.component.css'],
})
export class EcommerceFormComponent implements OnInit {
  @Input() editingProduct: Product | null = null;
  public ecommerceForm!: FormGroup;

  @Output() saveItem = new EventEmitter<Product>();
  @Output() cancelForm = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EcommerceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editingProduct: Product | null }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.ecommerceForm = this.formBuilder.group({
      id: [0],
      title: ['', [Validators.required]],
      color: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
    });

    if (this.data.editingProduct) {
      this.ecommerceForm.patchValue(this.data.editingProduct);
    }
  }

  public onSubmit(): void {
    if (this.ecommerceForm.valid) {
      const newItem: Product = this.ecommerceForm.value;
      this.saveItem.emit(newItem);
      this.dialogRef.close(newItem);
    }
  }

  public onCancel(): void {
    this.cancelForm.emit();
    this.dialogRef.close();
  }

  public isControlInvalid(controlName: string): boolean {
    const control = this.ecommerceForm.get(controlName);
    return control !== null && control.invalid && control.touched;
  }
}
