import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent // TODO lazy?
  },
  {
    path: 'sign-up',
    component: SignupComponent
  },
  {
    path: 'verify/:verifyId',
    component: VerifyComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'change-password/:verifyId',
    component: ChangePasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
