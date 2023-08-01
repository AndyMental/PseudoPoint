import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();

  public confirm():void {
    this.confirmDelete.emit();
  }

  public cancel():void {
    this.cancelDelete.emit();
  }
}
