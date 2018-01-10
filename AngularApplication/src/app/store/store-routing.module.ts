import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { AuthGuard } from '../services/auth-guard.service';
import { AlgoListComponent } from './algo-list/algo-list.component';
import { AlgoEditComponent } from './algo-edit/algo-edit.component';

const routes: Routes = [
  { path: '', component: StoreComponent },
  { path: 'algo-list', component: AlgoListComponent, canActivate: [AuthGuard] },
  { path: 'algo-edit', component: AlgoEditComponent, canActivate: [AuthGuard] }
];

export const StoreRouting: ModuleWithProviders = RouterModule.forChild(routes);
