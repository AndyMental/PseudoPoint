import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WineRatings } from '../model/wineratings';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WineratingsService {

  constructor(private http: HttpClient) {

   }

   getAllWineratings(): Observable<WineRatings[]>{
    return this.http.get<WineRatings[]>('http://127.0.0.1:8000/wine_ratings')
   }

   delete(id: number): Observable<WineRatings[]> {
    const url = `http://127.0.0.1:8000/wine_ratings/${id}`;
    return this.http.delete<WineRatings[]>(url);
  
  }
  post_data(newwines: WineRatings): Observable<WineRatings[]> {
    return this.http.post<WineRatings[]>('http://127.0.0.1:8000/wine_ratings/', newwines)
  }

  updateWine(updatedWine: WineRatings): Observable<WineRatings> {
    const url = `http://127.0.0.1:8000/wine_ratings/${updatedWine.id}`;
    return this.http.put<WineRatings>(url, updatedWine);
  }

  
}
