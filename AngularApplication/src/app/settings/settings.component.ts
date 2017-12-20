import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../services/user.service';
import { UserData } from '../models/userdata.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  userData: UserData;
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService) { }

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

}
