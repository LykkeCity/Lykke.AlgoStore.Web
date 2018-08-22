import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { UserData } from '../../models/userdata.interface';
import { UserRolesService } from '../../core/services/user-roles.service';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../../core/services/user.service';
import Permissions from '../../store/models/permissions';
import { PopupComponent } from '../../components/popup/popup.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;
  users: UserData[];
  temp: UserData[];
  loadingIndicator = true;
  subscriptions: Subscription[] = [];
  labelColors = ['azure', 'green', 'red', 'mango', 'violet', 'silver'];

  typing: any;
  doneTypingInterval: number;

  permissions: {
    canRevokeRole: boolean,
    canEditUserRoles: boolean
  };

  modalRef: BsModalRef;

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
      this.temp = [...this.users];
      this.loadingIndicator = false;
    }));

    this.doneTypingInterval = 1000;
  }

  ngAfterViewInit() {
    this.ngxDatatable.columnMode = ColumnMode.force;
  }

  ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
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
          }, (error) => {
            this.modalRef.hide();
            this.notificationsService.error('Error', error.DisplayMessage);
          });
        }
      }
    };

    this.modalRef = this.bsModalService.show(PopupComponent, {
      initialState,
      class: 'modal-sm',
      keyboard: false,
      ignoreBackdropClick: true
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    clearTimeout(this.typing);

    this.typing = setTimeout(() => {

      const filtered = this.temp.filter((user) => {
        return user.FullName.toLocaleLowerCase().indexOf(val) !== -1 ||
              user.Email.toLocaleLowerCase().indexOf(val) !== -1
            || !val;
      });

      this.users = [...filtered];

    }, this.doneTypingInterval);
  }

}
