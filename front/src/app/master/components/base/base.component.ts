import {
  Component, OnInit, ComponentFactoryResolver, ApplicationRef,
  EmbeddedViewRef, Injector, ViewChild, ElementRef, OnDestroy
} from '@angular/core';
import { MasterInjector } from '../../services/master-injector.service';
import { HtmlComponent } from '../../../cms-modules/components/html/html.component';
import { SliderComponent } from '../../../cms-modules/components/slider/slider.component'; // TODO, define index
import { forkJoin, Subscription } from 'rxjs';
import { Page } from '../../../models/page';
import { BusService } from '../../../services/bus.service';
import { PageService } from '../../../services/page.service';
import { ContainerComponent } from '../container/container.component';

@Component({
  template: ''
})
export class BaseComponent implements OnInit, OnDestroy {
  protected pageService: PageService;
  protected cfResolver: ComponentFactoryResolver;
  protected modules: any[];
  protected pageUrl: string;
  protected slug: string;
  protected page: Page;
  protected injector: Injector;
  protected appRef: ApplicationRef;
  private bus: BusService;
  private busSubscription: Subscription;

  @ViewChild('pageContent') pageContent: ElementRef;

  constructor() {
    this.injector = MasterInjector.getInjector();
    this.appRef = this.injector.get(ApplicationRef);
    this.pageService = this.injector.get(PageService);
    this.cfResolver = this.injector.get(ComponentFactoryResolver);
    this.bus = this.injector.get(BusService);
    this.busSubscription = this.bus.moduleAdded$.subscribe(m => {
      // TODO azin m e estefade namiekoni amalan dobare miri az server hamaro migiri
      this.ngOnInit();
    });
  }
  mySub;
  ngOnInit() { // careful, runs after child's ngOnInit
    this.pageUrl = window.location.href.split('/').slice(3).join('/');
    this.slug = this.pageUrl.substring(this.pageUrl.lastIndexOf('/') + 1);
    this.pageService.one(this.slug).subscribe((res: any) => { // TODO jash bade, code bade
      this.page = res.data;
      if (!this.page) {
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
      this.page.parts.forEach(part => {
        const module = part.module.key;
        const data = part.data;
        const type = this.getComponentType(module);
        const factory = this.cfResolver.resolveComponentFactory(type);
        const containerFactory = this.cfResolver.resolveComponentFactory(ContainerComponent);
        const containerComponentRef = containerFactory.create(this.injector);
        containerComponentRef.instance.title = part.container.title;
        containerComponentRef.instance.partId = part._id;
        containerComponentRef.instance.pageSlug = this.slug;
        containerComponentRef.instance.moduleType = module;
        containerComponentRef.instance.html = part.container.html;
        containerComponentRef.instance.guestComponentFactory = factory;
        containerComponentRef.instance.data = data;
        this.appRef.attachView(containerComponentRef.hostView);
        const pane = document.querySelector(`[data-pane='${part.pane}']`);
        if (pane) {
          pane.appendChild((containerComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement);
        }
      });
      if (this.page.template) {
        document.querySelector('head').innerHTML += this.page.assets + this.page.template.assets;
      }
    });
  }

  ngOnDestroy() {
    this.busSubscription.unsubscribe();
    if (this.page.template) {
      document.querySelector('head').innerHTML = document.querySelector('head').innerHTML
        .replace(this.page.assets, '').replace(this.page.template.assets, '');
    }
  }

  getComponentType(name: string) { // TODO
    switch (name) {
      case 'html':
        return HtmlComponent;
      case 'slider':
        return SliderComponent;
      default:
        return null;
    }
  }

}
