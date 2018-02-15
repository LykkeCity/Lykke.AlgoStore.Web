import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignComponent } from './design.component';



const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: ':id', component: DesignComponent }
];


export const DesignRouting: ModuleWithProviders = RouterModule.forChild(routes);
