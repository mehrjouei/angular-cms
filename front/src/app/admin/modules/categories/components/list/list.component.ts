import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../../models/category';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'admin-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  categories: Category[] = [];

  columns: TableColumn[];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.columns = [
      { prop: 'name', name: 'نام' },
      { prop: 'parent', name: 'والد' },
      { prop: '', name: 'ویرایش', cellTemplate: this.editTemplate },

    ];
    this.categoryService.list().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  onDelete(row, index) {
    if (confirm('Are you sure to delete ' + row.name + '?')) {
      this.categoryService.delete(row._id).subscribe(_ => {
        this.categories.splice(index, 1);
        this.categories = [...this.categories];
        alert('deleted!');
      });
    }
  }

  // onChange(name: string): void {
  //   this.table.apiEvent({
  //     type: API.onGlobalSearch, value: name,
  //   });
  // }
}

