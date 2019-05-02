import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PageService } from '../../../../../services/page.service';
import { Page } from '../../../../../models/page';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('booleanTemplate') booleanTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  pages: Page[] = [];


  columns: TableColumn[];


  constructor(private pageService: PageService) {
  }

  ngOnInit() {
    this.columns = [
      { prop: 'title', name: 'عنوان' },
      { prop: 'slug', name: 'آدرس' },
      { prop: 'isInMenu', name: 'نمایش در منو', cellTemplate: this.booleanTemplate },
      { prop: 'template.name', name: 'قالب' },
      { prop: 'createDate', name: 'تاریخ ایجاد' },
      { prop: 'editDate', name: 'تاریخ ویرایش' },
      { prop: 'slug', name: 'ویرایش', cellTemplate: this.editTemplate },

    ];
    this.pageService.list().subscribe((res: any) => {
      this.pages = res.data;
    });
  }

  onDelete(row, index) {
    if (confirm('Are you sure to delete ' + row.title + '?')) {
      this.pageService.delete(row.slug).subscribe(_ => {
        this.pages.splice(index, 1);
        this.pages = [...this.pages];
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

