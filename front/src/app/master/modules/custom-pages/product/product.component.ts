import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  currentPageIndex = 0;
  childsTitle: { number: string, titleFirstPart: string, titleSecondPart: string, subtitle: string }[] = [
    {
      number: '01',
      titleFirstPart: 'همین حالا',
      titleSecondPart: 'سفارش دهید',
      subtitle: 'ساده‌ترین راه ممکن راه تست کنید'
    },
    {
      number: '02',
      titleFirstPart: 'قبل از انتخاب',
      titleSecondPart: 'مقایسه کنید',
      subtitle: 'ساده‌ترین راه ممکن راه تست کنید'
    }
  ]
  roterSub;
  constructor(
    private router: Router

  ) { }

  ngOnInit() {
    console.log(this.router.url);
    this.checkStep(this.router.url);
    this.roterSub = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((e: any) => {
      if (e.url && e.urlAfterRedirects) {
        this.checkStep(e.urlAfterRedirects);
      }
    });
  }
  checkStep(url) {
    if (url && url.indexOf('/product/thirdPerson/filter') === 0) {
      this.currentPageIndex = 0;
    }
    else if (url && url.indexOf('/product/thirdPerson/compare') === 0) {
      this.currentPageIndex = 1;
    }
  }
  ngOnDestroy() {
    if (this.roterSub) {
      this.roterSub.unsubscribe();
    }
  }

}
