import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { LoginRedirectGuard } from './services/login-redirect.guard';
import { AuthGuard } from './services/auth-guard';
import { NonAuthenticatedGuard } from './services/non-authenticated.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginRedirectGuard, NonAuthenticatedGuard] },
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: 'design', loadChildren: 'app/design/design.module#DesignModule', canActivate: [AuthGuard] },
      { path: 'store', loadChildren: 'app/store/store.module#StoreModule', canActivate: [AuthGuard] },
      { path: '404', component: NotFoundComponent },
    ]
  },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
