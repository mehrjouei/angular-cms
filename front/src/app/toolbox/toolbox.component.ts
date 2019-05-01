import { Component, OnInit } from '@angular/core';
// import { AdminToolboxService } from './services/admin-toolbox.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  showContentFlag = false;
  activeMenu = '';

  constructor(
    // private adminService: AdminToolboxService
    ) {}

  ngOnInit() {
    // this.adminService.getToken('v.vulkan', '123456').then(response => {
    //   localStorage.setItem('API_TOKEN', response.token);
    // });
  }
  showContent(contentName) {
    if (this.activeMenu == '') {
      this.activeMenu = contentName;
      this.showContentFlag = !this.showContentFlag;
    } else if (contentName == this.activeMenu) {
      this.showContentFlag = !this.showContentFlag;
      this.activeMenu = '';
    } else {
      this.activeMenu = contentName;
    }
  }
}
