import {Component, ViewChild, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
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
export class AlgoListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['Name', 'Description', 'Status', 'Actions'];
  dataSource = new MatTableDataSource<Algo>();
  showAlgoList = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private subscriptions = new Subscription();

  constructor(
    private storeService: StoreService,
    private eventService: EventService,
    private router: Router) {

  }

  ngOnInit() {
    this.subscriptions.add(this.storeService.algoGetAll().subscribe(this.onDataObtained));
    this.subscriptions.add(this.eventService.algoTestStarted.subscribe(this.onAlgoStatusChanged));
    this.subscriptions.add(this.eventService.algoTestStopped.subscribe(this.onAlgoStatusChanged));
    this.subscriptions.add(this.eventService.algoDeleteDone.subscribe(this.onAlgoStatusChanged));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createNewAlgo() {
    this.storeService.activeAlgo = null;
    this.storeService.mode = 'create';
    this.storeService._algos.next([]);
    this.router.navigate(['store']);
  }

  details(algo: Algo) {
    this.storeService.activeAlgo = algo;
    this.router.navigate(['store/algo-details']);
    return false;
  }

  onDataObtained = (result) => {
    this.dataSource.data = result;
    this.showAlgoList = result.length > 0;

  };

  onDataError = (result) => {
    console.log(result);
  };

  onAlgoStatusChanged = () => {
    this.subscriptions.add(this.storeService.algoGetAll().subscribe(this.onDataObtained, this.onDataError));
  };
}
