import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { StoreService } from '../../services/store.service';
import { Algo } from '../../models/algo.interface';
import { EventService } from '../../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-algo-detail',
  templateUrl: './algo-details.component.html',
  styleUrls: ['./algo-details.component.scss']
})
export class AlgoDetailsComponent implements OnInit, OnDestroy {
  algo: Algo;
  log: string;
  private subscriptions = new Subscription();
  logInterval;
  private subscribeToLogTailData: any;

  constructor(
    private storeService: StoreService,
    private eventService: EventService,
    private router: Router,
    private notificationService: NotificationsService) {

    this.algo = this.storeService.activeAlgo;

    this.logInterval = null;

  }

  ngOnInit() {
    this.subscriptions.add(this.eventService.algoTestStarted.subscribe(this.onAlgoStatusChanged));
    this.subscriptions.add(this.eventService.algoTestStopped.subscribe(this.onAlgoStatusChanged));
    this.subscriptions.add(this.eventService.algoDeleteDone.subscribe(this.onDeleteDone));
    this.subscriptions.add(this.eventService.algoTaillogError.subscribe(this.onAlgoLogError));

    this.subscribeToLogTailData = this.storeService.algoGetTailLog(this.algo.Id, 1000).subscribe(this.onAlgoLogDone);
  }

  ngOnDestroy() {
    clearInterval(this.logInterval);
    this.subscriptions.unsubscribe();
  }

  onAlgoLogDone = (log: {Log: string}) => {

    this.log += log.Log;
    this.subscribeToLogTailData.unsubscribe();
    this.subscribeToLogTailData = this.storeService.algoGetTailLog(this.algo.Id, 1000).subscribe(this.onAlgoLogDone);
  }

  onAlgoLogError = (error: { message: string }) => {
    this.notificationService.error('Error', error.message);
  }

  onDeleteDone = () => {
    this.router.navigate(['store/algo-list']);
  }

  onAlgoStatusChanged = () => {
    this.storeService.algoGetTailLog(this.algo.Id, 1000);
  }

}
