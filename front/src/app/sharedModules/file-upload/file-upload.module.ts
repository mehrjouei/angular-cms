import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [FileUploadComponent]
})
export class FileUploadModule { }
