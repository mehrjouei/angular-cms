import { Component, OnInit, ViewChild, ViewContainerRef, Injector, NgModuleFactoryLoader } from '@angular/core';
import { StorageService } from './services/storage.service';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-cms';
  @ViewChild('toolbox', { read: ViewContainerRef }) toolbox: ViewContainerRef;
  userInfoSub;

  constructor(
    private storageService: StorageService,
    private injector: Injector,
    private loader: NgModuleFactoryLoader,
    private router: Router) {

  }

  ngOnInit(): void {
    this.storageService.getStorage('token').behaviorSubject.subscribe(x => {
      if (x) {
        if (window.location.href.indexOf('/admin') != -1) {
          this.toolbox.clear();
        }
        else {
          this.appendToolbar();
        }
      } else {
        this.toolbox.clear();
      }
    });
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((e: any) => {
      if (e.url && e.url.indexOf('/admin') === 0) {
        this.toolbox.clear();
      } else if (e.url) {
        this.appendToolbar();
      }
    });
  }

  appendToolbar() {
    this.toolbox.clear();
    this.userInfoSub = this.storageService.getStorage('userInfo').behaviorSubject.subscribe((user: any) => {
      if (user && user.roles.includes("administrator")) {
        this.loader.load('src/app/toolbox/toolbox.module#ToolboxModule').then((factory) => {
          const module = factory.create(this.injector);
          const r = module.componentFactoryResolver;
          const cmpFactory = r.resolveComponentFactory(ToolboxComponent);

          // create a component and attach it to the view
          const componentRef = cmpFactory.create(this.injector);
          this.toolbox.insert(componentRef.hostView);
        });
      }
      if (this.userInfoSub) {
        this.userInfoSub.unsubscribe();
      }
    });
  }

}
