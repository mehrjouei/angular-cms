import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from '../../models/resource';
import { environment } from 'src/environments/environment';

@Injectable()
export class ResourceService {
  private static readonly URL = `${environment.baseUrl}/resources/`;

  constructor(private httpService: HttpClient) { }

  list(): Observable<Resource[]> {
    return this.httpService.get<Resource[]>(`${ResourceService.URL}list`);
  }
}
