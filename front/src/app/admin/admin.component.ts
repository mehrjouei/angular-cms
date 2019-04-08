import { Component, OnInit, ViewChildren } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Menu } from 'src/app/models/menu';

import { faEdit, faPuzzlePiece, faFile, faCogs, faFileCode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menus$: Observable<Menu[]>;

  // @ViewChildren('menus') menusRef;
  showModules = false;

  constructor() { }

  ngOnInit() {
    this.menus$ = this.getMenus();
  }

  getMenus(): Observable<Menu[]> {
    return of([{ title: 'edit', url: '.', icon: faEdit },
    { title: 'Modules', url: '.', icon: faPuzzlePiece },
    { title: 'Pages', url: '.', icon: faFile },
    { title: 'Settings', url: '.', icon: faCogs },
    { title: 'Custom Pages', url: '.', icon: faFileCode }]);
  }

  onMenuItemClick(menuTitle: string) {
    switch (menuTitle) {
      case 'Modules':
        this.showModules = !this.showModules;
        break;

      default:
        break;
    }
  }

}
