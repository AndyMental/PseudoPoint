import { Component, ViewChild } from '@angular/core';
import { Weather } from '../shared/model/weather';
import { WeatherService } from '../shared/services/weather.service';
import { ToastService, TOAST_STATE } from '../shared/services/Toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDailogComponent } from '../delete-confirmation-dailog/delete-confirmation-dailog.component';
import { WeatherFormComponent } from './weather-form/weather-form.component';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  public weatherData: Weather[] = [];
  public weather_id: string;
  public city: string;
  public currentWeatherDetails: Weather | null;
  @ViewChild(MatTable) public weatherDataTable: MatTable<Weather>;


  public displayedColumns: string[] = [
    'city',
    'temperature',
    'humidity',
    'weather_condition',
    'actions',
  ];

  constructor(
    private weatherService: WeatherService,
    private toast: ToastService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.weatherService.getAllWeatherData().subscribe(
      (data: Weather[]): void => {
        this.weatherData = data;
      },
      (error: HttpErrorResponse): void => {
        this.showToast(TOAST_STATE.danger, error.statusText);
      }
    );
  }

  showToast(state: any, message: string): void {
    this.toast.showToast(state, message);
  }

  deleteWeather(weatherId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDailogComponent);
    dialogRef.afterClosed().subscribe((result: string) : void => {
      if (result) {
        this.weatherService.deleteWeather(weatherId).subscribe(
          (data: { [key: string]: string }): void => {
            this.weatherData = this.weatherData.filter(
              (weatherDetails: Weather): boolean =>
                weatherDetails.weather_id != weatherId
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

  openDailog(weatherDetails?: Weather): void {
    const dialogRef = this.dialog.open(WeatherFormComponent, {
      width: '450px',
      data: weatherDetails ? weatherDetails : null,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((weather: Weather) => {
      if (weather) {
        this.addOrUpdateWeather(weather);
      }
    });
  }

  addOrUpdateWeather(weatherDetail: Weather): void {
    const existingIndex = this.weatherData.findIndex(
      (weather) => weather.weather_id === weatherDetail.weather_id
    );

    if (existingIndex !== -1) {
      this.weatherData.splice(existingIndex, 1, weatherDetail);
    } else {
      this.weatherData.push(weatherDetail);
    }
    this.weatherDataTable.renderRows();

  }
}
