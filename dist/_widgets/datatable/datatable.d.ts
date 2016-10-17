/// <reference path="../../../_widgets/datatable/datatable.d.ts" />
/// <reference types="es6-shim" />
import { ElementRef, Renderer, DoCheck, IterableDiffers } from '@angular/core';
export declare class DatatableComponent implements DoCheck {
    private _element;
    private renderer;
    private differs;
    private table_elem;
    private table;
    private language;
    data: Array<any>;
    private footer;
    private header;
    private paging;
    private ordering;
    private info;
    private columnDefs;
    structure: Array<any>;
    private buttons;
    dependenciesAreLoaded: boolean;
    dependenciesAreLoadedPromise: Promise<any>;
    private parent_scope;
    private differ;
    constructor(_element: ElementRef, renderer: Renderer, differs: IterableDiffers);
    destroyTable(JQdestroy?: boolean): void;
    buildTable(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    getValue(ligne: any, id: string): any;
}
