import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillingInterface } from '../model/billing.model';
import { map } from 'rxjs';
import { catchError,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  constructor(private http: HttpClient) {}

 public getBills(): Observable<BillingInterface[]> {
    return this.http.get<BillingInterface[]>('http://127.0.0.1:8000/billing');
  }

 public deleteBill(id: number): Observable<BillingInterface[]> {
    const url = `http://127.0.0.1:8000/billing/${id}`;
    return this.http.delete<BillingInterface[]>(url);
  }

 public addBill(newBill: BillingInterface): Observable<BillingInterface> {
    console.log(newBill);
    const url = `http://127.0.0.1:8000/billing/billing`;
    return this.http.post<BillingInterface>(url, newBill);
  }

 public updateBill(id: number, record: BillingInterface): Observable<BillingInterface> {
    const url = `http://127.0.0.1:8000/billing/billing-update/${id}`;
    return this.http.put<BillingInterface>(url, record);
  }

 public getMaxId(): Observable<number> {
    return this.http.get<BillingInterface[]>('http://127.0.0.1:8000/billing').pipe(
      map((data) => {
        const maxId = data.reduce((max, record) => Math.max(max, record.id), 0);
        return maxId + 1;
      }),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return throwError('Error fetching data');
      })
    );
  }
}
