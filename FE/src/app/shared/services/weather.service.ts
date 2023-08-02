import { Injectable } from '@angular/core';
import { Weather } from '../model/weather';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private urlObj: { [key: string]: string } = environment.apiUrls.weather;
  constructor(private http: HttpClient) {}

  getAllWeatherData(): Observable<Weather[]> {
    return this.http.get<Weather[]>(this.urlObj.url);
  }

  deleteWeather(weatherId: string): Observable<any> {
    return this.http.delete(`${this.urlObj.url}${weatherId}`);
  }

  addWeather(weather: Weather): Observable<Weather> {
    return this.http.post<Weather>(this.urlObj.url, weather);
  }

  updateWeather(weatherId: string, weather: Weather) {
    return this.http.put(`${this.urlObj.url}${weatherId}`, weather);
  }
}
