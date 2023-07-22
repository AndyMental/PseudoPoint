import { Component } from '@angular/core';
import { Weather } from '../shared/model/weather';
import { WeatherService } from '../shared/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  weatherData: Weather[] = [];
  isModalOpen: boolean = false;
  isDailogOpen: boolean = false;
  weather_id: string;
  city: string;
  currentWeatherDetails: Weather | null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getAllWeatherData().subscribe((data) => {
      this.weatherData = data;
    });
  } 

  deleteWeather(weatherId: string, city : string): void {
    this.weatherService.deleteWeather(weatherId).subscribe(() => {
      this.weatherData = this.weatherData.filter(
        (weatherDetails) => weatherDetails.weather_id != weatherId
      );
      this.city = city;
      this.isModalOpen = true;
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openDailog(weatherDetails?: Weather) {
    if (weatherDetails) this.currentWeatherDetails = weatherDetails;
    else(this.currentWeatherDetails = null)
    this.isDailogOpen = true;
  }

  addOrUpdateWeather(weatherDetail: Weather) {
    let weatherIndex :number;
    let isWeatherExist = false;
    this.weatherData.forEach((weather, index) => {
      if (weather.weather_id == weatherDetail.weather_id) {
        
        isWeatherExist = true;
        weatherIndex = index;
        return
      }
    });

    if (isWeatherExist) {
      this.weatherData[weatherIndex] = weatherDetail;
      
    } else {
      this.weatherData.push(weatherDetail);
    }
    this.isDailogOpen = false;
  }

  closeDailog(){
    this.isDailogOpen = false;
  }

}
