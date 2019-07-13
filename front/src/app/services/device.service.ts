import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DevicePreOrder, DeviceOrder, DeviceConfig } from '../viewModels/device.model';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';


@Injectable()
export class DeviceService {
  private startGettingSetting = { value: false };
  private settingSubject$: BehaviorSubject<any>;
  private preOrder: DevicePreOrder;
  private order: DeviceOrder;
  deviceKinds = [
    {
      deviceKindID: 1,
      title: 'موبایل',
      name: 'mobile',
      group: 'mobile'
    },
    {
      deviceKindID: 2,
      title: 'تبلت',
      name: 'tablet',
      group: 'tabletComputerLaptop'
    },
    {
      deviceKindID: 3,
      title: 'لپ تاپ',
      name: 'laptop',
      group: 'tabletComputerLaptop'
    },
    {
      deviceKindID: 13,
      title: 'کنسول بازی',
      name: 'game',
      group: 'gameWatch'
    },
    {
      deviceKindID: 14,
      title: 'ساعت هوشمند',
      name: 'whatch',
      group: 'gameWatch'
    },
    {
      deviceKindID: 15,
      title: 'رایانه رومیزی - All in One',
      name: 'allinone',
      group: 'tabletComputerLaptop'
    },
  ]
  constructor(
    private http: HttpClient,
    private store: StorageService
  ) {
    this.settingSubject$ = new BehaviorSubject<any>(null);
    this.preOrder =
      {
        deviceKindId: null,
        deviceKindTitle: '',
        brandId: null,
        brandTitle: '',
        modelId: null,
        modelTitle: '',
        price: null,
      };
    this.order =
      {
        orderId: null,
        baseAmount: null,
        productId: null,
        salesAmount: null,
      };

    if (!this.store.getStorage('devicePreOrder').behaviorSubject.value) {
      this.store.setStorage({ name: 'devicePreOrder', saveInLocalStorage: true, value: this.preOrder })
    }
    if (!this.store.getStorage('deviceOrder').behaviorSubject.value) {
      this.store.setStorage({ name: 'deviceOrder', saveInLocalStorage: true, value: this.order })
    }
  }
  getdeviceKinds() {
    return this.deviceKinds;
  }
  getPreOrder(): DevicePreOrder {
    const storagePreOrder = this.store.getStorage('devicePreOrder').behaviorSubject.value;
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
    this.store.setStorage({ name: 'devicePreOrder', saveInLocalStorage: true, value: this.preOrder });
  }

  getOrder() {
    const storageOrder = this.store.getStorage('deviceOrder').behaviorSubject.value;
    if (storageOrder && this.order && this.order.orderId == null) {
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
    this.store.setStorage({ name: 'deviceOrder', saveInLocalStorage: true, value: this.order });
  }

  removeOrderAndPreOrder() {
    this.store.removeStorage('devicePreOrder');
    this.store.removeStorage('deviceOrder');
  }
  getInsuranceSetting(): Observable<DeviceConfig> {
    if (!this.startGettingSetting.value) {
      this.startGettingSetting.value = true;
      this.http.get(environment.REVIEW_Url + '/InsuranceType/GetSetting?moduleName=electronicdevice')
        .subscribe(response => {
          this.settingSubject$.next(response);
        })
    }
    return this.settingSubject$.asObservable();
  }
  getBrands(deviceKindId) {
    return this.http.get<any[]>(environment.REVIEW_Url + `/MobileInsurance/saman/Brand?deviceKindId=${deviceKindId}`)
      .toPromise();
  }
  getModels(brandId) {
    return this.http.get<any[]>(environment.REVIEW_Url + `/MobileInsurance/saman/Model?brandid=${brandId}`)
      .toPromise();
  }
  getAmount(preOrder: DevicePreOrder) {
    return this.http.post(environment.REVIEW_Url + "/MobileInsurance/saman/Amount", preOrder)
      .toPromise();
  }
  createOrder(preOrder: DevicePreOrder, productId: number) {
    let data = Object.assign({ productId: productId }, preOrder)
    return this.http.post(environment.ORDERING_Url + "/Order/mobile/Register", data)
      .toPromise();
  }
  setSerial(data) {
    return this.http.put(environment.ORDERING_Url + "/Order/Mobile/SetSerial", data)
      .toPromise();
  }
}
