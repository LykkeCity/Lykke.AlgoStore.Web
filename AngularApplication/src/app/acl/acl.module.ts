import { NgModule } from '@angular/core';
import { AclComponent } from './acl.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { AclRouting } from './acl-routing.module';
import { UserRolesService } from '../core/services/user-roles.service';
import { SharedModule } from '../shared/shared.module';
import { AssignRoleModalComponent } from './user-roles/assign-role-modal/assign-role-modal.component';
import { UserPermissionService } from '../core/services/user-permissions.service';

@NgModule({
  declarations: [
    AclComponent,
    UsersListComponent,
    UserRolesComponent,
    RolesListComponent,
    EditRoleComponent,
    AssignRoleModalComponent,
  ],
  imports: [
    AclRouting,
    SharedModule,
  ],
  providers: [
    UserRolesService,
    UserPermissionService
  ],
  entryComponents: [AssignRoleModalComponent]
})
export class AclModule { }
