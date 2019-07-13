import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../../models/category';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'admin-category-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  category: Category;

  parents: Category[];

  form = this.fb.group({
    name: ['', Validators.required],
    parent: ['']
  });

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const _id = paramMap.get('_id');
      forkJoin([this.categoryService.list(), this.categoryService.one(_id)])
        .subscribe((resolves: any) => {
          this.parents = resolves[0].data;
          this.category = resolves[1].data;
          this.form.setValue({
            name: this.category.name,
            parent: this.category.parent || null
          });
        });
    });
  }

  onSubmit(form: FormGroup) {
    const category: Category = {
      name: form.value.name,
      parent: form.value.parent
    };
    this.categoryService.update(this.category._id, category).subscribe(res => {
      alert(`edited!`);
      this.router.navigateByUrl('/admin/categories/list');
    });
  }

}
