import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PageService } from '../../../../../services/page.service';
import { Page } from '../../../../../models/page';
import { RoleService } from 'src/app/services/role.service';
import { TemplateService } from '../../../../services/template.service';
import { forkJoin } from 'rxjs';
import { Role } from 'src/app/models/role';
import { Template } from '../../../../../models/template';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  roles: Role[] = [];
  templates: Template[] = [];

  page: Page;

  form = this.fb.group({
    title: ['', Validators.required],
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((param:any) => {
      const slug = param.params['slug'];
      forkJoin([this.roleService.list(), this.templateService.list(), this.pageService.one(slug)])
        .subscribe((resolves: any[]) => {
          const roles = resolves[0].data as Role[];
          const templates = resolves[1].data as Template[];
          const page = resolves[2].data as Page;
          this.roles = roles;
          this.templates = templates;
          this.page = page;
          this.form.setValue({
            title: page.title, template: page.template._id, roles: page.roles.map((r: any) => r._id),
            tags: page.tags, assets: page.assets, isInMenu: page.isInMenu
          });
        });
    });
  }

  onSubmit(form: FormGroup) {
    const page: Page = {
      title: form.value.title,
      slug: this.page.slug,
      template: form.value.template,
      roles: form.value.roles,
      tags: form.value.tags,
      assets: form.value.assets,
      isInMenu: form.value.isInMenu
    };
    this.pageService.update(page).subscribe(res => {
      alert(`edited!`);
      this.router.navigateByUrl("/admin/pages/list");
    });
  }

}
