import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelRoutingModule } from './travel-routing.module';
import { TravelComponent } from './travel.component';
import { FilterComponent } from './ordering/filter/filter.component';
import { CompareAndChooseComponent } from './ordering/compare-and-choose/compare-and-choose.component';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'src/app/sharedModules/dialog/dialog.module';
import { RadioButtonModule } from '../../../../../sharedModules/radio-button/radio-button.module';
import { TravelService } from 'src/app/services/travel.service';

@NgModule({
  declarations: [TravelComponent, FilterComponent, CompareAndChooseComponent],
  imports: [
    CommonModule,
    TravelRoutingModule,
    FormsModule,
    DialogModule,
    RadioButtonModule
  ],
  providers: [TravelService]
})
export class TravelModule { }
