import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

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
        const user = this.usersService.getLoggedUser();
        user.Legal ? user.Legal.GDPRConsent = true : user.Legal = { GDPRConsent: true, CookieConsent: false };
        this.usersService.setLoggedUser(user);
        this.router.navigate(['/store/my-algos']);
      });
    }
  }
}
