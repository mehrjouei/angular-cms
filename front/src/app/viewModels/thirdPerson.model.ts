export class ThirdPersonPreOrder {
  vehicleTypeId: number;
  carCreationYear: number;
  SolarPolicyDueDate: string;
  CarUsageType: number;
  NumberOfBodyDamage: number;
  NumberOfFinancialDamage: number;
  FinancialCoverageAmount: number;
  InsurancePeriods: number;
  NumberOfDiscountYearsOnPolicy: number;
  selectedInsurance: Insurance
}
export class Insurance {
  id: number;
  showOrder: number;
  amount: number;
  amountByDiscount: number;
  companyId: number;
  companyIconName: string;
  companyName: string;
  branchCount: number;
  portion: number;
  financialStrengthLevel: number;
  compensationCenterCount: number;
  hasMobileCompensationCenter: boolean;
  customerSatisfactionScore: number;
  customerSatisfactionCount: number;

}
export class ThirdPersonOrder {
  orderId: number;
  productId: number;
  price: number;
  bodyDamageCount: number;
  financialDamageCount: number;
  solarPolicyDueDate: string;
  numberOfDiscountYearsOnPolicy: number;
  insuranceCompanyId: number;
  insuranceCompanyTitle: string;
  vehicleTypeId: number;
  carCreationYear: number;
  carUsageType: number;
  numberOfBodyDamage: number;
  numberOfFinancialDamage: number;
  financialCoverageAmount: number;
  insurancePeriods: number;
}


export class ThirdPersonSetting {
  vehicleAgeMax: number;
  coverages: Coverage[];
  periods: Period[];
  bloodMoney: number;
  forbiddenMonthBloodMoney: number;
}

interface Period {
  length: number;
  title: string;
}

interface Coverage {
  coverage: number;
  isDefault: boolean;
}

