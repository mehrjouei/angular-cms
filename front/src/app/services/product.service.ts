import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductPreOrder, productOrder, ProductConfig } from '../viewModels/product.model';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ProductService {
  private currentModule = {
    name: ''
  };
  private startGettingSetting = { value: false, moduleName: '' };
  private settingSubject$: BehaviorSubject<any>;
  private preOrder: ProductPreOrder;
  private order: productOrder;

  constructor(
    private http: HttpClient,
    private store: StorageService
  ) {
    this.settingSubject$ = new BehaviorSubject<any>(null);
    this.preOrder = {
      // financialCoverageAmount: null,
      moduleName: '',
      insurancetypeId: null,
      insurancePeriods: null,
      selectedProductId: null,
      availableInsuranceId: null
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
  // setCurrentModule(name){
  //   this.currentModule.name=name;
  // }
  // getCurrentModule(){
  //   return this.currentModule.name;
  // }
  getPreOrder(): ProductPreOrder {
    const storagePreOrder = this.store.getStorage('productPreOrder').behaviorSubject.value;
    if (storagePreOrder && this.preOrder && this.preOrder.moduleName === '') {
      this.preOrder = JSON.parse(storagePreOrder);
    }
    return this.preOrder;
  }
  setPreOrder(preOrder) {
    this.preOrder = preOrder;
    this.savePreOrderToStorage();
  }
  savePreOrderToStorage() {
    this.store.setStorage({ name: 'productPreOrder', saveInLocalStorage: true, value: this.preOrder });
  }
  getOrder() {
    const storageOrder = this.store.getStorage('productOrder').behaviorSubject.value;
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
    this.store.setStorage({ name: 'productOrder', saveInLocalStorage: true, value: this.order });
  }
  removeOrder() {
    this.store.removeStorage('productOrder');
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
  public getInsuranceSetting(): Observable<ProductConfig> {
    if (!this.startGettingSetting.value || this.startGettingSetting.moduleName !== this.getPreOrder().moduleName) {
      this.startGettingSetting.value = true;
      this.http.get(environment.REVIEW_Url + '/InsuranceType/GetSetting?moduleName=' + this.getPreOrder().moduleName)
        .subscribe(response => {
          this.settingSubject$.next(response);
        });
    }
    return this.settingSubject$.asObservable();
  }
  getInurancePrices(preOrder: ProductPreOrder) {
    let data = {
      'insurancePeriods': preOrder.insurancePeriods,
      'availableInsuranceId': preOrder.availableInsuranceId
    }
    return this.http.post(environment.REVIEW_Url + '/Pricing/GetProducts', data)
      .toPromise();
  }
  getAvailableInsurance(insuranceTypeId) {
    return this.http.get(environment.REVIEW_Url + `/AvailableInsurance?insuranceTypeId=${insuranceTypeId}`)
      .toPromise();
  }
}
