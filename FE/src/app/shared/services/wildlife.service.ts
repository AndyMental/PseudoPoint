import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WilldLife } from '../model/wildlife';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WildlifeService {
 
  constructor(private http: HttpClient) { }
  
 public getWildlife(): Observable<WilldLife[]> {
    return this.http.get<WilldLife[]>('http://127.0.0.1:8000/wildlife/sightings');
  }

 public delete(id:number): Observable<{}> {
    const url = `http://127.0.0.1:8000/wildlife/${id}`;
    console.log('i am here')
    return this.http.delete<{}>(url);
  }

 public post_data(newWildlifeEntry: WilldLife): Observable<WilldLife[]> {
    return this.http.post<WilldLife[]>('http://127.0.0.1:8000/wildlife/post', newWildlifeEntry)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error occurred while adding new wildlife entry:', error.message); 
          return throwError('Error occurred while adding new wildlife entry. Please try again later.');
        })
      );
  }

public  putWildlife(wildlife: WilldLife): Observable<WilldLife> {
    const url = `http://127.0.0.1:8000/wildlife/${wildlife.id}`;
    return this.http.put<WilldLife>(url, wildlife);
  }

  
  }

  

