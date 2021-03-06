import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { UserData } from '../../models/userdata.interface';

@Component({
  selector: 'app-legal-notification',
  templateUrl: './legal-notification.component.html',
  styleUrls: ['./legal-notification.component.scss']
})
export class LegalNotificationComponent {

  agreed: boolean;
  loader: boolean;

  constructor(private usersService: UserService,
              private router: Router,
              private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }

  agree(): void {
    if (this.agreed) {
      this.loader = true;
      this.usersService.agreeLegalNotice().subscribe(() => {
        const user = this.usersService.getLoggedUser() || {} as UserData;
        user.Legal ? user.Legal.GdprConsent = true : user.Legal = { GdprConsent: true, CookieConsent: false };
        this.usersService.setLoggedUser(user);
        this.router.navigate(['/store/my-algos']);
      });
    }
  }
}
