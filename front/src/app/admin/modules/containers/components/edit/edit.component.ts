import { Container } from './../../../../../models/container';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContainerService } from '../../services/container.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'admin-container-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  container: Container;

  form = this.fb.group({
    name: ['', Validators.required],
    html: ['', Validators.required],
    image: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private containerService: ContainerService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const _id = paramMap.get('_id');
      this.containerService.one(_id)
        .subscribe((res: any) => {
          this.container = res.data;
          this.form.setValue({
            name: this.container.name, html: this.container.html,
            image: this.container.image
          });
        });
    });
  }

  onSubmit(form: FormGroup) {
    const container: Container = {
      name: form.value.name,
      html: form.value.html,
      image: form.value.image
    };
    this.containerService.update(this.container._id, container).subscribe(res => {
      alert(`edited!`);
      this.router.navigateByUrl('/admin/containers/list');
    });
  }

}
