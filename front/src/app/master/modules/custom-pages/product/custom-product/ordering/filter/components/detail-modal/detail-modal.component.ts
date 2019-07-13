import { Component, OnInit, Input } from '@angular/core';
import { DialogRef } from 'src/app/sharedModules/dialog/dialog-ref';
import { DialogConfig } from 'src/app/sharedModules/dialog/dialog-config';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  data;
  constructor(
    private dialog: DialogRef,
    public config: DialogConfig

  ) {
    this.data=this.config.data;
    console.log(this.data);
  }
  goPrdouctList(){
    this.dialog.close(
      true
    );
  }
  ngOnInit() {
  }

}
