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
var wizard_1 = require("./wizard");
var WizartStepComponent = (function () {
    function WizartStepComponent(parent) {
        this.parent = parent;
        this.active = false;
        this.parent.steps.push(this);
    }
    WizartStepComponent.prototype.ngOnInit = function () {
        this.active = false;
        if (this.state == "current") {
            this.active = true;
            this.parent.current_step = this.index;
        }
        this.XSsize = Math.floor(12 / this.parent.steps.length);
        this.updateRendering();
    };
    WizartStepComponent.prototype.ngOnChanges = function (changes) {
        this.updateRendering();
    };
    WizartStepComponent.prototype.updateRendering = function () {
        switch (this.state) {
            case "complete":
                this.value = 100;
                break;
            case "current":
                this.value = 50;
                break;
            default:
                this.value = 0;
                break;
        }
    };
    WizartStepComponent.prototype.disactivate = function () {
        console.log("Désactivation");
        this.active = false;
        if (this.state !== "disable") {
            if (this.parent.current_step < this.index) {
                this.state = "next";
            }
            else {
                this.state = "complete";
            }
        }
        this.updateRendering();
    };
    WizartStepComponent.prototype.activate = function () {
        console.log("Activation de l'etape courante");
        this.active = true;
        this.state = 'current';
        this.updateRendering();
    };
    WizartStepComponent = __decorate([
        core_1.Component({
            template: "<div [style.display]=\"active?'inherit':'none'\">\n  <ng-content></ng-content>\n  </div>",
            selector: 'wizard-step',
            inputs: ['state', 'title']
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [wizard_1.WizardComponent])
    ], WizartStepComponent);
    return WizartStepComponent;
}());
exports.WizartStepComponent = WizartStepComponent;
//# sourceMappingURL=step.js.map