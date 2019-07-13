import { Component, OnInit } from '@angular/core';
import { DialogRef } from '../../../dialog/dialog-ref';
import { DialogConfig } from '../../../dialog/dialog-config';

@Component({
  selector: 'app-new-name-dialog',
  templateUrl: './new-name-dialog.component.html',
  styleUrls: ['./new-name-dialog.component.scss']
})
export class NewNameDialogComponent implements OnInit {
  data;

  newName;

  constructor(protected dialog: DialogRef,
    protected config: DialogConfig) {
    this.data = this.config.data;
  }

  ngOnInit() {
  }

  onKeyup(v) {
    this.newName = v;
  }

  onClose() {
    this.dialog.close(
      this.newName
    );
  }

}
