import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Idle } from '@ng-idle/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-idle-popup',
  templateUrl: './idle-popup.component.html',
  styleUrls: ['./idle-popup.component.scss']
})
export class IdlePopupComponent implements OnInit, OnDestroy {

  countdown: number;
  onTimeoutSubscription: Subscription;
  onExpiredSessionSubscription: Subscription;
  isSessionExpired = false;

  constructor(private bsModalRef: BsModalRef, private idleService: Idle, private authService: AuthService) { }

  ngOnInit() {
    this.onTimeoutSubscription = this.idleService.onTimeoutWarning.subscribe(timeout => {
      this.countdown = timeout;
    });

    this.onExpiredSessionSubscription = this.idleService.onTimeout.subscribe(() => {
      this.isSessionExpired = true;
      this.authService.logout();
    });
  }

  ngOnDestroy() {
    this.onTimeoutSubscription.unsubscribe();
    this.onExpiredSessionSubscription.unsubscribe();
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.bsModalRef.hide();
    this.authService.logout();
  }

}
