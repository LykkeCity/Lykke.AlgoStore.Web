import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth-guard';
import { AclComponent } from './acl.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';


const routes: Routes = [
  { path: '', component: AclComponent, canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
      { path: 'users/:id', component: UserRolesComponent, canActivate: [AuthGuard] },
      { path: 'roles', component: RolesListComponent, canActivate: [AuthGuard] },
      { path: 'roles/:id', component: RolePermissionsComponent, canActivate: [AuthGuard] },
    ]
  }
];

export const AclRouting: ModuleWithProviders = RouterModule.forChild(routes);
