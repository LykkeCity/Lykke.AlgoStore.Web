import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ExistingAlgoGuard implements CanActivate {


  constructor(private storeService: StoreService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const id = next.params['id'];
    if (id) {
      return true;
    } else {
      this.router.navigateByUrl('/store/algo-list'); // TODO probably change redirect to dashboard when ready
      return false;
    }
  }
}

