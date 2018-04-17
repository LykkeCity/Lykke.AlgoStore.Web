import { NgModule } from '@angular/core';
import { AclComponent } from './acl.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';
import { AclRouting } from './acl-routing.module';
import { UserRolesService } from '../services/user-roles.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { AssignRoleModalComponent } from './user-roles/assign-role-modal/assign-role-modal.component';

@NgModule({
  declarations: [
    AclComponent,
    UsersListComponent,
    UserRolesComponent,
    RolesListComponent,
    RolePermissionsComponent,
    AssignRoleModalComponent
  ],
  imports: [
    AclRouting,
    NgxDatatableModule,
    SharedModule,
  ],
  providers: [
    UserRolesService
  ],
  entryComponents: [AssignRoleModalComponent]
})
export class AclModule { }
