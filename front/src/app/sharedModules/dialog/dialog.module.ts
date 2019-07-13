import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { InsertionDirective } from './insertion.directive';
import { DialogConfirmComponent } from './sample-components/confirm/confirm.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DialogComponent, InsertionDirective,DialogConfirmComponent],
  entryComponents: [DialogComponent,DialogConfirmComponent],
  exports:[DialogConfirmComponent]
})
export class DialogModule {}
