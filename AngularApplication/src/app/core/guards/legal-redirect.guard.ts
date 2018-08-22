import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class LegalRedirectGuard implements CanActivate {


  constructor(private router: Router, private usersService: UserService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>(ob => {
      this.usersService.getLegalConsents().subscribe(legal => {
        if (legal && legal.GdprConsent) {
          this.router.navigate(['store', 'my-algos']);
          ob.next(true);
          ob.complete();
        } else {
          ob.next(true);
          ob.complete();
        }
      });
    });
  }
}
