import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';


@Injectable()
export class ExistingAlgoGuard implements CanActivate {


  constructor(private storeService: StoreService, private router: Router) {
  }

  canActivate(params) {
    if (this.storeService.activeAlgo) {
      return true;
    } else {
      this.router.navigateByUrl('/store/algo-list'); // TODO probably change redirect to dashboard when ready
      return false;
    }
  }
}
