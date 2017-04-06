declare let d3;

import {ElementRef, Renderer} from '@angular/core';
import {Graph, DataGraph, SimpleColor, Color} from './commun';

export class BarChart implements Graph {
    public datas: DataGraph[];
    public colors: SimpleColor;
    public id: string;
    public required_files = [];
    protected margin = { top: 20, right: 20, bottom: 30, left: 40 };

    constructor(datas: DataGraph[], colors: SimpleColor, id: string,
        public height = 500,
        public y_label: string) {
        this.datas = datas;
        this.colors = colors;
        this.id = id;
        this.height = height;
    }

    getTick() {
        let max = d3.max(this.datas, (d) => { return d.value; });
        return Math.round(max / 10);
    }

    loadGraph() {
        Morris.Bar({
            element: this.id,
            data: this.datas,
            xkey: 'label',
            ykeys: ['value'],
            labels: [this.y_label],
            barColors: [this.colorTransform(this.colors.color)],
            hideHover: true
        });
    }

    colorTransform(color: Color) {
        let r = color.r.toString(16);
        let g = color.g.toString(16);
        let b = color.b.toString(16);

        r = (r.length === 1) ? '0' + r : r;
        g = (g.length === 1) ? '0' + g : g;
        b = (b.length === 1) ? '0' + b : b;
        return '#' + r + g + b;
    }
}
