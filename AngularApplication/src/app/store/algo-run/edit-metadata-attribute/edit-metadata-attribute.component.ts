import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-metadata-attribute',
  templateUrl: './edit-metadata-attribute.component.html',
  styleUrls: ['./edit-metadata-attribute.component.scss']
})
export class EditMetadataAttributeComponent implements OnChanges {

  @Input() metadataProperty: any;
  @Input() form: FormGroup;
  @Input() formName: string;
  @Output() onAssetPairChange = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metadataProperty'] && changes['metadataProperty'].currentValue) {
      const prop = changes['metadataProperty'].currentValue;
      if (!prop.Value) {
        this.form.controls[prop.Key].setValue(null);
      }
    }
  }

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
