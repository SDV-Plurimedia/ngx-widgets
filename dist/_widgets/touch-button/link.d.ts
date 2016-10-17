import { EventEmitter, ElementRef, Renderer } from '@angular/core';
import { TouchButtonComponent } from "./touch-button";
export declare class TouchButtonLinkComponent {
    private parent;
    private _element;
    private renderer;
    tbclick: EventEmitter<boolean>;
    index: number;
    constructor(parent: TouchButtonComponent, _element: ElementRef, renderer: Renderer);
}
