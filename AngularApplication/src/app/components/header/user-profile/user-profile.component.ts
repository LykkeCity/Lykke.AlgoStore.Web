import { Component, OnInit, OnDestroy } from '@angular/core';
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
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.userService.userData.subscribe(data => {
        this.userData = data;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  logout(): void {
    this.authService.logout();
  }

}
