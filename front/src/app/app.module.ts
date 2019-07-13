import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CmsModulesModule } from './cms-modules/cms-modules.module';
import { GuestModule } from './sharedModules/guest/guest.module';
import { BaseComponent } from './components/base/base.component';
import { ContainerComponent } from './components/container/container.component';
import { AuthService } from './services/auth.service';
import { DialogModule } from './sharedModules/dialog/dialog.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { MoveDialogComponent } from './components/move-dialog/move-dialog.component';
import { DialogRef } from './sharedModules/dialog/dialog-ref';
import { DialogConfig } from './sharedModules/dialog/dialog-config';
import { RoleAccessSelectorComponent } from './sharedModules/role-access-selector/role-access-selector.component';
import { LoadingService } from './services/loading.service';
import { PersianCalendarService } from './services/jalaliDate.service';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, BaseComponent, ContainerComponent,
    EditDialogComponent, MoveDialogComponent, RoleAccessSelectorComponent],
  // TODO in edit o move ina ham bayad lazy shan
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CmsModulesModule,
    GuestModule,
    DialogModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    DialogConfig,
    DialogRef,
    LoadingService,
    PersianCalendarService
  ],
  entryComponents: [ContainerComponent, EditDialogComponent, MoveDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
