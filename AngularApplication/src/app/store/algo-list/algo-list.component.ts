import {Component, ViewChild, OnInit, ChangeDetectorRef} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { StoreService } from '../../services/store.service';
import { Algo } from '../../models/algo.interface';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-algo-list',
  templateUrl: './algo-list.component.html',
  styleUrls: ['./algo-list.component.scss']
})
export class AlgoListComponent implements OnInit  {

  displayedColumns = ['Name', 'Description', 'Status', 'Actions'];
  dataSource = new MatTableDataSource<Algo>();
  showAlgoList = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private storeService: StoreService, 
    private eventService: EventService, 
    private router: Router) {

    this.storeService.algoGetAll();

    this.storeService.algos.subscribe(result => {
        this.dataSource.data = result;
        this.showAlgoList = result.length > 0 ? true : false;
    });
  }

  ngOnInit(){
    this.eventService.subscribeToEvent('algo:test:started', this.onAlgoStatusChanged.bind(this));
    this.eventService.subscribeToEvent('algo:test:stopped', this.onAlgoStatusChanged.bind(this));
    this.eventService.subscribeToEvent('algo:delete:done', this.onAlgoStatusChanged.bind(this));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  createNewAlgo() {
    this.storeService.activeAlgo = null;
    this.storeService.mode = 'create';
    this.storeService._algos.next([]);
    this.router.navigate(['store'])
  }

  details(algo: Algo) {
    this.storeService.activeAlgo = algo;
    this.router.navigate(['store/algo-details']);
    return false;
  }

  onAlgoStatusChanged(){
    this.storeService.algoGetAll();
  }
}