import { Component } from '@angular/core';
import { UserData } from '../../models/userdata.interface';
import { UserRolesService } from '../../services/user-roles.service';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../../services/user.service';
import Permissions from '../../store/models/permissions';
import { PopupComponent } from '../../components/popup/popup.component';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  users: UserData[];
  loadingIndicator = true;
  subscriptions: Subscription[] = [];
  labelColors = ['azure', 'green', 'red', 'mango', 'violet', 'silver'];

  permissions: {
    canRevokeRole: boolean,
    canEditUserRoles: boolean
  };

  constructor(private userRolesService: UserRolesService,
              private notificationsService: NotificationsService,
              private usersService: UserService,
              private bsModalService: BsModalService) {

    this.permissions = {
      canRevokeRole: this.usersService.hasPermission(Permissions.REVOKE_ROLE),
      canEditUserRoles: this.usersService.hasPermission(Permissions.GET_ALL_USER_ROLES)
      && this.usersService.hasPermission(Permissions.GET_USER_BY_ID_WITH_ROLES)
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

    const initialState = {
      popupConfig: {
        title: 'Revoke role',
        text: 'Are you sure you want to revoke this role?',
        btnCancelText: 'Cancel',
        btnConfirmText: 'Delete',
        successCallback: () => {
          this.userRolesService.revokeRole(clientId, roleId).subscribe(() => {
            const currentUser = this.users.find(u => u.ClientId === clientId);
            currentUser.Roles = currentUser.Roles.filter(role => role.Id !== roleId);
            this.notificationsService.success('Success', 'Role successfully removed.');

            // if we're editing the current user, update him
            const loggedUser = this.usersService.getLoggedUser();
            if (currentUser.Email === loggedUser.Email) {
              this.userRolesService.getRolesForUser(currentUser.ClientId).subscribe((roles) => {
                this.usersService.updatePermissions(roles);
              });
            }
          });
        }
      }
    };

    this.bsModalService.show(PopupComponent, { initialState, class: 'modal-sm', keyboard: false, ignoreBackdropClick: true });
  }

}
