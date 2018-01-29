import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { StoreService } from '../../services/store.service';
import { Algo } from '../../models/algo.interface';
import { EventService } from '../../services/event.service';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-algo-list',
  templateUrl: './algo-list.component.html',
  styleUrls: ['./algo-list.component.scss']
})
export class AlgoListComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtInstance: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Algo> = new Subject();
  dataSource: Algo[] = [];
  showAlgoList = false;

  private subscriptions = new Subscription();

  constructor(private storeService: StoreService,
              private eventService: EventService,
              private router: Router) {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: false
    };

  }

  ngOnInit() {
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
    this.router.navigate(['store/algo-details']);
    return false;
  }

  onDataObtained = (result) => {
    if(this.dtInstance) {
      this.dtInstance.destroy();
    }

    this.dataSource = result;
    this.showAlgoList = result.length > 0;
    this.dtTrigger.next();

    this.datatableElement.dtInstance.then(inst => {
      this.dtInstance = inst;
    });
  };

  onDataError = (result) => {
    console.log(result);
  };

  onAlgoStatusChanged = () => {
    this.subscriptions.add(this.storeService.algoGetAll().subscribe(this.onDataObtained, this.onDataError));
  };
}
