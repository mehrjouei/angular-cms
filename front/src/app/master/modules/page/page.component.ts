import { Component, OnInit,ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { Page } from '../../../models/Page';
// import { PageService } from './page.service';
import { BaseComponent } from '../../components/base/base.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent extends BaseComponent implements OnInit {

}

