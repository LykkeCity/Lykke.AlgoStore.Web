import { Component, OnDestroy } from '@angular/core';
import { UserPermission } from '../../models/user-permission.model';
import { UserPermissionService } from '../../services/user-permissions.service';
import { UserRolesService } from '../../services/user-roles.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { UserRole } from '../../models/user-role.model';
import { UserService } from '../../services/user.service';
import Permissions from '../../store/models/permissions';

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

  loader = false;

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
    this.rolePermissions = JSON.parse(JSON.stringify(this.allPermissions));
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
    const result = { assignedPermissions: [], revokedPermissions: [] };
    const dbrolePermissionIds = dbPermissions.map(r => r.Id);
    const currentPermissionIds = this.rolePermissions.map(r => r.Id);

    // get the ones that we've added
    for (const perm of this.rolePermissions) {
      if (!dbrolePermissionIds.includes(perm.Id)) {
        result.assignedPermissions.push({ RoleId: this.roleId, PermissionId: perm.Id });
        dbPermissions.push(perm);
      }
    }

    // and the ones that we've removed
    for (let i = 0; i < dbPermissions.length; i++) {
      const perm = dbPermissions[i];
      if (!currentPermissionIds.includes(perm.Id)) {
        result.revokedPermissions.push({ RoleId: this.roleId, PermissionId: perm.Id });
        const index = dbPermissions.findIndex(p => p.Id === perm.Id);
        dbPermissions.splice(index, 1);
        i--;
      }
    }

    return result;
  }

  onSave(): void {
    if (this.role.CanBeModified && this.permissions.canEditRole) {
      this.loader = true;


      this.subscriptions.push(this.roleService.saveRole(this.role).subscribe((role) => {
        this.roleId = role.Id;
        this.role = role;
        this.subscriptions.push(this.permissionsService.getPermissionsForRole(role.Id).subscribe((dbPermissions) => {
          const data = this.mapFromModelsToApiData(dbPermissions);

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
      }));
    }
  }
}
