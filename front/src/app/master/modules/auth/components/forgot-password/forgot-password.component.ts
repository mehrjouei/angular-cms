import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  message;

  form = this.fb.group({
    username: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    const dto = {
      username: form.value.username
    };
    this.authService.forgotPassword(dto).subscribe((res: any) => {
      this.message = res.message;
    });
  }

}
