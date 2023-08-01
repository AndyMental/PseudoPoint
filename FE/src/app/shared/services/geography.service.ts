import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feature } from '../model/geograpgy';

@Injectable({
  providedIn: 'root'
})
export class GeographyService {
  private apiUrl = 'http://localhost:8000/geographical';

  constructor(private http: HttpClient) {}

 public getGeographicalFeatures(): Observable<Feature[]> {
    const url = `${this.apiUrl}/geographical_features`;
    return this.http.get<Feature[]>(url);
  }

 public deleteGeographicalFeature(id: number): Observable<any> {
    const url = `${this.apiUrl}/features/${id}`;
    return this.http.delete<any>(url);
  }

 public createGeographicalFeature(feature: Feature): Observable<Feature> {
    const url = `${this.apiUrl}/features`;
    return this.http.post<Feature>(url, feature);
  }

 public updateGeographicalFeature(feature: Feature): Observable<Feature> {
    const url = `${this.apiUrl}/features/${feature.id}`;
    return this.http.put<Feature>(url, feature);
  }
}
