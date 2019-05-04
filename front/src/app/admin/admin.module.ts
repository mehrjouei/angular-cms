import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { AdminTollboxComponent } from "./admin-toolbox.component";
// import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { DialogModule } from '../sharedModules/dialog/dialog.module';
import { RoleService } from './services/role.service';
import { TemplateService } from './services/template.service';

@NgModule({
  declarations: [AdminComponent, HeaderComponent, MenuComponent],
  imports: [CommonModule, ReactiveFormsModule, AdminRoutingModule, DialogModule],
  exports: [],
  providers: [RoleService, TemplateService], // TODO tree kooftabale!
  entryComponents: []
})
export class AdminModule { }
