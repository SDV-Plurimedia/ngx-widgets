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
var ChevronComponent = (function () {
    function ChevronComponent() {
        this.hidden = false;
        this.hiddenChange = new core_1.EventEmitter();
    }
    ChevronComponent.prototype.change = function () {
        this.hidden = !this.hidden;
        this.hiddenChange.emit(this.hidden);
    };
    ChevronComponent = __decorate([
        core_1.Component({
            selector: 'chevron',
            templateUrl: './chevron.html',
            styleUrls: ['./chevron.css'],
            inputs: ['hidden'],
            outputs: ['hiddenChange']
        }), 
        __metadata('design:paramtypes', [])
    ], ChevronComponent);
    return ChevronComponent;
}());
exports.ChevronComponent = ChevronComponent;
//# sourceMappingURL=chevron.js.map