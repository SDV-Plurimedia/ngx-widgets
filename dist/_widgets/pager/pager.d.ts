export declare class PagerComponent {
    pager: Pager;
    pageInterval: Array<any>;
    currentPage: number;
    nbPage: number;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    isCurrentPage(p: number): boolean;
    isFirstPage(): boolean;
    isLastPage(): boolean;
    goToPage(p: number): void;
    private _setAttributes();
}
export declare class Pager {
    private _scope;
    private _quantity;
    private _perPage;
    private _delta;
    private _actionCallback;
    private _from;
    private _pages;
    private _to;
    private _current;
    private _interval;
    constructor(_scope: any, _quantity: number, _perPage: number, _delta: number, _actionCallback: (from: number, to: number) => void);
    getCurrent(): number;
    getInterval(): number[];
    getPages(): number;
    private _setPages();
    private _setInterval();
    isCurrentPage(p: number): boolean;
    isFirstPage(): boolean;
    isLastPage(): boolean;
    goToPage(p: number): void;
    elementsToShow(): void;
}
