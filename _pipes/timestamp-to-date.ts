import { Pipe, PipeTransform } from '@angular/core';
declare var moment: any;

@Pipe({name: 'timestampToDate'})
export class TimestampToDatePipe implements PipeTransform {
  transform(timestamp: any, format: string = "DD/MM/YYYY [à] HH:mm:ss"): number {
    if(Number.isInteger(timestamp)){
      moment.locale('fr');
      return moment(timestamp*1000).format(format);
    }
    else{
      return timestamp;
    }

  }
}
