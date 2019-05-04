import { Injectable, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../../../../models/article';
import { environment } from 'src/environments/environment';
import { Comment } from '../../../../models/comment';

@Injectable()
export class ArticleService {
  private static readonly URL = `${environment.baseUrl}/articles/`;

  constructor(private httpService: HttpClient) { }

  list() {
    return this.httpService.get(`${ArticleService.URL}list`);
  }

  create(article: Article) {
    return this.httpService.post(`${ArticleService.URL}create`, article);
  }

  one(slug: string) {
    return this.httpService.get(`${ArticleService.URL}${slug}`);
  }

  update(slug: string, article: Article) {
    return this.httpService.put(`${ArticleService.URL}${slug}`, article);
  }

  delete(slug: string) {
    return this.httpService.delete(`${ArticleService.URL}${slug}`);
  }

  addComment(comment: Comment, articleSlug: string) {
    return this.httpService.post(`${ArticleService.URL}addComment/${articleSlug}`, comment);
  }

  updateComment(id: string, comment: Comment) {
    return this.httpService.put(`${ArticleService.URL}updateComment/${id}`, comment);
  }

  deleteComment(id: string) {
    return this.httpService.delete(`${ArticleService.URL}deleteComment/${id}`);
  }
}
