import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  message;
  verifyId;

  form = this.fb.group({
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.verifyId = paramMap.get('verifyId');
    });
  }

  onSubmit(form: FormGroup) {
    const dto = {
      password: form.value.password,
      verifyId: this.verifyId
    };
    this.authService.changePassword(dto).subscribe((res: any) => {
      this.message = res.message;
    });
  }

}
