import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilemanagerComponent } from './filemanager.component';
import { ToolbarsComponent } from './components/toolbars/toolbars.component';
import { BodyComponent } from './components/body/body.component';
import { TreeComponent } from './components/tree/tree.component';
import { FooterDetailComponent } from './components/footer-detail/footer-detail.component';
import { AddressBarComponent } from './components/address-bar/address-bar.component';
import { FilemanagerService } from './filemanager.service';
import { ItemsComponent } from './components/body/items/items.component';
import { NewNameDialogComponent } from './components/new-name-dialog/new-name-dialog.component';
import { DialogModule } from '../dialog/dialog.module';

@NgModule({
  declarations: [FilemanagerComponent, ToolbarsComponent, BodyComponent, TreeComponent,
    FooterDetailComponent, AddressBarComponent, ItemsComponent, NewNameDialogComponent],
  imports: [
    CommonModule,
    DialogModule
  ],
  exports: [FilemanagerComponent],
  providers: [FilemanagerService],
  entryComponents: [NewNameDialogComponent]
})
export class FileManagerModule { }
