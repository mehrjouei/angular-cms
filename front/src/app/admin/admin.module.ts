import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
// import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ModulesComponent } from './components/modules/modules.component';
import { GuestDirective } from './guest.directive';
import { CustomPagesModule } from '../custom-pages/custom-pages.module';
import { HomeComponent } from '../custom-pages/home/home.component';

@NgModule({
  declarations: [AdminComponent, ModulesComponent, GuestDirective],
  imports: [
    CommonModule,
    HttpClientModule,
    // AdminRoutingModule,
    CustomPagesModule
  ],
  exports: [AdminComponent],
  entryComponents: [HomeComponent]
})
export class AdminModule { }
