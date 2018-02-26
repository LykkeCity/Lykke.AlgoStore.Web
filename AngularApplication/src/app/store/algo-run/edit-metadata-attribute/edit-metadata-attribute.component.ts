import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-metadata-attribute',
  templateUrl: './edit-metadata-attribute.component.html',
  styleUrls: ['./edit-metadata-attribute.component.scss']
})
export class EditMetadataAttributeComponent implements OnInit {

  @Input() metadataProperty: any;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
