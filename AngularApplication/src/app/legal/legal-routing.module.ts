import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACLGuard } from '../core/guards/acl.guard';
import { AuthGuard } from '../core/guards/auth-guard';
import { LegalNotificationComponent } from './legal-notification/legal-notification.component';
import { LegalComponent } from './legal.component';

const routes: Routes = [
  {
    path: '', component: LegalComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'notification',
        component: LegalNotificationComponent,
        canActivate: [AuthGuard, ACLGuard],
        data: { acl: [] }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule { }
