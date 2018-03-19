import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'stringShortened' })

export class StringShortenedPipe implements PipeTransform {
  transform(value: string, length: number = 25): string {
    if (value) {
      // let maxsize = 25;
      // if (args[0])
      //   maxsize = parseInt(args);
      let maxsize = length - 3;
      if (value.length > maxsize) {
        return value.substring(0, maxsize) + '...';
      } else {
        return value;
      }
    } else {
      return '';
    }
  }
}
