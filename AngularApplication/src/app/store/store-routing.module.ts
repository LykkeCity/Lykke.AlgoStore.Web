import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { AlgoListComponent } from './algo-list/algo-list.component';
import { AlgoEditComponent } from './algo-edit/algo-edit.component';
import { AlgoDetailsComponent } from './algo-details/algo-details.component';
import { AuthGuard } from '../services/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlgoListMyAlgosComponent } from './algo-list-my-algos/algo-list-my-algos.component';


const routes: Routes = [
  { path: '', component: StoreComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'algo-list', component: AlgoListComponent, canActivate: [AuthGuard] },
  { path: 'algo-list-private', component: AlgoListMyAlgosComponent, canActivate: [AuthGuard] },
  { path: 'algo-edit/:clientId/:algoId', component: AlgoEditComponent, canActivate: [AuthGuard] },
  { path: 'algo-details/:clientId/:algoId', component: AlgoDetailsComponent, canActivate: [AuthGuard] },
];

export const StoreRouting: ModuleWithProviders = RouterModule.forChild(routes);
