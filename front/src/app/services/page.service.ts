import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/page';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Part } from '../models/part';
import { Role } from '../models/role';

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
    return this.httpService.get<Page>(`${PageService.URL}?slug=${slug}`);
  }

  create(page: Page): Observable<Page> {
    return this.httpService.post<Page>(`${PageService.URL}`, page);
  }

  update(page: Page): Observable<Page> {
    return this.httpService.put<Page>(`${PageService.URL}`, page);
  }

  addPart(slug: string, part: Part): Observable<Page> {
    const data = Object.assign(part, { slug });
    return this.httpService.put<Page>(`${PageService.URL}addPart`, data); // TODO
  }

  editPart(slug: string, part: Part): Observable<Page> {
    const data = Object.assign(part, { slug });
    return this.httpService.put<Page>(`${PageService.URL}editPart`, data); // TODO
  }

  deletePart(slug: string, part: string): Observable<Part> {
    const data = Object.assign({ part }, { slug });
    return this.httpService.post<Part>(`${PageService.URL}deletePart`, data); // TODO
  }

  movePart(slug: string, part: Part): Observable<Page> {
    const data = Object.assign(part, { slug });
    return this.httpService.put<Page>(`${PageService.URL}movePart`, data); // TODO
  }

  delete(slug: string) {
    return this.httpService.post(`${PageService.URL}delete`, { slug });
  }
  getContainers() {
    return this.httpService.get(`${environment.baseUrl}/containers/list`);
  }
  rolesList(): Observable<Role[]> {
    return this.httpService.get<Role[]>(`${environment.baseUrl}/roles/list`);
  }
}
