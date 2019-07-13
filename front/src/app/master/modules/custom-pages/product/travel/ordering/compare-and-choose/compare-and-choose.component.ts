import { Component, OnInit } from '@angular/core';
import { TravelPreOrder, TravelOrder, TravelConfig } from '../../../../../../../viewModels/travel.model';
import { environment } from '../../../../../../../../environments/environment';
import { OrderService } from '../../../../../../../services/order.service';
import { TravelService } from '../../../../../../../services/travel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compare-and-choose',
  templateUrl: './compare-and-choose.component.html',
  styleUrls: ['./compare-and-choose.component.scss']
})
export class CompareAndChooseComponent implements OnInit {
  preOrder: TravelPreOrder;
  order: TravelOrder;
  coverageAmounts = [];
  insurancePeriods = [];
  results: any[] = [];
  environment = environment;
  firstGetResult = true;
  profileSubscribtion;
  tipStatus = "";
  selectedSort;
  sortTypes = [
    {
      text: 'قیمت از پایین به بالا',
      value: 'price-Asc'
    },
    {
      text: 'قیمت از بالا به پایین',
      value: 'price-Desc'
    },
    {
      text: 'تعداد شعب از بیشتر به کمتر',
      value: 'shoab-Desc'
    },
    {
      text: 'تعداد شعب از کمتر به بیشتر',
      value: 'shoab-Asc'
    },
    {
      text: 'سطح توانگری از بیشتر به کمتر',
      value: 'tavan-Desc'
    },
    {
      text: 'سطح توانگری از کمتر به بیشتر',
      value: 'tavan-Asc'
    },
  ]
  constructor(
    private orderService: OrderService,
    private travelService: TravelService,
    private router: Router
  ) {
    // this.insurancePeriods = [];
    this.preOrder = this.travelService.getPreOrder();
    console.log(this.preOrder);
    this.order = this.travelService.getOrder();
    this.travelService.getInsuranceSetting().subscribe((setting: TravelConfig) => {
      if (setting) {
        this.coverageAmounts = [];
        // this.insurancePeriods = [];
        // -------- initial default Value------
        this.preOrder.financialCoverageAmount = setting.coverages[0].coverage;
        if (setting.periods.filter(x => x.length == 365).length > 0) {
          // this.preOrder.insurancePeriods = 365;
        }
        else {
          // this.preOrder.insurancePeriods = setting.periods[0].length;
        }

        // ---------- load server side values ---------
        for (let co of setting.coverages) {
          this.coverageAmounts.push({
            text: (co.coverage).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' یورو',
            value: co.coverage
          });
          if (!this.preOrder.financialCoverageAmount && co.isDefault) {
            this.preOrder.financialCoverageAmount = co.coverage
          }
        }

        // for (let pe of setting.periods) {
        //   this.insurancePeriods.push({
        //     text: pe.title,
        //     value: pe.length
        //   });
        // }
        this.searchPrices();
      }
    });

  }

  slideTip() {
    if (this.tipStatus == "tip1") {
      this.tipStatus = "tip2";
    }
    else {
      this.tipStatus = "";
    }
  }

  financialCoverageAmountSelect(val) {
    if (val.value != this.preOrder.financialCoverageAmount) {
      this.preOrder.financialCoverageAmount = val.value;
      this.searchPrices();
    }
    this.slideTip();

  }

  sortSelect(val) {
    this.selectedSort = val.value;
    this.sortResult()
  }
  sortResult() {
    let sortType = -1;
    sortType = (this.selectedSort.includes("Asc")) ? -1 : 1;
    let sortField = "amountByDiscount";

    if (this.selectedSort.includes("price")) {
      sortField = "amountByDiscount";
    }
    else if (this.selectedSort.includes("shoab")) {
      sortField = "branchCount";
    }
    else if (this.selectedSort.includes("tavan")) {
      sortField = "financialStrengthLevel";
    }

    this.results.sort((x, y) => {
      if (x[sortField] < y[sortField]) {
        return 1 * sortType;
      }
      else if (x[sortField] > y[sortField]) {
        return -1 * sortType;
      }
      else {
        return 0;
      }
    })
  }

  searchPrices() {
    this.travelService.getInsurancePrices(this.preOrder)
      .then((result: any[]) => {
        this.results = result;
        this.firstGetResult = false;
        if (!this.selectedSort) {
          this.sortSelect({ value: 'price-Asc' });
        }
        else {
          this.sortResult();
        }
      })
  }

  ngOnInit() {

  }
}
