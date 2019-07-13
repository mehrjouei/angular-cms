import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiveStarComponent } from './five-star.component';

@NgModule({
  declarations: [FiveStarComponent],
  exports:[FiveStarComponent],
  imports: [
    CommonModule
  ]
})
export class FiveStarModule { }
