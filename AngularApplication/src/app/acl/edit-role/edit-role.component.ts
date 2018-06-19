import { Component, OnDestroy } from '@angular/core';
import { PermissionMap, UserPermission } from '../../models/user-permission.model';
import { UserPermissionService } from '../../services/user-permissions.service';
import { UserRolesService } from '../../services/user-roles.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { UserRole } from '../../models/user-role.model';
import { UserService } from '../../services/user.service';
import Permissions from '../../store/models/permissions';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnDestroy {

  roleId: string;
  role: UserRole;
  rolePermissionIds: string[];
  subscriptions: Subscription[] = [];
  permissions: {
    canEditRole: boolean;
  };

  loader = false;
  orderedPermissions: PermissionMap = {};
  permissionGroups: string[] = [];

  constructor(private permissionsService: UserPermissionService,
              private usersService: UserService,
              private roleService: UserRolesService,
              private route: ActivatedRoute,
              private notificationsService: NotificationsService) {
    this.subscriptions.push(this.usersService.userRoles.subscribe(() => {
      this.permissions = {
        canEditRole: this.usersService.hasPermission(Permissions.UPDATE_USER_ROLE) &&
        this.usersService.hasPermission(Permissions.SAVE_USER_ROLE)
        && this.usersService.hasPermission(Permissions.ASSIGN_MULTIPLE_PERMISSIONS_TO_ROLE)
        && this.usersService.hasPermission(Permissions.REVOKE_PERMISSIONS)
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
        perms.map(p => {
          if (!this.orderedPermissions[p.Name]) {
            this.orderedPermissions[p.Name] = { permissions: [], collapseState: 'expanded' };
          }

          if (!this.orderedPermissions[p.Name].permissions) {
            this.orderedPermissions[p.Name].permissions = [];
          }

          this.orderedPermissions[p.Name].permissions.push(p);
        });
        this.permissionGroups = Object.keys(this.orderedPermissions);

        this.subscriptions.push(this.permissionsService.getPermissionsForRole(this.roleId)
          .subscribe((currentPermissions: UserPermission[]) => {
            this.rolePermissionIds = currentPermissions.map(p => p.Id);
            this.permissionGroups.forEach(group => this.setInitialState(group));
          }));
      }));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  selectAll(group?: string): void {
    if (group) {
      this.orderedPermissions[group].permissions.forEach(p => p.checked = true);
      return;
    }

    this.permissionGroups.forEach(permGroup => this.selectAll(permGroup));
  }

  deselectAll(group?: string): void {
    if (group) {
      this.orderedPermissions[group].permissions.forEach(p => p.checked = false);
      return;
    }

    this.permissionGroups.forEach(permGroup => this.deselectAll(permGroup));
  }

  setInitialState(group: string): void {
    this.orderedPermissions[group].permissions.forEach(p => p.checked = this.rolePermissionIds.includes(p.Id));
  }

  onStateChange(perm: UserPermission, group: string) {
    this.orderedPermissions[group].permissions.find(p => p.Id === perm.Id).checked = !perm.checked;
  }

  mapFromModelsToApiData(): any {
    const result = { assignedPermissions: [], revokedPermissions: [] };
    let allPerms = [];

    this.permissionGroups.forEach(group => {
      allPerms = allPerms.concat(this.orderedPermissions[group].permissions);
    });

    allPerms.forEach(perm => {
      // if its missing in the initial ids, then its a new perm
      if (!this.rolePermissionIds.includes(perm.Id) && perm.checked) {
        result.assignedPermissions.push({ RoleId: this.roleId, PermissionId: perm.Id });
      }

      // if its in the initial permission, but missing in the current one, remove it
      if (this.rolePermissionIds.includes(perm.Id) && !perm.checked) {
        result.revokedPermissions.push({ RoleId: this.roleId, PermissionId: perm.Id });
      }
    });

    // finally, refresh the current ones
    this.rolePermissionIds = allPerms.filter(p => p.checked).map(perm => perm.Id);

    return result;
  }

  onSave(): void {
    if (this.role.CanBeModified && this.permissions.canEditRole) {
      this.loader = true;

      this.subscriptions.push(this.roleService.saveRole(this.role).subscribe((role) => {
        this.roleId = role.Id;
        this.role = role;
        const data = this.mapFromModelsToApiData();

        this.permissionsService.assignPermissions(data.assignedPermissions).subscribe(() => {
          this.permissionsService.revokePermissions(data.revokedPermissions).subscribe(() => {

            // if the currently logged user has this role, update him
            const loggedUser = this.usersService.getLoggedUser();
            const userRoleIndex = loggedUser.Roles.findIndex(userRole => userRole.Id === this.roleId);
            if (userRoleIndex !== -1) {
              this.subscriptions.push(this.permissionsService.getPermissionsForRole(role.Id).subscribe((updatedPermissions) => {

                loggedUser.Roles[userRoleIndex].Name = role.Name;
                loggedUser.Roles[userRoleIndex].Permissions = updatedPermissions;

                this.usersService.updatePermissions(loggedUser.Roles);

                this.loader = false;
                this.notificationsService.success('Success', 'Role updated successfully.');
              }));
            } else {
              this.loader = false;
              this.notificationsService.success('Success', 'Role updated successfully.');
            }
          });
        });
      }));
    }
  }

  getTooltip(returnValue?: string): string {
    return !this.role.CanBeModified ? 'This role cannot be modified.'
      : !this.permissions.canEditRole ? 'You do not have the permission to modify this role'
        : returnValue ? returnValue : '';
  }

  isBigger(input: string): boolean {
    return input.length > 20;
  }
}
