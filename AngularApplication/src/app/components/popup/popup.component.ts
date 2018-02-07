import { Component, OnDestroy, OnInit } from '@angular/core';

import { PopupConfig } from '../../models/popup.interface';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {
  popupConfig: PopupConfig;
  elementBody: HTMLBodyElement;

  constructor(public bsModalRef: BsModalRef) {
    this.elementBody = document.querySelector('body');
  }

  ngOnInit() {
    this.popupConfig.textClass = this.popupConfig.textClass ? this.popupConfig.textClass : 'text-left';
    this.elementBody.classList.add('blur-popup');
  }

  ngOnDestroy() {
    this.elementBody.classList.remove('blur-popup');
  }

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
