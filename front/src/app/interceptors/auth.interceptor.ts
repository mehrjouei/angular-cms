import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
// import { LoadingService } from '../services/loading.service';
// import { ModalService } from '../services/modal.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // private errorWhiteList:{url:string,disc:string}[]=[{url:environment.IDENTITY_Url+'/connect/userinfo',disc:'برای صفحه اول'}];
  constructor(
    private authService: AuthService,
    private router: Router
    // private loading: LoadingService,
    // private modalService: ModalService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }
    request = request.clone({ headers: request.headers.set('website', environment.website) });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("error: ", error);
        // if (this.errorWhiteList.find(x=>x.url==error.url)) {
        //   console.log("whiteList");
        //   //dont need to show modal
        // }
        // else
        if (error.status == 401) {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
          // this.loading.complete();
          // this.modalService.showMessage("لطفا ایتدا لاگین کنید")
        }
        else if (error.status == 403) {
          // this.loading.complete();
          // this.modalService.showMessage("شما به این بخش دسترسی ندارید");
        }
        else if (error.status == 404) {
          // this.loading.complete();
          // this.modalService.showMessage("این مسیر وجود ندارد");
        }
        else if (error.status == 500) {
          // this.loading.complete();
          // this.modalService.showMessage("خطای سیستمی رخ داد");
        }
        else if (error.status == 400) {
          // this.loading.complete();
          // this.modalService.showValidationErrorMessage(error);
        }
        else if (error.status == 0) {
          // this.loading.complete();
          // this.modalService.showMessage("خطا در ارتباط با سرور");
        }
        return throwError(error);
      })
    );
  }
}
