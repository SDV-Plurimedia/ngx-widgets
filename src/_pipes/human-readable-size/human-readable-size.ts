import {Pipe, PipeTransform} from '@angular/core';
/*
Exemple: {{ valeur-en-bytes |  human-readable-size }}
*/
@Pipe({name: 'human-readable-size'})
export class HumanReadableSizePipe implements PipeTransform {
  transform(fileSizeInBytes: number, args: string[]): any {
    let i = -1;
    let byteUnits = [' Ko', ' Mo', ' Go', ' To', 'Po', 'Eo', 'Zo', 'Yo'];

    do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  }
}
