import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Article } from '../../../../../models/article';
import { TableColumn, DatatableComponent } from '@swimlane/ngx-datatable';
import { ArticleService } from '../../services/article.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'admin-blog',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
  @ViewChild('categoriesTemplate') categoriesTemplate: TemplateRef<any>;
  @ViewChild('commentsTemplate') commentsTemplate: TemplateRef<any>;
  @ViewChild('imageTemplate') imageTemplate: TemplateRef<any>;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  categoryFilterForm = this.fb.group({
    name: ['']
  });

  articles: Article[] = [];
  columns: TableColumn[];

  totalCount = 0;

  constructor(private articleService: ArticleService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.columns = [
      { prop: 'title', name: 'عنوان' },
      { prop: 'summary', name: 'خلاصه' },
      // { prop: 'content', name: 'محتوا' },
      { prop: 'categories', name: 'دسته ها', cellTemplate: this.categoriesTemplate },
      // { prop: 'comments', name: 'نظرات', cellTemplate: this.commentsTemplate },
      { prop: 'author', name: 'نگارنده' },
      { prop: 'createDate', name: 'تاریخ ساخت' },
      { prop: 'editDate', name: 'تاریخ ویرایش' },
      { prop: 'image', name: 'عکس', cellTemplate: this.imageTemplate },
      // { prop: 'tags', name: 'تگ ها' },
      { prop: 'isDraft', name: 'مخفی؟' },
      { prop: 'visitCount', name: 'مشاهده' },
      { prop: 'likeCount', name: 'پسند' },
      { prop: 'score', name: 'امتیاز' },
      { prop: '', name: 'ویرایش', cellTemplate: this.editTemplate },

    ];
    this.articleService.listByCategory().subscribe((res: any) => { // TODO
      this.articles = res.data;
      this.totalCount = res.totalCount;
    });
  }

  onDelete(row, index) {
    if (confirm('Are you sure to delete ' + row.title + '?')) {
      this.articleService.delete(row.slug).subscribe(_ => {
        this.articles.splice(index, 1);
        this.articles = [...this.articles];
        alert('deleted!');
      });
    }
  }

  onCategoryFilterFormSubmit(form) {
    const val = form.value.name;

    this.articleService.listByCategory(val).subscribe((res: any) => {
      this.articles = res.data;
      this.totalCount = res.totalCount;
      this.table.offset = 0;
    });

  }
}

