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
var CornerButtonComponent = (function () {
    function CornerButtonComponent() {
    }
    CornerButtonComponent.prototype.ngOnInit = function () {
    };
    CornerButtonComponent.prototype.ngOnDestroy = function () {
    };
    CornerButtonComponent.prototype.ngDoCheck = function () {
    };
    CornerButtonComponent.prototype.ngOnChanges = function (changes) {
    };
    CornerButtonComponent.prototype.ngAfterContentInit = function () {
    };
    CornerButtonComponent.prototype.ngAfterContentChecked = function () {
    };
    CornerButtonComponent.prototype.ngAfterViewInit = function () {
    };
    CornerButtonComponent.prototype.ngAfterViewChecked = function () {
    };
    CornerButtonComponent = __decorate([
        core_1.Component({
            selector: 'corner-button',
            template: "<a class=\"btn icon-btn btn-{{class}}\" role=\"button\"><span class=\"btn-corner fa fa-{{icon}} img-circle text-muted\"></span><ng-content></ng-content></a>",
            styles: ["\n    .btn-corner { padding:8px; background:#ffffff; margin-right:4px; width: 32px}\n    .icon-btn { padding: 2px 15px 3px 2px; border-radius:50px;}\n  "],
            inputs: ['class', 'icon']
        }), 
        __metadata('design:paramtypes', [])
    ], CornerButtonComponent);
    return CornerButtonComponent;
}());
exports.CornerButtonComponent = CornerButtonComponent;
//# sourceMappingURL=corner-button.js.map