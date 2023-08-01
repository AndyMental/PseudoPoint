import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RealEstateListing } from '../shared/model/real-estate';
import { RealEstateService } from '../shared/services/real-estate.service';
import { RealEstateFormComponent } from '../real-estate-form/real-estate-form.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ToastService,TOAST_STATE} from '../shared/services/toast.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.css'],
})
export class RealEstateComponent implements OnInit {
  public realEstateListings: RealEstateListing[] = [];
  public showConfirmationModal: boolean = false;
  public confirmationListingId: number = 0;
  @ViewChild(MatTable) realEstate: MatTable<RealEstateListing>;

  constructor(
    private realEstateService: RealEstateService,
    private dialog: MatDialog,
    private toastservice:ToastService
  ) {}
 
  ngOnInit() {
    this.fetchRealEstateListings();
  }
  
  public fetchRealEstateListings() {
    this.realEstateService.getAllListings().subscribe(
      (listings: RealEstateListing[]) => {
        this.realEstateListings = listings;
      },
    );
  }

  public openForm(propertyToUpdate?: RealEstateListing) {
    const dialogRef = this.dialog.open(RealEstateFormComponent, {
      width: '400px',
      data: propertyToUpdate ? { ...propertyToUpdate } : null,
    });

    dialogRef.afterClosed().subscribe((result: RealEstateListing | undefined) => {
      if (result) {
        if (propertyToUpdate) {
          this.updateProperty(propertyToUpdate.id!, result);
        } else {
          this.addProperty(result);
        }
      }
    });
  }

  public addProperty(newProperty: RealEstateListing) {
    this.realEstateService.createListing(newProperty).subscribe(
      (response: RealEstateListing) => {
        this.realEstateListings.push(response);
        this.realEstate.renderRows();
        this.toastservice.showToast(TOAST_STATE.success, 'Data added Successfully');
      },
      (error) => {
        if (error?.error?.detail?.length > 0) {
          this.toastservice.showToast(TOAST_STATE.danger, 'An unexpected error occurred.');
        }
      }
    );
  }

  public updateProperty(listingId: number, updatedProperty: RealEstateListing) {
    this.realEstateService.updateListing(listingId, updatedProperty).subscribe(
      (response: RealEstateListing) => {
        const index = this.realEstateListings.findIndex(
          (listing) => listing.id === listingId
        );
        if (index !== -1) {
          this.realEstateListings[index] = response;
          this.realEstate.renderRows();
          this.toastservice.showToast(TOAST_STATE.success, 'Data updated Successfully');
        }
      },
      (error) => {
        if (error?.error?.detail?.length > 0) {
          this.toastservice.showToast(TOAST_STATE.danger, 'An unexpected error occurred.');
        }
      }
    );
  }
  public openConfirmationModal(listingId: number) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this property?',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        this.onDeleteListing(listingId);
      }
    });
  }

  public onDeleteListing(listingId: number): void {
    this.realEstateService.deleteListing(listingId).subscribe(
      (deletedListing: RealEstateListing) => {
        this.realEstateListings = this.realEstateListings.filter(listing => listing.id !== deletedListing.id);
        this.realEstate.renderRows();
        this.toastservice.showToast(TOAST_STATE.success, 'Data deleted Successfully');
      },
      (error) => {
        if (error?.error?.detail?.length > 0) {
          this.toastservice.showToast(TOAST_STATE.danger, 'An unexpected error occurred.');
        }
      }
    );
  }
}


