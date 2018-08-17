import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instanceTypeName'
})
export class InstanceTypeNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 0:
        return 'Demo';
      case 1:
        return 'Live';
      case 2:
        return 'Test';
      case 3:
        return 'Errored';
      default:
        return 'Unknown';
    }
  }

}
