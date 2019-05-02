import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Template } from '../models/template';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private static readonly URL = `${environment.baseUrl}/templates/`;

  constructor(private httpService: HttpClient) { }

  list(): Observable<Template[]> {
    return this.httpService.get<Template[]>(`${TemplateService.URL}list`);
  }

  one(_id: string): Observable<Template> {
    return this.httpService.get<Template>(`${TemplateService.URL}${_id}`);
  }

  create(template: Template): Observable<Template> {
    return this.httpService.post<Template>(`${TemplateService.URL}create`, template);
  }

  update(_id: string, template: Template): Observable<Template> {
    return this.httpService.put<Template>(`${TemplateService.URL}${_id}`, template);
  }

  delete(_id: string) {
    return this.httpService.delete(`${TemplateService.URL}${_id}`);
  }
}
