import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {

    this.subscriptions.push(
      this.route.queryParams.subscribe(params => {

        const redirectUrl = localStorage.getItem('returnUrl');

        if (params && params.code && redirectUrl) {
          // this.authService.getAccessToken(params.code);
        } else if (!this.authService._isAuthenticated) {
          // TODO return to SSO
          if (['/', '/home'].includes(this.router.url)) {
            this.router.navigate(['home']);
          } else {
            this.router.navigate(['store']);
          }
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
