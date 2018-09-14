import * as moment from 'moment';

export const DATETIME_DISPLAY_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATETIME_CHART_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';
export const ISO_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]';

export default class DateTime {

  static now(): string {
    return moment().toISOString();
  }

  static utcNow(): string {
    return moment().utc().toISOString();
  }

  static toUtc(datetime: string): string {
    return moment(datetime).toISOString();
  }

  static toISO(datetime: string): string {
    return moment(datetime).format(ISO_FORMAT);
  }

  static toDisplayFormat(datetime: string): string {
    return moment(datetime, ISO_FORMAT).format(DATETIME_DISPLAY_FORMAT);
  }

  static toChartFormat(datetime: string): string {
    return moment(datetime, ISO_FORMAT).format(DATETIME_CHART_FORMAT);
  }
}
