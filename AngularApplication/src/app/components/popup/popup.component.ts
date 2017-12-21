import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../services/event.service';
import { PopupConfig } from '../../models/popup.interface';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {
  showPopup: boolean;
  popupConfig: PopupConfig;
  elementBody: any;

  private subscriptions: Subscription[] = [];

  constructor(private eventService: EventService) {
    this.elementBody = document.querySelector('body');
    this.showPopup = false;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.eventService.popupOpen.subscribe(this.onPopupOpen),
      this.eventService.popupClose.subscribe(this.onPopupClose),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onPopupOpen = (data: PopupConfig) => {
    this.showPopup = true;
    
    this.popupConfig = data;
    this.elementBody.classList.add('blur-popup');
  }

  onPopupClose = (data) => {
    this.showPopup = false;
    this.popupConfig = null;
    this.elementBody.classList.remove('blur-popup');
  }

  onPopupCancel() {
    this.eventService.popupCancel.next({name: this.popupConfig.name});
  }
  onPopupConfirm() {
    this.eventService.popupConfirm.next({name: this.popupConfig.name});
  }
}
