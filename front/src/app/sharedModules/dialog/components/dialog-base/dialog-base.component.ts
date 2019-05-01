import { Component, OnInit } from '@angular/core';
import { DialogRef } from '../../dialog-ref';
import { DialogConfig } from '../../dialog-config';
import { BusService } from '../../../../services/bus.service';

@Component({
  template: ''
})
export class DialogBaseComponent implements OnInit {
  protected data;
  constructor(
    protected dialog: DialogRef,
    protected config: DialogConfig,
    protected bus: BusService
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
