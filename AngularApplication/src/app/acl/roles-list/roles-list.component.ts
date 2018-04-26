import { Component, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserRole } from '../../models/user-role.model';
import { UserRolesService } from '../../services/user-roles.service';
import { NotificationsService } from 'angular2-notifications';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { AppGlobals } from '../../services/app.globals';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent {

  roles: UserRole[];
  loadingIndicator = true;
  subscriptions: Subscription[] = [];
  modalRef: BsModalRef;

  permissions: {
    canDeleteRole: boolean,
    canModifyRole: boolean,
    canCreateRole: boolean
  };

  constructor(private rolesService: UserRolesService,
              private notificationsService: NotificationsService,
              private bsModalService: BsModalService,
              private router: Router) {

    this.subscriptions.push(AppGlobals.loggedUserSubject.subscribe(() => {
      this.permissions = {
        canDeleteRole: AppGlobals.hasPermission('DeleteUserRole'),
        canCreateRole: AppGlobals.hasPermission('CreateUserRole'),
        // canModifyRole: AppGlobals.hasPermission('GetAllPermissions') && AppGlobals.hasPermission('GetRoleById') && AppGlobals.hasPermission('GetPermissionsByRoleId')
        canModifyRole: true
      };
    }));

    this.subscriptions.push(this.rolesService.getAllRoles().subscribe(roles => {
      this.roles = roles;
      this.loadingIndicator = false;
    }));
  }

  editRole(roleId: string): void {
    if (!this.permissions.canModifyRole) {
      return;
    }

    this.router.navigate(['/users-acl/roles-edit', roleId]);
  }

  deleteRole(roleId: string): void {
    if (!this.permissions.canDeleteRole) {
      return;
    }

    this.rolesService.deleteRole(roleId).subscribe(() => {
      this.notificationsService.success('Success', 'Role deleted successfully.');
      const index = this.roles.findIndex(r => r.Id === roleId);
      this.roles.splice(index, 1);
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.bsModalService.show(template);
  }
}
