import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'ucfirst' })

export class UcFirstPipe implements PipeTransform {
  transform(value: string) {
    return value ? value.toLowerCase().replace(/(?:^|\s)[a-z]/g, function(m) {
      return m.toUpperCase();
    }) : value;
  }
}
