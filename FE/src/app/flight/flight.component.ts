import { Component, OnInit, ViewChild } from '@angular/core';
import { FlightsService } from '../shared/services/flights.service';
import { Flight } from '../shared/model/flights';
import { TOAST_STATE, ToastService } from '../shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FlightFormComponent } from './flight-form/flight-form.component';
import { DeleteConfirmationDailogComponent } from '../delete-confirmation-dailog/delete-confirmation-dailog.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  public flights: Flight[] = [];
  public flightId: string;
  public flightNumber: string;
  public currentFlight: Flight | null;
  @ViewChild(MatTable) public flightsTable: MatTable<Flight>;


  public displayedColumns: string[] = [
    'flight_number',
    'airline',
    'origin',
    'destination',
    'departure_time',
    'arrival_time',
    'actions',
  ];

  constructor(
    private flightsService: FlightsService,
    private toast: ToastService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.flightsService.getAllFlights().subscribe(
      (data: Flight[]) => {
        this.flights = data;
      },
      (error: HttpErrorResponse) => {
        this.showToast(TOAST_STATE.danger, error.statusText);
      }
    );
  }

  public showToast(state: any, message: string): void {
    this.toast.showToast(state, message);
  }

  public deleteFlight(flightId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDailogComponent);
    dialogRef.afterClosed().subscribe((result: string): void => {
      if (result) {
        this.flightsService.deleteFlight(flightId).subscribe(
          (data: { [key: string]: string }): void => {
            this.flights = this.flights.filter(
              (flight: Flight) => flight.flight_id != flightId
            );
            this.showToast(TOAST_STATE.success, data.detail);
          },
          (error: HttpErrorResponse): void => {
            this.showToast(TOAST_STATE.danger, error.error.detail);
          }
        );
      }
    });
  }

  public openDailog(flight?: Flight): void {
    const dialogRef = this.dialog.open(FlightFormComponent, {
      width: '450px',
      data: flight ? flight : null,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((flight: Flight) => {
      if (flight) {
        this.addOrUpdateFlight(flight);
      }
    });
  }

  public addOrUpdateFlight(flightDetail: Flight): void {
    const existingIndex = this.flights.findIndex(
      (flight) => flight.flight_id === flightDetail.flight_id
    );

    if (existingIndex !== -1) {
      this.flights.splice(existingIndex, 1, flightDetail);
    } else {
      this.flights.push(flightDetail);
    }
    this.flightsTable.renderRows();

  }
}
