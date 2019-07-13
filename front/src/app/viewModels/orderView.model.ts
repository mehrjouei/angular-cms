// export class FullOrder {
//     orderDate: string;
//     paymentDate?: any;
//     orderTypeKey?: any;
//     amount: number;
//     orderId: number;
//     orderStateId: number;
//     orderStateTitle?: any;
//     insuranceCompanyTitle?: any;
//     insuranceCompanyId: number;
//     insuranceCompanyIconFileName?: any;
//     orderProductDescription?: any;
//     orderDocuments?: any;
//     oldPolicyExpireDate?: any;
//     period: number;
//     financialCoverageAmount: number;
//     bodyObligationsCoverageAmount: number;
//     vehicleBrandId: number;
//     carCreationYear:number;
//     vehicleUsageTypeId: number;
//     discountPercentage: number;
//     numberOfDiscountYearsOnPolicy: number;
//     bodyDamageCount: number;
//     financialDamageCount: number;
//     policyAddressId?: any;
//     devliverAddressId?: any;
//     insurerFullName?: any;
//     insurerPhoneNumber?: any;
//     buyerFullName?: any;
//     vehicleTypeId: number;
//   }
export class FullOrder {
  orderDate: string;
  paymentDate: string;
  orderTypeKey: string;
  amount: number;
  orderId: number;
  orderStateId: number;
  orderStateTitle: string;
  insuranceCompanyTitle: string;
  insuranceTypeId:Number;
  insuranceCompanyId: number;
  insuranceCompanyIconFileName: string;
  insurerFullName: string;
  orderProductDescription: string;
  orderDocuments: any[];
  period: number;
  discountPercentage: number;
  policyAddressId?: any;
  devliverAddressId?: any;
  buyerFullName: string;
  insurerPhoneNumber: string;
  orderProductInfo: OrderProductInfo;
  oldPolicyExpireDate: string;
  financialCoverageAmount: number;
}

interface OrderProductInfo {
  bodyDamageCount: number;
  financialDamageCount: number;
  numberOfDiscountYearsOnPolicy: number;
  bodyObligationsCoverageAmount: number;
  vehicleUsageTypeId: number;
  vehicleTypeId: number;
  carCreationYear: number;
}
