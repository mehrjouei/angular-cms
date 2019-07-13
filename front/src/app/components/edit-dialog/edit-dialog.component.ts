import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input, NgModuleFactoryLoader, Injector, ComponentFactory } from '@angular/core';
import { DialogRef } from '../../sharedModules/dialog/dialog-ref';
import { DialogConfig } from '../../sharedModules/dialog/dialog-config';
import { GuestDirective } from '../../sharedModules/guest/directives/guest-outlet.directive';
import { BusService } from '../../services/bus.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Part } from 'src/app/models/part';
import { PageService } from 'src/app/services/page.service';
import { Container } from 'src/app/models/container';
import { Role } from 'src/app/models/role';
import { EditHtmlComponent } from 'src/app/cms-modules/edit/components/html/edit-html.component';
import { EditTabdionComponent } from '../../cms-modules/edit/components/tabdion/edit-tabdion.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  @ViewChild(GuestDirective) guestOutlet: GuestDirective;
  visibleTab = "tab1";
  containers = [];
  selectedRoleIds = [];
  editData: Part = new Part();
  roles: Role[] = [];
  form = this.fb.group({
    title: ['', Validators.required],
    containerId: ['', Validators.required]
  });

  constructor(
    protected dialog: DialogRef,
    protected config: DialogConfig,
    protected bus: BusService,
    private fb: FormBuilder,
    private pageService: PageService,
    private cfResolver: ComponentFactoryResolver,
    private loader: NgModuleFactoryLoader,
    private injector: Injector,
  ) {

  }

  onSubmit(form: FormGroup) {
    this.editData.title = form.value.title;
    let co = new Container();
    co._id = form.value.containerId
    this.editData.container = co;
    this.editData._id = this.config.data.partId;
    this.pageService.editPart(this.config.data.pageSlug, this.editData).subscribe(res => {
      this.bus.addModule({});
      this.dialog.close(
        true
      );
    });
  }
  ngOnInit() {
    this.pageService.getContainers().subscribe((__: any) => {
      this.containers = __.data;
    });
    this.pageService.rolesList().subscribe((roles: any) => {
      this.roles = roles.data;
    });
    this.pageService.one(this.config.data.pageSlug).subscribe((d: any) => {
      let page = d.data;
      let pa = page.parts.find(x => x._id == this.config.data.partId);
      this.selectedRoleIds = pa ? pa.roles : [];
    });
    this.editData.data = this.config.data.data;
    console.log(this.config);
    setTimeout(() => {
      this.form.setValue(
        {
          title: this.config.data.title,
          containerId: this.config.data.container._id,
        }
      );
    }, 100);

    this.getComponentType(this.config.data.moduleType).then((factory: ComponentFactory<any>) => {
      const editComponentRef: any = this.guestOutlet.viewContainerRef.createComponent(factory);
      editComponentRef.instance.data = { data: this.editData.data };
      editComponentRef.instance.dataChange.subscribe((e) => {
        this.editData.data = e;
      });
    })
  }

  getComponentType(name: string): any {
    switch (name) {
      case 'edit-html':
        return this.loader.load('src/app/cms-modules/edit/edit.module#EditModule').then((factory) => {
          const module = factory.create(this.injector);
          const r = module.componentFactoryResolver;
          const cmpFactory = r.resolveComponentFactory(EditHtmlComponent);
          return cmpFactory;
        });
      case 'edit-tabdion':
        return this.loader.load('src/app/cms-modules/edit/edit.module#EditModule').then((factory) => {
          const module = factory.create(this.injector);
          const r = module.componentFactoryResolver;
          const cmpFactory = r.resolveComponentFactory(EditTabdionComponent);
          return cmpFactory;
        });
      default:
        return null;
    }
  }
  roleChangeEvent(r) {
    console.log(r);
    this.editData.roles = r;
  }
  onCancel() {
    this.dialog.close(
      false
    );
  }

}
