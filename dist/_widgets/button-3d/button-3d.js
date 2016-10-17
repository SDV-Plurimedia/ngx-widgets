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
var Button3dComponent = (function () {
    function Button3dComponent() {
        this.class = "default";
        this.size = "";
    }
    Button3dComponent = __decorate([
        core_1.Component({
            selector: 'button3d',
            template: "<button type=\"button\" class=\"btn btn-{{class}} {{size}} btn3d\">\n  <span class=\"fa fa-{{icon}}\"></span> <ng-content></ng-content>\n  </button>",
            styleUrls: ['./button-3d.css'],
            inputs: ['icon', 'class', 'size']
        }), 
        __metadata('design:paramtypes', [])
    ], Button3dComponent);
    return Button3dComponent;
}());
exports.Button3dComponent = Button3dComponent;
//# sourceMappingURL=button-3d.js.map