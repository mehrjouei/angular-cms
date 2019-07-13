import { Component, OnInit } from '@angular/core';
import { ThirdPersonService } from 'src/app/services/third-person.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { ThirdPersonSetting, ThirdPersonPreOrder } from 'src/app/viewModels/thirdPerson.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-compare-and-choose',
  templateUrl: './compare-and-choose.component.html',
  styleUrls: ['./compare-and-choose.component.scss']
})
export class CompareAndChooseComponent implements OnInit {
  preOrder: ThirdPersonPreOrder;
  coverageAmounts = [];
  environment = environment;
  InsurancePeriods = [];
  results = [];
  firstGetResult = true;
  profileSubscribtion;
  tipStatus = '';
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
    private thirdPersonService: ThirdPersonService,
    private orderService: OrderService,
    private router: Router,
  ) {
    this.preOrder = this.thirdPersonService.getPreOrder();
    this.thirdPersonService.getThirdPersonSetting().subscribe((setting: ThirdPersonSetting) => {
      if (setting) {
        this.coverageAmounts = [];
        this.InsurancePeriods = [];
        // -------- initial default Value------
        if (!this.preOrder.FinancialCoverageAmount) {
          this.preOrder.FinancialCoverageAmount = setting.coverages[0].coverage
        }
        if (!this.preOrder.InsurancePeriods) {
          if (setting.periods.filter(x => x.length == 365).length > 0) {
            this.preOrder.InsurancePeriods = 365;
          }
          else {
            this.preOrder.InsurancePeriods = setting.periods[0].length;
          }
        }

        //---------- load server side values ---------
        for (let co of setting.coverages) {
          this.coverageAmounts.push({
            text: (co.coverage / 10).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' تومان',
            value: co.coverage
          });
          if (!this.preOrder.FinancialCoverageAmount && co.isDefault) {
            this.preOrder.FinancialCoverageAmount = co.coverage
          }
        }

        for (let pe of setting.periods) {
          this.InsurancePeriods.push({
            text: pe.title,
            value: pe.length
          });
        }

        this.searchPrices();
      }
    });
  }
  searchPrices() {
    this.thirdPersonService.getInurancePrices(this.preOrder)
      .then(result => {
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
  financialCoverageAmountSelect(val) {
    console.log(val);
    if (val.value != this.preOrder.FinancialCoverageAmount) {
      this.preOrder.FinancialCoverageAmount = val.value;
      this.searchPrices();
    }
  }
  insurancePeriodsSelect(val) {
    if (val.value != this.preOrder.InsurancePeriods) {
      this.preOrder.InsurancePeriods = val.value;
      this.searchPrices();
    }
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
  ngOnInit() {
  }

}
