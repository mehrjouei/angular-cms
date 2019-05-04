import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ContainerService } from '../../services/container.service';
import { Container } from '../../../../../models/container';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'admin-container-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
  @ViewChild('htmlTemplate') htmlTemplate: TemplateRef<any>;

  containers: Container[] = [];
  columns: TableColumn[];

  constructor(private containerService: ContainerService) {
  }

  ngOnInit() {
    this.columns = [
      { prop: 'name', name: 'نام' },
      { prop: 'html', name: 'Html', cellTemplate: this.htmlTemplate },
      { prop: 'image', name: 'عکس' },
      { prop: '', name: 'ویرایش', cellTemplate: this.editTemplate },

    ];
    this.containerService.list().subscribe((res: any) => {
      this.containers = res.data;
    });
  }

  onDelete(row, index) {
    if (confirm('Are you sure to delete ' + row.name + '?')) {
      this.containerService.delete(row._id).subscribe(_ => {
        this.containers.splice(index, 1);
        this.containers = [...this.containers];
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

