import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { FilterComponent } from './ordering/filter/filter.component';
import { DeviceComponent } from './device.component';
import { RadioButtonModule } from 'src/app/sharedModules/radio-button/radio-button.module';
import { DialogModule } from 'src/app/sharedModules/dialog/dialog.module';
import { CompareAndChooseComponent } from './ordering/compare-and-choose/compare-and-choose.component';
import { FormsModule } from '@angular/forms';
import { FiveStarModule } from 'src/app/sharedModules/five-star/five-star.module';
import { DatePickerModule } from '../../../../../sharedModules/date-picker/date-picker.module';
import { CommanSolidDataService } from 'src/app/services/comman-solid-data.service';
import { ModelSelectComponent } from './ordering/filter/components/model-select/model-select.component';
import { BrandSelectComponent } from './ordering/filter/components/brand-select/brand-select.component';
import { DeviceService } from '../../../../../services/device.service';

@NgModule({
  declarations: [DeviceComponent, FilterComponent, ModelSelectComponent, BrandSelectComponent],
  imports: [
    CommonModule,
    DeviceRoutingModule
  ],
  providers: [DeviceService]
})
export class DeviceModule { }
