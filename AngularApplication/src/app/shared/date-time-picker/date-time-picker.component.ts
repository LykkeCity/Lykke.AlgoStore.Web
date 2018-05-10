import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnChanges {

  @Input() controlName: string;
  @Input() form: string;
  @Input() config: IDatePickerDirectiveConfig;

  public defaultData: IDatePickerDirectiveConfig = {
    format: 'YYYY-MM-DD HH:mm',
    monthFormat: 'MMMM YYYY',
    firstDayOfWeek: 'mo',
    showGoToCurrent: false,
  };

  constructor() {
    this.config = this.defaultData;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config'] && changes['config'].currentValue) {
      this.config = { ...this.defaultData, ...changes['config'].currentValue };
    }
  }

}
