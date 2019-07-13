import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-five-star',
  templateUrl: './five-star.component.html',
  styleUrls: ['./five-star.component.scss']
})
export class FiveStarComponent implements OnInit {
@Input() score:number;
  constructor() { }

  ngOnInit() {
  }

}
