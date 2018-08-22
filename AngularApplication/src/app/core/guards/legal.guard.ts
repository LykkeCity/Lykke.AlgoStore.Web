import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserData } from '../../models/userdata.interface';
import { UserService } from '../services/user.service';

@Injectable()
export class LegalGuard implements CanLoad {


  constructor(private router: Router, private usersService: UserService) { }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>(ob => {
      this.usersService.getLegalConsents().subscribe(legal => {
        const user = this.usersService.getLoggedUser() || {} as UserData;
        user.Legal = legal;

        this.usersService.setLoggedUser(user);

        if (user.Legal && user.Legal.GdprConsent) {
          ob.next(true);
          ob.complete();
        } else {
          this.router.navigate(['legal', 'notification']);
          ob.next(false);
          ob.complete();
        }
      });
    });
  }
}
