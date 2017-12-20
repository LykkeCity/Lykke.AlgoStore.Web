import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PopupAlgoConfig } from '../../models/popup-algo.interface';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-popup-algo',
  templateUrl: './popup-algo.component.html',
  styleUrls: ['./popup-algo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupAlgoComponent implements OnInit, OnDestroy {

  showPopup: boolean;
  popupConfig: PopupAlgoConfig;
  elementBody: any;

  private subscriptions: Subscription[] = [];

  constructor(private eventService: EventService) {
    this.elementBody = document.querySelector('body');
    this.showPopup = false;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.eventService.popupAlgoOpen.subscribe(this.onPopupOpen),
      this.eventService.popupAlgoClose.subscribe(this.onPopupClose),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onPopupOpen = (data: PopupAlgoConfig) => {
    this.showPopup = true;
    this.popupConfig = data;
    this.elementBody.classList.add('blur-popup');
  }

  onPopupClose = () => {
    this.showPopup = false;
    this.popupConfig = null;
    this.elementBody.classList.remove('blur-popup');
  }

  onPopupCancel() {
    this.eventService.popupAlgoCancel.next({name: this.popupConfig.name});
  }
  onPopupConfirm() {
    this.eventService.popupAlgoConfirm.next({name: this.popupConfig.name});
  }

}
