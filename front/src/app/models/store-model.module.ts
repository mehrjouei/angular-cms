import { BehaviorSubject } from 'rxjs';

export class StorageModel {
  name: string;
  saveInLocalStorage: boolean;
  behaviorSubject: BehaviorSubject<any>;
}
export class StoreModel {
  name: string;
  saveInLocalStorage: boolean;
  value: any;
}
