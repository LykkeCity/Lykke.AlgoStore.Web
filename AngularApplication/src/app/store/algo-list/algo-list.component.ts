import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { StoreService } from '../../services/store.service';
import { Algo } from '../models/algo.interface';


@Component({
  selector: 'app-algo-list',
  templateUrl: './algo-list.component.html',
  styleUrls: ['./algo-list.component.scss']
})
export class AlgoListComponent implements OnInit, OnDestroy {

  dataSource: Algo[] = [];
  loadingIndicator = false;

  private subscriptions = new Subscription();

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.loadingIndicator = true;
    this.subscriptions.add(this.storeService.getAllPublicAlgos().subscribe(this.onDataObtained));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onDataObtained = (result) => {
    this.loadingIndicator = false;
    this.dataSource = result;
  };
}
