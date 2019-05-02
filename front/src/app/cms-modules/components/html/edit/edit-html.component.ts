import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PageService } from '../../../../services/page.service';
import { Part } from '../../../../models/part';

@Component({
  selector: 'app-edit-html',
  templateUrl: './edit-html.component.html',
  styleUrls: ['./edit-html.component.scss']
})
export class EditHtmlComponent implements OnInit {
  @Input() data: any;
  @Output() dataChange = new EventEmitter<any>();

  form = this.fb.group({
    html: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private pageService: PageService) { }

  ngOnInit() {
    this.form.setValue({
      html: this.data.data.content // TODO change name
    });
  }

  onSubmit(form: FormGroup) {
    const part: Part = {
      _id: this.data.partId,
      data: { content: form.value.html }
    };
    this.pageService.editPart(this.data.pageSlug, part).subscribe(res => {
      console.log('added!');
      this.dataChange.emit(part); //  TODO
      // this.bus.addModule({}); // TODO inam biar bala
    });
  }

  onCancel(e) {

  }

}
