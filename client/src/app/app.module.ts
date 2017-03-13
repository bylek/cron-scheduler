import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { routing } from './app.routes';
import { LoginComponent } from './login/login.component';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './shared/auth.service';
import { RegisterComponent } from './register/register.component';
import { ServerService } from './server/server.service';
import { ServerAddComponent } from './server-add/server-add.component';
import { MenuSidebarComponent } from './menu/sidebar.component';
import { MenuNavbarComponent } from './menu/navbar.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ServerComponent,
    ServerAddComponent,
    MenuSidebarComponent,
    MenuNavbarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    AuthGuard,
    AuthService,
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
