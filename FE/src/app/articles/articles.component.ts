import { Component, ViewChild } from '@angular/core';
import { Article } from '../shared/model/article';
import { ArticlesService } from '../shared/services/articles.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TOAST_STATE, ToastService } from '../shared/services/Toast.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDailogComponent } from '../delete-confirmation-dailog/delete-confirmation-dailog.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent {
  public articles: Article[] = [];
  public articleTitle: string;
  public currentArticle: Article | null;
  @ViewChild(MatTable) public articlesTable: MatTable<Article>;


  public displayedColumns: string[] = [
    'title',
    'author',
    'content',
    'tags',
    'actions',
  ];

  constructor(
    private articlesService: ArticlesService,
    private toast: ToastService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.articlesService.getAllArticles().subscribe(
      (data: Article[]) => {
        this.articles = data;
      },
      (error: HttpErrorResponse) => {
        this.showToast(TOAST_STATE.danger, error.statusText);
      }
    );
  }

  public showToast(state: any, message: string): void {
    this.toast.showToast(state, message);
  }

  public deleteArticle(article_id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDailogComponent);
    dialogRef.afterClosed().subscribe((result: string): void => {
      if (result) {
        this.articlesService.deleteArticle(article_id).subscribe(
          (data: { [key: string]: string }): void => {
            this.articles = this.articles.filter(
              (article: Article): boolean => article.article_id != article_id
            );
            this.showToast(TOAST_STATE.success, data.detail);
          },
          (error: HttpErrorResponse) => {
            this.showToast(TOAST_STATE.danger, error.error.detail);
          }
        );
      }
    });
  }

  public openDailog(article?: Article): void {
    const dialogRef = this.dialog.open(ArticleFormComponent, {
      width: '450px',
      data: article ? article : null,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((article: Article) => {
      if (article) {
        this.addOrUpdateArticle(article);
      }
    });
  }

  public addOrUpdateArticle(articleData: Article): void {
    const existingIndex = this.articles.findIndex(
      (article) => article.title === articleData.title
    );
    if (existingIndex !== -1) {
      this.articles.splice(existingIndex, 1, articleData);
    } else {
      this.articles.push(articleData);
    }
    this.articlesTable.renderRows();

  }
}
