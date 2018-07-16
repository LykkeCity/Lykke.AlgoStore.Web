import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserRole } from '../../models/user-role.model';
import { UserRolesService } from '../../core/services/user-roles.service';
import { NotificationsService } from 'angular2-notifications';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import Permissions from '../../store/models/permissions';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;

  roles: UserRole[];
  temp: UserRole[];
  loadingIndicator = true;
  subscriptions: Subscription[] = [];
  modalRef: BsModalRef;
  typing: any;
  doneTypingInterval: number;

  permissions: {
    canDeleteRole: boolean,
    canModifyRole: boolean,
    canCreateRole: boolean
  };

  constructor(private rolesService: UserRolesService,
              private notificationsService: NotificationsService,
              private bsModalService: BsModalService,
              private router: Router,
              private userService: UserService) {

    this.subscriptions.push(this.userService.loggedUserSubject.subscribe(() => {
      this.permissions = {
        canDeleteRole: this.userService.hasPermission(Permissions.DELETE_USER_ROLE),
        canCreateRole: this.userService.hasPermission(Permissions.SAVE_USER_ROLE),
        canModifyRole: this.userService.hasPermission(Permissions.GET_ALL_PERMISSIONS) &&
        this.userService.hasPermission(Permissions.GET_ROLE_BY_ID) &&
        this.userService.hasPermission(Permissions.GET_PERMISSIONS_BY_ROLE_ID)
      };
    }));

    this.subscriptions.push(this.rolesService.getAllRoles().subscribe(roles => {
      this.roles = roles;
      this.temp = [...this.roles];
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

      this.roles = [...this.roles];
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.bsModalService.show(template);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    clearTimeout(this.typing);

    this.typing = setTimeout(() => {

      const filtered = this.temp.filter((role) => {
        return role.Name.toLocaleLowerCase().indexOf(val) !== -1
          || !val;
      });

      this.roles = [...filtered];

    }, this.doneTypingInterval);
  }
}
