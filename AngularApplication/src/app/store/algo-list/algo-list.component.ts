import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Algo } from '../models/algo.interface';
import { AlgoService } from '../../services/algo.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-algo-list',
  templateUrl: './algo-list.component.html',
  styleUrls: ['./algo-list.component.scss']
})
export class AlgoListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;
  dataSource: Algo[] = [];
  loadingIndicator = false;

  private subscriptions = new Subscription();

  constructor(private algoService: AlgoService) {
  }

  ngOnInit() {
    this.loadingIndicator = true;
    this.subscriptions.add(this.algoService.getAllPublicAlgos().subscribe(this.onDataObtained));
  }


  ngAfterViewInit() {
    this.ngxDatatable.columnMode = ColumnMode.force;
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
