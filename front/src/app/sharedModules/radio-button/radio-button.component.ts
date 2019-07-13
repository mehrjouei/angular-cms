import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {
  @Input() Items:any[];
  @Input() selectedItemValue:any;
  @Output() valueSelect = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  select(selected) {
    this.selectedItemValue=selected.value;
    this.valueSelect.emit(this.selectedItemValue);
  }
}
