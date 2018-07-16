import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import Permissions from '../../store/models/permissions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  permissions: {
    viewPublicAlgos: boolean,
    viewMyAlgos: boolean,
    vewRoles: boolean,
    viewMyInstances: boolean
  };

  constructor(private userService: UserService) {
    this.userService.loggedUserSubject.subscribe(() => {
      this.permissions = {
        viewPublicAlgos: this.userService.hasPermission(Permissions.GET_ALL_ALGOS),
        viewMyAlgos: this.userService.hasPermission(Permissions.GET_USER_ALGOS),
        vewRoles: this.userService.hasPermission(Permissions.GET_ALL_USER_ROLES)
        && this.userService.hasPermission(Permissions.GET_ALL_USERS_WITH_ROLES),
        viewMyInstances: this.userService.hasPermission(Permissions.GET_USER_INSTANCES)
      };
    });
  }
}
