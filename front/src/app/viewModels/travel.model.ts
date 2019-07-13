export class TravelConfig {
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

export class TravelPreOrder {
  financialCoverageAmount:number;
  insurancePeriods: number;
  selectedTravelId:number;
  ageRangeId: number;
  countryId: number;
  selectedProductId:number;
  travelTypes:boolean;
}

export class TravelOrder {
  id: number;
  amount: number;
  companyId: number;
  companyIconName: string;
  companyName: string;
  amountByDiscount: number;
  discount: number;
}
