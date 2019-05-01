import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardBodyComponent } from './components/card-body/card-body.component';
import { CardComponent } from './components/card/card.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';

@NgModule({
  declarations: [CardBodyComponent, CardComponent, CardHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [CardBodyComponent, CardComponent, CardHeaderComponent],

})
export class CardModule { }
