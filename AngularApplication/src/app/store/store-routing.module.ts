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


const routes: Routes = [
  { path: '', component: StoreComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'algo-list', component: AlgoListComponent, canActivate: [AuthGuard, ACLGuard], data: { acl: ['GetAllAlgos'] } },
  { path: 'algo-edit/:algoId', component: AlgoEditComponent, canActivate: [AuthGuard, ACLGuard], data: { acl: ['GetAlgoMetadata'] } },
  {
    path: 'algo-details/:clientId/:algoId', component: AlgoDetailsComponent,
    canActivate: [AuthGuard, ACLGuard], data: { acl: ['GetUploadString', 'GetAlgoMetadata'] }
  },
  {
    path: 'algo-run/:clientId/:algoId', component: AlgoRunComponent,
    canActivate: [AuthGuard, ACLGuard], data: { acl: ['GetUploadString', 'GetAlgoMetadata'] }
  },
  {
    path: 'algo-instance/:clientId/:algoId/:instanceId', component: AlgoInstanceComponent,
    canActivate: [AuthGuard, ACLGuard], data: { acl: ['GetAlgoInstanceDataAsync', 'GetUploadString'] }
  },
];

export const StoreRouting: ModuleWithProviders = RouterModule.forChild(routes);
