import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { GuestDirective } from './guest.directive';
import { HomeComponent } from '../custom-pages/home/home.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menus$: Observable<Menu[]>;

  @ViewChild(GuestDirective) guestElement: GuestDirective;
  guestElementOutlet: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.menus$ = this.getMenus();
    this.guestElementOutlet = this.guestElement.viewContainerRef;
  }

  getMenus(): Observable<Menu[]> {
    return of([{ title: 'edit', url: '.', icon: 'fa-edit' },
    { title: 'Modules', url: '.', icon: 'fa-puzzle-piece' },
    { title: 'Pages', url: '.', icon: 'fa-file' },
    { title: 'Settings', url: '.', icon: 'fa-cogs' },
    { title: 'Custom Pages', url: '.', icon: 'fa-file-code' }]);
  }

  onModuleSelected(param) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HomeComponent);
    this.guestElementOutlet.createComponent(componentFactory);
  }

}
