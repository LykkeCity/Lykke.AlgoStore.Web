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

  constructor(private storeService: StoreService, private eventService: EventService, private notificationService: NotificationsService) { 
    
    this.algo = this.storeService.activeAlgo;

    this.storeService.algoGetLog(this.algo.Id);

    this.eventService.subscribeToEvent('algo:test:started', this.onAlgoStatusChanged.bind(this));
    this.eventService.subscribeToEvent('algo:test:stopped', this.onAlgoStatusChanged.bind(this));
    this.eventService.subscribeToEvent('algo:delete:done', this.onAlgoStatusChanged.bind(this));

    this.eventService.subscribeToEvent('algo:log:done',  this.onAlgoLogDone.bind(this));
    this.eventService.subscribeToEvent('algo:log:error',  this.onAlgoLogError.bind(this));
  }

  ngOnInit() {
   
  }

  onAlgoLogDone(log){
    this.storeService.algoGetLog(this.algo.Id);
    this.log = log.message;
  }

  onAlgoLogError(error){
    this.notificationService.error('Error', error.ErrorMessage);
  }

  onAlgoStatusChanged(){
    this.storeService.algoGetLog(this.algo.Id);
  }

}
