import { Component, OnInit } from '@angular/core';
import { DialogRef } from '../../../../../../../sharedModules/dialog/dialog-ref';
import { DialogConfig } from '../../../../../../../sharedModules/dialog/dialog-config';
import { DialogBaseComponent } from '../../../../../../../sharedModules/dialog/components/dialog-base/dialog-base.component';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../../../../../../models/category';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'blog-list-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent extends DialogBaseComponent implements OnInit {
  data;

  categoriesForm = this.fb.group({
    categories: this.fb.array([
      this.createCategory()
    ])
  });

  get categories() {
    return this.categoriesForm.get('categories') as FormArray;
  }

  createCategory() {
    return this.fb.group({
      name: this.fb.control('', Validators.required),
      key: this.fb.control('', Validators.required),
      parent: this.fb.control('')
    });
  }

  createCategory2(category: Category) {
    return this.fb.group({
      name: this.fb.control(category.name, Validators.required),
      key: this.fb.control(category.key, Validators.required),
      parent: this.fb.control(category.parent)
    });
  }

  constructor(
    protected dialog: DialogRef,
    protected config: DialogConfig,
    protected fb: FormBuilder,
    protected categoryService: CategoryService
  ) {
    super(dialog, config, null);
    this.data = this.config.data;
  }

  ngOnInit() {
    this.categoryService.list().subscribe((res: any) => {
      if (res.data && res.data.length) {
        this.categories.removeAt(0);
      }
      res.data.forEach(cat => {
        this.categories.push(this.createCategory2(cat));
      });
      // this.categoriesForm.setValue({
      //   categories: this.fb.array(res.data.map(cat => this.createCategory2(cat)))
      // });
    });
  }

  addCategory() {
    this.categories.push(
      this.createCategory()
    );
  }

  removeCategory(i) {
    this.categories.removeAt(i);
  }

  onSubmit() {
    this.categoryService.update(this.categoriesForm.value.categories).subscribe((_: any) => {
      alert('saved');
      this.done(); // TODO what is the bloody difference
    });
  }
}
