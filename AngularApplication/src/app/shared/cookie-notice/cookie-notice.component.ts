import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-cookie-notice',
  templateUrl: './cookie-notice.component.html',
  styleUrls: ['./cookie-notice.component.scss']
})
export class CookieNoticeComponent implements OnInit {

  acceptedCookies: boolean;
  constructor(private usersService: UserService) {
    // this.usersService.getCookieConsent().subscribe(() => {
    //   this.acceptedCookies = false;
    // });

    this.acceptedCookies = true;
  }

  ngOnInit() {
  }

  hide(): void {
    this.usersService.agreeCookies().subscribe(() => {
      this.acceptedCookies = true;
    });
  }

}
