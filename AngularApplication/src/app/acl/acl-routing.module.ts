import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth-guard';
import { AclComponent } from './acl.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { ACLGuard } from '../services/acl.guard';
import Permissions from '../store/models/permissions';


const routes: Routes = [
  {
    path: '', component: AclComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        component: UsersListComponent,
        canActivate: [AuthGuard, ACLGuard],
        data: { acl: [Permissions.GET_ALL_USERS_WITH_ROLES] }
      },
      {
        path: 'users/:id',
        component: UserRolesComponent,
        canActivate: [AuthGuard, ACLGuard],
        data: { acl: [Permissions.GET_USER_BY_ID_WITH_ROLES] }
      },
      { path: 'roles', component: RolesListComponent, canActivate: [AuthGuard, ACLGuard], data: { acl: [Permissions.GET_ALL_USER_ROLES] } },
      {
        path: 'roles-edit', component: EditRoleComponent, canActivate: [AuthGuard, ACLGuard],
        data: { acl: [Permissions.GET_ALL_PERMISSIONS, Permissions.GET_ROLE_BY_ID, Permissions.GET_PERMISSIONS_BY_ROLE_ID] }
      },
      {
        path: 'roles-edit/:id',
        component: EditRoleComponent,
        canActivate: [AuthGuard, ACLGuard],
        data: { acl: [Permissions.GET_ALL_PERMISSIONS, Permissions.GET_ROLE_BY_ID] }
      }
    ]
  }
];

export const AclRouting: ModuleWithProviders = RouterModule.forChild(routes);
