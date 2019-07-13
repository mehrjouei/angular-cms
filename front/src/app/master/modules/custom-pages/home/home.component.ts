import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  insuranceTypes=[];
  constructor(
    private insuranceService:InsuranceService
  ) {
    super();
  }

  ngOnInit() { // optional, in case of overriding
    super.ngOnInit();
    this.insuranceService.getInsuranceTypes().then((insurances: any) => {
      this.insuranceTypes=insurances;
    });

  }

}
