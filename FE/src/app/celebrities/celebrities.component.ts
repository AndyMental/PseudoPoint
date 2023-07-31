import { Component, OnInit, ViewChild } from '@angular/core';
import { Celebrities } from '../shared/model/celebrities';
import { CelebritiesService } from '../shared/services/celebrities.service';
import { CelebritesformComponent } from '../celebrities/celebritesform/celebritesform.component';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TOAST_STATE, ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-celebrities',
  templateUrl: './celebrities.component.html',
  styleUrls: ['./celebrities.component.css'],
})
export class CelebritiesComponent implements OnInit {
  public Celeb: Celebrities[] = [];
  public dataSource = new MatTableDataSource<Celebrities>([]);
  displayedColumns: string[] = [
    'id',
    'name',
    'occupation',
    'birth_year',
    'nationality',
    'actions',
  ];

  public showDeleteConfirmationModal: boolean = false;
  public eventToDelete: number;
  public isEdit = false;
  @ViewChild(CelebritesformComponent, { static: false })
  public formComponent!: CelebritesformComponent;
  public showForm = false;
  public newcelebs: Celebrities = {
    id: null,
    name: '',
    occupation: '',
    birth_year: 0,
    nationality: '',
  };
  public updateCelebs: Celebrities = {
    id: null,
    name: '',
    occupation: '',
    birth_year: null,
    nationality: '',
  };

  constructor(
    private celeb: CelebritiesService,
    public dialog: MatDialog,
    private toastservice: ToastService
  ) {}
  public ngOnInit() {
    this.celeb.getAllCelebrities().subscribe((data) => {
      this.Celeb = data;
    });
  }

  delete_Celebrity_Details(id: number) {
    this.eventToDelete = id;
    this.showDeleteConfirmationModal = true;
  }

  closeDeleteConfirmationModal() {
    this.showDeleteConfirmationModal = false;
  }
  delete_Celebrity_Confirmation() {
    this.showDeleteConfirmationModal = false;
    this.celeb.delete(this.eventToDelete).subscribe(() => {
      this.Celeb = this.Celeb.filter((item) => item.id !== this.eventToDelete);

      this.toastservice.showToast(
        TOAST_STATE.danger,
        'Data Deleted Successfully'
      );
    });
  }
  public on_Add_New_Celeb_Details(newCeleb: Celebrities) {
    this.celeb.post_data(newCeleb).subscribe(
      (response: Celebrities[]) => {
        this.Celeb.push(newCeleb);

        this.showForm = false;
        this.toastservice.showToast(
          TOAST_STATE.success,
          'Data Added Successfully'
        );
      },
      (error) => {
        console.error('Error occurred while adding new celebrity:', error);
      }
    );
  }

  public on_Update_New_Celeb_Details(updatedCeleb: Celebrities) {
    this.celeb.updateCeleb(updatedCeleb).subscribe(
      (response: Celebrities) => {
        this.Celeb = this.Celeb.map(
          (celeb) => (celeb.id === updatedCeleb.id ? response : celeb) // If it finds a match, it replaces that celebrity with the response
        );

        this.showForm = false;
        this.toastservice.showToast(
          TOAST_STATE.success,
          'Data Edited Successfully'
        );
      },
      (error) => {
        console.error('Error occurred while updating wine rating:', error);
      }
    );
  }
  public openDialog(): void {
    const dialogRef = this.dialog.open(CelebritesformComponent, {
      width: '500px',
      data: { celebs: this.newcelebs, isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result: Celebrities) => {
      if (result) {
        this.on_Add_New_Celeb_Details(result);
      }
    });
  }

  public editCelebs(celebs: Celebrities) {
    const dialogRef = this.dialog.open(CelebritesformComponent, {
      width: '500px',
      data: { celebs, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result: Celebrities) => {
      if (result) {
        this.on_Update_New_Celeb_Details(result);
      }
    });
  }
}
