import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACLGuard } from '../core/guards/acl.guard';
import { AuthGuard } from '../core/guards/auth-guard';
import { AccountComponent } from './account.component';
import { UserAccountComponent } from './user-account/user-account.component';

const routes: Routes = [
  {
    path: '', component: AccountComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'user-account',
        component: UserAccountComponent,
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
export class AccountRoutingModule {
}
