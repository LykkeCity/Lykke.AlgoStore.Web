import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { AlgoDetailsComponent } from './store/algo-details/algo-details.component';
import { AlgoListComponent } from './store/algo-list/algo-list.component';
import { AlgoEditComponent } from './store/algo-edit/algo-edit.component';


const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      //{ path: 'auth', component: AuthenticationComponent },
      { path: 'design', loadChildren: 'app/design/design.module#DesignModule', canActivate: [AuthGuard] },
      { path: 'settings', loadChildren: 'app/settings/settings.module#SettingsModule', canActivate: [AuthGuard] },
      { path: 'store', loadChildren: 'app/store/store.module#StoreModule', canActivate: [AuthGuard] },
      { path: 'store/algo-details', component: AlgoDetailsComponent, canActivate: [AuthGuard] },
      { path: 'store/algo-list', component: AlgoListComponent, canActivate: [AuthGuard] },
      //{ path: 'store/algo/:id/edit', component: AlgoEditComponent, canActivate: [AuthGuard] },
      { path: 'store/algo-edit', component: AlgoEditComponent, canActivate: [AuthGuard] },
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
