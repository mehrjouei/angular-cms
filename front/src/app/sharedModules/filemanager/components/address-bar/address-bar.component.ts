import { Component, OnInit } from '@angular/core';
import { FilemanagerService } from '../../filemanager.service';

@Component({
  selector: 'filemanager-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.scss']
})
export class AddressBarComponent implements OnInit {
  path;
  constructor(
    private filemanagerService:FilemanagerService
  ) { }

  ngOnInit() {
    this.filemanagerService.currentDirectory.path.subscribe(p=>{
      if (p) {
        this.path=p;
      }
    })
  }
  up(){
    let a=this.filemanagerService.currentDirectory.path.value;
    let b="/";
    for(let i=1;i<a.split("/").length-2;i++){
      b+=a.split("/")[i]+"/";
    }
    if (a!=b) {
      this.filemanagerService.changePath(b);
    }
  }

}
