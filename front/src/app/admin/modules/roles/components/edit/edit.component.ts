import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RoleService } from '../../../../../services/role.service';
import { Role } from '../../../../../models/role';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ResourceService } from '../../../../services/resource.service';
import { Resource } from '../../../../../models/resource';

@Component({
  selector: 'admin-role-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  role: Role;

  resources: Resource[];

  form = this.fb.group({
    name: ['', Validators.required],
    status: ['', Validators.required],
    description: ['', Validators.required],
    resources: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private resourceService: ResourceService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe((paramMap: any) => {
        const _id = paramMap.get('_id');
        forkJoin([this.roleService.one(_id), this.resourceService.list()])
          .subscribe((resolves: any[]) => {
            this.role = resolves[0].data;
            this.resources = resolves[1].data;
            this.form.setValue({
              name: this.role.name, status: this.role.status,
              description: this.role.description, resources: this.role.resources.map((r: any) => r._id)
            });
          });
      });
  }

  onSubmit(form: FormGroup) {
    const role: Role = {
      name: form.value.name,
      status: form.value.status,
      description: form.value.description,
      resources: form.value.resources
    };
    this.roleService.update(this.role._id, role).subscribe(res => {
      alert(`edited!`);
      this.router.navigateByUrl('/admin/roles/list');
    });
  }

}
