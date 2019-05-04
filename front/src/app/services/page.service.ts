import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/page';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Part } from '../models/part';

@Injectable({
  providedIn: 'root' // TODO provided here for now, yekam kar dare
})
export class PageService {
  private static readonly URL = `${environment.baseUrl}/pages/`;

  constructor(private httpService: HttpClient) { }

  list(): Observable<Page[]> {
    return this.httpService.get<Page[]>(`${PageService.URL}list`);
  }

  one(slug: string): Observable<Page> {
    return this.httpService.get<Page>(`${PageService.URL}${slug}`);
  }

  create(page: Page): Observable<Page> {
    return this.httpService.post<Page>(`${PageService.URL}create`, page);
  }

  update(page: Page): Observable<Page> {
    return this.httpService.put<Page>(`${PageService.URL}${page.slug}`, page);
  }

  addPart(slug: string, part: Part): Observable<Page> {
    return this.httpService.put<Page>(`${PageService.URL}addPart/${slug}`, part); // TODO
  }

  editPart(slug: string, part: Part): Observable<Page> {
    return this.httpService.put<Page>(`${PageService.URL}editPart/${slug}`, part); // TODO
  }

  deletePart(slug: string, part: string): Observable<Page> {
    return this.httpService.delete<Part>(`${PageService.URL}deletePart/${slug}/${part}`); // TODO
  }

  delete(slug: string) {
    return this.httpService.delete(`${PageService.URL}${slug}`);
  }
}
