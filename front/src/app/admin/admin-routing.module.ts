import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'pages',
        loadChildren: './modules/pages/pages.module#PagesModule'
      },
      {
        path: 'templates',
        loadChildren: './modules/templates/templates.module#TemplatesModule'
      },
      {
        path: 'containers',
        loadChildren: './modules/containers/containers.module#ContainersModule'
      },
      {
        path: 'blog',
        loadChildren: './modules/blog/blog.module#BlogModule'
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
