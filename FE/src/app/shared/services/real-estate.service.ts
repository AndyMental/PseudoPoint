import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RealEstateListing } from '../model/real-estate';

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
  private apiUrl = 'http://localhost:8000/realestate/listings';

  constructor(private http: HttpClient) {}

  getAllListings(): Observable<RealEstateListing[]> {
    return this.http.get<RealEstateListing[]>(this.apiUrl);
  }

  createListing(newListing: RealEstateListing): Observable<RealEstateListing> {
    return this.http.post<RealEstateListing>(this.apiUrl, newListing);
  }

  updateListing(listingId: number, updatedListing: RealEstateListing): Observable<RealEstateListing> {
    const url = `${this.apiUrl}/${listingId}`;
    return this.http.put<RealEstateListing>(url, updatedListing);
  }

  deleteListing(listingId: number): Observable<RealEstateListing> {
    const url = `${this.apiUrl}/${listingId}`;
    return this.http.delete<RealEstateListing>(url);
  }
}
