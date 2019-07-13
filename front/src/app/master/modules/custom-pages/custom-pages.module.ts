import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomPagesRoutingModule } from './custom-pages-routing.module';
import { CustomPagesComponent } from './custom-pages.component';

@NgModule({
  declarations: [CustomPagesComponent],
  imports: [
    CommonModule,
    CustomPagesRoutingModule
  ]
})
export class CustomPagesModule { }
