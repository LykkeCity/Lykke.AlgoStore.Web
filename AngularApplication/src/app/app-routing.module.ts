import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';


const routes: Routes = [
  { path: '', component: AuthenticationComponent },
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
