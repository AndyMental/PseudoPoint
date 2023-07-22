import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Review } from 'src/app/shared/model/review';
import { ReviewsService } from 'src/app/shared/services/reviews.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  @Input() review: Review;
  @Output() formSubmitEvent = new EventEmitter<Review>();
  @Output() formCancelEvent = new EventEmitter();

  reviewForm: FormGroup;

  constructor(private reviewService: ReviewsService) {}

  ngOnInit() {
    this.reviewForm = new FormGroup({
      review_id : new FormControl(''),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
      ]),
      reviewer: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      rating: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(5),
      ]),
      review_text: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(150),
      ]),
    });

    if (this.review) {
      this.review_id.setValue(this.review.review_id);
      this.title.setValue(this.review.title);
      this.reviewForm.controls['title'].disable();
      this.reviewer.setValue(this.review.reviewer);
      this.rating.setValue(this.review.rating);
      this.review_text.setValue(this.review.review_text);
    }
  }

  get review_id() {
    return this.reviewForm.get('review_id')
  }
  get title() {
    return this.reviewForm.get('title');
  }
  get reviewer() {
    return this.reviewForm.get('reviewer');
  }
  get rating() {
    return this.reviewForm.get('rating');
  }
  get review_text() {
    return this.reviewForm.get('review_text');
  }

  addReview() {
    this.reviewService.addReview(this.reviewForm.value).subscribe((review) => {
      this.formSubmitEvent.emit(review);
    });
  }

  updateReview() {
    const reviewData = this.reviewForm.getRawValue()
    this.reviewService
      .updateReview(this.review.review_id, reviewData)
      .subscribe((review: Review) => {
        this.formSubmitEvent.emit(review);
      });
  }

  closeDailog() {
    this.formCancelEvent.emit();
  }
}
