import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductData } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://127.0.0.1:8000/products';

  constructor(private http: HttpClient) {}

  create(product: ProductData): Observable<ProductData> {
    return this.http.post<ProductData>(this.apiUrl, product);
  }

  getAllProducts(): Observable<ProductData[]> {
    return this.http.get<ProductData[]>(this.apiUrl);
  }

  delete(productId: number): Observable<ProductData> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<ProductData>(url);
  }

  update(updatedData: ProductData): Observable<ProductData> {
    const id= updatedData.id;
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<ProductData>(url, updatedData);
  }
}










