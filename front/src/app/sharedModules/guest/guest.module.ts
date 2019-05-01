import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestDirective } from './directives/guest-outlet.directive';

@NgModule({
  declarations: [GuestDirective],
  imports: [
    CommonModule
  ],
  exports: [GuestDirective],
})
export class GuestModule { }
