import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Algo } from '../../models/algo.interface';
import { EventService } from '../../services/event.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-algo-detail',
  templateUrl: './algo-details.component.html',
  styleUrls: ['./algo-details.component.scss']
})
export class AlgoDetailsComponent implements OnInit {
  algo: Algo;
  log: string;
  subscriptions: Array<{event, id}>;
  logTimeout;

  constructor(private storeService: StoreService, private eventService: EventService, private notificationService: NotificationsService) { 
    
    this.algo = this.storeService.activeAlgo;

    this.storeService.algoGetLog(this.algo.Id);
    this.subscriptions = new Array();
    this.logTimeout = null;
  }

  ngOnInit() {
    this.subscriptions.push({
      event: 'algo:test:started',
      id: this.eventService.subscribeToEvent('algo:test:started', this.onAlgoStatusChanged.bind(this))
    });
    this.subscriptions.push({
      event: 'algo:test:stopped',
      id: this.eventService.subscribeToEvent('algo:test:stopped', this.onAlgoStatusChanged.bind(this))
    });
    this.subscriptions.push({
      event: 'algo:delete:done',
      id: this.eventService.subscribeToEvent('algo:delete:done', this.onAlgoStatusChanged.bind(this))
    });

    this.subscriptions.push({
      event: 'algo:log:done',
      id: this.eventService.subscribeToEvent('algo:log:done',  this.onAlgoLogDone.bind(this))
    });
    this.subscriptions.push({
      event: 'algo:log:error',
      id: this.eventService.subscribeToEvent('algo:log:error',  this.onAlgoLogError.bind(this))
    });
  }

  ngOnDestroy() {
    clearTimeout(this.logTimeout);
    this.subscriptions.forEach(value => this.eventService.unsubscribeToEvent(value.event, value.id));
  }

  onAlgoLogDone(log){
    this.log = log.message;

    // Setting a timeout since a successful execution of algoGetLog will result
    // in this method getting invoked again. (See ngOnInit)
    this.logTimeout = setTimeout(
      () => {
        this.storeService.algoGetLog(this.algo.Id);
      },
      5000
    );
  }

  onAlgoLogError(error){
    this.notificationService.error('Error', error.ErrorMessage);
  }

  onAlgoStatusChanged(){
    this.storeService.algoGetLog(this.algo.Id);
  }

}
