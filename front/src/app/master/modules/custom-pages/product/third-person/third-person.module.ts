import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThirdPersonRoutingModule } from './third-person-routing.module';
import { FilterComponent } from './ordering/filter/filter.component';
import { ThirdPersonComponent } from './third-person.component';
import { RadioButtonModule } from 'src/app/sharedModules/radio-button/radio-button.module';
import { ThirdPersonService } from 'src/app/services/third-person.service';
import { BrandModelSelectComponent } from './ordering/filter/components/brand-model-select/brand-model-select.component';
import { DialogModule } from 'src/app/sharedModules/dialog/dialog.module';
import { CompareAndChooseComponent } from './ordering/compare-and-choose/compare-and-choose.component';
import { FormsModule } from '@angular/forms';
import { FiveStarModule } from 'src/app/sharedModules/five-star/five-star.module';
import { DatePickerModule } from '../../../../../sharedModules/date-picker/date-picker.module';
import { CommanSolidDataService } from 'src/app/services/comman-solid-data.service';

@NgModule({
  declarations: [
    ThirdPersonComponent,
    FilterComponent,
    BrandModelSelectComponent,
    CompareAndChooseComponent,
  ],
  imports: [
    CommonModule,
    ThirdPersonRoutingModule,
    RadioButtonModule,
    DialogModule,
    FormsModule,
    FiveStarModule,
    DatePickerModule
  ],
  providers: [ThirdPersonService,CommanSolidDataService],
  entryComponents: [BrandModelSelectComponent]
})
export class ThirdPersonModule { }
