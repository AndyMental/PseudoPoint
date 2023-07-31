import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError ,tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  private apiURL = 'http://localhost:8000/ecommerce';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiURL);
  }
  private handleError(error: any) {
    return throwError('Something went wrong.');
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/new_item`, product).pipe(
      catchError((error: any) => {
        throw new Error('Product creation failed');
      })
    );
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${id}`, product).pipe(
      catchError((error: any) => {
        throw new Error('Product update failed');
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`).pipe(
      catchError((error: any) => {
        throw new Error('Product deletion failed');
      })
    );
  }
}