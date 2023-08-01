import { Component, OnInit, ViewChild } from '@angular/core';
import { WildlifeService } from '../shared/services/wildlife.service';
import { WilldLife } from '../shared/model/wildlife';
import { FormComponent } from './form/form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService, TOAST_STATE } from '../shared/services/toast.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-wildlife',
  templateUrl: './wildlife.component.html',
  styleUrls: ['./wildlife.component.css'],
})
export class WildlifeComponent implements OnInit {
  public wildlife: WilldLife[] = [];
  public editMode: boolean = false;
  public existingWildlife: WilldLife = null;
  public showDeleteConfirmationModal: boolean = false;
  public speciesToDelete: number;
  @ViewChild(MatTable) wildlifeTable!: MatTable<any>;

  constructor(
    private wildlifeService: WildlifeService,
    private toastservice: ToastService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchWildlifeData();
  }

  private fetchWildlifeData(): void {
    this.wildlifeService.getWildlife().subscribe((data) => {
      this.wildlife = data;
    });
  }

  public deleteSpecies(id: number): void {
    this.speciesToDelete = id;
    this.showDeleteConfirmationModal = true;
  }

  public closeDeleteConfirmationModal(): void {
    this.showDeleteConfirmationModal = false;
  }

  public deleteItemConfirmed(): void {
    this.showDeleteConfirmationModal = false;
    this.wildlifeService.delete(this.speciesToDelete).subscribe(
      () => {
        this.wildlife = this.wildlife.filter(
          (item) => item.id !== this.speciesToDelete
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
  }

  public openFormDialog(editMode: boolean, wildlifeEntry?: WilldLife): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '300px',
      data: {
        editMode: editMode,
        wildlifeEntry: wildlifeEntry ? wildlifeEntry : null,
      },
    });

    dialogRef.afterClosed().subscribe((result: WilldLife) => {
      if (result) {
        if (editMode) {
          this.onUpdateWildlifeEntry(result);
        } else {
          this.onAddNewWildlifeEntry(result);
        }
      }
    });
  }

  private onUpdateWildlifeEntry(updatedWildlife: WilldLife): void {
    this.wildlifeService.putWildlife(updatedWildlife).subscribe(
      () => {
        const index = this.wildlife.findIndex(
          (item) => item.id === updatedWildlife.id
        );
        if (index !== -1) {
          this.wildlife[index] = updatedWildlife;
          this.wildlifeTable.renderRows();
          this.toastservice.showToast(
            TOAST_STATE.success,
            'Data Edited Successfully'
          );
        }
        this.existingWildlife = null;
      },
      (error) => {
        this.toastservice.showToast(TOAST_STATE.danger, 'Something went wrong');
      }
    );
  }

  private onAddNewWildlifeEntry(newWildlifeEntry: WilldLife): void {
    this.wildlifeService.post_data(newWildlifeEntry).subscribe(
      (response: WilldLife | WilldLife[]) => {
        if (Array.isArray(response)) {
          this.wildlife.push(...response);
        } else {
          this.wildlife.push(response);
        }
        this.wildlifeTable.renderRows();
        this.toastservice.showToast(
          TOAST_STATE.success,
          'Data Added Successfully'
        );
      },
      (error) => {
        this.toastservice.showToast(TOAST_STATE.danger, error.detail['msg']);
      }
    );
  }
}
