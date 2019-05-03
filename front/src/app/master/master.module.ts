import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { MasterInjector } from './services/master-injector.service';

@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,

  ],
  entryComponents: []
})
export class MasterModule {
  constructor(private injector: Injector) {
    MasterInjector.setInjector(injector);
  }
}
