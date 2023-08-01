import { Component, ViewChild } from '@angular/core';
import { Review } from '../shared/model/review';
import { ReviewsService } from '../shared/services/reviews.service';
import { TOAST_STATE, ToastService } from '../shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDailogComponent } from '../delete-confirmation-dailog/delete-confirmation-dailog.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent {
  public reviews: Review[] = [];
  public reviewId: string;
  public title: string;
  public currentReview: Review | null;
  @ViewChild(MatTable) public reviewsTable: MatTable<Review>;

  public displayedReviewColumns: string[] = [
    'title',
    'reviewer',
    'rating',
    'review_text',
    'actions',
  ];

  constructor(
    private reviewsService: ReviewsService,
    private toast: ToastService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reviewsService.getAllReviews().subscribe(
      (data: Review[]): void => {
        this.reviews = data;
      },
      (error: HttpErrorResponse): void => {
        this.showToast(TOAST_STATE.danger, error.statusText);
      }
    );
  }

  public showToast(state: any, message: string): void {
    this.toast.showToast(state, message);
  }

  public deleteReview(reviewId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDailogComponent);
    dialogRef.afterClosed().subscribe((result: string): void => {
      if (result) {
        this.reviewsService.deleteReview(reviewId).subscribe(
          (data: { [key: string]: string }): void => {
            this.reviews = this.reviews.filter(
              (review: Review) => review.review_id != reviewId
            );
            this.showToast(TOAST_STATE.success, data.detail);
          },
          (error: HttpErrorResponse): void => {
            this.showToast(TOAST_STATE.danger, error.error.detail);
          }
        );
      }
    });
  }

  public openDailog(review?: Review): void {
    const dialogRef = this.dialog.open(ReviewFormComponent, {
      width: '450px',
      data: review ? review : null,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((review: Review) => {
      if (review) {
        this.addOrUpdateReview(review);
      }
    });
  }

  public addOrUpdateReview(reviewDetail: Review): void {
    const existingIndex = this.reviews.findIndex(
      (review) => review.review_id === reviewDetail.review_id
    );

    if (existingIndex !== -1) {
      this.reviews.splice(existingIndex, 1, reviewDetail);
    } else {
      this.reviews.push(reviewDetail);
    }
    this.reviewsTable.renderRows();
  }
}
