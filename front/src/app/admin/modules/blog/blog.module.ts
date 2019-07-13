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
import { FileUploadModule } from '../../../sharedModules/file-upload/file-upload.module';

@NgModule({
  declarations: [ListComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    CardModule,
    NgxDatatableModule,
    FileUploadModule
  ],
  providers: [ArticleService]
})
export class BlogModule { }
