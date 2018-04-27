import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { AlgoListComponent } from './algo-list/algo-list.component';
import { AlgoEditComponent } from './algo-edit/algo-edit.component';
import { AlgoDetailsComponent } from './algo-details/algo-details.component';
import { AuthGuard } from '../services/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlgoRunComponent } from './algo-run/algo-run.component';
import { AlgoInstanceComponent } from './algo-instance/algo-instance.component';
import { ACLGuard } from '../services/acl.guard';
import Permissions from './models/permissions';


const routes: Routes = [
  { path: '', component: StoreComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'algo-list', component: AlgoListComponent, canActivate: [AuthGuard, ACLGuard], data: { acl: [Permissions.GET_ALL_ALGOS] } },
  {
    path: 'algo-edit/:algoId',
    component: AlgoEditComponent,
    canActivate: [AuthGuard, ACLGuard],
    data: { acl: [Permissions.GET_ALGO_METADATA] }
  },
  {
    path: 'algo-details/:clientId/:algoId', component: AlgoDetailsComponent,
    canActivate: [AuthGuard, ACLGuard], data: { acl: [Permissions.GET_UPLOAD_STRING, Permissions.GET_ALGO_METADATA] }
  },
  {
    path: 'algo-run/:clientId/:algoId', component: AlgoRunComponent,
    canActivate: [AuthGuard, ACLGuard], data: { acl: [Permissions.GET_UPLOAD_STRING, Permissions.GET_ALGO_METADATA] }
  },
  {
    path: 'algo-instance/:clientId/:algoId/:instanceId', component: AlgoInstanceComponent,
    canActivate: [AuthGuard, ACLGuard], data: { acl: [Permissions.GET_ALGO_INSTANCE_DATA, Permissions.GET_UPLOAD_STRING] }
  },
];

export const StoreRouting: ModuleWithProviders = RouterModule.forChild(routes);
