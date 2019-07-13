import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FilemanagerService } from '../../filemanager.service';
import { FileModel } from '../../file.model';

@Component({
  selector: 'filemanager-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  currentFile: FileModel;
  layout;

  private isMouseDown = false;
  private isMouseSelect = false;
  private mouseSource: any = {};
  private mouseDest: any = {};
private rect;
  @ViewChild('selectionArea') selectionArea: ElementRef;

  constructor(
    private filemanagerService: FilemanagerService
  ) {
    this.filemanagerService.currentDirectory.layout.subscribe(x => {
      if (x) {
        this.layout = x;
      }
    })
  }

  ngOnInit() {
    this.filemanagerService.currentDirectory.file.subscribe((x: FileModel) => {
      if (x) {
        this.currentFile = x;
      }
    })
  }

  // onMouseDown(e) {
  //   this.isMouseDown = true;
  //   this.isMouseSelect = false;
  //   this.mouseSource.x = e.x;
  //   this.rect = e.target.getBoundingClientRect();

  //   // this.mouseSource.clientX = e.clientX;
  //   // this.mouseSource.layerX = e.layerX;
  //   // this.mouseSource.movementX = e.movementX;
  //   // this.mouseSource.clientX = e.clientX;
  //   // this.mouseSource.pageX = e.pageX;
  //   // this.mouseSource.screenX = e.screenX;
  //   this.mouseSource.y = e.y;
  //   // this.mouseSource.clientY = e.clientY;
  //   // this.mouseSource.layerY = e.layerY;
  //   // this.mouseSource.movementY = e.movementY;
  //   // this.mouseSource.clientY = e.clientY;
  //   // this.mouseSource.pageY = e.pageY;
  //   // this.mouseSource.screenY = e.screenY;
  //   this.selectionArea.nativeElement.style.left = e.x + 'px';
  //   this.selectionArea.nativeElement.style.top = e.y + 'px';
  //   this.filemanagerService.currentDirectory.selections.next([]);
  //   console.log('down' + e);
  // }

  // onMouseUp(e) {
  //   this.mouseDest.x = e.layerX;
  //   // this.mouseDest.clientX = e.clientX;
  //   // this.mouseDest.layerX = e.layerX;
  //   // this.mouseDest.movementX = e.movementX;
  //   // this.mouseDest.clientX = e.clientX;
  //   // this.mouseDest.pageX = e.pageX;
  //   // this.mouseDest.screenX = e.screenX;
  //   this.mouseDest.y = e.layerY - e.clientY;
  //   // this.mouseDest.clientY = e.clientY;
  //   // this.mouseDest.layerY = e.layerY;
  //   // this.mouseDest.movementY = e.movementY;
  //   // this.mouseDest.clientY = e.clientY;
  //   // this.mouseDest.pageY = e.pageY;
  //   // this.mouseDest.screenY = e.screenY;
  //   if (this.isMouseDown && this.isMouseSelect) {
  //     this.selectionArea.nativeElement.style.width = 0 + 'px';
  //     this.selectionArea.nativeElement.style.height = 0 + 'px';
  //     this.filemanagerService.currentDirectory.mouse.next({
  //       source: this.mouseSource,
  //       dest: this.mouseDest
  //     });
  //   }
  //   this.isMouseDown = false;
  //   this.isMouseSelect = false;
  //   console.log('up' + e);
  // }

  // onMouseMove(e) {
  //   if (this.isMouseDown) {
  //     this.isMouseSelect = true;
  //     // var x = e.clientX - rect.left; //x position within the element.
  //     // var y = e.clientY - rect.top
  //     this.drawRect({ x: this.mouseSource.x, y: this.mouseSource.y }, { x: e.x, y: e.y, clientX: e.clientX - this.rect.left, clientY: e.clientY - this.rect.top });
  //     // const selectionWidth = Math.abs(this.mouseSource.x - e.x);
  //     // const selectionHeight = Math.abs(this.mouseSource.y - e.y);
  //     // this.selectionArea.nativeElement.style.left = this.mouseSource.x > e.x ? e.x + 'px' : this.mouseSource.x + 'px';
  //     // this.selectionArea.nativeElement.style.top = this.mouseSource.y > e.y ? e.y + 'px' : this.mouseSource.y + 'px';
  //     // // this.selectionArea.nativeElement.style.left = e.clientX + 'px';
  //     // // this.selectionArea.nativeElement.style.top = e.clientY + 'px';
  //     // this.selectionArea.nativeElement.style.width = selectionWidth + 'px';
  //     // this.selectionArea.nativeElement.style.height = selectionHeight + 'px';
  //     console.log('selecting', e);
  //   }
  // }

  drawRect(p1, p2) {
    console.log(p1, p2);
    const selectionWidth = Math.abs(p1.x - p2.x);
    const selectionHeight = Math.abs(p1.y - p2.y);
    // this.selectionArea.nativeElement.style.left = p1.x > p2.x ? p2.x + 'px' : p1.x + 'px';
    // this.selectionArea.nativeElement.style.top = p1.y > p2.y ? p2.y + 'px' : p1.y + 'px';
    this.selectionArea.nativeElement.style.left = p1.x > p2.x ? p2.clientX + 'px' : (p2.clientX - selectionWidth) + 'px';
    this.selectionArea.nativeElement.style.top = p1.y > p2.y ? p2.clientY + 'px' : (p2.clientY - selectionHeight) + 'px';
    // this.selectionArea.nativeElement.style.left = p2.clientX + 'px';
    // this.selectionArea.nativeElement.style.top = p2.clientY + 'px';
    this.selectionArea.nativeElement.style.width = selectionWidth + 'px';
    this.selectionArea.nativeElement.style.height = selectionHeight + 'px';
  }

}


