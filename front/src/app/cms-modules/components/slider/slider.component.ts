import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider', // TODO
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
