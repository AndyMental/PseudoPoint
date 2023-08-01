import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Health } from '../model/health';

@Injectable({ 
  providedIn: 'root',
})
export class HealthserviceService {
  constructor(private http: HttpClient) {}

 public getAllHealth(): Observable<Health[]> {
    return this.http.get<Health[]>('http://127.0.0.1:8000/health/health-data');
  }
  delete(id: number): Observable<Health[]> {
    const url = `http://127.0.0.1:8000/health/health-data/${id}`;
    return this.http.delete<Health[]>(url);
  }
 public addHealthRecord(newHealth: Health): Observable<Health> {
    console.log(newHealth)
    const url = `http://127.0.0.1:8000/health/health/health-data`;
    return this.http.post<Health>(url, newHealth);
  }

 public update(id: number, record: Health): Observable<Health> {
    console.log(record)
    const url = `http://127.0.0.1:8000/health/health-data/${id}`;
    return this.http.put<Health>(url, record);
  }
}  
