import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PageService } from '../../../../services/page.service';

@Component({
  selector: 'app-edit-html',
  templateUrl: './edit-html.component.html',
  styleUrls: ['./edit-html.component.scss']
})
export class EditHtmlComponent implements OnInit {
  @Input() data: any;
  @Output() dataChange = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();


  constructor(private fb: FormBuilder, private pageService: PageService) { }

  ngOnInit() {

  }

  onChange(content) {
    let data = { content: content };
      this.dataChange.emit(data);
  }

}
