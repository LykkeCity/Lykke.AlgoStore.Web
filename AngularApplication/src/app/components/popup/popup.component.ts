import { Component, OnInit } from '@angular/core';

import { PopupConfig } from '../../models/popup.interface';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  popupConfig: PopupConfig;
  elementBody: HTMLBodyElement;

  constructor(public bsModalRef: BsModalRef) {
    this.elementBody = document.querySelector('body');
  }

  ngOnInit() {
    this.onPopupOpen(this.popupConfig);
  }

  onPopupOpen = (data: PopupConfig) => {
    this.popupConfig = data;
    this.popupConfig.textClass = data.textClass ? data.textClass : 'text-left';
    this.elementBody.classList.add('blur-popup');
  };

  onPopupClose = () => {
    this.elementBody.classList.remove('blur-popup');
    this.bsModalRef.hide();
    this.popupConfig = null;
  };

  onPopupCancel(): void {
    if(this.popupConfig.errorCallback)
      this.popupConfig.errorCallback();

    this.bsModalRef.hide();
  }

  onPopupConfirm(): void {
    if(this.popupConfig.successCallback)
      this.popupConfig.successCallback();

    this.bsModalRef.hide();
  }

}
