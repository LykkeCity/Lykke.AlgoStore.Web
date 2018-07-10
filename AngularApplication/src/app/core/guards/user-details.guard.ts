import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class UserDetailsGuard implements CanLoad {

  constructor(private userService: UserService) {  }


  canLoad(route: Route): Observable<boolean> | boolean {
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
          observer.next(true);
          observer.complete();
        });
      });
    }

    return true;
  }
}
