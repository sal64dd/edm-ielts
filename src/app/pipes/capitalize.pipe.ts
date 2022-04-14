import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cap'
})

export class CapitalizePipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    return value?.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
