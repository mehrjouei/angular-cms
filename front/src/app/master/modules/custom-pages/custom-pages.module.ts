import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomPagesRoutingModule } from './custom-pages-routing.module';
import { CustomPagesComponent } from './custom-pages.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent, CustomPagesComponent],
  imports: [
    CommonModule,
    CustomPagesRoutingModule
  ]
})
export class CustomPagesModule { }
