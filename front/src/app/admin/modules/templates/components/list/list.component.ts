import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TemplateService } from '../../../../services/template.service';
import { Template } from '../../../../../models/template';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'admin-template-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
  @ViewChild('htmlTemplate') htmlTemplate: TemplateRef<any>;
  @ViewChild('assetsTemplate') assetsTemplate: TemplateRef<any>;

  templates: Template[] = [];


  columns: TableColumn[];


  constructor(private templateService: TemplateService) {
  }

  ngOnInit() {
    this.columns = [
      { prop: 'name', name: 'نام' },
      { prop: 'html', name: 'Html', cellTemplate: this.htmlTemplate },
      { prop: 'image', name: 'عکس' },
      { prop: 'assets', name: 'Assets', cellTemplate: this.assetsTemplate },
      { prop: '', name: 'ویرایش', cellTemplate: this.editTemplate },

    ];
    this.templateService.list().subscribe((res: any) => {
      this.templates = res.data;
    });
  }

  onDelete(row, index) {
    if (confirm('Are you sure to delete ' + row.name + '?')) {
      this.templateService.delete(row._id).subscribe(_ => {
        this.templates.splice(index, 1);
        this.templates = [...this.templates];
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

