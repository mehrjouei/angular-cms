import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class LoadingService {
  private counters: any = {};

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  public startLoading(selector: string) {
    const part = this.document.querySelector(selector);
    part.classList.add('loading');
    if (this.counters[selector] === undefined) {
      this.counters[selector] = 0;
    } else {
      this.counters[selector] += this.counters[selector];
    }
  }

  public stopLoading(selector: string) {
    if (this.counters[selector] === undefined) {
      return;
    } else {
      if (this.counters[selector] > 0) {
        this.counters[selector] -= this.counters[selector];
      }
    }
    if (this.counters[selector] === 0) {
      const part = this.document.querySelector(selector);
      part.classList.remove('loading');
    }
  }

  // public startGlobalLoading() {
  //   const loadingParent = this.document.querySelector('body');
  //   const loadingElement = this.document.createElement('div');
  //   loadingElement.classList.add('loading');
  //   loadingParent.appendChild(loadingElement);
  // }

  // public stopGlobalLoading() {
  //   const loadingParent = this.document.querySelector('body');
  //   const loadingElement = loadingParent.querySelector('.loading');
  //   loadingParent.removeChild(loadingElement);
  // }

  // public startPartialLoading(selector: string) {
  //   const part = this.document.querySelector(selector);
  //   part.classList.add('loading');
  // }

  // public stopPartialLoading(selector: string) {
  //   const part = this.document.querySelector(selector);
  //   part.classList.remove('loading');
  // }

  // public startPartialLoading(partSelector: string) {
  //   const image = this.document.createElement('img');
  //   image.src = 'assets/images/gears.gif';
  //   image.classList.add('loading');
  //   this.document.querySelector(partSelector).appendChild(image);
  // }

  // public stopPartialLoading(partSelector: string) {
  //   const part = this.document.querySelector(partSelector);
  //   const image = part.querySelector('.loading');
  //   part.removeChild(image);
  // }
}
