import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Algo } from '../models/algo.interface';
import { AlgoService } from '../../core/services/algo.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { IAlgoInstanceType } from '../models/algo-instance.model';


@Component({
  selector: 'app-algo-list',
  templateUrl: './algo-list.component.html',
  styleUrls: ['./algo-list.component.scss']
})
export class AlgoListComponent implements AfterViewInit, OnDestroy {
  @ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;
  dataSource: Algo[] = [];
  temp: Algo[] = [];
  loadingIndicator = true;
  typing: any;
  doneTypingInterval: number;

  private subscriptions = new Subscription();

  constructor(private algoService: AlgoService) {
    this.doneTypingInterval = 1000;

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
    this.temp = [...this.dataSource];
  };

  isBigger({ row, column, value }): any {
    return {
      'block-cell': value.length > 30
    };
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    clearTimeout(this.typing);

    this.typing = setTimeout(() => {

      const filtered = this.temp.filter((algo) => {
        return algo.Name.toLocaleLowerCase().indexOf(val) !== -1
          || algo.Author.toLocaleLowerCase().indexOf(val) !== -1
          || !val;
      });

      this.dataSource = [...filtered];

    }, this.doneTypingInterval);
  }
}
