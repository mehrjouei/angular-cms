import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Template } from '../../../models/template';
import { Role } from '../../../models/role';
import { Page } from '../../../models/page';
import { ToolboxService } from '../../services/toolbox.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  templates: Template[];
  roles: Role[];

  form = this.fb.group({
    title: [''],
    url: [''],
    template: [''],
    roles: [''],
    tags: [''],
    assets: [''],
    isInMenu: ['']
  });

  constructor(private adminService: ToolboxService, private fb: FormBuilder) {}

  ngOnInit() {
    Promise.all([
      this.adminService.getTemplates(),
      this.adminService.getRoles()
    ]).then((resolves: any[]) => {
      this.templates = resolves[0].data;
      this.roles = resolves[1].data;
    });
  }

  onSubmit() {
    const y = this.form.value;
    const page: Page = {
      title: y.title,
      slug: y.url,
      template: y.template,
      roles: y.roles,
      tags: y.tags,
      assets: y.assets,
      isInMenu: false
    };
    this.adminService.createPage(page).then(() => {
      alert('created!');
    });
  }
}
