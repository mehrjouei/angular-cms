import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment'; // TODO

import { Page } from '../../../models/page';

@Injectable()
export class PageService {
  baseUrl = `${environment.baseUrl}/pages/`;

  constructor(private httpService: HttpClient) { }

  getPage(slug: string): Observable<Page> {
    return this.httpService
      .get<Page>(`${this.baseUrl}${slug}`);
  }
}
