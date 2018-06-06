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
import { PopupComponent } from '../../components/popup/popup.component';

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
    this.subscriptions.push(this.usersService.getUserInfoWithRoles(clientId).subscribe(info => {
      const loggedUser = this.usersService.getLoggedUser();
      if (info.Email === loggedUser.Email) {
        this.usersService.getUserRoles().subscribe((roles) => {
          this.userInfo = info;
          this.usersService.updatePermissions(roles);
        });
      } else {
        this.userInfo = info;
      }
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

    const initialState = {
      popupConfig: {
        title: 'Revoke role',
        text: 'Are you sure you want to revoke this role?',
        btnCancelText: 'Cancel',
        btnConfirmText: 'Delete',
        successCallback: () => {
          this.userRoleService.revokeRole(this.userInfo.ClientId, roleId).subscribe(() => {
            this.userInfo.Roles = this.userInfo.Roles.filter(role => role.Id !== roleId);
            this.notificationsService.success('Success', 'Role successfully revoked.');

            // if we're editing the current user, update him
            const loggedUser = this.usersService.getLoggedUser();
            if (this.userInfo.Email === loggedUser.Email) {
              this.userRoleService.getRolesForUser(this.userInfo.ClientId).subscribe((roles) => {
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
