import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRolesService } from '../../services/user-roles.service';
import { UserRole } from '../../models/user-role.model';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user.service';
import { UserData } from '../../models/userdata.interface';
import { BsModalService } from 'ngx-bootstrap';
import { AssignRoleModalComponent } from './assign-role-modal/assign-role-modal.component';
import { NotificationsService } from 'angular2-notifications';
import Permissions from '../../store/models/permissions';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent {

  allRoles: UserRole[];
  userInfo: UserData;
  subscriptions: Subscription[] = [];

  permissions: {
    canAssignRoles: boolean,
    canRevokeRoles: boolean
  };

  constructor(private route: ActivatedRoute,
              private userRoleService: UserRolesService,
              private usersService: UserService,
              private bsModalService: BsModalService,
              private notificationsService: NotificationsService) {

    this.subscriptions.push(this.usersService.loggedUserSubject.subscribe(() => {
      this.permissions = {
        canAssignRoles: this.usersService.hasPermission(Permissions.ASSIGN_USER_ROLE),
        canRevokeRoles: this.usersService.hasPermission(Permissions.REVOKE_ROLE)
      };
    }));

    this.subscriptions.push(this.route.params.subscribe(params => {
      const clientId = params['id'];
      this.getData(clientId);
    }));
  }

  getData(clientId: string) {
    this.subscriptions.push(this.usersService.getUserInfoWithRoles(clientId).subscribe(roles => {
      this.userInfo = roles;
    }));

    this.subscriptions.push(this.userRoleService.getAllRoles().subscribe(roles => {
      this.allRoles = roles;
    }));
  }

  openRoleModal() {
    if (!this.permissions.canAssignRoles) {
      return;
    }

    const userRoleIds = this.userInfo.Roles.map(role => role.Id);
    const config = {
      class: 'modal-sm',
      initialState: {
        userData: this.userInfo,
        allRoles: this.allRoles.filter((role: UserRole) => !userRoleIds.includes(role.Id)),
        onSuccess: () => {
          this.getData(this.userInfo.ClientId);
          this.userInfo = null;
        }
      }
    };

    this.bsModalService.show(AssignRoleModalComponent, config);
  }

  revokeRole(roleId: string) {
    if (!this.permissions.canRevokeRoles) {
      return;
    }

    this.userRoleService.revokeRole(this.userInfo.ClientId, roleId).subscribe(() => {
      this.userInfo.Roles = this.userInfo.Roles.filter(role => role.Id !== roleId);
      this.notificationsService.success('Success', 'Role successfully revoked.');

      // if we're editing the current user, update him
      const loggedUser = this.usersService.getLoggedUser();
      if (this.userInfo.ClientId === loggedUser.ClientId) {
        this.userRoleService.getRolesForUser(loggedUser.ClientId).subscribe((roles) => {
          loggedUser.Roles = roles;
          this.usersService.updatePermissions(loggedUser.Roles);
        });
      }
    });
  }

}
