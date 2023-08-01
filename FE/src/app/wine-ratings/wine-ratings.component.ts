import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WineRatings } from '../shared/model/wineratings';
import { WineratingsService } from '../shared/services/wineratings.service';
import { WineratingsformComponent } from '../wine-ratings/wineratingsform/wineratingsform.component';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { TOAST_STATE, ToastService } from '../shared/services/toast.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-wine-ratings',
  templateUrl: './wine-ratings.component.html',
  styleUrls: ['./wine-ratings.component.css'],
})
export class WineRatingsComponent implements OnInit {
  public wines: WineRatings[] = [];
  public showDeleteConfirmationModal: boolean = false;
  public eventToDelete: number;
  public dataSource = new MatTableDataSource<WineRatings>([]);
  public displayedColumns: string[] = [
    'id',
    'wine',
    'vintage',
    'rating',
    'actions',
  ];
  @Input() public showCoursesTable: boolean = false;
  @ViewChild(WineratingsformComponent, { static: false })
  formComponent: WineratingsformComponent;
  
  @ViewChild(MatTable) WineRatingsTable:MatTable<WineRatings>;
  public newwines: WineRatings = {
    id: null,
    wine: '',
    vintage: 0,
    rating: 0,
  };

  public updateWines: WineRatings = {
    id: null,
    wine: '',
    vintage: null,
    rating: null,
  };

  constructor(
    private winerating: WineratingsService,
    public dialog: MatDialog,
    private toastservice: ToastService
  ) {}

  public ngOnInit() {
    this.winerating.getAllWineratings().subscribe((data) => {
      this.wines = data;
    });
  }
  public deleteWines(id: number) {
    this.eventToDelete = id;
    this.showDeleteConfirmationModal = true;
  }
  public closeDeleteConfirmationModal() {
    this.showDeleteConfirmationModal = false;
  }
  public delete_Wine_Confirmation() {
    this.showDeleteConfirmationModal = false;
    this.winerating.delete(this.eventToDelete).subscribe(() => {
      this.wines = this.wines.filter((item) => item.id !== this.eventToDelete);

      this.toastservice.showToast(
        TOAST_STATE.danger,
        'Data Deleted Successfully'
      );
    });
  }
  public On_Adding_New_Wine(newWines: WineRatings) {
    this.winerating.post_data(newWines).subscribe(
      (response: WineRatings[]) => {
       

        this.wines.push(newWines);
        this.WineRatingsTable.renderRows();
      },
      (error) => {
        console.error('Error occurred while adding new wine ratings:', error);
      }
    );
  }

  public On_Updating_Wine_Details(updatedWine: WineRatings) {
    this.winerating.updateWine(updatedWine).subscribe(
      (response: WineRatings) => {
       
      
        this.wines = this.wines.map((wine) =>
          wine.id === updatedWine.id ? response : wine
        );
        this.WineRatingsTable.renderRows();
      },
      (error) => {
        console.error('Error occurred while updating wine rating:', error);
      }
    );
  }
  public openDialog(): void {
    const dialogRef = this.dialog.open(WineratingsformComponent, {
      width: '500px',
      data: { wines: this.newwines, isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result: WineRatings) => {
      if (result) {
        this.On_Adding_New_Wine(result);
      }
    });
  }

  public edit_Wine_Details(wines: WineRatings) {
    const dialogRef = this.dialog.open(WineratingsformComponent, {
      width: '500px',
      data: { wines, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result: WineRatings) => {
      if (result) {
        this.On_Updating_Wine_Details(result);
      }
    });
  }
}
