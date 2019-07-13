import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {
  private static readonly URL = `${environment.baseUrl}/categories/`;

  constructor(private httpService: HttpClient) { }

  list(): Observable<Category[]> {
    return this.httpService.get<Category[]>(`${CategoryService.URL}list`);
  }

  one(_id: string): Observable<Category> {
    return this.httpService.get<Category>(`${CategoryService.URL}${_id}`);
  }

  create(category: Category): Observable<Category> {
    return this.httpService.post<Category>(`${CategoryService.URL}create`, category);
  }

  update(_id: string, category: Category): Observable<Category> {
    return this.httpService.put<Category>(`${CategoryService.URL}${_id}`, category);
  }

  delete(_id: string) {
    return this.httpService.delete(`${CategoryService.URL}${_id}`);
  }
}
