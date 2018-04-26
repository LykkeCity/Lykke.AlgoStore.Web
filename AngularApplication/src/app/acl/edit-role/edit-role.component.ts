import { Component, OnDestroy } from '@angular/core';
import { UserPermission } from '../../models/user-permission.model';
import { UserPermissionService } from '../../services/user-permissions.service';
import { UserRolesService } from '../../services/user-roles.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';
import { UserRole } from '../../models/user-role.model';
import { AppGlobals } from '../../services/app.globals';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnDestroy {

  roleId: string;
  role: UserRole;
  rolePermissions: UserPermission[];
  allPermissions: UserPermission[];
  subscriptions: Subscription[] = [];
  permissions: {
    canEditRole: boolean;
  };

  constructor(private permissionsService: UserPermissionService,
              private roleService: UserRolesService,
              private route: ActivatedRoute,
              private notificationsService: NotificationsService) {
    this.subscriptions.push(AppGlobals.loggedUserSubject.subscribe(() => {
      this.permissions = {
        canEditRole: AppGlobals.hasPermission('UpdateUserRole') && AppGlobals.hasPermission('CreateUserRole')
        && AppGlobals.hasPermission('AssignMultiplePermissionToRole') && AppGlobals.hasPermission('RevokeMultiplePermissions')
      };
    }));

    this.subscriptions.push(this.route.params.subscribe((params) => {
      this.roleId = params['id'];
      if (this.roleId) {
        this.subscriptions.push(this.roleService.getById(this.roleId).subscribe((role) => {
          this.role = role;
        }));
      } else {
        this.role = {
          CanBeModified: true,
          CanBeDeleted: true
        };
      }

      this.subscriptions.push(this.permissionsService.getAllPermissions().subscribe((perms) => {
        this.allPermissions = perms;

        this.subscriptions.push(this.permissionsService.getPermissionsForRole(this.roleId)
          .subscribe((rolePermissions: UserPermission[]) => {
          this.rolePermissions = rolePermissions;
          const rolePermissionIds = rolePermissions.map(p => p.Id);
          perms.forEach(p => p.checked = rolePermissionIds.includes(p.Id));

          this.allPermissions = perms;
        }));
      }));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  selectAll(): void {
    this.allPermissions.forEach(p => p.checked = true);
    this.rolePermissions = this.allPermissions;
  }

  deselectAll(): void {
    this.allPermissions.forEach(p => p.checked = false);
    this.rolePermissions = [];
  }

  onStateChange(perm: UserPermission) {
    perm.checked = !perm.checked;

    if (perm.checked) {
      this.rolePermissions.push(perm);
    } else {
      const index = this.rolePermissions.findIndex(p => p.Id === perm.Id);
      this.rolePermissions.splice(index, 1);
    }
  }

  mapFromModelsToApiData(dbPermissions: UserPermission[]): any {
    const result = { assignedPermissions: [], revokedPermissions: []};
      const dbrolePermissionIds = dbPermissions.map(r => r.Id);
      const currentPermissionIds = this.rolePermissions.map(r => r.Id);

      // get the ones that we've added
      for (const perm of this.rolePermissions) {
        if (!dbrolePermissionIds.includes(perm.Id)) {
          result.assignedPermissions.push({RoleId: this.roleId, PermissionId: perm.Id});
          dbPermissions.push(perm);
        }
      }

      // and the ones that we've removed
      for (const perm of dbPermissions) {
        if (!currentPermissionIds.includes(perm.Id)) {
          result.revokedPermissions.push({RoleId: this.roleId, PermissionId: perm.Id});
          const index = dbPermissions.findIndex(p => p.Id === perm.Id);
          dbPermissions.splice(index, 1);
        }
      }

    return result;
  }

  onSave(): void {
    if (this.role.CanBeModified && this.permissions.canEditRole) {
      this.subscriptions.push(this.roleService.saveRole(this.role).subscribe((role) => {
        this.roleId = role.Id;
        this.subscriptions.push(this.permissionsService.getPermissionsForRole(role.Id).subscribe((dbPermissions) => {
          const data = this.mapFromModelsToApiData(dbPermissions);

          this.permissionsService.assignPermissions(data.assignedPermissions).subscribe(() => {
            this.permissionsService.revokePermissions(data.revokedPermissions).subscribe(() => {
              this.notificationsService.success('Success', 'Role updated successfully.');

              // if the currently logged user has this role, update him
              const loggedUser = AppGlobals.getLoggedUser();
              const userRoleIndex = loggedUser.Roles.findIndex(userRole => userRole.Id === this.roleId);
              if (userRoleIndex !== -1) {
                loggedUser.Roles[userRoleIndex].Name = role.Name;
                loggedUser.Roles[userRoleIndex].Permissions = dbPermissions;

                AppGlobals.setLoggedUser(loggedUser);
              }
            });
          });
        }));
      }));
    }
  }
}
