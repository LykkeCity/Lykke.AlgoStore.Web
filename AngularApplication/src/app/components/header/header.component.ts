import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
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
    vewRoles: boolean
  };

  constructor(private userService: UserService) {
    this.userService.loggedUserSubject.subscribe(() => {
      this.permissions = {
        viewPublicAlgos: this.userService.hasPermission(Permissions.GET_ALL_ALGOS),
        viewMyAlgos: this.userService.hasPermission('GetAlgosByClientId'), // TODO change this with real role when API is ready
        vewRoles: this.userService.hasPermission(Permissions.GET_ALL_USER_ROLES) && this.userService.hasPermission(Permissions.GET_ALL_USERS_WITH_ROLES)
      };
    });
  }
}
