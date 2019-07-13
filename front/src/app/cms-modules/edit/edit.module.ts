import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditHtmlComponent } from './components/html/edit-html.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { EditTabdionComponent } from './components/tabdion/edit-tabdion.component';
import { EnumModule } from 'src/app/sharedModules/enum/enum.module';

@NgModule({
  declarations: [EditHtmlComponent, EditTabdionComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, CKEditorModule, EnumModule
  ],
  exports: [
  ],
  entryComponents: [EditHtmlComponent, EditTabdionComponent]
})
export class EditModule { }
