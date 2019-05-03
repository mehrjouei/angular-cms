import { Injectable } from '@angular/core';
import { StoreModel, StorageModel } from '../models/store-model.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  stores: StorageModel[] = [];

  constructor() { 
    this.loadFromLocalStorage();
  }
  private saveToLocalStorage(){
    let s=JSON.stringify(
      this.stores.filter(x=>x.saveInLocalStorage).map(x=>{return {"name":x.name,"value":x.behaviorSubject.value}})
    )
    localStorage.setItem("store",s);
  }
  private loadFromLocalStorage(){
    let s=JSON.parse(localStorage.getItem("store"));
    for(let i of s){
      this.stores.push({
        name:i.name,
        saveInLocalStorage:true,
        behaviorSubject:new BehaviorSubject(i.value)
      })
    }
  }
  setStorage(s: StoreModel) {
    if (this.stores.find(x => x.name == s.name)) {
      this.stores.find(x => x.name == s.name).behaviorSubject.next(s.value);
      this.stores.find(x => x.name == s.name).saveInLocalStorage=s.saveInLocalStorage
    }
    else {
      this.stores.push({
        name: s.name,
        saveInLocalStorage: s.saveInLocalStorage,
        behaviorSubject: new BehaviorSubject(s.value)
      })
    }
    if (s.saveInLocalStorage) {
      this.saveToLocalStorage();
    }
  }
  getStorage(name:string){
    let ret= this.stores.find(x=>x.name==name);
    if (!ret) {
      this.stores.push({
        name: name,
        saveInLocalStorage: false,
        behaviorSubject: new BehaviorSubject(null)
      })
    }
    ret= this.stores.find(x=>x.name==name)
    return ret;
  }
  removeStorage(name:string){
    let a=this.stores.find(x=>x.name==name);
    if (a) {
      a.behaviorSubject.next(null);
      a.behaviorSubject.unsubscribe();
      this.stores.splice(this.stores.indexOf(a),1);
      if (a.saveInLocalStorage) {
        this.saveToLocalStorage();
      }
    }
  }
}
