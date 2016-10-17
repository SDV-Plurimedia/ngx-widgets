import { ElementRef, Renderer } from '@angular/core';
export declare class LazyloadDirective {
    private _element;
    private _renderer;
    img: string;
    constructor(_element: ElementRef, _renderer: Renderer);
    onScroll(): void;
}
