import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class UserDetailsGuard implements CanActivate, CanLoad{

  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.getLoggedUser()) {
      return new Observable<boolean>((observer) => {
        this.userService.getUserInfoWithRoles().subscribe(info => {
          this.userService.setLoggedUser(info);
          observer.next(true);
          observer.complete();
        }, () => {
          this.router.navigate(['/startup']);
          observer.next(false);
          observer.complete();
        });
      });
    }

    return true;
  }


  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.getLoggedUser()) {
      return new Observable<boolean>((observer) => {
        this.userService.getUserInfoWithRoles().subscribe(info => {
          this.userService.getUserRoles().subscribe(roles => {
            info.Roles = roles;
            this.userService.setLoggedUser(info);
            observer.next(true);
            observer.complete();
          });
        }, () => {
          this.router.navigate(['/startup']);
          observer.next(false);
          observer.complete();
        });
      });
    }

    return true;
  }
}
