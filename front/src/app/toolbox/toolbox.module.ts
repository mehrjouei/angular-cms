import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolboxComponent } from './toolbox.component';
import { ToolboxService } from './services/toolbox.service';
import { PagesComponent } from './components/pages/pages.component';
import { ModulesComponent } from './components/modules/modules.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { DialogModule } from '../sharedModules/dialog/dialog.module';
import { GuestModule } from '../sharedModules/guest/guest.module';
import { CmsModulesModule } from '../cms-modules/cms-modules.module';


@NgModule({
  declarations: [ToolboxComponent, PagesComponent, ModulesComponent, EditDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DialogModule,
    GuestModule,
    CmsModulesModule
  ],
  exports: [ToolboxComponent],
  entryComponents: [ToolboxComponent, EditDialogComponent], // TODO why toolbox component
  providers: [ToolboxService]
})
export class ToolboxModule { }
