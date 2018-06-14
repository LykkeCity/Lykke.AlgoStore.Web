import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Algo } from '../models/algo.interface';
import { AlgoService } from '../../services/algo.service';


@Component({
  selector: 'app-algo-list',
  templateUrl: './algo-list.component.html',
  styleUrls: ['./algo-list.component.scss']
})
export class AlgoListComponent implements OnInit, OnDestroy {

  dataSource: Algo[] = [];
  loadingIndicator = false;

  private subscriptions = new Subscription();

  constructor(private algoService: AlgoService) {
  }

  ngOnInit() {
    this.loadingIndicator = true;
    this.subscriptions.add(this.algoService.getAllPublicAlgos().subscribe(this.onDataObtained));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onDataObtained = (result) => {
    this.loadingIndicator = false;
    this.dataSource = result;
  };

  isBigger({ row, column, value }): any {
    return {
      'block-cell': value.length > 30
    };
  }
}
