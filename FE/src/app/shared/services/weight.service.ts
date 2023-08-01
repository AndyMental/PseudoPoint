import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeightConversionRequest,WeightConversionResponse } from '../model/weight';

@Injectable({
  providedIn: 'root'
})
export class WeightService {


  private apiUrl = 'http://127.0.0.1:8000/weight_conversion'; 

  constructor(private http: HttpClient) {}

 public convertWeight(weightRequest: WeightConversionRequest): Observable<WeightConversionResponse[]> {
    return this.http.post<WeightConversionResponse[]>(`${this.apiUrl}/weight_conversion`, weightRequest);
  }
  

 public getCelestial(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/weight_conversion/');
  }

 public getWeightForCelestialObject(celestial: string, weight: number): Observable<WeightConversionResponse> {
    const url = `${this.apiUrl}/${celestial}?weight=${weight}`;
    return this.http.get<WeightConversionResponse>(url);
  }

 public getCelestialFactors(): Observable<WeightConversionResponse[]> {
    const url=`${this.apiUrl}/`
    return this.http.get<WeightConversionResponse[]>(this.apiUrl);
  }

 public addCelestialFactor(celestial_object: string, weight: number): Observable<any> {
    console.log("service invoked")
    const url=`${this.apiUrl}/add_celestial_factor`
    return this.http.post<WeightConversionResponse>(url, { celestial_object, weight });
  }

 public deleteCelestialFactor(celestial: string): Observable<any> {
    const url = `${this.apiUrl}/delete_celestial_factor/${celestial}`;
    return this.http.delete<any>(url);
  }

 public editCelestial(celestial: string, data: WeightConversionResponse): Observable<WeightConversionResponse> {
    const url = `${this.apiUrl}edit_celestial/${celestial}`;
    return this.http.put<WeightConversionResponse>(url, data);
  }
  
}
