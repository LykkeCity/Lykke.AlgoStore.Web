import { Component } from '@angular/core';
import { AppGlobals } from '../../services/app.globals';

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

  constructor() {
    AppGlobals.loggedUserSubject.subscribe(() => {
      this.permissions = {
        viewPublicAlgos: AppGlobals.hasPermission('GetAllAlgos'),
        viewMyAlgos: AppGlobals.hasPermission('GetAlgosByClientId'),
        vewRoles: AppGlobals.hasPermission('GetAllUserRoles') && AppGlobals.hasPermission('GetAllUsersWithRoles')
      };
    });
  }
}
