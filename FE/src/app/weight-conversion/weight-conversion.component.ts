import { Component, OnInit } from '@angular/core';
import { WeightService } from '../shared/services/weight.service';
import { WeightConversionResponse, WeightConversionRequest } from 'src/app/shared/model/weight';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService, TOAST_STATE } from '../shared/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormWeightComponent } from './form-weight/form-weight.component';

@Component({
  selector: 'app-weight-conversion',
  templateUrl: './weight-conversion.component.html',
  styleUrls: ['./weight-conversion.component.css'],
})
export class WeightConversionComponent implements OnInit {
  public results: WeightConversionResponse[];
  public selectedCelestialObject: WeightConversionResponse;
  public editMode: boolean = false;
  public showDeleteConfirmationModal:boolean=false;
 public celestialToDelete:string="";
public post:boolean= false;
public celestialData= {};
 public display: boolean = false;
public  celestialObject: string;
public  weightInput: number;

 constructor(private weightConversionService:WeightService , 
  private toastservice:ToastService,
   private dialog: MatDialog,
   private snackBar: MatSnackBar) {}

 
   ngOnInit():void {
      this.getCelestialObjects();
    }

getCelestialObjects() {
    this.weightConversionService.getCelestial().subscribe(
      data => {
        this.celestialData = data;
        console.log('Data fetched successfully:', this.celestialData);
      },
 )};

 deleteCelestial(celestial: string):void{
  this.celestialToDelete=celestial;
  this.showDeleteConfirmationModal = true;
 }

 closeDeleteConfirmationModal() {
  this.showDeleteConfirmationModal = false;
}

deleteItemConfirmed():void {
  this.showDeleteConfirmationModal = false;
this.weightConversionService.deleteCelestialFactor(this.celestialToDelete).subscribe(
        () => {
       delete this.celestialData[this.celestialToDelete];
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

openFormDialog(editMode:boolean,celestialEntry?:WeightConversionResponse):void{
  const dialogRef = this.dialog.open(FormWeightComponent, {
    width: '250px',
    data: {
      editMode: editMode,
      celestialEntry: celestialEntry ? { ...celestialEntry } : null,
      celestialData: this.celestialData
    }
  });
  dialogRef.afterClosed().subscribe((result:WeightConversionResponse) => {
    if (result) {
      if (editMode) {
        this.addNewCelestialFactor(result);
      } else {
        this.getWeightForCelestialObject(result);
      }
    }
  });
}

convertWeight() :void{
  this.results = [];
  const weightRequest: WeightConversionRequest = {
        weight: this.weightInput,
      };
      this.weightConversionService.convertWeight(weightRequest).subscribe(
            (data: WeightConversionResponse[]) => {
              this.results = data;
              this.display = true;
              this.post=false;
              this.toastservice.showToast(TOAST_STATE.success, 'All Celestial weight conversion');
            },
            (error) => {
              this.toastservice.showToast(TOAST_STATE.danger, 'something went wrong');
            }
          );
}

addNewCelestialFactor(newCelestial:WeightConversionResponse):void {
  this.weightConversionService.addCelestialFactor(newCelestial.celestial_object,newCelestial.weight).subscribe(
          (response) => {
            this.celestialData[response.celestial_object] = response.weight;
            this.toastservice.showToast(TOAST_STATE.success, 'Data Added Successfully');
          },
          (error) => {
            this.toastservice.showToast(TOAST_STATE.danger, error.detail['msg']);
          }
          )}
        

  getWeightForCelestialObject(getCelestial:WeightConversionResponse):void{
    this.results = [];
    this.weightConversionService.getWeightForCelestialObject(getCelestial.celestial_object,getCelestial.weight).subscribe(
        (data: WeightConversionResponse) => {
         this.results = [data];
         this.display = true;
         } )
   }
  }