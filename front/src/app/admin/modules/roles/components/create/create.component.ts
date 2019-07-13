import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RoleService } from '../../../../../services/role.service';
import { Role } from '../../../../../models/role';
import { Router, ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../../../services/resource.service';
import { Resource } from '../../../../../models/resource';

@Component({
  selector: 'admin-template-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.resourceService.list()
      .subscribe((res: any) => {
        this.resources = res.data;
      });
  }


  onSubmit(form: FormGroup) {
    const role: Role = {
      name: form.value.name,
      status: form.value.status,
      description: form.value.description,
      resources: form.value.resources
    };
    this.roleService.create(role).subscribe(res => {
      alert(`created!`);
      this.router.navigate(['../list'], { relativeTo: this.route });
    });
  }
}
