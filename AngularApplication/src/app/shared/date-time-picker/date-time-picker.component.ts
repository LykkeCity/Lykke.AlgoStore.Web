import { Component, OnInit } from '@angular/core';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {

  public datePickerConfig: IDatePickerDirectiveConfig = {
    format: 'DD.MM.YYYY',
    monthFormat: 'MMMM YYYY',
    firstDayOfWeek: 'mo',
    showGoToCurrent: false,

  };

  constructor() { }

  ngOnInit() {
  }

}
