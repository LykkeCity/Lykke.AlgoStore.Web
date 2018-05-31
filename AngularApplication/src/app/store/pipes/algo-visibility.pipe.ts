import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'algoVisibility'
})
export class AlgoVisibilityPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 0:
        return 'Public';
      case 1:
        return 'Private';
      case 2:
        return 'Demo';
      default:
        return 'Unknown';
    }
  }

}
