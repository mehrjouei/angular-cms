import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersianInputDirective } from './persian-input.directive';
import { NationalCodeDirective } from './nationalCode.directive';
import { IBanDirective } from './iban.directive';
import { CustomeMobileDirective } from './mobile.directive';
import { PostalCodeDirective } from './postalCode.directive';

@NgModule({
  declarations: [
    PersianInputDirective,
    NationalCodeDirective,
    IBanDirective,
    CustomeMobileDirective,
    PostalCodeDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PersianInputDirective,
    NationalCodeDirective,
    IBanDirective,
    CustomeMobileDirective,
    PostalCodeDirective
  ]
})
export class CustomValidationsModule { }
