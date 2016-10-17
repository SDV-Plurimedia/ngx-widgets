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
var WizardComponent = (function () {
    function WizardComponent() {
        this.steps = [];
        this.name_wip = "built";
        this.dependenciesAreLoaded = true;
    }
    WizardComponent.prototype.selectStep = function (step, event) {
        event.preventDefault();
        event.stopPropagation();
        this.steps.forEach(function (step_c) { return step_c.disactivate(); });
        step.activate();
        this.current_step = step.index;
        return false;
    };
    WizardComponent = __decorate([
        core_1.Component({
            selector: 'wizard',
            styleUrls: ["./wizard.css"],
            templateUrl: './wizard.html'
        }), 
        __metadata('design:paramtypes', [])
    ], WizardComponent);
    return WizardComponent;
}());
exports.WizardComponent = WizardComponent;
//# sourceMappingURL=wizard.js.map