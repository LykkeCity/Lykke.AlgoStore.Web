import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class LoginRedirectGuard implements CanActivate {

  constructor(
    private router: Router,
    private authToken: AuthTokenService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const code = next.queryParamMap.get('code');

    if (code) {
      const returnUrl = localStorage.getItem('lpp-return-url') || '/store/algo-list';
      this.authToken.fetchToken(code).subscribe(
        () => {
          this.router.navigate([returnUrl]);
          localStorage.removeItem('lpp-return-url');
        }
      );
      return false;
    }

    return true;

  }
}
