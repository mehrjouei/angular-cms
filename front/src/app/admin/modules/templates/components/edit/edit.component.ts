import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TemplateService } from '../../../../../services/template.service';
import { Template } from '../../../../../models/template';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'admin-template-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  template: Template;

  form = this.fb.group({
    name: ['', Validators.required],
    html: ['', Validators.required],
    image: ['', Validators.required],
    assets: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private templateService: TemplateService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const _id = paramMap.get('_id');
      this.templateService.one(_id)
        .subscribe((res: any) => {
          this.template = res.data;
          this.form.setValue({
            name: this.template.name, html: this.template.html,
            image: this.template.image, assets: this.template.assets
          });
        });
    });
  }

  onSubmit(form: FormGroup) {
    const template: Template = {
      name: form.value.name,
      html: form.value.html,
      image: form.value.image,
      assets: form.value.assets
    };
    this.templateService.update(this.template._id, template).subscribe(res => {
      alert(`edited!`);
      this.router.navigateByUrl('/admin/templates/list');
    });
  }

}
