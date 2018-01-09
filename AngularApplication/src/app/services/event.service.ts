import { Subscription } from 'rxjs/Subscription';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { PopupConfig } from '../models/popup.interface';
import { SuccessMessageConfig } from '../models/successConfig.interface';

@Injectable()
export class EventService  {

  popupOpen = new Subject<PopupConfig>();
  popupClose = new Subject<PopupConfig>();
  popupCancel = new Subject<PopupConfig>();
  popupConfirm = new Subject<PopupConfig>();

  successShow = new Subject<SuccessMessageConfig>();
  successHide = new Subject<void>();
}
