import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';
import { Router } from '@angular/router';

declare const grecaptcha: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: ['']
  });

  recaptcha;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private elementRef: ElementRef) { }

  ngOnInit() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://www.google.com/recaptcha/api.js?render=6LdLLagUAAAAACMtOWwTiWWAtgvhmcxzNTeiqrp-';
    s.async = true;
    s.defer = true;
    s.onload = () => {
      grecaptcha.ready(() => {
        grecaptcha.execute('6LdLLagUAAAAACMtOWwTiWWAtgvhmcxzNTeiqrp-', {
          action: 'homepage'
          // action: 'validate_captcha'
        }).then((token) => {
          (document.getElementById('g-recaptcha-response') as HTMLInputElement).value = token;
        });
      });
    };
    this.elementRef.nativeElement.appendChild(s);
  }

  onSubmit(form: FormGroup) {
    const dto = {
      username: form.value.username,
      password: form.value.password,
      rememberMe: form.value.rememberMe,
      // authType: 1 // TODO 1 means identity
      // recaptcha: form.value.recaptcha
      recaptcha: (document.getElementById('g-recaptcha-response') as HTMLInputElement).value
    };
    this.authService.login(dto).subscribe((response: any) => {
      this.router.navigateByUrl(this.authService.redirectUrl);
    });
  }

}
