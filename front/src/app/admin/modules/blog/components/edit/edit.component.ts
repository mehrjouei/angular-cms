
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Article } from '../../../../../models/article';
import { ArticleService } from '../../services/article.service';
import { forkJoin } from 'rxjs';
import { Category } from '../../../../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'admin-article-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  article: Article;
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
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const slug = paramMap.get('slug');
      forkJoin([this.categoryService.list(), this.articleService.one(slug)])
        .subscribe((resolves: any[]) => {
          const categories = resolves[0].data;
          const article = resolves[1].data;
          this.categories = categories;
          this.article = article;
          this.form.setValue({
            title: this.article.title,
            slug: this.article.slug,
            summary: this.article.summary,
            content: this.article.content,
            categories: this.article.categories.map(_ => _._id),
            image: this.article.image,
            tags: this.article.tags,
            isDraft: this.article.isDraft
          });
        });
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
    this.articleService.update(this.article.slug, article).subscribe(res => {
      alert(`edited!`);
      this.router.navigateByUrl('/admin/blog/list');
    });
  }

}
