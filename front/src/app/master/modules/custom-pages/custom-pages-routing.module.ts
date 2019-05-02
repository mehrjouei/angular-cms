import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomPagesComponent } from './custom-pages.component';

const routes: Routes = [
  {
    path: '',
    component: CustomPagesComponent,
    children: [
      { path: 'home', component: HomeComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomPagesRoutingModule { }
