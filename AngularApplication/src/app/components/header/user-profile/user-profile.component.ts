import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserData } from '../../../models/userdata.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userData: UserData;

  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.userService.userData.subscribe(data => {
      this.userData = data;
    });
  }

  logout(redirect: boolean){
    this.authService.logout(redirect);
  }

}
