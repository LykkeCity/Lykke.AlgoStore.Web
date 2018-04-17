import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserRole } from '../../models/user-role.model';
import { UserRolesService } from '../../services/user-roles.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {

  roles: UserRole[];
  loadingIndicator = true;
  subscriptions: Subscription[] = [];

  constructor(private rolesService: UserRolesService) {
    this.subscriptions.push(this.rolesService.getAllRoles().subscribe(roles => {
      this.roles = roles;
      this.loadingIndicator = false;
    }));
  }

  ngOnInit() {
  }

  editRole(roleId: string): void {

  }

  deleteRole(roleId: string): void {

  }

}
