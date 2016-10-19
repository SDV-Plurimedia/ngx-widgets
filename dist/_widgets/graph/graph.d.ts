import { ElementRef, Renderer } from '@angular/core';
import { Graph } from './types/commun';
export declare class GraphComponent {
    private element;
    private renderer;
    graph: Graph;
    graph_width: any;
    graph_height: any;
    constructor(element: ElementRef, renderer: Renderer);
    ngOnInit(): void;
}
