import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { spaceValidator } from 'src/app/shared/directives/space-validator.directive';
import { Weather } from 'src/app/shared/model/weather';
import {
  TOAST_STATE,
  ToastService,
} from 'src/app/shared/services/toast.service';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css'],
})
export class WeatherFormComponent implements OnInit {
  private regEx: RegExp = /^[^\s]+(\s+[^\s]+)*$/;

  public weatherForm: FormGroup;

  constructor(
    private weatherService: WeatherService,
    private toast: ToastService,
    public dialogRef: MatDialogRef<WeatherFormComponent>,
    @Inject(MAT_DIALOG_DATA) public weatherDetails: Weather
  ) {}

  ngOnInit(): void {
    this.weatherForm = new FormGroup({
      weather_id: new FormControl(''),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        spaceValidator(this.regEx),
      ]),
      temperature: new FormControl('', [
        Validators.required,
        Validators.min(-40),
        Validators.max(60),
      ]),
      humidity: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      weather_condition: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
    });

    if (this.weatherDetails) {
      this.weather_id.setValue(this.weatherDetails.weather_id);
      this.city.setValue(this.weatherDetails.city);
      this.temperature.setValue(this.weatherDetails.temperature);
      this.humidity.setValue(this.weatherDetails.humidity);
      this.weather_condition.setValue(this.weatherDetails.weather_condition);
    }
  }

  public get weather_id(): AbstractControl<string> {
    return this.weatherForm.get('weather_id');
  }
  public get city(): AbstractControl<string> {
    return this.weatherForm.get('city');
  }
  public get temperature(): AbstractControl<number> {
    return this.weatherForm.get('temperature');
  }
  public get humidity(): AbstractControl<number> {
    return this.weatherForm.get('humidity');
  }
  public get weather_condition(): AbstractControl<string> {
    return this.weatherForm.get('weather_condition');
  }

  public addWeather(): void {
    this.weatherService.addWeather(this.weatherForm.value).subscribe(
      (weatherDetails: Weather): void => {
        this.closeDailog(weatherDetails);

        this.showToast(TOAST_STATE.success, 'Weather Added Successfully');
      },
      (error: HttpErrorResponse): void => {
        this.showToast(
          TOAST_STATE.danger,
          `${error.error.detail[0].loc[1]} ${error.error.detail[0].msg}`
        );
      }
    );
  }

  public showToast(state: any, message: string): void {
    this.toast.showToast(state, message);
  }

  public updateWeather(): void {
    const weatherDetails: Weather = this.weatherForm.getRawValue();
    this.weatherService
      .updateWeather(this.weatherDetails.weather_id, weatherDetails)
      .subscribe(
        (weatherDetails: Weather): void => {
          this.closeDailog(weatherDetails);
          this.showToast(TOAST_STATE.success, 'Weather Updated Successfully');
        },
        (error: HttpErrorResponse): void => {
          this.showToast(
            TOAST_STATE.danger,
            `${error.error.detail[0].loc[1]} ${error.error.detail[0].msg}`
          );
        }
      );
  }

  public closeDailog(weatherResponse): void {
    this.dialogRef.close(weatherResponse);
  }
}
