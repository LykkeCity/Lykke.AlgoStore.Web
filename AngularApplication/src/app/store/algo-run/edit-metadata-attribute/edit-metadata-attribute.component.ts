import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-metadata-attribute',
  templateUrl: './edit-metadata-attribute.component.html',
  styleUrls: ['./edit-metadata-attribute.component.scss']
})
export class EditMetadataAttributeComponent {

  @Input() metadataProperty: any;
  @Input() form: FormGroup;
  @Input() formName: string;
  @Output() onAssetPairChange = new EventEmitter();

  onChange(event: any): void {
    if (this.metadataProperty.Key !== 'AssetPair') {
      return;
    }

    const data = {
      assetPair: event
    };
    this.onAssetPairChange.emit(data);
  }

}
