import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '../../sharedModules/card/card.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ArticleService } from './services/article.service';
import { CategoryService } from './services/category.service';
import { CategoryDialogComponent } from './components/list/components/category-dialog/category-dialog.component';
import { DialogModule } from 'src/app/sharedModules/dialog/dialog.module';

@NgModule({
  declarations: [ListComponent, CreateComponent, EditComponent, CategoryDialogComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    CardModule,
    NgxDatatableModule,
    DialogModule
  ],
  providers: [ArticleService, CategoryService],
  entryComponents: [CategoryDialogComponent]
})
export class BlogModule { }
