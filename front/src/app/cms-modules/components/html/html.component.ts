import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss']
})
export class HtmlComponent implements OnInit {
  @Input() data: any;
  sanitizer;
  constructor(private sanit: DomSanitizer) {
    this.sanitizer=this.sanit;
  }
  ngOnChanges() {
    console.log(this.data);
  }
  ngOnInit() {
  }

}
