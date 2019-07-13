import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '../../sharedModules/card/card.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [ListComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule,
    CardModule,
    NgxDatatableModule
  ],
  entryComponents: []
})
export class RolesModule { }
