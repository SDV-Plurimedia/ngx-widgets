import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl } from "@angular/forms";
import { HttpL5Service } from "../../../_core/_services/http/http-l5";
export declare class IbpSearchComponent {
    private _httpL5Service;
    images: any[];
    searchTermControl: FormControl;
    selectedImages: any[];
    search_panel: boolean;
    search_panelChange: EventEmitter<{}>;
    ibpSelection: EventEmitter<{}>;
    private searchTermStream;
    items: Observable<{}>;
    constructor(_httpL5Service: HttpL5Service);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    onSubmit(): void;
    onChange(is_checked: boolean, img: any): void;
    onTheFySearch(subject: string): void;
    toggleSearchPanel(): void;
}
