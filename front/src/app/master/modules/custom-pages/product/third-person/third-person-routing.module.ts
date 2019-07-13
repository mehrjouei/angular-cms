import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterComponent } from './ordering/filter/filter.component';
import { ThirdPersonComponent } from './third-person.component';
import { CompareAndChooseComponent } from './ordering/compare-and-choose/compare-and-choose.component';

const routes: Routes = [
  {
    path: '',
    component: ThirdPersonComponent,
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
export class ThirdPersonRoutingModule { }
