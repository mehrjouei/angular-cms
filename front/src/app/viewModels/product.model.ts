export class ProductConfig {
  title: string;
  description: string;
  rules: string;
  iconFileName: string;
  landinPageImageFileName: string;
  coverages: Coverage[];
  periods: Period[];
  requiredDocumentList:{id:number,title:string}[];
}

export class Period {
  length: number;
  title: string;
}

export class Coverage {
  coverage: number;
  isDefault: boolean;
}

export class ProductPreOrder {
  // financialCoverageAmount: number;
  insurancePeriods: number;
  insurancetypeId:Number;
  moduleName: string;
  availableInsuranceId:number;
  selectedProductId:number;

}

export class productOrder {
  id: number;
  amount: number;
  companyId: number;
  companyIconName: string;
  companyName: string;
  amountByDiscount: number;
  discount: number;
}
