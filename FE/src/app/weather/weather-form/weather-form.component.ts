import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Weather } from 'src/app/shared/model/weather';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent implements OnInit {
  @Input() weatherDetails: Weather;
  @Output() formSubmitEvent = new EventEmitter<Weather>();
  @Output() formCancelEvent = new EventEmitter();

  weatherForm: FormGroup;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherForm = new FormGroup({
      weather_id : new FormControl(''),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      temperature: new FormControl('', [
        Validators.required,
        Validators.min(-40),
        Validators.max(60)
      ]),
      humidity: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ]),
      weather_condition: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ])
    });

    if (this.weatherDetails) {
      this.weather_id.setValue(this.weatherDetails.weather_id);
      this.city.setValue(this.weatherDetails.city);
      this.temperature.setValue(this.weatherDetails.temperature);
      this.humidity.setValue(this.weatherDetails.humidity);
      this.weather_condition.setValue(this.weatherDetails.weather_condition);
    }
  }

  get weather_id() {
    return this.weatherForm.get('weather_id')
  }
  get city() {
    return this.weatherForm.get('city');
  }
  get temperature() {
    return this.weatherForm.get('temperature');
  }
  get humidity() {
    return this.weatherForm.get('humidity');
  }
  get weather_condition() {
    return this.weatherForm.get('weather_condition');
  }

  addWeather() {
    this.weatherService.addWeather(this.weatherForm.value).subscribe((weatherDetails) => {
      this.formSubmitEvent.emit(weatherDetails);
    });
  }

  updateWeather(weatherDetails: Weather) {
    this.weatherService
      .updateWeather(this.weatherDetails.weather_id, weatherDetails)
      .subscribe((weatherDetails: Weather) => {
        this.formSubmitEvent.emit(weatherDetails);
      });
  }

  closeDailog() {
    this.formCancelEvent.emit();
  }
}

