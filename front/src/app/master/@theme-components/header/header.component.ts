import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-master-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(
    private storageService: StorageService,
    private authService:AuthService
    ) { }

  ngOnInit() {
    this.storageService.getStorage('token').behaviorSubject.subscribe(x => {
      if (x) {
        this.loggedIn=true;
      } else {
        this.loggedIn=false;
      }
    });
  }
  logout(){
    this.authService.logout();
  }

}
