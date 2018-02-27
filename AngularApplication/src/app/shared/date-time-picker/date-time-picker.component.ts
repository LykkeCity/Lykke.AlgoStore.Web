import { Component, Input, OnInit } from '@angular/core';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {

  @Input() controlName: string;
  @Input() form: string;

  public datePickerConfig: IDatePickerDirectiveConfig = {
    format: 'YYYY-MM-DD HH:mm',
    monthFormat: 'MMMM YYYY',
    firstDayOfWeek: 'mo',
    showGoToCurrent: false,

  };

  constructor() { }

  ngOnInit() {
  }

}
