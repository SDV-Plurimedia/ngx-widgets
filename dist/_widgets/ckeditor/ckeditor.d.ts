import { EventEmitter } from '@angular/core';
export declare class CkeditorComponent {
    content: string;
    id: string;
    rows: number;
    disabled: boolean;
    contentChange: EventEmitter<{}>;
    drop: EventEmitter<{}>;
    instance: any;
    private isLoaded;
    config: boolean;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    private initCKeditor();
    textChanged(): void;
}
