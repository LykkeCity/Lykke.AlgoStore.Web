import { Component, ElementRef, Input, ViewChild } from '@angular/core';

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

  clear(): void {
    this.searchField.nativeElement.value = '';
    this.searchFunc({ target: { value: '' } });
  }
}
