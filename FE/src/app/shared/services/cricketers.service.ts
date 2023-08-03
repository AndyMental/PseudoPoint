import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cricketers } from '../model/cricketers';

@Injectable({
  providedIn: 'root'
})
export class CricketersService {

  constructor(private http:HttpClient) { }

  
  getAllCricketers(): Observable<Cricketers[]>{
   return this.http.get<Cricketers[]>('http://127.0.0.1:8000/cricket')
  }

  delete(id:number): Observable<Cricketers[]>{
   return this.http.delete<Cricketers[]>(`http://127.0.0.1:8000/cricket/${id}`);
  }

  post_data(newCrick: Cricketers): Observable<Cricketers[]>{
   return this.http.post<Cricketers[]>('http://127.0.0.1:8000/cricket/', newCrick)
  }

  updateCrick(updatedCrick: Cricketers): Observable<Cricketers> {
   const url = `http://127.0.0.1:8000/cricket/${updatedCrick.id}`;
   return this.http.put<Cricketers>(url, updatedCrick);
 }


}
