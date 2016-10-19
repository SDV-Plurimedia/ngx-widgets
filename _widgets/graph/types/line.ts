declare var Morris;

import {ElementRef, Renderer} from '@angular/core';
import {Graph, DataGraph, SimpleColor, Color} from './commun';

export enum Periodicite { Day, Week, Month, Year }

export class LineChart implements Graph {
    public datas: DataGraph[];
    public colors: SimpleColor;
    public id: string;
    public grid: boolean;
    public required_files = [];
    protected margin = { top: 20, right: 30, bottom: 80, left: 40 };
    protected time_functions: {
        periodicite: string,
        dateFormat: (number) => string,
        xLabelFormat: (string) => string
    }

    constructor(
        datas: DataGraph[],
        colors: SimpleColor,
        id: string,
        public height = 650,
        public y_label: string,
        public unite = "",
        public time = false,
        grid = true,
        periodicite: Periodicite = null) {
        this.datas = datas;
        this.colors = colors;
        this.id = id;
        this.grid = grid;
        // this.width = width - this.margin.left - this.margin.right;
        // this.height = height - this.margin.top - this.margin.bottom;
        this.prepareDateFormat(periodicite);
    }

    loadGraph() {
        var color = this.colorTransform(this.colors.color);
        Morris.Line({
            element: this.id,
            data: this.datas,
            grid: this.grid,
            gridTextColor: '#FFF',
            xkey: 'label',
            ykeys: ['value'],
            labels: [this.y_label],
            lineColors: [color],
            parseTime: this.time,
            hideHover: true,
            postUnits: this.unite,
            dateFormat: this.time_functions.dateFormat,
            xLabels: this.time_functions.periodicite,
            xLabelFormat: this.time_functions.xLabelFormat,
            xLabelAngle: 30
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

    prepareDateFormat(periodicite: Periodicite) {
        switch (periodicite) {
            case Periodicite.Day:
                this.time_functions = {
                    periodicite: 'day',
                    dateFormat: (x) => {
                        return new Date(x).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric"
                        })
                    },
                    xLabelFormat: (x) => {
                        var date = new Date(x);
                        //if (date.getDay() % 2 == 1)
                        return date.toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric"
                        });
                        /*else
                            return null;*/
                    }
                }
                break;
            case Periodicite.Week:
                this.time_functions = {
                    periodicite: 'week',
                    dateFormat: (x) => {
                        return new Date(x).toLocaleDateString("fr-FR", { year: "numeric", month: "numeric" })
                    },
                    xLabelFormat: (x) => {
                        var date = new Date(x);
                        //if(date.getMonth()%2 == 1)
                        return date.toLocaleDateString("fr-FR", { year: "numeric", month: "numeric" });
                        /*else
                         return null;*/
                    }
                }
                break;
            case Periodicite.Month:
                this.time_functions = {
                    periodicite: 'month',
                    dateFormat: (x) => {
                        return new Date(x).toLocaleDateString("fr-FR", { year: "numeric", month: "numeric" })
                    },
                    xLabelFormat: (x) => {
                        var date = new Date(x);
                        //if(date.getMonth()%2 == 1)
                        return date.toLocaleDateString("fr-FR", { year: "numeric", month: "numeric" });
                        /*else
                         return null;*/
                    }
                }
                break;
            case Periodicite.Year:
                this.time_functions = {
                    periodicite: 'year',
                    dateFormat: (x) => {
                        return new Date(x).toLocaleDateString("fr-FR", { year: "numeric" })
                    },
                    xLabelFormat: (x) => {
                        var date = new Date(x);
                        if (date.getFullYear() % 2 == 1)
                            return date.toLocaleDateString("fr-FR", { year: "numeric" });
                        else
                            return null;
                    }
                }
                break;
        }
    }
}
