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
var LazyloadDirective = (function () {
    function LazyloadDirective(_element, _renderer) {
        var _this = this;
        this._element = _element;
        this._renderer = _renderer;
        jQuery(this._element.nativeElement).attr("src", "/images/loading_spinner.gif");
        jQuery().ready(function () {
            jQuery(document).scroll(function (eventObject) {
                _this.onScroll();
            });
            jQuery(document).scroll();
        });
    }
    LazyloadDirective.prototype.onScroll = function () {
        var _this = this;
        var element = jQuery(this._element.nativeElement);
        var offset = element.offset();
        var scrollTop = jQuery(document).scrollTop();
        var clientHeight = document.body.clientHeight;
        if ((clientHeight + scrollTop) >= offset.top && element.attr('src') != this.img) {
            element.fadeOut(500, function () {
                element.attr("src", _this.img);
                element.fadeIn(500);
            });
        }
    };
    __decorate([
        core_1.Input('lazyload'), 
        __metadata('design:type', String)
    ], LazyloadDirective.prototype, "img", void 0);
    LazyloadDirective = __decorate([
        core_1.Directive({
            selector: '[lazyload]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], LazyloadDirective);
    return LazyloadDirective;
}());
exports.LazyloadDirective = LazyloadDirective;
//# sourceMappingURL=lazyload.js.map