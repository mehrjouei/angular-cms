import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { PageService } from './page.service';

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    PageRoutingModule
  ],
  providers: [PageService]
})
export class PageModule { }
