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
var StaticLoaderService = (function () {
    function StaticLoaderService() {
        if (!StaticLoaderService.isCreating) {
            throw new Error("You can't call new in Singleton instances! Please use getInstance() !");
        }
    }
    StaticLoaderService.prototype.debug = function (message) {
    };
    StaticLoaderService.getInstance = function () {
        if (StaticLoaderService.instance == null) {
            StaticLoaderService.isCreating = true;
            StaticLoaderService.instance = new StaticLoaderService();
            StaticLoaderService.isCreating = false;
            StaticLoaderService.promiseLoaded = [];
        }
        return StaticLoaderService.instance;
    };
    StaticLoaderService.prototype.require_once = function (depend) {
        if (Array.isArray(depend)) {
            return this.load_multiple_file(depend);
        }
        else {
            return this.load_file_once(depend);
        }
    };
    StaticLoaderService.prototype.require_once_ordered = function (depend) {
        var _this = this;
        var firstElem = depend.shift();
        var globalePromesse = new Promise(function (resolve, reject) {
            _this.load_file_once(firstElem).then(function () {
                if (depend.length > 0) {
                    _this.require_once_ordered(depend).then(function () {
                        resolve(true);
                    });
                }
                else {
                    resolve(true);
                }
            });
        });
        return globalePromesse;
    };
    StaticLoaderService.prototype.load_multiple_file = function (tab) {
        var _this = this;
        var promiseTab = [];
        tab.forEach(function (url) {
            promiseTab.push(_this.load_file_once(url));
        });
        return Promise.all(promiseTab);
    };
    StaticLoaderService.prototype.load_file_once = function (url) {
        var _this = this;
        this.debug("Début -> " + url);
        if (typeof StaticLoaderService.promiseLoaded[url] === "undefined") {
            StaticLoaderService.promiseLoaded[url] = new Promise(function (resolve, reject) {
                var mabalise = "<!-- type non existant pour " + url + "-->";
                if (url.lastIndexOf(".css") === (url.length - 4)) {
                    _this.debug("CSS -> " + url);
                    mabalise = "<link rel='stylesheet' type='text/css' href='" + url + "' />";
                    resolve(true);
                }
                else if (url.lastIndexOf(".js") === (url.length - 3)) {
                    jQuery.ajax({
                        url: url,
                        dataType: "script",
                        success: function () {
                            _this.debug("Fin -> " + url);
                            resolve(true);
                        },
                        error: function () {
                            _this.debug("Erreur ->" + url);
                            resolve(false);
                        }
                    });
                    mabalise = "<!-- js loadé par jQuery: " + url + "-->";
                }
                else {
                    _this.debug('URL non pris en compte: ' + url);
                }
                jQuery("#autoloaded_script").append(mabalise);
            });
        }
        else {
            this.debug("Déjà Loadé -> " + url);
        }
        return StaticLoaderService.promiseLoaded[url];
    };
    StaticLoaderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StaticLoaderService);
    return StaticLoaderService;
}());
exports.StaticLoaderService = StaticLoaderService;
//# sourceMappingURL=static-loader.js.map