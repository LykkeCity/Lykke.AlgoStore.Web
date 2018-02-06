import { Injectable } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { BsModalService } from 'ngx-bootstrap';
import { IdlePopupComponent } from '../components/popup/idle-popup/idle-popup.component';

@Injectable()
export class IdleService {

  constructor(private idle: Idle,
              private authService: AuthService,
              private modalService: BsModalService) {
    this.idle.setIdle(environment.idleTime);
    this.idle.setTimeout(environment.idleTimeout);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
  }

  init(): void {
    this.startWatch();
    const modalConfig = {
      keyboard: false,
      ignoreBackdropClick: true,
      class: 'modal-sm session-modal'
    };

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      if (countdown === 60)
        this.modalService.show(IdlePopupComponent, modalConfig);
    });
  }

  startWatch(): void {
    this.idle.watch();
  }
}
