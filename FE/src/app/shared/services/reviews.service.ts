import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {


  constructor(private http: HttpClient) { 
    
  }

getAllReviews() : Observable<Review[]>{
  return this.http.get<Review[]>('http://127.0.0.1:8000/reviews/');
  
} 

deleteReview(reviewId: string) : Observable<any>{
  return this.http.delete(`http://127.0.0.1:8000/reviews/${reviewId}`)
}

addReview(review: Review): Observable<Review>{
  return this.http.post<Review>('http://127.0.0.1:8000/reviews/', review)

}

updateReview(reviewId: string , review: Review) {
  return this.http.put(`http://127.0.0.1:8000/reviews/${reviewId}`, review)
}
}
