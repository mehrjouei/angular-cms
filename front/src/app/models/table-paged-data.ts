import { TablePage } from './table-page';

export class TablePagedData<T> {
  data = new Array<T>();
  page = new TablePage();
}
