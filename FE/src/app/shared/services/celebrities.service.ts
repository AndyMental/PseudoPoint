import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Celebrities } from '../model/celebrities';

@Injectable({
  providedIn: 'root'
})
export class CelebritiesService {

  constructor(private http: HttpClient){

   }
   getAllCelebrities(): Observable<Celebrities[]>{
    return this.http.get<Celebrities[]>('http://127.0.0.1:8000/celebrities')
   }

   delete(id:number): Observable<Celebrities[]>{
    return this.http.delete<Celebrities[]>(`http://127.0.0.1:8000/celebrities/${id}`);
   }

   post_data(newCelebs: Celebrities): Observable<Celebrities[]>{
    return this.http.post<Celebrities[]>('http://127.0.0.1:8000/celebrities/', newCelebs)
   }

   updateCeleb(updatedCeleb: Celebrities): Observable<Celebrities> {
    const url = `http://127.0.0.1:8000/celebrities/${updatedCeleb.id}`;
    return this.http.put<Celebrities>(url, updatedCeleb);
  }
}
