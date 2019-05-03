import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {
  redirectUrl;
  // loggedIn: BehaviorSubject<any>;
  constructor(private httpService: HttpClient, private storage: StorageService) {
    if (!this.storage.getStorage("token")) {
      this.storage.setStorage({
        name: 'token',
        saveInLocalStorage: true,
        value: null
      })
    }

    // this.loggedIn = new BehaviorSubject(JSON.parse(localStorage.getItem("userInfo")));
  }
  logout() {

    // localStorage.removeItem('API_TOKEN');
    this.storage.removeStorage("token");
    this.storage.removeStorage("userInfo");
    // this.loggedIn.next(null);
  }
  // isLoggedIn() {
  //   return this.loggedIn.asObservable();
  // }
  login(dto) {
    return this.httpService
      .post(`${environment.baseUrl}/auth/authenticate/`, dto)
      .pipe(map((x: any) => {
        // localStorage.setItem('API_TOKEN', x.token);
        // localStorage.setItem('userInfo', JSON.stringify(x.user));
        // this.loggedIn.next(x.user);
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

}
