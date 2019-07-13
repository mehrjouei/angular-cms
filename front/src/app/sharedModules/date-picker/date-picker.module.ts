import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DialogModule } from '../dialog/dialog.module';
import { DatePickerDialogComponent } from './components/date-picker-dialog/date-picker-dialog.component';


@NgModule({
  declarations: [DatePickerComponent, DatePickerDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule
  ],
  exports: [DatePickerComponent],
  entryComponents: [DatePickerDialogComponent]
})
export class DatePickerModule { }
