import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { UserInstance } from '../../models/user-instance.interface';
import { IAlgoInstanceStatus } from '../../models/algo-instance.model';
import { environment } from '../../../../environments/environment';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-instances-table',
  templateUrl: './instances-table.component.html',
  styleUrls: ['./instances-table.component.scss']
})
export class InstancesTableComponent implements OnChanges {

  @ViewChild(DatatableComponent) ngxDatatable: DatatableComponent;
  @Input() instances: UserInstance[];
  @Input() isLive: boolean;
  iAlgoInstanceStatus = IAlgoInstanceStatus;
  loadingIndicator: boolean;
  walletUrl = environment.walletApiUrl;

  constructor() {
    this.loadingIndicator = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['instances'] && changes['instances'].currentValue) {
      this.instances = changes['instances'].currentValue;
      this.loadingIndicator = false;
      this.ngxDatatable.columnMode = ColumnMode.force;
    }
  }

  isBigger({ row, column, value }): any {
    return {
      'block-cell': value.length > 30
    };
  }

}
