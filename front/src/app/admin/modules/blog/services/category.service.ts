import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../../models/category';

@Injectable()
export class CategoryService {
  private static readonly URL = `${environment.baseUrl}/categories/`;

  constructor(private httpService: HttpClient) { }

  list() {
    return this.httpService.get(`${CategoryService.URL}list`);
  }

  update(categories: Category[]) {
    return this.httpService.post(`${CategoryService.URL}update`, categories);
  }
}
