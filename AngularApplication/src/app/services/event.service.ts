import { Subscription } from 'rxjs/Subscription';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Status } from '../models/status.enum';
import { PopupConfig } from '../models/popup.interface';
import { PopupAlgoConfig } from '../models/popup-algo.interface';
import { SuccessMessageConfig } from '../models/successConfig.interface';

@Injectable()
export class EventService  {

  algoTestStarted = new Subject<Status>();
  algoTestStopped = new Subject<void>();
  algoTestError = new Subject<{message: string}>();
  algoTestUpdated = new Subject<void>();

  algoDeleteDone = new Subject<{algoId: any}>();
  algoDeleteError = new Subject<{message: string}>();

  algoLogDone = new Subject<{message: string}>();
  algoLogError = new Subject<{message: string}>();

  algoTaillogDone = new Subject<{message: string}>();
  algoTaillogError = new Subject<{message: string}>();

  algoDeploymentDone = new Subject<void>();
  algoDeploymentError = new Subject<{message: string}>();

  popupOpen = new Subject<PopupConfig>();
  popupClose = new Subject<PopupConfig>();
  popupCancel = new Subject<{name: string}>();
  popupConfirm = new Subject<{name: string}>();

  popupAlgoOpen = new Subject<PopupAlgoConfig>();
  popupAlgoClose = new Subject<void>();
  popupAlgoCancel = new Subject<{name: string}>();
  popupAlgoConfirm = new Subject<{name: string}>();

  successShow = new Subject<SuccessMessageConfig>();
  successHide = new Subject<void>();
}
