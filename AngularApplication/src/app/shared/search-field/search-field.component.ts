import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent {

  @ViewChild('searchField') searchField: ElementRef;
  @Input() placeholder: string;
  @Input() searchFunc: Function;
  @Input() instanceSearch: boolean;

  @Output() onClear = new EventEmitter();

  clear(): void {
    this.onClear.emit();
    this.searchField.nativeElement.value = '';
    this.searchFunc({ target: { value: '' } });
  }
}
