import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MasterComponent } from "./master.component";

const routes: Routes = [
  {
    path: "",
    component: MasterComponent,
    children: [
      {
        path: "page",
        loadChildren: "./modules/page/page.module#PageModule",
      },
      {
        path: "",
        loadChildren:
          "./modules/custom-pages/custom-pages.module#CustomPagesModule",
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
