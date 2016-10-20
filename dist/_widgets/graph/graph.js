"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var GraphComponent = (function () {
    function GraphComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    GraphComponent.prototype.ngOnInit = function () {
        this.graph_height = this.graph.height + 'px';
        this.graph_width = this.graph.width + 'px';
    };
    GraphComponent.prototype.ngAfterViewChecked = function () {
        this.graph.loadGraph();
    };
    GraphComponent = __decorate([
        core_1.Component({
            selector: 'graph',
            templateUrl: './graph.html',
            styleUrls: ['./graph.css'],
            inputs: ['graph']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], GraphComponent);
    return GraphComponent;
}());
exports.GraphComponent = GraphComponent;
//# sourceMappingURL=graph.js.map