import {Pipe} from '@angular/core';
@Pipe({ name: 'ucfirst' })
export class UcFirstPipe {
  transform(value: string) {
    return value?value.toLowerCase().replace(/(?:^|\s)[a-z]/g, function(m) {
      return m.toUpperCase();
    }):value;
  }
}
