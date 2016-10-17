import { EventEmitter, ElementRef } from '@angular/core';
export declare class AutocompleteComponent {
    private _eref;
    data: any;
    config: any;
    icon: string;
    valid: EventEmitter<{}>;
    private results;
    private placeholder;
    private inputValue;
    isActive: boolean;
    private inputForm;
    constructor(_eref: ElementRef);
    ngOnInit(): void;
    reduceResultList(value: string): string[];
    toggleDropdown(): void;
    getValue(item: any): any;
    getDisplayLabel(item: any): string;
    valideItem(item: any): void;
    onClick(event: any): void;
    private setCursorPosition(pos);
    private removeHighlight(pos);
    private getCurrentPosition();
    onKey(event: any): void;
}
