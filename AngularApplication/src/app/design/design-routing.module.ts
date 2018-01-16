import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignComponent } from './design.component';
import { ExistingAlgoGuard } from '../services/existing-algo.guard';



const routes: Routes = [
  { path: '',
    component: DesignComponent, canActivate: [ExistingAlgoGuard]
  }
];


export const DesignRouting: ModuleWithProviders = RouterModule.forChild(routes);
