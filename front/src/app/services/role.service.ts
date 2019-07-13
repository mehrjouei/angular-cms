import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root' // TODO provided here for now, yekam kar dare
})
export class RoleService {
  private static readonly URL = `${environment.baseUrl}/roles/`;

  constructor(private httpService: HttpClient) { }

  list(): Observable<Role[]> {
    return this.httpService.get<Role[]>(`${RoleService.URL}list`);
  }

  one(_id: string): Observable<Role> {
    return this.httpService.get<Role>(`${RoleService.URL}${_id}`);
  }

  create(role: Role): Observable<Role> {
    return this.httpService.post<Role>(`${RoleService.URL}create`, role);
  }

  update(_id: string, role: Role): Observable<Role> {
    return this.httpService.put<Role>(`${RoleService.URL}${_id}`, role);
  }

  delete(_id: string) {
    return this.httpService.delete(`${RoleService.URL}${_id}`);
  }
}
