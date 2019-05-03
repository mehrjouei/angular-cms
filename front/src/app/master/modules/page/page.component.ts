import { Component, OnInit,ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { Page } from '../../../models/Page';
import { BaseComponent } from 'src/app/components/base/base.component';
// import { PageService } from './page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent extends BaseComponent implements OnInit {

}

