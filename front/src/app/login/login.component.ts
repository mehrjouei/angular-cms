import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]+$')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    const dto = {
      title: form.value.user,
      slug: form.value.password
    };
    this.authService.getToken(dto).subscribe((response: any) => {
      localStorage.setItem('API_TOKEN', response.token);
      this.router.navigateByUrl(this.authService.redirectUrl);
    });
  }

}
