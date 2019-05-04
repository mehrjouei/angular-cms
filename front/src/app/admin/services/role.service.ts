import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../models/role';
import { environment } from 'src/environments/environment';

@Injectable()
export class RoleService {
  private static readonly URL = `${environment.baseUrl}/roles/`;

  constructor(private httpService: HttpClient) { }

  list(): Observable<Role[]> {
    return this.httpService.get<Role[]>(`${RoleService.URL}list`); //TODO change stupid names
  }
}
