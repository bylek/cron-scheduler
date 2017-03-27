import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppComponent } from './app.component';
import { routing } from './app.routes';

import { ServersListComponent } from './servers/list/list.component';
import { ServersListItemComponent } from './servers/list/item.component';
import { ServersItemComponent } from './servers/item/item.component';
import { ServersAddComponent } from './servers/add/add.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './shared/auth.service';
import { RegisterComponent } from './register/register.component';
import { ServerService } from './servers/server.service';
import { JobService } from './jobs/job.service';
import { MenuSidebarComponent } from './menu/sidebar.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StoreModule } from '@ngrx/store';
import { servers } from './servers/server.store';
import { jobs } from './jobs/job.store';
import { JobsListComponent } from './jobs/list/list.component';
import { JobsAddComponent } from './jobs/add/add.component';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ServersListComponent,
    ServersListItemComponent,
    ServersItemComponent,
    ServersAddComponent,
    MenuSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    NotFoundComponent,
    JobsListComponent,
    JobsAddComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    StoreModule.provideStore({ servers, jobs }),
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
    ServerService,
    JobService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
