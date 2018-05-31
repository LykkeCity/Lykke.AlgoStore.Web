import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlgoMetadata } from '../../models/algo-metadata.model';
import { BaseAlgoParam } from '../../models/base-algo-param.model';

@Component({
  selector: 'app-algo-metadata',
  templateUrl: './algo-metadata.component.html',
  styleUrls: ['./algo-metadata.component.scss']
})
export class AlgoMetadataComponent {

  @Input() metadata: AlgoMetadata;
  @Output() onHighlight = new EventEmitter<BaseAlgoParam>();
  showAll: boolean;

  highlight(param: BaseAlgoParam): void {
    this.onHighlight.emit(param);
  }
}
