import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
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
    CategoriesRoutingModule,
    ReactiveFormsModule,
    CardModule,
    NgxDatatableModule
  ]
})
export class CategoriesModule { }