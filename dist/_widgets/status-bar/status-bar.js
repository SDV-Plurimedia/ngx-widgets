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
var StatusBarComponent = (function () {
    function StatusBarComponent() {
    }
    StatusBarComponent.prototype.ngOnInit = function () {
    };
    StatusBarComponent.prototype.ngOnDestroy = function () {
    };
    StatusBarComponent.prototype.ngDoCheck = function () {
    };
    StatusBarComponent.prototype.ngOnChanges = function (changes) {
    };
    StatusBarComponent.prototype.ngAfterContentInit = function () {
    };
    StatusBarComponent.prototype.ngAfterContentChecked = function () {
    };
    StatusBarComponent.prototype.ngAfterViewInit = function () {
    };
    StatusBarComponent.prototype.ngAfterViewChecked = function () {
    };
    StatusBarComponent = __decorate([
        core_1.Component({
            selector: 'status-bar',
            template: "<div class=\"update-nag\">\n            <div class=\"update-split update-{{class}}\"><span class=\"fa fa-{{icon}}\"></span></div>\n            <div class=\"update-text\"> <ng-content></ng-content> </div>\n          </div>",
            styleUrls: ['./status-bar.css'],
            inputs: ['class', 'icon']
        }), 
        __metadata('design:paramtypes', [])
    ], StatusBarComponent);
    return StatusBarComponent;
}());
exports.StatusBarComponent = StatusBarComponent;
//# sourceMappingURL=status-bar.js.map