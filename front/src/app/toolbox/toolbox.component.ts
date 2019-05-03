import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
// import { AdminToolboxService } from './services/admin-toolbox.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  showContentFlag = false;
  activeMenu = '';
  editMode:boolean=false;
  constructor(
    private authService: AuthService,
    private storage:StorageService
  ) {
    this.editMode=this.storage.getStorage("editMode").behaviorSubject.value
   }

  ngOnInit() {

  }
  logout() {
    this.storage.removeStorage("editMode");
    this.authService.logout();
  }
  toggleEditMode(){
    this.editMode=!this.editMode;
      this.storage.setStorage({
        name:"editMode",
        saveInLocalStorage:true,
        value:this.editMode
      })
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
