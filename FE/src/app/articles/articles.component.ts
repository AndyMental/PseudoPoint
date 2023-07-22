import { Component } from '@angular/core';
import { Article } from '../shared/model/article';
import { ArticlesService } from '../shared/services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  articles: Article[] = [];
  isModalOpen: boolean = false;
  isDailogOpen: boolean = false;
  articleTitle: string;
  currentArticle: Article | null;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit() {
    this.articlesService.getAllArticles().subscribe((data) => {
      this.articles = data;
    });
  }

  deleteArticle(title: string): void {
    this.articlesService.deleteArticle(title).subscribe((data) => {
      this.articles = this.articles.filter(
        (article) => article.title != title
      );
      this.articleTitle = title;
      this.isModalOpen = true;
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openDailog(article?: Article) {
    if (article) this.currentArticle = article;
    else(this.currentArticle = null)
    this.isDailogOpen = true;
  }

  addOrUpdateArticle(articleData: Article) {
    let articleIndex :number;
    let isArticleExist = false;
    this.articles.forEach((article, index) => {
      if (article.title == articleData.title) {
        isArticleExist = true;
        articleIndex = index;
        return
      }
    });

    if (!isArticleExist) {
      this.articles.push(articleData);
    } else {
      this.articles[articleIndex] = articleData;
    }
    this.isDailogOpen = false;
  }

  closeDailog(){
    this.isDailogOpen = false;
  }
}
