import { Component, OnInit, Injector, NgModuleFactoryLoader, ViewChild, ViewContainerRef } from '@angular/core';
import { StorageService } from './services/storage.service';
import { ToolboxComponent } from './toolbox/toolbox.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-cms';
  showToolbar = false;
  @ViewChild("toolbox",{ read: ViewContainerRef }) toolbox: ViewContainerRef;
  constructor(
    private storageService: StorageService,
    private _injector: Injector,
    private loader: NgModuleFactoryLoader
  ) {

  }

  ngAfterViewInit(): void {
    this.storageService.getStorage("token").behaviorSubject.subscribe(x => {
      if (x) {
        this.showToolbar = true;
        this.loader.load('./toolbox/toolbox.module#ToolboxModule').then((factory) => {
          console.log("salam");
          const module = factory.create(this._injector);
          const r = module.componentFactoryResolver;
          const cmpFactory = r.resolveComponentFactory(ToolboxComponent);
          
          // create a component and attach it to the view
          const componentRef = cmpFactory.create(this._injector);
          this.toolbox.insert(componentRef.hostView);
        })
      }
      else {
        this.showToolbar = false;
      }
    })
  }


}
