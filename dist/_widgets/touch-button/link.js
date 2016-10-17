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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var touch_button_1 = require("./touch-button");
var TouchButtonLinkComponent = (function () {
    function TouchButtonLinkComponent(parent, _element, renderer) {
        var _this = this;
        this.parent = parent;
        this._element = _element;
        this.renderer = renderer;
        this.tbclick = new core_1.EventEmitter();
        this.parent.addLink(this);
        this.renderer.listen(this._element.nativeElement, 'click', function () {
            if (_this.parent.state == "open") {
                _this.tbclick.emit(true);
            }
        });
    }
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TouchButtonLinkComponent.prototype, "tbclick", void 0);
    TouchButtonLinkComponent = __decorate([
        core_1.Component({
            template: "<li class=\"option\">\n    <button class=\"material-button option{{index}}\" type=\"button\">\n      <span class=\"fa fa-{{icon}}\" aria-hidden=\"true\"></span>\n    </button>\n  </li>",
            selector: 'tb-link',
            inputs: ['icon'],
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [touch_button_1.TouchButtonComponent, core_1.ElementRef, core_1.Renderer])
    ], TouchButtonLinkComponent);
    return TouchButtonLinkComponent;
}());
exports.TouchButtonLinkComponent = TouchButtonLinkComponent;
//# sourceMappingURL=link.js.map