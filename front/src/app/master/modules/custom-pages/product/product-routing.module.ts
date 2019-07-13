import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'thirdPerson',
        loadChildren: './third-person/third-person.module#ThirdPersonModule'
      },
      {
        path: 'travel',
        loadChildren: './travel/travel.module#TravelModule'
      },
      {
        path: 'custom-product',
        loadChildren: './custom-product/custom-product.module#CustomProductModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
