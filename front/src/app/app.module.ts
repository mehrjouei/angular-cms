import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CmsModulesModule } from './cms-modules/cms-modules.module';
import { GuestModule } from './sharedModules/guest/guest.module';
import { BaseComponent } from './components/base/base.component';
import { ContainerComponent } from './components/container/container.component';
import { AuthService } from './services/auth.service';
import { ToolboxModule } from './toolbox/toolbox.module';
import { DialogService } from './sharedModules/dialog/dialog.service';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent,BaseComponent,ContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CmsModulesModule,
    GuestModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: NgModuleFactoryLoader,
      useClass: SystemJsNgModuleLoader
    },
    AuthService,
    DialogService
  ],
  entryComponents:[ContainerComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
