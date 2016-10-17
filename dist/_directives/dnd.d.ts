import { ElementRef, Renderer } from '@angular/core';
export declare class DNDDirective {
    private _el;
    private renderer;
    dropZoneClass: string;
    targetClass: string;
    defaultBackground: string;
    private _isTarget;
    constructor(_el: ElementRef, renderer: Renderer);
    dragStart(event: any): void;
    drag(): void;
    dragEnd(event: any): void;
    dragEnter(event: any): void;
    dragOver(event: any): void;
    dragLeave(event: any): void;
    drop(event: any): void;
    setDropZoneExtra(name: string): HTMLDivElement;
    isConcerned(target: any): boolean;
    isTarget(target: any): any;
    appendGrid(): HTMLDivElement;
}
