import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightsService } from 'src/app/shared/services/flights.service';
import { Output, EventEmitter } from '@angular/core';
import { Flight } from 'src/app/shared/model/flights';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css'],
})
export class FlightFormComponent implements OnInit {
  @Input() flight: Flight;
  @Output() formSubmitEvent = new EventEmitter<Flight>();
  @Output() formCancelEvent = new EventEmitter();

  flightForm: FormGroup;

  constructor(private flightService: FlightsService) {}

  ngOnInit() {
    this.flightForm = new FormGroup({
      flight_id : new FormControl(''),
      flight_number: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
      ]),
      airline: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      origin: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      destination: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      departure_time: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      arrival_time: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
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

  get flight_id() {
    return this.flightForm.get('flight_id')
  }
  get flight_number() {
    return this.flightForm.get('flight_number');
  }
  get airline() {
    return this.flightForm.get('airline');
  }
  get origin() {
    return this.flightForm.get('origin');
  }
  get destination() {
    return this.flightForm.get('destination');
  }
  get departure_time() {
    return this.flightForm.get('departure_time');
  }
  get arrival_time() {
    return this.flightForm.get('arrival_time');
  }

  addFlight() {
    this.flightService.addFlight(this.flightForm.value).subscribe((flight) => {
      this.formSubmitEvent.emit(flight);
    });
  }

  updateFlight(flightData: Flight) {
    this.flightService
      .updateFlight(this.flight.flight_id, flightData)
      .subscribe((flight: Flight) => {
        this.formSubmitEvent.emit(flight);
      });
  }

  closeDailog() {
    this.formCancelEvent.emit();
  }
}
