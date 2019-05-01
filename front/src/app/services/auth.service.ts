import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl;

  constructor(private httpService: HttpClient) { }

  getToken(dto) {
    return this.httpService
      .post(`${environment.baseUrl}/auth/authenticate/`, dto);
  }
}
