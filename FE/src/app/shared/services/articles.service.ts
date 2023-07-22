import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/article';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('http://127.0.0.1:8000/articles/');
  }

  deleteArticle(title: string): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/articles/${title}`);
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>('http://127.0.0.1:8000/articles/', article);
  }

  updateArticle(title: string, article: Article) {
    return this.http.put(
      `http://127.0.0.1:8000/articles/${title}`,
      article
    );
  }
}
