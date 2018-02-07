import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { PopupConfig } from '../models/popup.interface';
import { SuccessMessageConfig } from '../models/successConfig.interface';
import { Status } from '../models/status.enum';

@Injectable()
export class EventService {
  algoTestStarted = new Subject<Status>();
  algoTestStopped = new Subject<Status>();
  algoTestError = new Subject<{ message: string }>();
  algoTestUpdated = new Subject<void>();

  algoDeleteDone = new Subject<{ algoId: any }>();
  algoDeleteError = new Subject<{ message: string }>();

  algoLogDone = new Subject<{ message: string }>();
  algoLogError = new Subject<{ message: string }>();

  algoTaillogDone = new Subject<{ message: string }>();
  algoTaillogError = new Subject<{ message: string }>();

  algoSaveDone = new Subject<string>();
  algoGetDone = new Subject<string>();

  algoDeploymentDone = new Subject<void>();
  algoDeploymentError = new Subject<{ message: string }>();

  successShow = new Subject<SuccessMessageConfig>();
  successHide = new Subject<void>();
}
