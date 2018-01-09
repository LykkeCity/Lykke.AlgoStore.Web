import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
  { path: '', component: StoreComponent }
];

export const StoreRouting: ModuleWithProviders = RouterModule.forChild(routes);
