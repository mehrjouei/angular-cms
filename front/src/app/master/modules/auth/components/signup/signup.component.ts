import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  message;

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required,
      // Validators.pattern('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')
    ]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    const dto = {
      username: form.value.username,
      password: form.value.password,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email
    };
    this.authService.singup(dto).subscribe((res: any) => {
      this.message = res.message;
    });
  }

}
