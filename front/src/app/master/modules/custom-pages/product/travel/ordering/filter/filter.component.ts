import { Component, OnInit } from '@angular/core';
import { TravelPreOrder, TravelConfig } from '../../../../../../../viewModels/travel.model';
import { DialogService } from '../../../../../../../sharedModules/dialog/dialog.service';
import { Router } from '@angular/router';
import { TravelService } from '../../../../../../../services/travel.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  damaged = false;
  countries = [];
  periods = [];
  ageRange = [];
  travelTypes = [
    {
      text: 'تک سفره',
      value: false
    },
    {
      text: 'چند سفره',
      value: true
    }
  ]
  InsuranceSafePeriods = [];
  insuranceDate = "";
  preOrder: TravelPreOrder;
  constructor(
    public dialog: DialogService,
    private router: Router,
    private travelService: TravelService
  ) {
    this.preOrder = this.travelService.getPreOrder();
    this.travelService.getCountries().subscribe(x => {
      if (x) {
        this.countries = x;
      }
    });
    this.travelService.getAgeRange().subscribe(x => {
      if (x) {
        this.ageRange = x;
      }
    })
    this.travelService.getInsuranceSetting().subscribe((setting: TravelConfig) => {
      if (setting) {
        this.periods = setting.periods.map(x => {
          return { text: x.title, value: x.length }
        });
      }
    })
  }
  ngOnInit() {

  }
  travelTypeValuSelect(value) {
    this.preOrder.travelTypes = value;
  }
  countryValueChange(item) {
    this.preOrder.countryId = item.value;
  }
  periodsChange(item) {
    console.log(item);
    this.preOrder.insurancePeriods = item.value;
  }
  ageRangeChange(item) {
    this.preOrder.ageRangeId = item.value;
  }

  isValidated() {
    // console.log(this.preOrder);
    if (this.preOrder.countryId && this.preOrder.insurancePeriods && this.preOrder.ageRangeId) {
      if (this.damaged) {
        return true;
        // }
      }
      else {
        return true;
      }

    }
    return false;
  }
  next() {
    this.travelService.savePreOrderToStorage();
    this.router.navigateByUrl("/product/travel/compare");

  }
}
