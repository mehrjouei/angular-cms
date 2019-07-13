import { Injectable } from '@angular/core';
import { ThirdPersonPreOrder, ThirdPersonOrder } from '../viewModels/thirdPerson.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class ThirdPersonService {

  private CarsList;
  private thirdPersonSetting;
  private startGettingCarList = { value: false };
  private startGettingSetting = { value: false };
  private carListSubject$: BehaviorSubject<any>;
  private settingSubject$: BehaviorSubject<any>;
  // public preOrder: ThirdPersonPreOrder;
  // public thirdPersonOrder: ThirdPersonOrder,
  constructor(
    private http: HttpClient,
    private store: StorageService
  ) {
    this.carListSubject$ = new BehaviorSubject<any>(null);
    this.settingSubject$ = new BehaviorSubject<any>(null);
    let thirdPersonOrder = new ThirdPersonOrder();
    let preOrder = {
      CarUsageType: null,
      FinancialCoverageAmount: null,
      InsurancePeriods: 0,
      NumberOfBodyDamage: 0,
      NumberOfDiscountYearsOnPolicy: null,
      NumberOfFinancialDamage: 0,
      SolarPolicyDueDate: "",
      carCreationYear: null,
      vehicleTypeId: null,
      selectedInsurance: null
    };
    if (!this.store.getStorage('thirdPersonPreOrder').behaviorSubject.value) {
      this.store.setStorage({ name: 'thirdPersonPreOrder', saveInLocalStorage: true, value: preOrder })
    }
    if (!this.store.getStorage('thirdPersonOrder').behaviorSubject.value) {
      this.store.setStorage({ name: 'thirdPersonOrder', saveInLocalStorage: true, value: thirdPersonOrder })
    }
  }

  getCars(): Observable<any> {
    if (!this.startGettingCarList.value) {
      this.startGettingCarList.value = true;
      this.http.get(environment.REVIEW_Url + "/vehicleBrand")
        .subscribe(response => {
          this.CarsList = response;
          this.carListSubject$.next(this.CarsList);
        }, (error) => {
          this.startGettingCarList.value = false;
        })
    }
    return this.carListSubject$.asObservable();
  }
  getInurancePrices(data): Promise<any> {

    return this.http.post(environment.REVIEW_Url + "/Pricing", data)
      .toPromise()
  }
  submitOrder(order: ThirdPersonOrder): Promise<any> {
    return this.http.post(environment.ORDERING_Url + "/ThirdPerson", order)
      .toPromise()
  }
  updateOrder(order: ThirdPersonOrder): Promise<any> {
    return this.http.put(environment.ORDERING_Url + "/ThirdPerson", order)
      .toPromise()
  }


  getThirdPersonSetting() {
    if (!this.startGettingSetting.value) {
      this.startGettingSetting.value = true;
      this.http.get(environment.REVIEW_Url + "/InsuranceType/GetThirdPersonSetting")
        .subscribe(response => {
          this.thirdPersonSetting = response;
          this.settingSubject$.next(this.thirdPersonSetting);
        }, (error) => {
          this.startGettingSetting.value = false;
        }
        )
    }
    return this.settingSubject$.asObservable();
  }


  getPreOrder() {
    return this.store.getStorage('thirdPersonPreOrder').behaviorSubject.value;
  }
  saveThirdPersonPreOrder(preO: ThirdPersonPreOrder) {
    this.store.setStorage({ name: 'thirdPersonPreOrder', saveInLocalStorage: true, value: preO })
  }
  getThirdPersonOrder() {
    return this.store.getStorage('thirdPersonOrder').behaviorSubject.value;
  }
  saveThirdPersonOrder(order: ThirdPersonOrder) {
    this.store.setStorage({ name: 'thirdPersonOrder', saveInLocalStorage: true, value: order })

  }
  removeOrderAndPreOrder() {
    this.store.removeStorage('thirdPersonPreOrder');
    this.store.removeStorage('thirdPersonOrder');
  }
}
