import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilemanagerRoutingModule } from './filemanager-routing.module';
import { FilemanagerComponent } from './filemanager.component';
import { CardModule } from '../../sharedModules/card/card.module';
import { FileManagerModule } from 'src/app/sharedModules/filemanager/filemanager.module';

@NgModule({
  declarations: [FilemanagerComponent],
  imports: [
    CommonModule,
    FilemanagerRoutingModule,
    CardModule,
    FileManagerModule
  ]
})
export class FilemanagerModule { }
