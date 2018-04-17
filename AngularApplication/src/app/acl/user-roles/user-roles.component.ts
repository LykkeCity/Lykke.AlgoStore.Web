import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRolesService } from '../../services/user-roles.service';
import { UserRole } from '../../models/user-role.model';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user.service';
import { UserData } from '../../models/userdata.interface';
import { BsModalService } from 'ngx-bootstrap';
import { AssignRoleModalComponent } from './assign-role-modal/assign-role-modal.component';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  allRoles: UserRole[];
  userInfo: UserData;
  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private userRoleService: UserRolesService,
              private usersService: UserService,
              private bsModalService: BsModalService) {

    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      const clientId = params['id'];
      this.getData(clientId);
    }));
  }

  ngOnInit() {

  }

  getData(clientId: string) {
    this.subscriptions.push(this.usersService.getUserInfoWithRoles(clientId).subscribe(roles => {
      this.userInfo = roles;
    }));

    this.subscriptions.push(this.userRoleService.getAllRoles().subscribe(roles => {
      this.allRoles = roles;
    }));
  }

  openRoleModal() {
    const userRoleIds = this.userInfo.Roles.map(role => role.Id);
    const config = {
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

}
