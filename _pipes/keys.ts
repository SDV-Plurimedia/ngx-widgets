import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        let tmp = { 'key' : key};
        for (let key2 in value[key]) {
          if (value[key].hasOwnProperty(key)) {
            tmp[key2] = value[key][key2];
          }
        }
        keys.push(tmp);
      }
    }
    return keys;
  }
}
