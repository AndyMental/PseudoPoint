import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { Article } from 'src/app/shared/model/article';
import { ArticlesService } from 'src/app/shared/services/articles.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
})
export class ArticleFormComponent {
  @Input() article: Article;
  @Output() formSubmitEvent = new EventEmitter<Article>();
  @Output() formCancelEvent = new EventEmitter();
  validationArray = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),
  ];

  articleForm: FormGroup;

  constructor(
    private articleService: ArticlesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      author: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
        ],
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(150),
        ],
      ],
      tags: this.fb.array([
        this.fb.control('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ]),
      ]),
    });

    if (this.article) {
      this.title.setValue(this.article.title);
      this.articleForm.controls['title'].disable();
      this.author.setValue(this.article.author);
      this.content.setValue(this.article.content);
      this.article.tags.forEach((tag) => {
        if (this.tags.value.length == 1 && !this.tags.value[0]) {
          this.tags.setValue([tag]);
        } else {
          this.tags.push(this.fb.control(tag, this.validationArray));
        }
      });
    }
  }

  get title() {
    // console.log(this.articleForm.getRawValue())
    return this.articleForm.get('title');
  }
  get author() {
    return this.articleForm.get('author');
  }
  get content() {
    return this.articleForm.get('content');
  }
  get tags() {
    return this.articleForm.get('tags') as FormArray;
  }

  addTagsField() {
    this.tags.push(this.fb.control('', this.validationArray));
  }

  addArticle() {
    this.articleService
      .addArticle(this.articleForm.value)
      .subscribe((article) => {
        this.formSubmitEvent.emit(article);
      });
  }

  updateArticle() {
    const articleData = this.articleForm.getRawValue()
    this.articleService
      .updateArticle(this.article.title, articleData)
      .subscribe((article: Article) => {
        this.formSubmitEvent.emit(article);
      });
  }

  closeDailog() {
    this.formCancelEvent.emit();
  }
}
