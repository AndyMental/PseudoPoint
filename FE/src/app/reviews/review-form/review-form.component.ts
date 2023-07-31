import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { spaceValidator } from 'src/app/shared/directives/space-validator.directive';
import { Review } from 'src/app/shared/model/review';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import {
  TOAST_STATE,
  ToastService,
} from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css'],
})
export class ReviewFormComponent {

  private regEx: RegExp = /^[^\s]+(\s+[^\s]+)*$/;
  public reviewForm: FormGroup;

  constructor(
    private reviewService: ReviewsService,
    private toast: ToastService,
    public dialogRef: MatDialogRef<ReviewFormComponent>,
    @Inject(MAT_DIALOG_DATA) public review: Review,
    
  ) {}

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      review_id: new FormControl(''),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        spaceValidator(this.regEx),
      ]),
      reviewer: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
        spaceValidator(this.regEx),
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
        spaceValidator(this.regEx),
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

  public get review_id(): AbstractControl<string> {
    return this.reviewForm.get('review_id');
  }
  public get title(): AbstractControl<string> {
    return this.reviewForm.get('title');
  }
  public get reviewer(): AbstractControl<string> {
    return this.reviewForm.get('reviewer');
  }
  public get rating(): AbstractControl<number> {
    return this.reviewForm.get('rating');
  }
  public get review_text(): AbstractControl<string> {
    return this.reviewForm.get('review_text');
  }

  public showToast(state: any, message: string): void {
    this.toast.showToast(state, message);
  }
  public addReview(): void {
    this.reviewService.addReview(this.reviewForm.value).subscribe(
      (review: Review) :void => {
        this.closeDialog(review);
        this.showToast(TOAST_STATE.success, 'Review Added Successfully');
      },
      (error : HttpErrorResponse): void => {
        this.showToast(
          TOAST_STATE.danger,
          `${error.error.detail[0].loc[1]} ${error.error.detail[0].msg}`
        );
      }
    );
  }

  public updateReview(): void {
    const reviewData: Review = this.reviewForm.getRawValue();
    this.reviewService
      .updateReview(this.review.review_id, reviewData)
      .subscribe(
        (review: Review): void => {
          this.closeDialog(review);
          this.showToast(TOAST_STATE.success, 'Review Updated Successfully');
        },
        (error: HttpErrorResponse): void => {
          this.showToast(
            TOAST_STATE.danger,
            `${error.error.detail[0].loc[1]} ${error.error.detail[0].msg}`
          );
        }
      );
  }

  public closeDialog(responseReview: Review): void {
    this.dialogRef.close(responseReview);
  }
}