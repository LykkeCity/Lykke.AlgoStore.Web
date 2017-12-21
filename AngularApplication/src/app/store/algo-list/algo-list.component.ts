import {Component, ViewChild, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit} from '@angular/core';
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

  private subscriptions: Subscription[] = [];

  constructor(
    private storeService: StoreService,
    private eventService: EventService,
    private router: Router) {

    this.storeService.algoGetAll();

    this.subscriptions.push(
      this.storeService.algos.subscribe(result => {
        this.dataSource.data = result;
        this.showAlgoList = result.length > 0 ? true : false;
      })
    );
  }

  ngOnInit() {
    this.subscriptions.push(
      this.eventService.algoTestStarted.subscribe(this.onAlgoStatusChanged),
      this.eventService.algoTestStopped.subscribe(this.onAlgoStatusChanged),
      this.eventService.algoDeleteDone.subscribe(this.onAlgoStatusChanged),
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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

  onAlgoStatusChanged = () => {
    this.storeService.algoGetAll();
  }
}
