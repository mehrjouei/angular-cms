import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelComponent } from './travel.component';
import { FilterComponent } from './ordering/filter/filter.component';
import { CompareAndChooseComponent } from './ordering/compare-and-choose/compare-and-choose.component';

const routes: Routes = [
  {
    path: '',
    component: TravelComponent,
    children: [
      {
        path: 'filter',
        component: FilterComponent,
        data: { animation: 'filter' }
      },
      {
        path: 'compare',
        component: CompareAndChooseComponent,
        data: { animation: 'compare' }
      },
      {
        path: '',
        redirectTo: 'filter',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelRoutingModule { }
