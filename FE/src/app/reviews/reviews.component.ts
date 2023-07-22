import { Component } from '@angular/core';
import { Review } from '../shared/model/review';
import { ReviewsService } from '../shared/services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  reviews: Review[] = [];
  isModalOpen: boolean = false;
  isDailogOpen: boolean = false;
  reviewId: string;
  title: string;
  currentReview: Review | null;

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit() {
    this.reviewsService.getAllReviews().subscribe((data) => {
      this.reviews = data;
    });
  }

  deleteReview(reviewId: string, title: string): void {
    this.reviewsService.deleteReview(reviewId).subscribe((data) => {
      this.reviews = this.reviews.filter(
        (review) => review.review_id != reviewId
      );
      this.title = title;
      this.isModalOpen = true;
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openDailog(review?: Review) {
    if (review) this.currentReview = review;
    else this.currentReview = null;
    this.isDailogOpen = true;
  }

  addOrUpdateReview(reviewDetail: Review) {
    let reviewIndex: number;
    let isReviewExist = false;
    this.reviews.forEach((review, index) => {
      if (review.review_id == reviewDetail.review_id) {
        isReviewExist = true;
        reviewIndex = index;
        return;
      }
    });

    if (isReviewExist) {
      this.reviews[reviewIndex] = reviewDetail;
    } else {
      this.reviews.push(reviewDetail);
    }
    this.isDailogOpen = false;
  }

  closeDailog() {
    this.isDailogOpen = false;
  }
}
