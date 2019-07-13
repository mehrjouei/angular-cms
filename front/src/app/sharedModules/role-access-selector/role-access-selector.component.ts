import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-role-access-selector',
  templateUrl: './role-access-selector.component.html',
  styleUrls: ['./role-access-selector.component.scss']
})
export class RoleAccessSelectorComponent implements OnInit {
  @Input() roles: Role[];
  @Input() selectedRoleIds: any[];
  @Output() selectRole = new EventEmitter<any[]>();
  allRoles;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.allRoles = this.roles.map(x => ({ id: x._id, checked: this.selectedRoleIds.find(y => y._id == x._id) ? true : false }));
  }

  changeAccess(){
    let r=this.allRoles.filter(x=>x.checked==true);
    this.selectRole.emit(r.map(x=>x.id));
  }
}
