import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-cms';
  showToolbar=false;
  constructor(private storageService:StorageService) {

  }

  ngOnInit(): void {
    this.storageService.getStorage("token").behaviorSubject.subscribe(x=>{
      if (x) {
        this.showToolbar=true;
      }
      else{
        this.showToolbar=false;
      }
    })
  }

}
