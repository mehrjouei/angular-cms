import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../../models/category';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-category-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  parents: Category[];

  form = this.fb.group({
    name: ['', Validators.required],
    parent: ['']
  });

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.categoryService.list().subscribe((res: any) => {
      this.parents = res.data;
    });
  }


  onSubmit(form: FormGroup) {
    const category: Category = {
      name: form.value.name,
      parent: form.value.parent
    };
    this.categoryService.create(category).subscribe(res => {
      alert(`created!`);
      this.router.navigate(['../list'], { relativeTo: this.route });
    });
  }
}
