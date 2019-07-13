import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';;
import { WebsiteComponent } from './website.component';

const routes: Routes = [
  {
    path: 'website',
    component: WebsiteComponent
  },
  {
    path: '',
    redirectTo: 'website'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
