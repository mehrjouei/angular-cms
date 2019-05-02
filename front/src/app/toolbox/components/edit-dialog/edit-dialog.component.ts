import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { DialogBaseComponent } from '../../../sharedModules/dialog/components/dialog-base/dialog-base.component';
import { DialogRef } from '../../../sharedModules/dialog/dialog-ref';
import { DialogConfig } from '../../../sharedModules/dialog/dialog-config';
import { GuestDirective } from '../../../sharedModules/guest/directives/guest-outlet.directive';
import { EditHtmlComponent } from '../../../cms-modules/components/html/edit/edit-html.component';
import { BusService } from '../../../services/bus.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent extends DialogBaseComponent implements OnInit {
  @ViewChild(GuestDirective) guestOutlet: GuestDirective;

  constructor(
    protected dialog: DialogRef,
    protected config: DialogConfig,
    protected bus: BusService,
    private cfResolver: ComponentFactoryResolver
  ) {
    super(dialog, config, bus);
  }

  ngOnInit() {
    const factory = this.cfResolver.resolveComponentFactory(this.getComponentType(this.data.moduleType));
    const editComponentRef: any = this.guestOutlet.viewContainerRef.createComponent(factory);
    editComponentRef.instance.data = this.data;
    editComponentRef.instance.dataChange.subscribe((e) => {
      this.onDone();
    });
  }

  getComponentType(name: string) { // TODO
    switch (name) {
      case 'edit-html':
        return EditHtmlComponent;
      case 'edit-slider':
        return null; // TODO
      default:
        return null;
    }
  }

  onDone() {
    this.bus.addModule({});
    this.done();
  }

}
