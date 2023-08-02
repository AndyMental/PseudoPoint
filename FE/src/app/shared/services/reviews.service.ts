import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../model/review';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private urlObj: { [key: string]: string } = environment.apiUrls.reviews;

  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.urlObj.url);
  }

  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(`${this.urlObj.url}${reviewId}`);
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.urlObj.url, review);
  }

  updateReview(reviewId: string, review: Review) {
    return this.http.put(`${this.urlObj.url}${reviewId}`, review);
  }
}
