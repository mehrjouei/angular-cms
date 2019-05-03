import { Component, OnInit, Input, ViewChild, ComponentFactory, ComponentRef, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GuestDirective } from 'src/app/sharedModules/guest/directives/guest-outlet.directive';
import { EditDialogComponent } from 'src/app/toolbox/components/edit-dialog/edit-dialog.component';
import { DialogService } from 'src/app/sharedModules/dialog/dialog.service';
import { PageService } from 'src/app/services/page.service';
import { BusService } from 'src/app/services/bus.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit { // TODO inherit base component
  @ViewChild(GuestDirective) guestOutlet: GuestDirective;
  @ViewChild('target') target: ElementRef;
  @ViewChild('module') module: ElementRef;

  @Input() html: string;
  @Input() partId: string;
  @Input() pageSlug: string;
  @Input() title: string;
  @Input() data: object;
  @Input() moduleType: string;
  @Input() guestComponentFactory: ComponentFactory<any>;

  private guestComponentRef: ComponentRef<any>;
  showEditBtns:boolean=false;
  constructor(
    private sanitizer: DomSanitizer,
     private dialog: DialogService,
      private pageService: PageService,
       private bus: BusService,
       private storage:StorageService
       ) { 
         this.storage.getStorage("editMode").behaviorSubject.subscribe(x=>{
          this.showEditBtns=x;
         });
       }
   // TODO

  ngOnInit() {
    this.guestComponentRef = this.guestOutlet.viewContainerRef.createComponent(this.guestComponentFactory);
    this.guestComponentRef.instance.data = this.data;
    this.target.nativeElement.insertAdjacentHTML('beforeend', this.html);
    this.target.nativeElement.querySelector('[data-content]').appendChild(this.module.nativeElement);
    this.target.nativeElement.querySelector('[data-title]').insertAdjacentHTML('beforeend', this.title);
  }

  onEdit(e) {
    this.dialog.open(EditDialogComponent, {
      data: {
        text: 'edit dialog',
        moduleType: `edit-${this.moduleType}`,
        data: this.data,
        partId: this.partId,
        pageSlug: this.pageSlug
      }
    });
  }

  onRemove(e) {
    if (confirm('Are you sure to delete ' + this.moduleType + ' module?')) {
      this.pageService.deletePart(this.pageSlug, this.partId).subscribe(_ => {
        alert('deleted!');
        this.bus.addModule({}); // TODO change name
      });
    }
    // this.dialog.open(EditDialogComponent, {
    //   data: {
    //     text: 'delete dialog'
    //   }
    // });
  }
}
