import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
// import { AdminRoutingModule } from './admin-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModulesComponent } from './components/modules/modules.component';

@NgModule({
  declarations: [AdminComponent, ModulesComponent],
  imports: [
    CommonModule,
    // AdminRoutingModule,
    FontAwesomeModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
