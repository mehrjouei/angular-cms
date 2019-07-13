import { Component, OnInit, Input } from '@angular/core';
import { DialogRef } from 'src/app/sharedModules/dialog/dialog-ref';
import { DialogConfig } from 'src/app/sharedModules/dialog/dialog-config';

@Component({
  selector: 'dialog-confirm-component',
  templateUrl: './confirm.html',
  styleUrls: ['./confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {
  data;
  constructor(
    private dialog: DialogRef,
    public config: DialogConfig

  ) {
    this.data = this.config.data;
  }
  ngOnInit() {
  }
  done() {
    this.dialog.close(
      true
    );
  }
  reject() {
    this.dialog.close(
      false
    );
  }
}
