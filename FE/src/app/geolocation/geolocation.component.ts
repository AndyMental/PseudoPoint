import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeolocationService } from '../shared/services/geolocation.service';
import { Geolocation } from '../shared/model/geolocation.moel';
import { GeoformComponent } from './geoform/geoform.component';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
})
export class GeolocationComponent implements OnInit {
  editMode: boolean = false;
  errorMessage: string = '';
  locations: Geolocation[] = [];
  showSuccessMessage: boolean = false;
  successMessage: string = '';
  newlocation: Geolocation = {
    id: 0,
    latitude: 0,
    longitude: 0,
  };

  displayedColumns: string[] = ['id', 'latitude', 'longitude', 'actions'];
  constructor(
    private dialog: MatDialog,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit() {
    this.geolocationService.getLocations().subscribe((data) => {
      this.locations = data;
    });
  }
  fetchGeoData() {
    this.geolocationService.getLocations().subscribe((data) => {
      this.locations = data;
    });
  }
  deleteGeoLocation(id: number) {
    const userConfirmed = confirm('Are you sure you want to delete this item?');
    if (userConfirmed) {
      this.geolocationService.deleteLocation(id).subscribe(() => {
        this.locations = this.locations.filter((item) => item.id !== id);
        this.fetchGeoData();
        this.showSuccessMessage = true;
        this.successMessage = 'Record deleted successfully!';
        setTimeout(() => {
          this.showSuccessMessage = false; // Set showSuccessMessage back to false after 3 seconds
        }, 3000);
      });
    }
  }

  addGeoLocation() {
    const dialogRef = this.dialog.open(GeoformComponent, {
      width: '360px',
    });

    dialogRef.afterClosed().subscribe((result: Geolocation | undefined) => {
      if (result)  {
        this.geolocationService.addLocation(result).subscribe(
          (response: Geolocation) => {
            this.locations.push(response);
            this.showSuccessMessage = true;
            this.successMessage = 'Record added successfully!';
            setTimeout(() => {
              this.showSuccessMessage = false;
            }, 3000);   
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

  updateGeoLocation(id: number): void {
    const existingRecord = this.locations.find((item) => item.id === id);
    if (existingRecord) {
      const dialogRef = this.dialog.open(GeoformComponent, {
        width: '360px',
        data: { record: existingRecord }, // Pass the existingRecord as data
      });

      dialogRef.afterClosed().subscribe(
        (result: Geolocation | undefined) => {
          if (result) {
            const index = this.locations.findIndex(
              (item) => item.id === result.id
            );
            if (index !== -1) {
              this.locations[index] = result;
              this.showSuccessMessage = true;
              this.successMessage = 'Record Updated Successfully!';
              setTimeout(() => {
                this.showSuccessMessage = false;
              }, 3000);
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
