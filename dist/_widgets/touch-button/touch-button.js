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
var TouchButtonComponent = (function () {
    function TouchButtonComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.state = "closed";
        this.links = [];
        this.dependenciesAreLoaded = true;
    }
    TouchButtonComponent.prototype.openTouchBtn = function () {
        console.log("open");
        this.state = (this.state == "closed") ? "open" : "closed";
        $(this.element.nativeElement).toggleClass('open');
        $(this.element.nativeElement).find('.option').toggleClass('scale-on');
    };
    TouchButtonComponent.prototype.addLink = function (link) {
        this.links.push(link);
        link.index = this.links.length;
    };
    TouchButtonComponent.prototype.ngOnInit = function () {
    };
    TouchButtonComponent.prototype.ngOnDestroy = function () {
    };
    TouchButtonComponent.prototype.ngDoCheck = function () {
    };
    TouchButtonComponent.prototype.ngOnChanges = function (changes) {
    };
    TouchButtonComponent.prototype.ngAfterContentInit = function () {
    };
    TouchButtonComponent.prototype.ngAfterContentChecked = function () {
    };
    TouchButtonComponent.prototype.ngAfterViewInit = function () {
    };
    TouchButtonComponent.prototype.ngAfterViewChecked = function () {
    };
    TouchButtonComponent = __decorate([
        core_1.Component({
            selector: 'touch-button',
            templateUrl: './touch-button.html',
            styleUrls: ["./touch-button.css"]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], TouchButtonComponent);
    return TouchButtonComponent;
}());
exports.TouchButtonComponent = TouchButtonComponent;
//# sourceMappingURL=touch-button.js.map