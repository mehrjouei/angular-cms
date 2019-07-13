import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { InsuranceMenuComponent } from './insurance-menu/insurance-menu.component';
import { InsurancesComponent } from './insurances/insurances.component';


@NgModule({
  declarations: [
    HomeComponent,
    InsuranceMenuComponent,
    InsurancesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
