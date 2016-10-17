import { PipeTransform } from '@angular/core';
export declare class TimestampToDatePipe implements PipeTransform {
    transform(timestamp: any, format?: string): number;
}
