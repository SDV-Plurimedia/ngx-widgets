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
var MenuInterneComponent = (function () {
    function MenuInterneComponent() {
        this.title = "Sous-menu";
        this.items = [];
        this.icon = "";
        this.tooltip = "";
        this.open = true;
        this.select = new core_1.EventEmitter();
        this.button = new core_1.EventEmitter();
        this.openChange = new core_1.EventEmitter();
    }
    MenuInterneComponent.prototype.ngOnInit = function () {
    };
    MenuInterneComponent.prototype.ngOnDestroy = function () {
    };
    MenuInterneComponent.prototype.desactiveAll = function (items) {
        var _this = this;
        items.forEach(function (item) {
            item.active = false;
            if (item.subitems) {
                _this.desactiveAll(item.subitems);
            }
        });
    };
    MenuInterneComponent.prototype.selectItem = function (item, parentItem) {
        if (parentItem === void 0) { parentItem = null; }
        this.desactiveAll(this.items);
        item.active = true;
        if (parentItem) {
            parentItem.active = true;
        }
        this.select.emit(item);
    };
    MenuInterneComponent.prototype.toggleState = function () {
        this.open = !this.open;
        this.openChange.emit(this.open);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuInterneComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuInterneComponent.prototype, "button", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuInterneComponent.prototype, "openChange", void 0);
    MenuInterneComponent = __decorate([
        core_1.Component({
            selector: 'menu-interne',
            templateUrl: './menu-interne.html',
            styleUrls: ['./menu-interne.css'],
            inputs: ['items', 'icon', 'tooltip', 'title', 'open']
        }), 
        __metadata('design:paramtypes', [])
    ], MenuInterneComponent);
    return MenuInterneComponent;
}());
exports.MenuInterneComponent = MenuInterneComponent;
var MenuItemBadge = (function () {
    function MenuItemBadge(obj) {
        var _this = this;
        this.class = "success";
        this.number = 0;
        if (obj) {
            var properties = Object.keys(this);
            properties.forEach(function (prop) {
                if (obj[prop] !== undefined && obj[prop] !== null)
                    _this[prop] = obj[prop];
            });
        }
    }
    return MenuItemBadge;
}());
exports.MenuItemBadge = MenuItemBadge;
var MenuItem = (function () {
    function MenuItem(obj) {
        var _this = this;
        this.icon = "";
        this.title = "";
        this.badge = null;
        this.subitems = null;
        this.active = false;
        if (obj) {
            var properties = Object.keys(this);
            properties.forEach(function (prop) {
                if (obj[prop] !== undefined && obj[prop] !== null)
                    _this[prop] = obj[prop];
            });
        }
    }
    return MenuItem;
}());
exports.MenuItem = MenuItem;
//# sourceMappingURL=menu-interne.js.map