import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomProductRoutingModule } from './custom-product-routing.module';
import { CustomProductComponent } from './custom-product.component';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '../../../../../sharedModules/dialog/dialog.module';
import { ProductService } from '../../../../../services/product.service';
import { FilterComponent } from './ordering/filter/filter.component';
import { CompareAndChooseComponent } from './ordering/compare-and-choose/compare-and-choose.component';
import { DetailModalComponent } from './ordering/filter/components/detail-modal/detail-modal.component';
import { FiveStarModule } from '../../../../../sharedModules/five-star/five-star.module';

@NgModule({
  declarations: [CustomProductComponent, FilterComponent, CompareAndChooseComponent, DetailModalComponent],
  imports: [
    CommonModule,
    CustomProductRoutingModule,
    FormsModule,
    DialogModule,
    FiveStarModule
  ],
  providers: [ProductService],
  entryComponents: [DetailModalComponent]
})
export class CustomProductModule { }
