import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Container } from '../../../../models/container';
import { environment } from 'src/environments/environment';

@Injectable()
export class ContainerService {
  private static readonly URL = `${environment.baseUrl}/containers/`;

  constructor(private httpService: HttpClient) { }

  list(): Observable<Container[]> {
    return this.httpService.get<Container[]>(`${ContainerService.URL}list`);
  }

  one(_id: string): Observable<Container> {
    return this.httpService.get<Container>(`${ContainerService.URL}${_id}`);
  }

  create(container: Container): Observable<Container> {
    return this.httpService.post<Container>(`${ContainerService.URL}create`, container);
  }

  update(_id: string, container: Container): Observable<Container> {
    return this.httpService.put<Container>(`${ContainerService.URL}${_id}`, container);
  }

  delete(_id: string) {
    return this.httpService.delete(`${ContainerService.URL}${_id}`);
  }
}
