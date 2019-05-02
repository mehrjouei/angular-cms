import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { InsertionDirective } from './insertion.directive';
// import { DialogConfirmComponent } from './sample-components/confirm/confirm.component';
import { DialogBaseComponent } from './components/dialog-base/dialog-base.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DialogComponent, InsertionDirective, DialogBaseComponent],
  entryComponents: [DialogComponent, DialogBaseComponent],
  exports: [DialogBaseComponent]
})
export class DialogModule { }
