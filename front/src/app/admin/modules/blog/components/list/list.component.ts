import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Article } from '../../../../../models/article';
import { TableColumn } from '@swimlane/ngx-datatable';
import { Category } from '../../../../../models/category';
import { DialogService } from '../../../../../sharedModules/dialog/dialog.service';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';;
import { CategoryService } from '../../services/category.service';
import { ArticleService } from '../../services/article.service';


@Component({
  selector: 'admin-blog',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
  @ViewChild('categoriesTemplate') categoriesTemplate: TemplateRef<any>;
  @ViewChild('commentsTemplate') commentsTemplate: TemplateRef<any>;

  articles: Article[] = [];
  columns: TableColumn[];

  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private articleService: ArticleService, public dialog: DialogService) {
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
      { prop: 'image', name: 'عکس' },
      // { prop: 'tags', name: 'تگ ها' },
      { prop: 'isDraft', name: 'مخفی؟' },
      { prop: 'visitCount', name: 'مشاهده' },
      { prop: 'likeCount', name: 'پسند' },
      { prop: 'score', name: 'امتیاز' },
      { prop: '', name: 'ویرایش', cellTemplate: this.editTemplate },

    ];
    this.articleService.list().subscribe((res: any) => {
      this.articles = res.data;
      // this.addCategory(0);
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

  manageCategories() {
    this.dialog.open(CategoryDialogComponent, { data: {
      doneBtnText: 'Confirm',
      rejectBtnText: 'Cancel',
      text: 'some stupid text'
    }});
  }

  // onChange(name: string): void {
  //   this.table.apiEvent({
  //     type: API.onGlobalSearch, value: name,
  //   });
  // }
}

