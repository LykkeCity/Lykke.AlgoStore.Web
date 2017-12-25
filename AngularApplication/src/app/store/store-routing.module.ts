import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { AlgoDetailsComponent } from './algo-details/algo-details.component';
import { AlgoListComponent } from './algo-list/algo-list.component';
import { AlgoEditComponent } from './algo-edit/algo-edit.component';
import { AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
  { path: '', component: StoreComponent },
  { path: 'algo-details', component: AlgoDetailsComponent, canActivate: [AuthGuard] },
  { path: 'algo-list', component: AlgoListComponent, canActivate: [AuthGuard] },
  { path: 'algo-edit', component: AlgoEditComponent, canActivate: [AuthGuard] }
];

export const StoreRouting: ModuleWithProviders = RouterModule.forChild(routes);
