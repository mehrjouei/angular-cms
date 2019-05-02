import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { PageService } from '../../../../../services/page.service';
import { RoleService } from '../../../../../services/role.service';
import { TemplateService } from '../../../../../services/template.service';
import { Role } from '../../../../../models/role';
import { Template } from '../../../../../models/template';
import { forkJoin } from 'rxjs';
import { Page } from '../../../../../models/page';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  // encapsulation: ViewEncapsulation.None // TODO wtf!? who added this
})
export class CreateComponent implements OnInit {

  roles: Role[] = [];
  templates: Template[] = [];

  form = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    template: ['', Validators.required],
    roles: ['', Validators.required],
    tags: ['', Validators.required],
    assets: ['', Validators.required],
    isInMenu: ['']
  });

  constructor(
    private fb: FormBuilder,
    private pageService: PageService,
    private roleService: RoleService,
    private templateService: TemplateService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    forkJoin([this.roleService.list(), this.templateService.list()])
      .subscribe((resolves: any[]) => {
        const roles = resolves[0].data as Role[];
        const templates = resolves[1].data as Template[];
        this.roles = roles;
        this.templates = templates;
      });
  }


  onSubmit(form: FormGroup) {
    const page: Page = {
      title: form.value.title,
      slug: form.value.slug,
      template: form.value.template,
      roles: form.value.roles,
      tags: form.value.tags,
      assets: form.value.assets,
      isInMenu: form.value.isInMenu
    };
    this.pageService.create(page).subscribe(res => {
      alert(`created!`);
      this.router.navigate(['../list'], { relativeTo: this.route });
    });
  }
}
