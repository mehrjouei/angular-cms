export class DeviceConfig {
  title: string;
  description: string;
  rules: string;
  iconFileName: string;
  landinPageImageFileName: string;
  requiredDocumentList: { id: number, title: string }[];
}

export class DevicePreOrder {
  deviceKindId: number;
  deviceKindTitle: string;
  brandId: number;
  brandTitle: string;
  modelId: number;
  modelTitle: string;
  price: number;
}
export class DeviceOrder {
  orderId: number;
  baseAmount: number;
  salesAmount: number;
  productId: number;
}

