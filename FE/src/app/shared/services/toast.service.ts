import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export enum TOAST_STATE {
  success = 'success',
  danger = 'danger'
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

 public showToast(state: TOAST_STATE, message: string): void {
    const config: MatSnackBarConfig = {
      duration: 3000, 
      panelClass: ['toast', state],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    };

    this.snackBar.open(message, 'Close', config);
  }
}
