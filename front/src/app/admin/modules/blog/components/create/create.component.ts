import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Article } from '../../../../../models/article';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { ArticleService } from '../../services/article.service';
import { CategoryService } from '../../../../services/category.service';
// import { requiredFileTypeValidator, toFormData } from '../../../../../sharedModules/file-upload/components/file-upload/file-upload.component';

@Component({
  selector: 'admin-article-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  categories: Category[] = [];

  file;
  image;
  form = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    summary: ['', Validators.required],
    content: ['', Validators.required],
    categories: ['', Validators.required],
    image: ['', Validators.required,
      // requiredFileTypeValidator('png')
    ],
    imageName: ['NONE', Validators.required],
    tags: ['', Validators.required],
    isDraft: ['']
  });

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.categoryService.list()
      .subscribe((_: any) => {
        this.categories = _.data;
      });
  }


  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;
      reader.readAsDataURL(file);

      reader.onload = () => {
        // this.form.patchValue({
        //   image: reader.result
        // });
        this.image = reader.result;

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  onSubmit(form: FormGroup) {
    const article: Article = {
      title: form.value.title,
      slug: form.value.slug,
      summary: form.value.summary,
      content: form.value.content,
      categories: form.value.categories,
      image: this.image,
      imageName: this.file.name,
      tags: form.value.tags,
      isDraft: form.value.isDraft
    };
    this.articleService.create(article).subscribe(res => {
      alert(`created!`);
      // this.form.reset();
      this.router.navigate(['../list'], { relativeTo: this.route });
    });
  }
}
