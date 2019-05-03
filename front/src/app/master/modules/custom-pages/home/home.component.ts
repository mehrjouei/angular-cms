import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() { // optional, in case of overriding
    super.ngOnInit();
  }

}
