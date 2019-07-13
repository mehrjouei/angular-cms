import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TravelPreOrder, TravelOrder, TravelConfig } from '../viewModels/travel.model';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TravelService {
  private startGettingSetting = { value: false };
  private settingSubject$: BehaviorSubject<any>;
  private startGettingCountries = { value: false };
  private CountriesSubject$: BehaviorSubject<any>;
  private startGettingAges = { value: false };
  private AgesSubject$: BehaviorSubject<any>;
  private preOrder: TravelPreOrder;
  private order: TravelOrder;

  constructor(
    private http: HttpClient,
    private store: StorageService
  ) {
    this.settingSubject$ = new BehaviorSubject<any>(null);
    this.CountriesSubject$ = new BehaviorSubject<any>(null);
    this.AgesSubject$ = new BehaviorSubject<any>(null);
    this.preOrder = {
      insurancePeriods: null,
      selectedTravelId: null,
      ageRangeId: null,
      countryId: null,
      financialCoverageAmount: null,
      selectedProductId: null,
      travelTypes: false
    };
    this.order = {
      amount: null,
      amountByDiscount: null,
      companyIconName: '',
      companyId: null,
      companyName: '',
      discount: null,
      id: null
    };
  }

  getPreOrder(): TravelPreOrder {
    const storagePreOrder = this.store.getStorage('travelPreOrder').behaviorSubject.value;
    if (storagePreOrder && this.preOrder) {
      // this.preOrder = JSON.parse(storagePreOrder);
      this.preOrder = storagePreOrder;
    }
    return this.preOrder;
  }

  setPreOrder(preOrder) {
    this.preOrder = preOrder;
    this.savePreOrderToStorage();
  }

  savePreOrderToStorage() {
    this.store.setStorage({ name: 'travelPreOrder', saveInLocalStorage: true, value: this.preOrder });
  }

  getOrder() {
    const storageOrder = this.store.getStorage('travelOrder').behaviorSubject.value;
    if (storageOrder && this.order && this.order.id == null) {
      this.order = JSON.parse(storageOrder);
    }
    return this.order;
  }

  setOrder(order) {
    this.order = order;

    this.saveOrderToStorage();
  }

  saveOrderToStorage() {
    console.log(this.order);
    this.store.setStorage({ name: 'travelOrder', saveInLocalStorage: true, value: this.order });
  }

  removeOrderAndPreOrder() {
    this.store.removeStorage('travelPreOrder');
    this.store.removeStorage('travelOrder');
  }

  getInsuranceSetting(): Observable<TravelConfig> {
    if (!this.startGettingSetting.value) {
      this.startGettingSetting.value = true;
      this.http.get(environment.REVIEW_Url + '/InsuranceType/GetSetting?moduleName=travel')
        .subscribe(response => {
          this.settingSubject$.next(response);
        }, (error) => {
          this.startGettingSetting.value = false;
        });
    }
    return this.settingSubject$.asObservable();
  }

  getCountries(): Observable<any[]> {
    if (!this.startGettingCountries.value) {
      this.http.get(environment.REVIEW_Url + '/Country')
        .pipe(map((x: any[]) => {
          return x.map(i => {
            return { text: i.name, value: i.id }
          });
        }))
        .subscribe(Response => {
          this.CountriesSubject$.next(Response);
        }, (error) => {
          this.startGettingCountries.value = false;
        });
    }
    return this.CountriesSubject$.asObservable();
  }

  getAgeRange(): Observable<any[]> {
    if (!this.startGettingAges.value) {
      this.http.get(environment.REVIEW_Url + '/AgeRange')
        .pipe(map((x: any[]) => {
          return x.map(i => {
            return { text: i.title, value: i.id }
          });
        }))
        .subscribe(Response => {
          this.AgesSubject$.next(Response);
        }, (error) => {
          this.startGettingAges.value = false;
        });
    }
    return this.AgesSubject$.asObservable();
  }

  getInsurancePrices(preOrder: TravelPreOrder) {
    const data = {
      ageRangeId: preOrder.ageRangeId,
      countryId: preOrder.countryId,
      financialCoverageAmount: preOrder.financialCoverageAmount,
      insurancePeriods: preOrder.insurancePeriods
    };
    return this.http.post(environment.REVIEW_Url + '/Pricing/GetTravelInsuranceProducts', data)
      .toPromise();
  }

  createOrder(productId, isMultiple, countryId) {
    return this.http.post(environment.ORDERING_Url + '/TravelOrder', { productId, isMultiple, countryId })
      .toPromise();
  }

  updateOrder(orderId, productId, isMultiple, countryId) {
    return this.http.put(environment.ORDERING_Url + '/TravelOrder', { orderId, productId, isMultiple, countryId })
      .toPromise();
  }
}
