import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Algo } from '../models/algo.interface';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { DataTableDirective } from 'angular-datatables';
import { StoreService } from '../../services/store.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-algo-list-my-algos',
  templateUrl: './algo-list-my-algos.component.html',
  styleUrls: ['./algo-list-my-algos.component.scss']
})
export class AlgoListMyAlgosComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtInstance: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Algo> = new Subject();
  dataSource: Algo[] = [];
  showAlgoList = false;

  private subscriptions = new Subscription();

  constructor(private storeService: StoreService,
              private eventService: EventService) {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: false
    };

  }

  ngOnInit() {
    this.subscriptions.add(this.storeService.algoGetAll().subscribe(this.onDataObtained));
    this.subscriptions.add(this.eventService.algoTestStarted.subscribe(this.onAlgoStatusChanged));
    this.subscriptions.add(this.eventService.algoTestStopped.subscribe(this.onAlgoStatusChanged));
    this.subscriptions.add(this.eventService.algoDeleteDone.subscribe(this.onAlgoStatusChanged));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onDataObtained = (result) => {
    if (this.dtInstance) {
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
