import { Component, OnInit } from '@angular/core';
import { FilemanagerService } from './filemanager.service';

@Component({
  selector: 'filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.scss']
})
export class FilemanagerComponent implements OnInit {
  constructor(
    private filemanagerService:FilemanagerService
  ) { }

  ngOnInit() {
    this.filemanagerService.changePath("/");
  }
}
