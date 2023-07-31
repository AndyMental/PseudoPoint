import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FlightsService } from 'src/app/shared/services/flights.service';
import { Flight } from 'src/app/shared/model/flights';
import { spaceValidator } from 'src/app/shared/directives/space-validator.directive';
import {
  TOAST_STATE,
  ToastService,
} from 'src/app/shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css'],
})
export class FlightFormComponent implements OnInit {
  private regEx: RegExp = /^[^\s]+(\s+[^\s]+)*$/;
  public flightForm: FormGroup;

  constructor(
    private flightService: FlightsService,
    private toast: ToastService,
    public dialogRef: MatDialogRef<FlightFormComponent>,
    @Inject(MAT_DIALOG_DATA) public flight: Flight
  ) {}

  ngOnInit(): void {
    this.flightForm = new FormGroup({
      flight_id: new FormControl(''),
      flight_number: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        spaceValidator(this.regEx),
      ]),
      airline: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
        spaceValidator(this.regEx),
      ]),
      origin: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
        spaceValidator(this.regEx),
      ]),
      destination: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
        spaceValidator(this.regEx),
      ]),
      departure_time: new FormControl('', [Validators.required]),
      arrival_time: new FormControl('', [Validators.required]),
    });

    if (this.flight) {
      this.flight_id.setValue(this.flight.flight_id);
      this.flight_number.setValue(this.flight.flight_number);
      this.airline.setValue(this.flight.airline);
      this.origin.setValue(this.flight.origin);
      this.destination.setValue(this.flight.destination);
      this.departure_time.setValue(this.flight.departure_time);
      this.arrival_time.setValue(this.flight.arrival_time);
    }
  }

  public get flight_id(): AbstractControl<string> {
    return this.flightForm.get('flight_id');
  }
  public get flight_number(): AbstractControl<string> {
    return this.flightForm.get('flight_number');
  }
  public get airline(): AbstractControl<string> {
    return this.flightForm.get('airline');
  }
  public get origin(): AbstractControl<string> {
    return this.flightForm.get('origin');
  }
  public get destination(): AbstractControl<string> {
    return this.flightForm.get('destination');
  }
  public get departure_time(): AbstractControl<string> {
    return this.flightForm.get('departure_time');
  }
  public get arrival_time(): AbstractControl<string> {
    return this.flightForm.get('arrival_time');
  }

  public showToast(state: any, message: string): void {
    this.toast.showToast(state, message);
  }

  public addFlight(): void {
    this.flightService.addFlight(this.flightForm.value).subscribe(
      (flight: Flight) => {
        this.closeDailog(flight);
        this.showToast(TOAST_STATE.success, 'Flight Added Successfully');
      },
      (error: HttpErrorResponse) => {
        this.showToast(
          TOAST_STATE.danger,
          `${error.error.detail[0].loc[1]} ${error.error.detail[0].msg}`
        );
      }
    );
  }

  public updateFlight(): void {
    const flightData: Flight = this.flightForm.getRawValue();
    this.flightService
      .updateFlight(this.flight.flight_id, flightData)
      .subscribe(
        (flight: Flight) => {
          this.closeDailog(flight);
          this.showToast(TOAST_STATE.success, 'Flight Updated Successfully');
        },
        (error: HttpErrorResponse) => {
          this.showToast(
            TOAST_STATE.danger,
            `${error.error.detail[0].loc[1]} ${error.error.detail[0].msg}`
          );
        }
      );
  }

  public closeDailog(flightResponse: Flight): void {
    this.dialogRef.close(flightResponse);
  }
}
