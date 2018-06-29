import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserInstance } from '../../models/user-instance.interface';
import { IAlgoInstanceStatus } from '../../models/algo-instance.model';

@Component({
  selector: 'app-instances-table',
  templateUrl: './instances-table.component.html',
  styleUrls: ['./instances-table.component.scss']
})
export class InstancesTableComponent implements OnChanges {

  @Input() instances: UserInstance[];
  @Input() isLive: boolean;
  iAlgoInstanceStatus = IAlgoInstanceStatus;
  loadingIndicator: boolean;

  constructor() {
    this.loadingIndicator = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['instances'] && changes['instances'].currentValue) {
      this.instances = changes['instances'].currentValue;
      this.loadingIndicator = false;
    }
  }

  isBigger({ row, column, value }): any {
    return {
      'block-cell': value.length > 30
    };
  }

}
