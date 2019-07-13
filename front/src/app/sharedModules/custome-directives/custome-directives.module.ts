import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllowNumbersDirective } from './allow-numbers.directive';

@NgModule({
  declarations: [
    AllowNumbersDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AllowNumbersDirective
  ]
})
export class CustomeDirectivesModule { }
