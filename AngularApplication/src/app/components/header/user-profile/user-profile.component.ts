import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../../services/user.service';
import { UserData } from '../../../models/userdata.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  userData: UserData;
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private authService: AuthService) {

  }

  ngOnInit() {
    this.subscriptions.push(this.userService.getUserInfo().subscribe(data => {
      this.userData = data;

      this.subscriptions.push(this.userService.getUserRoles().subscribe(roles => {
        this.userData.Roles = roles;
        this.userService.setLoggedUser(this.userData);
      }));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  logout(): void {
    this.authService.logout();
  }

}
