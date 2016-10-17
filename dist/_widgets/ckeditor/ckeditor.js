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
var CkeditorComponent = (function () {
    function CkeditorComponent() {
        this.id = 'editor';
        this.rows = 10;
        this.disabled = false;
        this.contentChange = new core_1.EventEmitter();
        this.drop = new core_1.EventEmitter();
        this.instance = null;
        this.isLoaded = false;
        this.config = false;
    }
    CkeditorComponent.prototype.ngOnInit = function () { };
    CkeditorComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.disabled === false && changes.disabled !== undefined) {
            static_loader_1.StaticLoaderService.getInstance().require_once([
                '/utils/static/ckeditor/ckeditor.js'
            ]).then(function () {
                CKEDITOR.basePath = "/utils/static/ckeditor/";
                _this.initCKeditor();
            });
        }
        else if (changes.disabled && changes.disabled.currentValue === true && changes.disabled.previousValue === false) {
            this.instance.destroy();
        }
    };
    CkeditorComponent.prototype.initCKeditor = function () {
        var _this = this;
        if (this.config)
            CKEDITOR.replace(this.id, this.config);
        else
            CKEDITOR.replace(this.id);
        this.instance = CKEDITOR.instances[this.id];
        this.instance.on('change', this.textChanged, this);
        this.instance.on('drop', function (evt) {
            evt.stop();
            evt.component = _this;
            _this.drop.emit(evt);
            return false;
        }, this);
        this.isLoaded = true;
    };
    CkeditorComponent.prototype.textChanged = function () {
        this.content = this.instance.getData();
        this.contentChange.emit(this.content);
    };
    CkeditorComponent = __decorate([
        core_1.Component({
            selector: 'ckeditor',
            templateUrl: './ckeditor.html',
            styleUrls: ['./ckeditor.css'],
            inputs: ['content', 'id', 'rows', 'disabled', 'config'],
            outputs: ['contentChange', 'drop']
        }), 
        __metadata('design:paramtypes', [])
    ], CkeditorComponent);
    return CkeditorComponent;
}());
exports.CkeditorComponent = CkeditorComponent;
//# sourceMappingURL=ckeditor.js.map