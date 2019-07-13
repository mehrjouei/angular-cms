import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderListView } from '../viewModels/orderListView.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private http: HttpClient,
  ) {

  }
  myOrderList(): Promise<OrderListView[]> {
    return this.http.get<OrderListView[]>(environment.ORDERING_Url + "/Order/MyOrders")
      .toPromise()
  }
  createOrder(productId,moduleName){
    return this.http.post(environment.ORDERING_Url+"/Order",{productId,moduleName})
    .toPromise();
  }
  updateOrder(orderId,productId){
    return this.http.put(environment.ORDERING_Url+"/Order",{orderId,productId})
    .toPromise();
  }
  AssignBuyerInfoByNationalCodeAndBirthdate(nationalCode, solarBirthDate, orderId) {
    return this.http.post(environment.ORDERING_Url + "/Buyer/GetBuyerInfo",
      { nationalCode, solarBirthDate, orderId })
      .toPromise()
  }
  AssignBuyerInfoByDetail(nationalCode, solarBirthDate, firstName, lastName, phoneNumber, sex, orderId) {
    return this.http.post(environment.ORDERING_Url + "/Buyer/FillBuyerInfo",
      { nationalCode, solarBirthDate, firstName, lastName, phoneNumber, sex, orderId })
      .toPromise()
  }
  changeBuyerWithNationalCodeAndBirthday(nationalCode, solarBirthDate, phoneNumber, orderId) {
    return this.http.post(environment.ORDERING_Url + "/Buyer/ChangeBuyer",
      { nationalCode, solarBirthDate, phoneNumber, orderId })
      .toPromise()
  }
  getOrderFully(orderId) {
    return this.http.get(environment.ORDERING_Url + "/Order/GetFullOrderInfo?orderId=" + orderId)
      .toPromise()
  }
  getOrderPaymentConflict(orderId) {
    return this.http.get(environment.ORDERING_Url + "/Order/GetOrderPaymentConflict?orderId=" + orderId)
      .toPromise()
  }



  IsWorkTime(oldPolicyExpireDate?): Promise<any> {
    return this.http.get(environment.ORDERING_Url + '/WorkTime'+(oldPolicyExpireDate ? `?oldPolicyExpireDate=${oldPolicyExpireDate}`:''))
      .toPromise()
  }
  uploadIos(base64image) {
    return this.http.post(environment.ORDERING_Url + "/OrderDocument/UploadIos",{base64image})
      .toPromise()
  }
  getOrderDocument(fileId): Promise<any> {
    return this.http.get(environment.ORDERING_Url + `/OrderDocument/${fileId}`)
      .toPromise()
  }
  getOrderTimeLine(orderId): Promise<any> {
    return this.http.get(environment.ORDERING_Url + `/Order/TimeLine?orderId=${orderId}`)
      .toPromise()
  }

  getInsurerInfo(orderId): Promise<any> {
    return this.http.get(environment.ORDERING_Url + `/Order/GetInsurerInfo?orderId=${orderId}`)
      .toPromise()
  }
  AssignDocumentToOrder(orderId, documentId, key): Promise<any> {
    return this.http.put(environment.ORDERING_Url + "/OrderDocument/AssignToOrder",
      {
        orderId,
        documentId,
        key
      }
      )
      .toPromise()
  }
  removeDocument(fileId): Promise<any> {
    return this.http.delete(environment.ORDERING_Url + `/OrderDocument/${fileId}`)
      .toPromise()
  }
  AssignAddressToPolicy(orderId, addressId): Promise<any> {
    return this.http.put(environment.ORDERING_Url + "/ThirdPerson/AssignAddressToPolicy",
      {
        orderId,
        addressId
      }
      )
      .toPromise()
  }
  AssignDeliveryAddress(orderId, addressId): Promise<any> {
    return this.http.put(environment.ORDERING_Url + "/ThirdPerson/AssignDeliveryAddress",
      {
        orderId,
        addressId
      }
      )
      .toPromise()
  }
  finalThirdPersonConfirmOrder(orderId, description): Promise<any> {
    return this.http.put(environment.ORDERING_Url + "/ThirdPerson/Confirm",
      {
        orderId,
        description
      }
      )
      .toPromise()
  }
  finalConfirmOrder(orderId, description): Promise<any> {
    return this.http.put(environment.ORDERING_Url + "/Order/Confirm",
      {
        orderId,
        description
      }
      )
      .toPromise()
  }
  updateInsurerLatinInfo(data){
    return this.http.post(environment.ORDERING_Url+"/Buyer/UpdateInsurerLatinInfo",data)
    .toPromise()
  }
}
