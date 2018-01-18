import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { AlgoListComponent } from './algo-list/algo-list.component';
import { AlgoEditComponent } from './algo-edit/algo-edit.component';
import { AlgoDetailsComponent } from './algo-details/algo-details.component';
import { AuthGuard } from '../services/auth-guard';

const routes: Routes = [
  { path: '', component: StoreComponent },
  { path: 'algo-list', component: AlgoListComponent, canActivate: [AuthGuard] },
  { path: 'algo-edit', component: AlgoEditComponent, canActivate: [AuthGuard] },
  { path: 'algo-details', component: AlgoDetailsComponent, canActivate: [AuthGuard] },
];

export const StoreRouting: ModuleWithProviders = RouterModule.forChild(routes);
