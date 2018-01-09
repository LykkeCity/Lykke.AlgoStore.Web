import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignComponent } from './design.component';



const routes: Routes = [
  { path: '',
    component: DesignComponent
  }
];


export const DesignRouting: ModuleWithProviders = RouterModule.forChild(routes);
