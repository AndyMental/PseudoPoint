// import { Injectable } from '@angular/core';
// import { Observable,throwError } from 'rxjs';
// import { Stocks } from '../model/stocks';
// import { HttpClient, HttpErrorResponse} from '@angular/common/http'

// @Injectable({
//   providedIn: 'root'
// })
// export class StocksService {
//   private apiUrl = `http://127.0.0.1:8000/stocks/newstocks`;
//   constructor( private http:HttpClient) { }
  
// getAllStocks(): Observable<Stocks[]>{
//   return this.http.get<Stocks[]>('http://127.0.0.1:8000/stocks/');

// }
// delete(symbol:string): Observable<Stocks[]>{
//   const url = `http://127.0.0.1:8000/stocks/${symbol}`;
//   return this.http.delete<Stocks[]>(url);
// }
// addStock(stock: Stocks): Observable<any> {
//   return this.http.post(this.apiUrl, stock);
// }
// updateStock(symbol: string, stock: Stocks): Observable<any> {
//   const url = `${this.apiUrl}/${symbol}`;
//   return this.http.put(url, stock);
// }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Stocks } from '../model/stocks'; // Import the Stocks interface

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://127.0.0.1:8000/stocks/stocks'; // Replace with your FastAPI API URL

  constructor(private http: HttpClient) { }

  getStocks(): Observable<Stocks[]> {
    return this.http.get<Stocks[]>(this.apiUrl);
  }

  getStockById(id: number): Observable<Stocks> {
    return this.http.get<Stocks>(`${this.apiUrl}/${id}`);
  }

  addStock(stock: Stocks): Observable<Stocks> {
    return this.http.post<Stocks>(this.apiUrl, stock);
  }

  updateStock(stockId: number, stock: Stocks): Observable<Stocks> {
    return this.http.put<Stocks>(`${this.apiUrl}/${stockId}`, stock);
  }

  deleteStock(stockId: number): Observable<Stocks> {
    return this.http.delete<Stocks>(`${this.apiUrl}/${stockId}`);
  }
}
