import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { UserData } from '../../models/userdata.interface';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  user: UserData;

  constructor(private userService: UserService) {
    this.userService.loggedUserSubject.subscribe(user => {
      this.user = user;
      console.log(this.user);
    });

  }

  ngOnInit() {
  }

  deactivateAccount(): void {

  }
}
