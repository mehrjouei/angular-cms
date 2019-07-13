import { Component, OnInit } from '@angular/core';
import { ThirdPersonService } from 'src/app/services/third-person.service';
import { ThirdPersonPreOrder, ThirdPersonSetting } from 'src/app/viewModels/thirdPerson.model';
import { DialogService } from 'src/app/sharedModules/dialog/dialog.service';
import { BrandModelSelectComponent } from './components/brand-model-select/brand-model-select.component';
import { PersianCalendarService } from 'src/app/services/jalaliDate.service';
import { CommanSolidDataService } from 'src/app/services/comman-solid-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [
    PersianCalendarService
  ]
})
export class FilterComponent implements OnInit {
  preOrder: ThirdPersonPreOrder;
  manuYear: { text: string, value: number }[] = [];
  carCreationYearTitle;
  manuDate = "";
  damageTypes = [
    {
      text: 'بدون خسارت',
      value: 1
    },
    {
      text: 'با خسارت',
      value: 2
    }
  ]
  damaged = false;
  selectedCar: string = '';
  usageTypes = [];
  damages = [];
  InsuranceSafePeriods = [];
  usageTypesTitles = [
    {
      "id": 1,
      "value": 1,
      "text": "شخصی"
    },
    {
      "id": 2,
      "value": 2,
      "text": "تاکسی"
    },
    {
      "id": 3,
      "value": 3,
      "text": "تاکسی برون شهری"
    },
    {
      "id": 4,
      "value": 4,
      "text": "حمل سوخت"
    },
    {
      "id": 5,
      "value": 5,
      "text": "حمل مواد منفجره"
    },
    {
      "id": 6,
      "value": 6,
      "text": "آموزش راهنمایی و رانندگی"
    },
    {
      "id": 7,
      "value": 7,
      "text": "تاکسی درون شهری"
    },
    {
      "id": 8,
      "value": 8,
      "text": "آمبولانس"
    },
    {
      "id": 9,
      "value": 9,
      "text": "حمل وسایل رادیولوژی"
    },
    {
      "id": 10,
      "value": 10,
      "text": "آتش نشانی"
    },
    {
      "id": 11,
      "value": 11,
      "text": "وسایل نقلیه عمومی بیش از شش نفر"
    }
  ]
  constructor(
    private thirdPersonService: ThirdPersonService,
    private dialog: DialogService,
    private jalali: PersianCalendarService,
    private solidData: CommanSolidDataService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.preOrder = this.thirdPersonService.getPreOrder();
    console.log(this.preOrder);
    if (this.preOrder.NumberOfBodyDamage != 0 || this.preOrder.NumberOfFinancialDamage != 0) {
      this.damaged = true;
    }
    this.damages = this.solidData.getDamages();
    this.InsuranceSafePeriods = this.solidData.getSafePeriods();

    let personSub = this.thirdPersonService.getThirdPersonSetting().subscribe((setting: ThirdPersonSetting) => {
      if (setting) {
        //----------------- load years --------------------
        let currentDate = new Date();
        let currentMiladiYear = +(currentDate.getFullYear());
        let currentJalaliYear = +(this.jalali.PersianCalendarDate(currentDate).split("/")[0]);
        this.manuYear = [];
        for (let i = 0; i < setting.vehicleAgeMax; i++) {
          this.manuYear.push({
            text: `${currentJalaliYear}    |    ${currentMiladiYear}`,
            value: +currentMiladiYear
          })
          currentJalaliYear -= 1;
          currentMiladiYear -= 1;
        }
        // ---------------- load state values ----------------------
        if (this.preOrder.vehicleTypeId != null) {
          this.thirdPersonService.getCars().subscribe(carList => {
            let finishFlag = false;
            if (carList) {
              this.usageTypes = [];
              for (let i of carList) {
                for (let j of i.models) {
                  if (j.id == this.preOrder.vehicleTypeId) {
                    this.selectedCar = i.title + " " + j.title;
                    let temp = [];
                    for (let y of j.vehicleTypeUsageIds) {
                      temp.push(this.usageTypesTitles.find(x => x.id == y))
                    }
                    this.usageTypes = temp;
                    finishFlag = true;
                    break;
                  }
                  if (finishFlag) {
                    break;
                  }
                }
              }

            }
          })
          if (this.preOrder.carCreationYear) {
            this.carCreationYearTitle = this.manuYear.find(x => x.value == this.preOrder.carCreationYear).text;
          }

        }

      }


    })
  }
  damageValuSelect(value) {
    if (value == 1) {
      this.damaged = false;
      this.preOrder.NumberOfFinancialDamage = 0;
      this.preOrder.NumberOfBodyDamage = 0;
    }
    else {
      this.damaged = true;
    }
  }
  chooseBrandAndModel() {
    const ref = this.dialog.open(BrandModelSelectComponent, { data: { header: "انتخاب خودرو", size: 'small' } });

    let ref_subiscripton = ref.afterClosed.subscribe(x => {
      if (x) {
        this.selectedCar = x.brandTitle + " " + x.model.title;
        this.preOrder.vehicleTypeId = x.model.id
        if (x.model.vehicleTypeUsageIds) {
          this.usageTypes = [];
          for (let i of x.model.vehicleTypeUsageIds) {
            this.usageTypes.push(this.usageTypesTitles.find(x => x.id == i))
          }
          if (this.usageTypes.filter(x => x.value == 1).length > 0) {
            this.preOrder.CarUsageType = 1;
          }
          if (this.usageTypes.length == 1) {
            this.preOrder.CarUsageType = this.usageTypes[0].value;
          }

        }
        else {
          this.usageTypes = []
        }
      }
      ref_subiscripton.unsubscribe();

    });
  }
  next() {
    console.log(this.preOrder);
    this.thirdPersonService.saveThirdPersonPreOrder(this.preOrder);
    this.router.navigateByUrl('/product/thirdPerson/compare');
  }
}
