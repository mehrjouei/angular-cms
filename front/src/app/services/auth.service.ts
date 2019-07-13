import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {
  private static readonly URL = `${environment.baseUrl}/auth/`;

  redirectUrl;
  // loggedIn: BehaviorSubject<any>;
  constructor(private httpService: HttpClient, private storage: StorageService) {
    if (!this.storage.getStorage("token")) {
      this.storage.setStorage({
        name: 'token',
        saveInLocalStorage: true,
        value: null
      });
    }
  }

  logout() {
    this.storage.removeStorage("editMode");
    this.storage.setStorage({ name: "token", saveInLocalStorage: true, value: null })
    this.storage.setStorage({ name: "userInfo", saveInLocalStorage: true, value: null })
  }

  login(dto) {
    return this.httpService
      .post(`${environment.baseUrl}/auth/login/`, dto)
      .pipe(map((x: any) => {
        this.storage.setStorage({
          name: 'token',
          saveInLocalStorage: true,
          value: x.token
        });
        this.storage.setStorage({
          name: 'userInfo',
          saveInLocalStorage: true,
          value: x.user
        });
        return x;
      }));
  }

  getToken() {
    return this.storage.getStorage('token').behaviorSubject.value;
  }

  singup(dto) { //  TODO make strongly typed
    return this.httpService.post(`${AuthService.URL}sign-up`, dto);
  }

  verify(id) {
    return this.httpService.put(`${AuthService.URL}verify`, { verifyId: id });
  }

  forgotPassword(dto) { //  TODO make strongly typed
    return this.httpService.put(`${AuthService.URL}forgot-password`, dto);
  }

  changePassword(dto) { //  TODO make strongly typed
    return this.httpService.put(`${AuthService.URL}change-password`, dto);
  }

}
