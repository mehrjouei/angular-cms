import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FileModel } from '../../../file.model';
import { FilemanagerService } from '../../../filemanager.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'filemanager-body-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @Input() fileOrdDirectory: FileModel;
  layout;
  icon;

  constructor(
    private fileManagerService: FilemanagerService,
    private elRef: ElementRef
  ) {
  }

  ngOnInit() {
    console.log(this.elRef.nativeElement.offsetLeft);
    this.fileManagerService.currentDirectory.layout.subscribe(x => {
      if (x) {
        this.layout = x;
      }
    });
    if (this.fileOrdDirectory.isDirectory) {
      this.icon = "folder";
    } else {
      this.icon = this.fileOrdDirectory.extension.replace(".", "");
    }
    this.fileManagerService.currentDirectory.mouse.subscribe(p => {
      if (p) {
        if (((this.elRef.nativeElement.offsetLeft >= p.source.x && this.elRef.nativeElement.offsetLeft <= p.dest.x)
          || (this.elRef.nativeElement.offsetLeft <= p.source.x && this.elRef.nativeElement.offsetLeft >= p.dest.x))
          &&
          (((this.elRef.nativeElement.offsetTop >= p.source.y && this.elRef.nativeElement.offsetTop <= p.dest.y)
            || (this.elRef.nativeElement.offsetTop <= p.source.y && this.elRef.nativeElement.offsetTop >= p.dest.y)))) {
          const path = this.fileManagerService.currentDirectory.path.value + this.fileOrdDirectory.name;
          const selections = [...this.fileManagerService.currentDirectory.selections.value];
          selections.push(path);
          this.fileManagerService.currentDirectory.selections
            .next(selections); // TODO remove nexts here and add it to service
          console.log(selections);
        }
      }
    });
  }
  selectItem(e) {
    if (!e.ctrlKey) {
      const path = this.fileManagerService.currentDirectory.path.value + this.fileOrdDirectory.name;
      // if (this.fileManagerService.currentDirectory.selections.value
      //   .some(s => s === path)) {
      //   this.fileManagerService.currentDirectory.selections
      //     .next([]);
      // } else {
      //   this.fileManagerService.currentDirectory.selections
      //     .next([path]);
      // }
      this.fileManagerService.currentDirectory.selections
        .next([path]);
    } else {
      const path = this.fileManagerService.currentDirectory.path.value + this.fileOrdDirectory.name;
      if (this.fileManagerService.currentDirectory.selections.value
        .some(s => s === path)) {
        this.fileManagerService.currentDirectory.selections
          .next(this.fileManagerService.currentDirectory.selections.value.filter(s => s !== path));
      } else {
        const selections = [...this.fileManagerService.currentDirectory.selections.value];
        selections.push(path);
        this.fileManagerService.currentDirectory.selections
          .next(selections);
      }
    }
    console.log(this.fileManagerService.currentDirectory.selections.value);
  }

  isSelected() {
    return this.fileManagerService.currentDirectory.selections.value
      .some(s => s === this.fileManagerService.currentDirectory.path.value + this.fileOrdDirectory.name);
  }

  openItem() {
    if (this.fileOrdDirectory.isDirectory) {
      this.fileManagerService.changePath(
        this.fileManagerService.currentDirectory.path.value +
        this.fileOrdDirectory.name + "/"
      );
    } else {
      this.fileManagerService.download(this.fileManagerService.currentDirectory.path.value +
        this.fileOrdDirectory.name).subscribe(r => {
          fileSaver.saveAs(r, this.fileOrdDirectory.name);
        });
    }
  }

}
