import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Page } from '../../models/page';
import { Template } from '../../models/template';
import { Role } from '../../models/role';

@Injectable()
export class ToolboxService { // TODO deeper!?
  constructor(private http: HttpClient) { }

  createPage(page: Page) {
    return this.http
      .post<Page>(`${environment.baseUrl}/pages/create/`, page)
      .toPromise();
  }

  getTemplates(): Promise<Template[]> {
    // TODO write generic get
    return this.http
      .get<Template[]>(`${environment.baseUrl}/templates/list/`)
      .toPromise();
  }

  getRoles(): Promise<Role[]> {
    return this.http
      .get<Role[]>(`${environment.baseUrl}/roles/list/`)
      .toPromise();
  }

  getPages(): Promise<Page[]> {
    return this.http
      .get<Page[]>(`${environment.baseUrl}/page/list/`)
      .toPromise();
  }

  getToken(username: string, password: string): Promise<any> {
    return this.http
      .post(`${environment.baseUrl}/auth/authenticate/`, { username, password })
      .toPromise();
  }

  getModules() {
    return this.http.get(`${environment.baseUrl}/modules/list`);
  }

  getContainers() {
    return this.http.get(`${environment.baseUrl}/containers/list`);
  }

  // editPage(pageUrl, module) {
  //   return this.http.post(`${environment.baseUrl}/customer-modules/create/`, {
  //     pageUrl, module
  //   });
  // }
}
