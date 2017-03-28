import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServersListComponent } from './servers/list/list.component';
import { ServersItemComponent } from './servers/item/item.component';
import { ServersAddComponent } from './servers/add/add.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { RegisterComponent } from './register/register.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { JobsAddComponent } from './jobs/add/add.component';
import { ServersEditComponent } from './servers/edit/edit.component';
import { JobsEditComponent } from './jobs/edit/edit.component';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/servers', pathMatch: 'full' },
      { path: 'servers', component: ServersListComponent },
      { path: 'servers/add', component: ServersAddComponent },
      { path: 'servers/:server_id', component: ServersItemComponent },
      { path: 'servers/:server_id/edit', component: ServersEditComponent },
      { path: 'servers/:server_id/jobs', redirectTo: '/servers/:server_id', pathMatch: 'full' },
      { path: 'servers/:server_id/jobs/add', component: JobsAddComponent },
      { path: 'servers/:server_id/jobs/:job_id/edit', component: JobsEditComponent }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: '**', component: NotFoundComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
