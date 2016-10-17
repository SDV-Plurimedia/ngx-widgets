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
var PagerComponent = (function () {
    function PagerComponent() {
    }
    PagerComponent.prototype.ngOnInit = function () {
        this.pager.elementsToShow();
        this._setAttributes();
    };
    PagerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.pager) {
            this.pager = changes.pager.currentValue;
            this.goToPage(1);
        }
    };
    PagerComponent.prototype.isCurrentPage = function (p) {
        return this.pager.isCurrentPage(p);
    };
    PagerComponent.prototype.isFirstPage = function () {
        return this.pager.isFirstPage();
    };
    PagerComponent.prototype.isLastPage = function () {
        return this.pager.isLastPage();
    };
    PagerComponent.prototype.goToPage = function (p) {
        this.pager.goToPage(p);
        this._setAttributes();
    };
    PagerComponent.prototype._setAttributes = function () {
        this.pageInterval = this.pager.getInterval();
        this.currentPage = this.pager.getCurrent();
        this.nbPage = this.pager.getPages();
    };
    PagerComponent = __decorate([
        core_1.Component({
            selector: 'pager',
            styleUrls: ['./pager.css'],
            templateUrl: './pager.html',
            inputs: ['pager']
        }), 
        __metadata('design:paramtypes', [])
    ], PagerComponent);
    return PagerComponent;
}());
exports.PagerComponent = PagerComponent;
var Pager = (function () {
    function Pager(_scope, _quantity, _perPage, _delta, _actionCallback) {
        if (_perPage === void 0) { _perPage = 10; }
        if (_delta === void 0) { _delta = 5; }
        this._scope = _scope;
        this._quantity = _quantity;
        this._perPage = _perPage;
        this._delta = _delta;
        this._actionCallback = _actionCallback;
        this._current = 1;
        this._interval = [];
        this._setPages();
        this._setInterval();
    }
    Pager.prototype.getCurrent = function () {
        return this._current;
    };
    Pager.prototype.getInterval = function () {
        return this._interval;
    };
    Pager.prototype.getPages = function () {
        return this._pages;
    };
    Pager.prototype._setPages = function () {
        this._pages = Math.ceil(this._quantity / this._perPage);
    };
    Pager.prototype._setInterval = function () {
        this._interval = [];
        if (this._pages >= this._delta) {
            var median = Math.ceil(this._delta / 2);
            var d0 = this._delta - median;
            if (this._current >= median) {
                if (this._current >= this._pages - d0) {
                    for (var i = this._pages - this._delta + 1; i <= this._pages; i++)
                        this._interval.push(i);
                }
                else {
                    for (var i = this._current; i < this._current + this._delta; i++)
                        this._interval.push(i - d0);
                }
            }
            else {
                for (var i = 1; i <= this._delta; i++)
                    this._interval.push(i);
            }
        }
        else {
            for (var i = 1; i <= this._pages; i++)
                this._interval.push(i);
        }
    };
    Pager.prototype.isCurrentPage = function (p) {
        return this._current === p;
    };
    Pager.prototype.isFirstPage = function () {
        return this._current === 1;
    };
    Pager.prototype.isLastPage = function () {
        return this._current === this._pages;
    };
    Pager.prototype.goToPage = function (p) {
        this._current = p;
        this._setInterval();
        this.elementsToShow();
    };
    Pager.prototype.elementsToShow = function () {
        if (this._current === 1)
            this._from = 0;
        else
            this._from = (this._current - 1) * this._perPage;
        this._to = this._from + this._perPage - 1;
        this._actionCallback.apply(this._scope, [this._from, this._to]);
    };
    return Pager;
}());
exports.Pager = Pager;
//# sourceMappingURL=pager.js.map