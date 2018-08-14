import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-cookie-notice',
  templateUrl: './cookie-notice.component.html',
  styleUrls: ['./cookie-notice.component.scss']
})
export class CookieNoticeComponent implements OnInit {

  acceptedCookies: boolean;
  loader: boolean;

  constructor(private usersService: UserService) {
    this.usersService.loggedUserSubject.subscribe((user) => {
      this.acceptedCookies = user.Legal.CookieConsent;
    });

    this.acceptedCookies = true;
  }

  ngOnInit() {
  }

  hide(): void {
    this.loader = true;
    this.usersService.agreeCookies().subscribe(() => {
      const user = this.usersService.getLoggedUser();
      user.Legal.CookieConsent = true;
      this.usersService.setLoggedUser(user);
      this.acceptedCookies = true;
    });
  }

}
