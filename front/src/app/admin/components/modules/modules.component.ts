import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Module } from 'src/app/models/module';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
  modules$: Observable<Module[]>;

  @Output() select = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.modules$ = this.getModules();
  }

  getModules(): Observable<Module[]> {
    return of([{
      id: 1, name: 'apple_module', displayName: 'Apple', image: 'assets/images/apple.png',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
    },
    {
      id: 1, name: 'orange_module', displayName: 'Orange', image: 'assets/images/orange.png',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
    },
    {
      id: 2, name: 'banana_module', displayName: 'Banana', image: 'assets/images/banana.png',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
    },
    {
      id: 3, name: 'clementine_module', displayName: 'Clementine', image: 'assets/images/clementine.png',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
    },
    {
      id: 4, name: 'blueberry_module', displayName: 'Blueberry', image: 'assets/images/blueberry.png',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
    },
    {
      id: 5, name: 'star_module', displayName: 'Star', image: 'assets/images/star.png',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
    }]);
  }

  onModuleClick() {
    this.select.emit('emitted!');
  }

}
