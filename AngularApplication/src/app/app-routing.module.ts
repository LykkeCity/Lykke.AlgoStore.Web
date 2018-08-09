import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { LoginRedirectGuard } from './core/guards/login-redirect.guard';
import { AuthGuard } from './core/guards/auth-guard';
import { NonAuthenticatedGuard } from './core/guards/non-authenticated.guard';
import { UserDetailsGuard } from './core/guards/user-details.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginRedirectGuard, NonAuthenticatedGuard] },
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: 'account', loadChildren: 'app/account/account.module#AccountModule', canLoad: [UserDetailsGuard], canActivate: [AuthGuard] },
      { path: 'store', loadChildren: 'app/store/store.module#StoreModule', canLoad: [UserDetailsGuard], canActivate: [AuthGuard] },
      { path: 'users-acl', loadChildren: 'app/acl/acl.module#AclModule', canLoad: [UserDetailsGuard], canActivate: [AuthGuard] },
      { path: '404', component: NotFoundComponent },
    ]
  },
  { path: 'legal', loadChildren: 'app/legal/legal.module#LegalModule', canLoad: [UserDetailsGuard], canActivate: [AuthGuard] },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
