import {
  Component, OnInit, ComponentFactoryResolver, ApplicationRef,
  EmbeddedViewRef, Injector, ViewChild, ElementRef, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ContainerComponent } from '../container/container.component';
import { Page } from '../../models/page';
import { BusService } from 'src/app/services/bus.service';
import { MasterInjector } from 'src/app/master/services/master-injector.service';
import { PageService } from 'src/app/services/page.service';
import { HtmlComponent } from 'src/app/cms-modules/view/components/html/html.component';
import { SliderComponent } from 'src/app/cms-modules/view/components/slider/slider.component';
import { LoadingService } from '../../services/loading.service';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TabdionComponent } from '../../cms-modules/view/components/tabdion/tabdion.component';

@Component({
  template: ''
})
export class BaseComponent implements OnInit, OnDestroy {
  protected pageService: PageService;
  protected cfResolver: ComponentFactoryResolver;
  protected modules: any[];
  protected slug: string;
  protected page: Page;
  protected injector: Injector;
  protected appRef: ApplicationRef;
  private bus: BusService;
  private busSubscription: Subscription;
  private loadingService: LoadingService;
  private router: Router;

  @ViewChild('pageContent') pageContent: ElementRef;

  constructor() {
    this.injector = MasterInjector.getInjector();
    this.appRef = this.injector.get(ApplicationRef);
    this.pageService = this.injector.get(PageService);
    this.cfResolver = this.injector.get(ComponentFactoryResolver);
    this.bus = this.injector.get(BusService);
    this.loadingService = this.injector.get(LoadingService);
    this.router = this.injector.get(Router);
    this.router.events.pipe(filter((e): e is NavigationStart => e instanceof NavigationStart))
      .subscribe((v) => {
        this.removeCustomPageAssets();
      });
    this.busSubscription = this.bus.moduleAdded$.subscribe(m => {
      // TODO azin m e estefade namiekoni amalan dobare miri az server hamaro migiri
      this.ngOnInit();
    });
  }
  mySub;
  ngOnInit() { // careful, runs after child's ngOnInit
    const pageUrlBase = window.location.href.split('/').slice(3);
    if (pageUrlBase[0] === 'page') {
      this.slug = pageUrlBase[0] + '/' + pageUrlBase[1];
    } else {
      this.slug = pageUrlBase[0];
    }
    // this.pageUrl = window.location.href.split('/').slice(3);
    // this.slug = this.pageUrl.substring(this.pageUrl.lastIndexOf('/') + 1);

    this.loadingService.startLoading('body');

    this.pageService.one(this.slug).subscribe((res: any) => { // TODO jash bade, code bade
      this.page = res.data;
      if (!this.page) {
        this.loadingService.stopLoading('body');
        return;
      }
      if (this.page.template) {
        this.pageContent.nativeElement.innerHTML = '';
        this.pageContent.nativeElement.insertAdjacentHTML('beforeend', this.page.template.html);
      }
      const dataPanes = document.querySelectorAll(`[data-pane]`);
      dataPanes.forEach(x => {
        x.innerHTML = '';
      });
      if (this.page.parts) {
        this.page.parts.forEach(part => {
          const module = part.module.key;
          const data = part.data;
          const type = this.getComponentType(module);
          const factory = this.cfResolver.resolveComponentFactory<any>(type);
          const containerFactory = this.cfResolver.resolveComponentFactory(ContainerComponent);
          const containerComponentRef = containerFactory.create(this.injector);
          containerComponentRef.instance.title = part.title;
          containerComponentRef.instance.partId = part._id;
          containerComponentRef.instance.pageSlug = this.slug;
          containerComponentRef.instance.moduleType = module;
          containerComponentRef.instance.container = part.container;
          containerComponentRef.instance.guestComponentFactory = factory;
          containerComponentRef.instance.data = data;
          this.appRef.attachView(containerComponentRef.hostView);
          const paneSelector = `[data-pane='${part.pane}']`;
          const pane = document.querySelector(paneSelector);
          if (pane) {
            pane.appendChild((containerComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement);
          }
        });
      }
      if (this.page.template) {
        document.querySelector('head').innerHTML += this.page.assets + this.page.template.assets;
      }
      this.loadingService.stopLoading('body');
    });
  }

  ngOnDestroy() {
    this.busSubscription.unsubscribe();
    this.removeCustomPageAssets();
  }

  getComponentType(name: string) { // TODO
    switch (name) {
      case 'html':
        return HtmlComponent;
      case 'tabdion':
        return TabdionComponent;
      default:
        return null;
    }
  }

  removeCustomPageAssets() {
    if (this.page && this.page.template) {
      document.querySelector('head').innerHTML = document.querySelector('head').innerHTML
        .replace(this.page.assets, '').replace(this.page.template.assets, '');
    }
  }

}
