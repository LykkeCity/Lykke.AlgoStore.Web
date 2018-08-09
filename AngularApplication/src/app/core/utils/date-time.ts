import * as moment from 'moment';

export const DATETIME_DISPLAY_FORMAT = 'YYYY-MM-DD HH:mm:ss';

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
}
