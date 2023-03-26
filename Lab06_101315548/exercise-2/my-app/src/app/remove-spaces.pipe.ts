import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpaces'
})
export class RemoveSpacesPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    if (!value) {
      return value;
    }
      return value.replace(/-/g, ' ');
    }
}
