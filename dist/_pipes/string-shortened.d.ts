import { PipeTransform } from '@angular/core';
export declare class StringShortenedPipe implements PipeTransform {
    transform(value: string, length?: number): string;
}
