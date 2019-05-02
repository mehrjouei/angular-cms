import { ToolboxModule } from './../toolbox/toolbox.module';

import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { BaseComponent } from './components/base/base.component';
import { MasterInjector } from './services/master-injector.service';
import { CmsModulesModule } from '../cms-modules/cms-modules.module';
import { ContainerComponent } from './components/container/container.component';
import { GuestModule } from '../sharedModules/guest/guest.module';

@NgModule({
  declarations: [MasterComponent, BaseComponent, ContainerComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    CmsModulesModule,
    GuestModule,
    ToolboxModule
  ],
  entryComponents: [ContainerComponent]
})
export class MasterModule {
  constructor(private injector: Injector) {
    MasterInjector.setInjector(injector);
  }
}
