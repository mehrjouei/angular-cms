import { Component, OnInit } from '@angular/core';
import { TempAuthService } from './temp-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-cms';

  constructor(private tempAuthService: TempAuthService) {

  }

  ngOnInit(): void {
    this.tempAuthService.getToken("v.vulkan", "123456").subscribe((response: any) => {
      // are dg yekam jash bade, bere too safe joda hal mishe, alan ba home baham miran, bare aval momkene khata bede
      localStorage.setItem("API_TOKEN", response.token);
    });
  }

}
