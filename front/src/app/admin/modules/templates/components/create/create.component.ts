import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TemplateService } from '../../../../services/template.service';
import { Template } from '../../../../../models/template';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-template-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    html: ['', Validators.required],
    image: ['', Validators.required],
    assets: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private templateService: TemplateService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }


  onSubmit(form: FormGroup) {
    const template: Template = {
      name: form.value.name,
      html: form.value.html,
      image: form.value.image,
      assets: form.value.assets
    };
    this.templateService.create(template).subscribe(res => {
      alert(`created!`);
      this.router.navigate(['../list'], { relativeTo: this.route });
    });
  }
}
