import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { StoreService } from '../../services/store.service';
import { Algo } from '../../models/algo.interface';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-algo-list',
  templateUrl: './algo-list.component.html',
  styleUrls: ['./algo-list.component.scss']
})
export class AlgoListComponent implements OnInit, OnDestroy {

  dataSource: Algo[] = [];
  loadingIndicator = false;

  private subscriptions = new Subscription();

  constructor(private storeService: StoreService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadingIndicator = true;
    this.subscriptions.add(this.storeService.getAllPublicAlgos().subscribe(this.onDataObtained));
    this.subscriptions.add(this.eventService.algoTestStarted.subscribe(this.onAlgoStatusChanged));
    this.subscriptions.add(this.eventService.algoTestStopped.subscribe(this.onAlgoStatusChanged));
    this.subscriptions.add(this.eventService.algoDeleteDone.subscribe(this.onAlgoStatusChanged));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  details(algo: Algo): boolean {
    this.storeService.activeAlgo = algo;
    this.router.navigate([`store/algo-details/${algo.Id}`]);
    return false;
  }

  onDataObtained = (result) => {
    this.loadingIndicator = false;
    this.dataSource = result;
  };

  onDataError = (result) => {
    console.log(result);
  };

  onAlgoStatusChanged = () => {
    this.subscriptions.add(this.storeService.algoGetAll().subscribe(this.onDataObtained, this.onDataError));
  };
}
