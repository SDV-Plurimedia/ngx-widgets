import {ElementRef, Renderer} from '@angular/core';
import {Graph, DataGraph, SimpleColor, Color} from './commun';

export class AreaChart implements Graph {
    public datas: DataGraph[];
    public colors: SimpleColor;
    public id: string;
    public grid: boolean;
    public required_files = [];
    protected margin = { top: 20, right: 30, bottom: 80, left: 40 };

    constructor(datas: DataGraph[], colors: SimpleColor, id: string,
        public height = 650,
        public y_label: string, public unite = "",
        public time = false, grid = true) {
        this.datas = datas;
        this.colors = colors;
        this.id = id;
        this.grid = grid;
    }

    loadGraph() {
        var color = this.colorTransform(this.colors.color);
        Morris.Area({
            element: this.id,
            lineColors: [color],
            data: this.datas,
            xkey: 'label',
            ykeys: ['value'],
            labels: [this.y_label],
            parseTime: false,
            fillOpacity: 0.5,
            pointSize: 1
        });
    }

    colorTransform(color: Color) {
        var r = color.r.toString(16);
        var g = color.g.toString(16);
        var b = color.b.toString(16);

        r = (r.length == 1) ? "0" + r : r;
        g = (g.length == 1) ? "0" + g : g;
        b = (b.length == 1) ? "0" + b : b;
        return '#' + r + g + b;
    }
}
