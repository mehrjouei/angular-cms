import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  message;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      switchMap((paramMap: ParamMap) => this.authService.verify(paramMap.get('verifyId')))
    ).subscribe((res: any) => {
      if (res.success) {
        this.message = 'Your account has been verified.';
        this.router.navigateByUrl('/auth/login'); // TODO I don't want to return bloody password from server here
      } else {
        this.message = 'Something went wrong, please sign-up again.'; // TODO masalan expire shode
      }
    });
  }

}
