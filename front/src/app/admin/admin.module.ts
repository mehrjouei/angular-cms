import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { AdminTollboxComponent } from "./admin-toolbox.component";
// import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { TemplateService } from './services/template.service';
import { CategoryService } from './services/category.service';
import { ResourceService } from './services/resource.service';

@NgModule({
  declarations: [AdminComponent, HeaderComponent, MenuComponent ],
  imports: [CommonModule, ReactiveFormsModule, AdminRoutingModule],
  exports: [],
  providers: [TemplateService, CategoryService, ResourceService], // TODO tree kooftabale!
  entryComponents: [] // TODO roo rolemodule kar nemikard felan inja kar mikone
})
export class AdminModule { }
