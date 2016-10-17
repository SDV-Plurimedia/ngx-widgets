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
var LoaderService = (function () {
    function LoaderService() {
        if (!LoaderService.isCreating) {
            throw new Error("You can't call new in Singleton instances! Please use getInstance() !");
        }
    }
    LoaderService.getInstance = function () {
        if (LoaderService.instance == null) {
            LoaderService.isCreating = true;
            LoaderService.instance = new LoaderService();
            LoaderService.isCreating = false;
        }
        return LoaderService.instance;
    };
    LoaderService.prototype.getMessage = function (state) {
        if (state === void 0) { state = 0; }
        var str = '<i class="fa fa-spinner fa-pulse"></i>&nbsp;Chargement en cours...';
        if (state > 0) {
            str += "<br/><div class=\"progress\">\n  <div class=\"progress-bar progress-bar-info progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"" + state + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: " + state + "0%\">\n    <span class=\"sr-only\">" + state + "% Complet\u00E9</span>\n  </div>\n</div>";
        }
        return str;
    };
    LoaderService.prototype.start = function () {
        var _this = this;
        if (!this.dialog) {
            jQuery().ready(function () {
                _this.dialog = bootbox.dialog({
                    message: _this.getMessage(0),
                    closeButton: false
                });
            });
        }
        else {
            console.log("LoaderService: Une popup de chargement existe deja");
        }
    };
    LoaderService.prototype.updateState = function (percent) {
        if (this.dialog) {
            this.dialog.modal('hide');
            this.dialog = bootbox.dialog({
                message: this.getMessage(Math.round(percent)),
                closeButton: false
            });
        }
    };
    LoaderService.prototype.stop = function () {
        if (this.dialog) {
            this.dialog.modal('hide');
            this.dialog = null;
        }
    };
    LoaderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LoaderService);
    return LoaderService;
}());
exports.LoaderService = LoaderService;
//# sourceMappingURL=loader.js.map