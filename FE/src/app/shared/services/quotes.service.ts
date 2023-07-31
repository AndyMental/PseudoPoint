import { Injectable } from '@angular/core';
// import { HttpClient,HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Quotes } from '../model/quotes';

// import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class QuotesDetails {

  constructor(private http: HttpClient) { 
    
  }

getAllQuotes() : Observable<Quotes[]>{
  return this.http.get<Quotes[]>('http://127.0.0.1:8000/quotes');
  
}  
delete(id: number): Observable<Quotes[]> {
  const url = `http://127.0.0.1:8000/quotes/${id}`;
  return this.http.delete<Quotes[]>(url);

}

post_data(newquotes: Quotes): Observable<Quotes[]> {
  return this.http.post<Quotes[]>('http://127.0.0.1:8000/quotes/', newquotes)
    // .pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     console.error('Error occurred while adding new wildlife entry:', error.message); 
    //     return throwError('Error occurred while adding new wildlife entry. Please try again later.');
    //   })
    // );
}
// updateQuote(updatedQuote: Quotes): Observable<Quotes> {
//   const url = `http://127.0.0.1:8000/quotes/`;
//   return this.http.put<Quotes>(url, updatedQuote);
// }

// updateQuote(updatedQuote: Quotes): Observable<Quotes> {
//   const url = `http://127.0.0.1:8000/quotes/${updatedQuote}`;
//   return this.http.put<Quotes>(url, updatedQuote);
// }

updateQuote(updatedQuote: Quotes): Observable<Quotes> {
  const url = `http://127.0.0.1:8000/quotes/${updatedQuote.id}`;
  return this.http.put<Quotes>(url, updatedQuote);
}

searchQuotes(author: string): Observable<Quotes[]> {
  const url = `http://127.0.0.1:8000/quotes/authname/${author}`;
  return this.http.get<Quotes[]>(url);
}



}

