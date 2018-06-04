import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AlgoMetadata } from '../../models/algo-metadata.model';
import { BaseAlgoParam } from '../../models/base-algo-param.model';

@Component({
  selector: 'app-algo-metadata',
  templateUrl: './algo-metadata.component.html',
  styleUrls: ['./algo-metadata.component.scss']
})
export class AlgoMetadataComponent implements OnChanges {

  @Input() metadata: AlgoMetadata;
  @Output() onHighlight = new EventEmitter<BaseAlgoParam>();
  showAll: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metadata'] && changes['metadata'].currentValue) {
      this.metadata = changes['metadata'].currentValue;

      this.metadata.Parameters.forEach(param => {
        if (param['PredefinedValues'].length) {
          param.Value = param['PredefinedValues'].find(p => p.Value === param.Value).Key;
        }
      });

      this.metadata.Functions.forEach(func => {
        func.Parameters.forEach(param => {
          if (param['PredefinedValues'].length) {
            param.Value = param['PredefinedValues'].find(p => p.Value === param.Value).Key;
          }
        });
      });
    }
  }

  highlight(param: BaseAlgoParam): void {
    this.onHighlight.emit(param);
  }
}
