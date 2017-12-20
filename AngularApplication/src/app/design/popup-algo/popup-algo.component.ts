import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PopupAlgoConfig } from '../../models/popup-algo.interface';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-popup-algo',
  templateUrl: './popup-algo.component.html',
  styleUrls: ['./popup-algo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupAlgoComponent implements OnInit {

  showPopup: boolean;
  popupConfig: PopupAlgoConfig;
  elementBody: any;

  constructor(private eventService: EventService) {
    this.elementBody = document.querySelector('body');
    this.showPopup = false;
    this.bindEvents();
  }

  ngOnInit() {
    this.eventService.subscribeToEvent('popup:algo:open', this.onPopupOpen.bind(this));
    this.eventService.subscribeToEvent('popup:algo:close', this.onPopupClose.bind(this));
  }

  bindEvents() {
    this.eventService.addEvent('popup:algo:open');
    this.eventService.addEvent('popup:algo:close');
    this.eventService.addEvent('popup:algo:confirm');
    this.eventService.addEvent('popup:algo:cancel');
  }

  onPopupOpen(data: PopupAlgoConfig) {
    this.showPopup = true;
    this.popupConfig = data;
    this.elementBody.classList.add('blur-popup');
  }

  onPopupClose(data) {
    this.showPopup = false;
    this.popupConfig = null;
    this.elementBody.classList.remove('blur-popup');
  }

  onPopupCancel() {
    this.eventService.emitEvent('popup:algo:cancel', {name: this.popupConfig.name});
  }
  onPopupConfirm() {
    this.eventService.emitEvent('popup:algo:confirm', {name: this.popupConfig.name});
  }

}
