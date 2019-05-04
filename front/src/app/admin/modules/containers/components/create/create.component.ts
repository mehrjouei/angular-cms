import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContainerService } from '../../services/container.service';
import { Container } from '../../../../../models/container';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-container-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    html: ['', Validators.required],
    image: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private containerService: ContainerService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }


  onSubmit(form: FormGroup) {
    const container: Container = {
      name: form.value.name,
      html: form.value.html,
      image: form.value.image
    };
    this.containerService.create(container).subscribe(res => {
      alert(`created!`);
      this.router.navigate(['../list'], { relativeTo: this.route });
    });
  }
}
