import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { PopupConfig } from '../models/popup.interface';

@Injectable()
export class IdleService {

  constructor(private idle: Idle,
              private authService: AuthService,
              private eventService: EventService) {
    this.idle.setIdle(environment.idleTime);
    this.idle.setTimeout(environment.idleTimeout);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
  }

  init() {
    this.startWatch();
    this.idle.onTimeout.subscribe(() => {
      const popupConfig: PopupConfig = {
        name: 'sessionExpired',
        width: 370,
        title: 'Your session is expired',
        text: 'Please proceed to login.',
        btnCancelText: 'Log in'
      };
      this.eventService.popupClose.next();

      this.eventService.popupOpen.next(popupConfig);
      this.authService.logout(false);
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      const popupConfig: PopupConfig = {
        name: 'sessionWarning',
        width: 370,
        title: 'Your session is about expire',
        text: 'You will be logged off in ' + countdown + ' second due to inactivity.',
        btnCancelText: 'Keep me logged in',
        btnConfirmText: 'Logout'
      };
      this.eventService.popupOpen.next(popupConfig);
    });

    this.eventService.popupConfirm.subscribe(this.onPopupConfirm);
    this.eventService.popupCancel.subscribe(this.onPopupCancel);
  }

  startWatch() {
    this.idle.watch();
  }

  onPopupConfirm = (popupData) => {
    switch (popupData.name) {
      case 'sessionWarning':
        this.eventService.popupClose.next();
        this.authService.logout();
        break;
      case 'sessionExpired':
        this.eventService.popupClose.next();
        this.authService.login();
        break;
    }
  };
  onPopupCancel = (popupData) => {
    switch (popupData.name) {
      case 'sessionWarning':
        this.eventService.popupClose.next();
        this.startWatch();
        break;
      case 'sessionExpired':
        this.eventService.popupClose.next();
        this.authService.login();
        break;
    }
  };
}
