import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instanceStatusName'
})
export class InstanceStatusNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 0:
        return 'Deploying';
      case 1:
        return 'Running';
      case 2:
        return 'Stopped';
      case 3:
        return 'Errored';
      default:
        return 'Unknown';
    }
  }

}
