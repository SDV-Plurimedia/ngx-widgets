/// <reference path="../../../node_modules/moment/moment.d.ts" />
/// <reference types="es6-shim" />
import { ViewContainerRef, EventEmitter, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';
export interface CalendarDate {
    day: number;
    month: number;
    year: number;
    enabled: boolean;
}
export declare class DatepickerComponent implements AfterViewInit {
    isOpened: boolean;
    dateValue: string;
    viewValue: string;
    days: Array<CalendarDate>;
    dayNames: Array<string>;
    private el;
    private date;
    private viewContainer;
    private onChange;
    private onTouched;
    private cd;
    private cannonical;
    modelFormat: string;
    viewFormat: string;
    initDate: string;
    firstWeekDaySunday: boolean;
    isStatic: boolean;
    changed: EventEmitter<Date>;
    constructor(cd: NgModel, viewContainer: ViewContainerRef);
    ngAfterViewInit(): void;
    openDatepicker(): void;
    closeDatepicker(): void;
    prevYear(): void;
    prevMonth(): void;
    nextYear(): void;
    nextMonth(): void;
    selectDate(e: MouseEvent, date: CalendarDate): void;
    private generateCalendar(date);
    isSelected(date: CalendarDate): boolean;
    private generateDayNames();
    private initMouseEvents();
    value: any;
    private setValue(value);
    private initValue();
    writeValue(value: string): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: (_: any) => {}): void;
    private init();
}
