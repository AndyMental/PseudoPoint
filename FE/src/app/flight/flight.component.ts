import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../shared/services/flights.service';
import { Flight } from '../shared/model/flights';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  flights: Flight[] = [];
  isModalOpen: boolean = false;
  isDailogOpen: boolean = false;
  flightId: string;
  flightNumber: string;
  currentFlight: Flight | null;

  constructor(private flightsService: FlightsService) {}

  ngOnInit() {
    this.flightsService.getAllFlights().subscribe((data) => {
      this.flights = data;
    });
  }

  deleteFlight(flightId: string, flightNumber: string): void {
    this.flightsService.deleteFlight(flightId).subscribe((data) => {
      this.flights = this.flights.filter(
        (flight) => flight.flight_id != flightId
      );
      this.flightNumber = flightNumber;
      this.isModalOpen = true;
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openDailog(flight?: Flight) {
    if (flight) this.currentFlight = flight;
    else this.currentFlight = null;
    this.isDailogOpen = true;
  }

  addOrUpdateFlight(flightDetail: Flight) {
    let flightIndex: number;
    let isFlightExist = false;
    this.flights.forEach((flight, index) => {
      if (flight.flight_id == flightDetail.flight_id) {
        isFlightExist = true;
        flightIndex = index;
        return;
      }
    });

    if (isFlightExist) {
      this.flights[flightIndex] = flightDetail;
    } else {
      this.flights.push(flightDetail);
    }
    this.isDailogOpen = false;
  }

  closeDailog() {
    this.isDailogOpen = false;
  }
}
