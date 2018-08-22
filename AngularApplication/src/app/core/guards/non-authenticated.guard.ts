import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthTokenService } from '../services/auth-token.service';

@Injectable()
export class NonAuthenticatedGuard implements CanActivate {


  constructor(private authToken: AuthTokenService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authToken.isAuthenticated()) {
      this.router.navigate(['store/algo-list']);
      return false;
    } else {
      return true;
    }
  }
}
