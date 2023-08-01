import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Oauth1Data } from '../model/oauth1';

@Injectable({
  providedIn: 'root'
})
export class Oauth1Service {

private apiUrl = 'http://127.0.0.1:8000/oauth';
  constructor(private http: HttpClient) { }
  createOAuth(oauth: Oauth1Data): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, oauth);
  }

  getOAuthData(): Observable<Oauth1Data[]> {
    return this.http.get<Oauth1Data[]>(`${this.apiUrl}/`);
  }

  updateOAuth(updatedData: Oauth1Data): Observable<any> {
    const id = updatedData.id;
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedData);
  }

  deleteOAuth(names: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${names}`);
  }
}
