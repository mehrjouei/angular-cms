import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomPagesComponent } from './custom-pages.component';

const routes: Routes = [
  {
    path: '',
    component: CustomPagesComponent,
    children: [
      {
        path: 'home',
        loadChildren: "./home/home.module#HomeModule",
      },
      {
        path: 'product',
        loadChildren: './product/product.module#ProductModule'
      },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomPagesRoutingModule { }
