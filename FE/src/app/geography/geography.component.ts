import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Feature } from '../shared/model/geograpgy';
import { GeographyService } from '../shared/services/geography.service';
import { TOAST_STATE, ToastService } from '../shared/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeoFormComponent } from './geo-form/geo-form.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-geography',
  templateUrl: './geography.component.html',
  styleUrls: ['./geography.component.css'],
})
export class GeographyComponent implements OnInit {
  @ViewChild(MatTable) geograpghyTable!: MatTable<any>;
  public features: Feature[] = [];
  public editMode: boolean = false;
  public selectedFeatureForUpdate: Feature = null;
  public showDeleteConfirmationModal: boolean = false;
  public eventToDelete: number;

  @Input() newFeatureForm: any;
  constructor(
    private geographyFeaturesService: GeographyService,
    private toastservice: ToastService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getGeographicalFeatures();
  }

  private getGeographicalFeatures(): void {
    this.geographyFeaturesService
      .getGeographicalFeatures()
      .subscribe((features) => {
        this.features = features;
      });
  }

  public deleteFeature(id: number): void {
    this.eventToDelete = id;
    this.showDeleteConfirmationModal = true;
  }

  public closeDeleteConfirmationModal(): void {
    this.showDeleteConfirmationModal = false;
  }

  public deleteItemConfirmed(): void {
    this.showDeleteConfirmationModal = false;
    this.geographyFeaturesService
      .deleteGeographicalFeature(this.eventToDelete)
      .subscribe(
        () => {
          this.features = this.features.filter(
            (item) => item.id !== this.eventToDelete
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

  public openFormDialog(editMode: boolean, geographyEntry?: Feature): void {
    const dialogRef = this.dialog.open(GeoFormComponent, {
      width: '300px',
      data: {
        editMode: editMode,
        geographyEntry: geographyEntry ? geographyEntry : null,
        features: this.features,
      },
    });

    dialogRef.afterClosed().subscribe((result: Feature) => {
      if (result) {
        if (editMode) {
          this.onUpdateGeoFeature(result);
        } else {
          this.onAddGeoFeature(result);
        }
      }
    });
  }

  private onAddGeoFeature(newFeature: Feature): void {
    this.geographyFeaturesService
      .createGeographicalFeature(newFeature)
      .subscribe(
        (response) => {
          this.features.push(response);
          this.geograpghyTable.renderRows();
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

  private onUpdateGeoFeature(updateFeature: Feature): void {
    console.log(updateFeature);
    this.geographyFeaturesService
      .updateGeographicalFeature(updateFeature)
      .subscribe(
        () => {
          const index = this.features.findIndex(
            (item) => item.id === updateFeature.id
          );
          if (index !== -1) {
            this.features[index] = updateFeature;
            this.geograpghyTable.renderRows();
            this.toastservice.showToast(
              TOAST_STATE.success,
              'Data Edited Successfully'
            );
          }
          this.selectedFeatureForUpdate = null;
        },
        (error) => {
          this.toastservice.showToast(
            TOAST_STATE.danger,
            'Something Went Wrong '
          );
        }
      );
  }
}
