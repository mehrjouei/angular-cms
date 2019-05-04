import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Article } from '../../../../../models/article';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { ArticleService } from '../../services/article.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'admin-article-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  categories: Category[] = [];

  form = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    summary: ['', Validators.required],
    content: ['', Validators.required],
    categories: ['', Validators.required],
    image: ['', Validators.required],
    tags: ['', Validators.required],
    isDraft: ['']
  });

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.categoryService.list()
    .subscribe((_: any) => {
      this.categories = _.data;
    });
  }


  onSubmit(form: FormGroup) {
    const article: Article = {
      title: form.value.title,
      slug: form.value.slug,
      summary: form.value.summary,
      content: form.value.content,
      categories: form.value.categories,
      image: form.value.image,
      tags: form.value.tags,
      isDraft: form.value.isDraft
    };
    this.articleService.create(article).subscribe(res => {
      alert(`created!`);
      this.router.navigate(['../list'], { relativeTo: this.route });
    });
  }
}
