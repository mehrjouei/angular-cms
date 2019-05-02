import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Module } from '../models/module';

@Injectable({
  providedIn: 'root' //  TODO
})
export class BusService {

  private moduleAddedSource = new Subject<any>();

  public moduleAdded$ = this.moduleAddedSource.asObservable();

  addModule(module) {
    this.moduleAddedSource.next(module);
  }

  constructor() { }
}
