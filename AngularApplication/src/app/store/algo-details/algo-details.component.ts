import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { StoreService } from '../../services/store.service';
import { Algo } from '../../models/algo.interface';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-algo-detail',
  templateUrl: './algo-details.component.html',
  styleUrls: ['./algo-details.component.scss']
})
export class AlgoDetailsComponent implements OnInit, OnDestroy {
  algo: Algo;
  log: string;
  private subscriptions: Subscription[] = [];
  logTimeout;

  constructor(
    private storeService: StoreService,
    private eventService: EventService,
    private router: Router,
    private notificationService: NotificationsService) {

    this.algo = this.storeService.activeAlgo;

    this.storeService.algoGetTailLog(this.algo.Id);
    this.logTimeout = null;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.eventService.algoTestStarted.subscribe(this.onAlgoStatusChanged),
      this.eventService.algoTestStopped.subscribe(this.onAlgoStatusChanged),
      this.eventService.algoDeleteDone.subscribe(this.onDeleteDone),
      this.eventService.algoTaillogDone.subscribe(this.onAlgoLogDone),
      this.eventService.algoTaillogError.subscribe(this.onAlgoLogError),
    );
  }

  ngOnDestroy() {
    clearTimeout(this.logTimeout);
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onAlgoLogDone = (log: {message: string}) => {
    this.log = log.message;

    // Setting a timeout since a successful execution of algoGetLog will result
    // in this method getting invoked again. (See ngOnInit)
    this.logTimeout = setTimeout(
      () => {
        this.storeService.algoGetTailLog(this.algo.Id);
      },
      5000
    );
  }

  onAlgoLogError = (error: {message: string}) => {
    this.notificationService.error('Error', error.message);
  }

  onDeleteDone = () => {
    this.router.navigate(['store/algo-list']);
  }

  onAlgoStatusChanged = () => {
    this.storeService.algoGetTailLog(this.algo.Id);
  }

}
