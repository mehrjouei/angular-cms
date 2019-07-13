import { Component, Type, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { InsertionDirective } from './insertion.directive';
import { Subject } from 'rxjs';
import { DialogRef } from './dialog-ref';
import { DialogConfig } from './dialog-config';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  componentRef: ComponentRef<any>;

  @ViewChild(InsertionDirective)
  insertionPoint: InsertionDirective;

  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  childComponentType: Type<any>;
  headerTitle;
  size = 'medium';
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private dialogRef: DialogRef,
    private config: DialogConfig
  ) {
    if (this.config.data && this.config.data.header) {
      this.headerTitle = this.config.data.header;
      if (this.config.data.size) {
        this.size = this.config.data.size;
      }
    }
  }

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    this.dialogRef.close();
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close() {
    this._onClose.next();
  }
}
