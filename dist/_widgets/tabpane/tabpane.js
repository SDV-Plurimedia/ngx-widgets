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
var TabpaneComponent = (function () {
    function TabpaneComponent() {
        this.panel_mode = false;
        this.tabs = [];
    }
    TabpaneComponent.prototype.selectTab = function (tab) {
        this.tabs.forEach(function (tab) { return tab.active = false; });
        tab.active = true;
    };
    TabpaneComponent.prototype.addTab = function (tab) {
        if (this.tabs.length === 0) {
            tab.active = true;
        }
        this.tabs.push(tab);
    };
    TabpaneComponent = __decorate([
        core_1.Component({
            selector: 'tabpane',
            templateUrl: './tabpane.html',
            inputs: ['panel_mode']
        }), 
        __metadata('design:paramtypes', [])
    ], TabpaneComponent);
    return TabpaneComponent;
}());
exports.TabpaneComponent = TabpaneComponent;
//# sourceMappingURL=tabpane.js.map