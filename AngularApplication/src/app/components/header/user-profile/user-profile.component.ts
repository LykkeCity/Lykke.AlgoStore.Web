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
  private subscription: Subscription;

  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.subscription = this.userService.getUserInfo().subscribe(data => {
      this.userData = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

}
