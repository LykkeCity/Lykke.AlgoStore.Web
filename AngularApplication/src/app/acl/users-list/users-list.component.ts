import { Component, OnInit } from '@angular/core';
import { UserData } from '../../models/userdata.interface';
import { UserRolesService } from '../../services/user-roles.service';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: UserData[];
  loadingIndicator = true;
  subscriptions: Subscription[] = [];

  constructor(private userRolesService: UserRolesService, private notificationsService: NotificationsService) {
    this.subscriptions.push(this.userRolesService.getAllUsersWithRoles().subscribe(data => {
      this.users = data;
      this.loadingIndicator = false;
    }));
  }

  ngOnInit() {

  }

  revokeRole(roleId: string, clientId: string) {
    this.userRolesService.revokeRole(clientId, roleId).subscribe(() => {
      const currentUser = this.users.find(u => u.ClientId === clientId);
       currentUser.Roles = currentUser.Roles.filter(role => role.Id !== roleId);
       this.notificationsService.success('Success', 'Role successfully removed.');
    });
  }

}
