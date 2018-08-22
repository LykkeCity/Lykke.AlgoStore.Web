import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class UserDetailsGuard implements CanLoad {

  constructor(private userService: UserService) { }


  canLoad(route: Route): Observable<boolean> | boolean {
    if (!this.userService.getLoggedUser()) {

      return new Observable<boolean>((observer) => {
        forkJoin(this.userService.getUserInfoWithRoles(),
          this.userService.getUserRoles()).subscribe((data) => {
          const user = data[0];
          const roles = data[1];

          user.Roles = roles;

          this.userService.setLoggedUser(user);
          console.log(data);

          observer.next(true);
          observer.complete();
        }, (error) => {
          observer.next(true);
          observer.complete();
        });
      });
    }

    return true;
  }
}
