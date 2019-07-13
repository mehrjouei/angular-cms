import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { RoleService } from '../../../../../services/role.service';
import { Role } from '../../../../../models/role';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'admin-role-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
  @ViewChild('resourcesTemplate') resourcesTemplate: TemplateRef<any>;
  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
  @ViewChild('descriptionTemplate') descriptionTemplate: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;

  roles: Role[] = [];

  editing = {};

  columns: TableColumn[];


  constructor(private roleService: RoleService) {
  }

  ngOnInit() {
    this.columns = [
      { prop: 'name', name: 'نام', cellTemplate: this.nameTemplate },
      { prop: 'description', name: 'توضیحات', cellTemplate: this.descriptionTemplate },
      { prop: 'status', name: 'وضعیت', cellTemplate: this.statusTemplate },
      { prop: 'resources', name: 'منابع', cellTemplate: this.resourcesTemplate },
      { prop: '', name: 'ویرایش', cellTemplate: this.editTemplate },

    ];
    this.roleService.list().subscribe((res: any) => {
      this.roles = res.data;
    });
  }

  onDelete(row, index) {
    if (confirm('Are you sure to delete ' + row.name + '?')) {
      this.roleService.delete(row._id).subscribe(_ => {
        this.roles.splice(index, 1);
        this.roles = [...this.roles];
        alert('deleted!');
      });
    }
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.roles[rowIndex][cell] = event.target.value;
    this.roles = [...this.roles];
  }

  getResourcesValue(resources) {
    return resources.map((r: any) => r._id);
  }

}

