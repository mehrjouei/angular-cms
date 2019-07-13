import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Website } from '../models/website';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root' // TODO
})
export class WebsiteService {
  private static readonly URL = `${environment.baseUrl}/website/`;

  constructor(private httpService: HttpClient) { }

  one(): Observable<Website> {
    return this.httpService.get<Website>(`${WebsiteService.URL}`);
  }

  update(website: Website): Observable<Website> {
    return this.httpService.put<Website>(`${WebsiteService.URL}`, website);
  }

  listRoleMappings() {
    return this.httpService.get(`${WebsiteService.URL}w/roleMappings`);
  }

  updateRoleMappings(map) {
    return this.httpService.put(`${WebsiteService.URL}w/roleMappings`, map);
  }
}
