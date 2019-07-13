import { Component, OnInit, Input } from '@angular/core';
import { DialogRef } from '../../sharedModules/dialog/dialog-ref';
import { DialogConfig } from '../../sharedModules/dialog/dialog-config';
import { BusService } from '../../services/bus.service';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-move-dialog',
  templateUrl: './move-dialog.component.html',
  styleUrls: ['./move-dialog.component.scss']
})
export class MoveDialogComponent implements OnInit {
  data;
  constructor(
    protected dialog: DialogRef,
    protected config: DialogConfig,
    protected bus: BusService,
    protected pageService: PageService) {
    this.data = this.config.data;
  }

  ngOnInit() {
    console.log(this.data);
  }

  onDone() {
    this.bus.addModule({});
    this.dialog.close(
      true
    );
  }
  cancel() {
    this.dialog.close(
      false
    );
  }

  onSubmit(pane) {
    const part = {
      _id: this.data.partId,
      pane: pane // this.data.panes[e.target.selectedIndex].dataset.pane
    };
    this.pageService.movePart(this.data.pageSlug, part).subscribe(res => {
      this.onDone();
    });
  }
}
