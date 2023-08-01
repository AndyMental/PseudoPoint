import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeolocationService } from '../shared/services/geolocation.service';
import { Geolocation } from '../shared/model/geolocation.moel';
import { GeoformComponent } from './geoform/geoform.component';
import { ToastService, TOAST_STATE } from '../shared/services/Toast.service';
import { MatTable } from '@angular/material/table';
@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
})
export class GeolocationComponent implements OnInit {
  @ViewChild(MatTable) geotable: MatTable<Geolocation>;
  public editMode: boolean = false;
  public errorMessage: string = '';
  public locations: Geolocation[] = [];
  public newlocation: Geolocation = {
    id: 0,
    latitude: 0,
    longitude: 0,
  };

  public displayedColumns: string[] = [
    'id',
    'latitude',
    'longitude',
    'actions',
  ];
  constructor(
    private dialog: MatDialog,
    private toastservice: ToastService,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit(): void {
    this.geolocationService.getLocations().subscribe((data) => {
      this.locations = data;
    });
  }
  private fetchGeoData(): void {
    this.geolocationService.getLocations().subscribe((data) => {
      this.locations = data;
    });
  }
  public deleteGeoLocation(id: number): void {
    this.geolocationService.deleteLocation(id).subscribe(() => {
      this.locations = this.locations.filter((item) => item.id !== id);
      this.toastservice.showToast(
        TOAST_STATE.success,
        'Record deleted Successfully'
      );
      this.fetchGeoData();
    });
  }

  public addGeoLocation(): void {
    const dialogRef = this.dialog.open(GeoformComponent, {
      width: '360px',
    });

    dialogRef.afterClosed().subscribe((result: Geolocation | undefined) => {
      if (result) {
        this.geolocationService.addLocation(result).subscribe(
          (response: Geolocation) => {
            this.locations.push(response);
          },
          (error) => {
            if (error?.error?.detail?.length > 0) {
              const errorMessageObj = error.error.detail[0];
              const fieldName =
                errorMessageObj.loc[errorMessageObj.loc.length - 1]; // Get the last field name causing the error
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

  public updateGeoLocation(id: number): void {
    const existingRecord = this.locations.find((item) => item.id === id);
    if (existingRecord) {
      const dialogRef = this.dialog.open(GeoformComponent, {
        width: '360px',
        data: { record: existingRecord },
      });

      dialogRef.afterClosed().subscribe(
        (result: Geolocation | undefined) => {
          if (result) {
            const index = this.locations.findIndex(
              (item) => item.id === result.id
            );
            if (index !== -1) {
              this.locations[index] = result;
              this.fetchGeoData();
            }
          }
        },
        (error) => {
          if (error?.error?.detail?.length > 0) {
            const errorMessageObj = error.error.detail[0];
            const fieldName =
              errorMessageObj.loc[errorMessageObj.loc.length - 1]; // Get the last field name causing the error
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
  }
}
