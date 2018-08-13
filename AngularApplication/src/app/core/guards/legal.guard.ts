import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class LegalGuard implements CanActivate {


  constructor(private router: Router, private usersService: UserService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (this.usersService.getLoggedUser().Legal.GDPRConsent) {
      return true;
    } else {
      this.router.navigateByUrl('/legal/notification');
      return false;
    }

  }
}
