import * as moment from 'moment';

export default class DateTime {

  static now(): string {
    return moment().toISOString();
  }

  static utcNow(): string {
    return moment().utc().toISOString();
  }

  static toUtc(datetime: string): string {
    return moment.utc(datetime).toISOString();
  }
}
