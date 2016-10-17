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
var static_loader_1 = require("../../_services/static-loader");
var SwitchComponent = (function () {
    function SwitchComponent() {
        var _this = this;
        var Loader = static_loader_1.StaticLoaderService.getInstance();
        this.dependenciesAreLoadedPromise = Loader.require_once([
            "/assets/bootstrap-switch/dist/js/bootstrap-switch.min.js",
            "/assets/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css"
        ]).then(function () {
            _this.dependenciesAreLoaded = true;
        });
    }
    SwitchComponent.prototype.ngOnInit = function () {
        var _this = this;
        var innerScope = this;
        this.dependenciesAreLoadedPromise.then(function () {
            innerScope.switch.options.onSwitchChange = function (event, state) {
                if (state == true)
                    innerScope.switch.callback_on.apply(innerScope.switch.scope);
                else
                    innerScope.switch.callback_off.apply(innerScope.switch.scope);
            };
            jQuery('#switch').bootstrapSwitch(_this.switch.options);
            jQuery('.bootstrap-switch-handle-on, .bootstrap-switch-handle-off, .bootstrap-switch-label')
                .css('height', 'auto');
        });
    };
    SwitchComponent = __decorate([
        core_1.Component({
            selector: 'switch',
            templateUrl: './switch.html',
            styleUrls: ['./switch.css'],
            inputs: ['switch']
        }), 
        __metadata('design:paramtypes', [])
    ], SwitchComponent);
    return SwitchComponent;
}());
exports.SwitchComponent = SwitchComponent;
//# sourceMappingURL=switch.js.map