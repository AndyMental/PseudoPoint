import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { spaceValidator } from 'src/app/shared/directives/space-validator.directive';
import { Article } from 'src/app/shared/model/article';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import {
  TOAST_STATE,
  ToastService,
} from 'src/app/shared/services/Toast.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
})
export class ArticleFormComponent {
  private regEx: RegExp = /^[^\s]+(\s+[^\s]+)*$/;

  public validationArray: Validators = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),
    spaceValidator(this.regEx),
  ];

  public articleForm: FormGroup;

  constructor(
    private articleService: ArticlesService,
    private fb: FormBuilder,
    private toast: ToastService,
    public dialogRef: MatDialogRef<ArticleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public article: Article
  ) {}

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      article_id: [''],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
          spaceValidator(this.regEx),
        ],
      ],
      author: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
          spaceValidator(this.regEx),
        ],
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(150),
          spaceValidator(this.regEx),
        ],
      ],
      tags: this.fb.array([
        this.fb.control('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          spaceValidator(this.regEx),
        ]),
      ]),
    });

    if (this.article) {
      this.article_id.setValue(this.article.article_id);
      this.title.setValue(this.article.title);
      this.articleForm.controls['title'].disable();
      this.author.setValue(this.article.author);
      this.content.setValue(this.article.content);
      this.article.tags.forEach((tag: string) => {
        if (this.tags.value.length == 1 && !this.tags.value[0]) {
          this.tags.setValue([tag]);
        } else {
          this.tags.push(this.fb.control(tag, this.validationArray));
        }
      });
    }
  }

  public get article_id(): AbstractControl<string> {
    return this.articleForm.get('article_id');
  }
  public get title(): AbstractControl<string> {
    return this.articleForm.get('title');
  }
  public get author(): AbstractControl<string> {
    return this.articleForm.get('author');
  }
  public get content(): AbstractControl<string> {
    return this.articleForm.get('content');
  }
  public get tags(): FormArray<AbstractControl<string>> {
    return this.articleForm.get('tags') as FormArray;
  }
  public get tagsLength(): number {
    return this.articleForm.get('tags').value.length;
  }

  public addTagsField(): void {
    this.tags.push(this.fb.control('', this.validationArray));
  }

  public showToast(state: any, message: string): void {
    this.toast.showToast(state, message);
  }

  public addArticle(): void {
    this.articleService.addArticle(this.articleForm.value).subscribe(
      (article: Article): void => {
        this.closeDialog(article);

        this.showToast(TOAST_STATE.success, 'Article Added Successfully');
      },
      (error: HttpErrorResponse): void => {
        this.showToast(
          TOAST_STATE.danger,
          `${error.error.detail[0].loc[1]} ${error.error.detail[0].msg}`
        );
      }
    );
  }

  public updateArticle(): void {
    const articleData: Article = this.articleForm.getRawValue();
    this.articleService
      .updateArticle(this.article.article_id, articleData)
      .subscribe(
        (article: Article): void => {
          this.closeDialog(article);

          this.showToast(TOAST_STATE.success, 'Article Updated Successfully');
        },
        (error: HttpErrorResponse): void => {
          this.showToast(
            TOAST_STATE.danger,
            `${error.error.detail[0].loc[1]} ${error.error.detail[0].msg}`
          );
        }
      );
  }

  public closeDialog(responseArticle: Article): void {
    this.dialogRef.close(responseArticle);
  }
}
