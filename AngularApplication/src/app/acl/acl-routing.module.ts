import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth-guard';
import { AclComponent } from './acl.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { ACLGuard } from '../services/acl.guard';


const routes: Routes = [
  { path: '', component: AclComponent, canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersListComponent, canActivate: [AuthGuard, ACLGuard], data: {acl: ['GetAllUsersWithRoles']} },
      { path: 'users/:id', component: UserRolesComponent, canActivate: [AuthGuard, ACLGuard], data: {acl: ['GetUserByIdWithRoles']} },
      { path: 'roles', component: RolesListComponent, canActivate: [AuthGuard, ACLGuard], data: {acl: ['GetAllUserRoles'] }},
      { path: 'roles-edit', component: EditRoleComponent, canActivate: [AuthGuard, ACLGuard], data: {acl: ['GetAllPermissions', 'GetRoleById', 'GetPermissionsByRoleId']} },
      { path: 'roles-edit/:id', component: EditRoleComponent, canActivate: [AuthGuard, ACLGuard], data: {acl: ['GetAllPermissions', 'GetRoleById']} }
    ]
  }
];

export const AclRouting: ModuleWithProviders = RouterModule.forChild(routes);
