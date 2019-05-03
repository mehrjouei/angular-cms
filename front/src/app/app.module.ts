import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFa from '@angular/common/locales/fa';

import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToolboxModule } from './toolbox/toolbox.module';
import { CmsModulesModule } from './cms-modules/cms-modules.module';
import { GuestModule } from './sharedModules/guest/guest.module';
import { BaseComponent } from './components/base/base.component';
import { ContainerComponent } from './components/container/container.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent,BaseComponent,ContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToolboxModule,
    CmsModulesModule,
    GuestModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
  ],
  entryComponents:[ContainerComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeFa, 'fa');
  }
}
