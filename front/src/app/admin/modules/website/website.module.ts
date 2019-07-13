import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteComponent } from './website.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '../../sharedModules/card/card.module';
import { DialogModule } from '../../../sharedModules/dialog/dialog.module';
import { RoleMapDialogComponent } from './components/role-map-dialog/role-map-dialog.component';

@NgModule({
  declarations: [WebsiteComponent, RoleMapDialogComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    CardModule,
    ReactiveFormsModule,
    DialogModule
  ],
  entryComponents: [RoleMapDialogComponent] // TODO chera dialog inja nemifahme!?
})
export class WebsiteModule { }
