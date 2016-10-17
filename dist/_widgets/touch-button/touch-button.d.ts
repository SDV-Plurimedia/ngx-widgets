/// <reference types="es6-shim" />
import { ElementRef, Renderer } from '@angular/core';
import { TouchButtonLinkComponent } from "./link";
export declare class TouchButtonComponent {
    private element;
    private renderer;
    dependenciesAreLoaded: boolean;
    dependenciesAreLoadedPromise: Promise<any>;
    links: Array<TouchButtonLinkComponent>;
    state: string;
    constructor(element: ElementRef, renderer: Renderer);
    openTouchBtn(): void;
    addLink(link: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    ngOnChanges(changes: any): void;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
}
