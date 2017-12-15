import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';

const routes: Routes = [
  { path: '',
    component: StoreComponent
  }
];


export const StoreRouting: ModuleWithProviders = RouterModule.forChild(routes);
