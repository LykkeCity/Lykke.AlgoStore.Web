import { Component } from '@angular/core';
import { UserData } from '../../models/userdata.interface';
import { UserRolesService } from '../../services/user-roles.service';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';
import { AppGlobals } from '../../services/app.globals';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  users: UserData[];
  loadingIndicator = true;
  subscriptions: Subscription[] = [];

  permissions: {
    canRevokeRole: boolean,
    canEditUserRoles: boolean
  };

  constructor(private userRolesService: UserRolesService, private notificationsService: NotificationsService) {

    this.permissions = {
      canRevokeRole: AppGlobals.hasPermission('RevokeRoleFromUser'),
      canEditUserRoles: AppGlobals.hasPermission('GetAllUserRoles') && AppGlobals.hasPermission('GetUserByIdWithRoles')
    };

    this.subscriptions.push(this.userRolesService.getAllUsersWithRoles().subscribe(data => {
      this.users = data;
      this.loadingIndicator = false;
    }));
  }

  revokeRole(roleId: string, clientId: string) {
    if (!this.permissions.canRevokeRole) {
      return;
    }

    this.userRolesService.revokeRole(clientId, roleId).subscribe(() => {
      const currentUser = this.users.find(u => u.ClientId === clientId);
       currentUser.Roles = currentUser.Roles.filter(role => role.Id !== roleId);
       this.notificationsService.success('Success', 'Role successfully removed.');

      // if we're editing the current user, update him
      const loggedUser = AppGlobals.getLoggedUser();
      if (currentUser.ClientId === loggedUser.ClientId) {
        this.userRolesService.getRolesForUser(loggedUser.ClientId).subscribe((roles) => {
          loggedUser.Roles = roles;
          AppGlobals.setLoggedUser(loggedUser);
        });
      }
    });
  }

}
