import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Article } from '../model/article';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private urlObj: { [key: string]: string } = environment.apiUrls.articles;

  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.urlObj.url);
  }

  deleteArticle(title: string): Observable<any> {
    return this.http.delete(`${this.urlObj.url}${title}`);
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.urlObj.url, article);
  }

  updateArticle(article_id: string, article: Article) {
    return this.http.put(`${this.urlObj.url}${article_id}`, article);
  }
}
