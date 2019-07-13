import { Injectable, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article } from '../../../../models/article';
import { environment } from 'src/environments/environment';
import { Comment } from '../../../../models/comment';

@Injectable()
export class ArticleService {
  private static readonly URL = `${environment.baseUrl}/articles/`;

  constructor(private httpService: HttpClient) { }

  // list() {
  //   return this.httpService.get(`${ArticleService.URL}list`);
  // }

  listByCategory(category = '', offset = 0, limit = 50) { // TODO paginget client side e
    // return this.httpService.get(`${ArticleService.URL}list-by-category`, { params });
    return this.httpService.get(`${ArticleService.URL}list-by-category/`, {
      params: new HttpParams().set('category', category).set('offset', `${offset}`).set('limit', `${limit}`)
    });
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
