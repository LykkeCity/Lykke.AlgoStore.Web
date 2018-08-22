import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard';
import { LegalRedirectGuard } from '../core/guards/legal-redirect.guard';
import { LegalNotificationComponent } from './legal-notification/legal-notification.component';
import { LegalComponent } from './legal.component';

const routes: Routes = [
  {
    path: '', component: LegalComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'notification',
        component: LegalNotificationComponent,
        canActivate: [AuthGuard, LegalRedirectGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule { }
