import { Injectable } from '@angular/core';
import { Weather } from '../model/weather';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { 
    
  }

getAllWeatherData() : Observable<Weather[]>{
  return this.http.get<Weather[]>('http://127.0.0.1:8000/weather/weather_data');
  
} 

deleteWeather(weatherId: string) : Observable<any>{
  return this.http.delete(`http://127.0.0.1:8000/weather/weather_data/${weatherId}`)
}

addWeather(weather: Weather): Observable<Weather>{
  return this.http.post<Weather>('http://127.0.0.1:8000/weather/weather_data', weather)

}

updateWeather(weatherId: string , weather: Weather) {
  return this.http.put(`http://127.0.0.1:8000/weather/weather_data/${weatherId}`, weather)
}

}
