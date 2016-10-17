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
var Rx_1 = require('rxjs/Rx');
var forms_1 = require("@angular/forms");
var http_l5_1 = require("../../../_core/_services/http/http-l5");
var IbpSearchComponent = (function () {
    function IbpSearchComponent(_httpL5Service) {
        var _this = this;
        this._httpL5Service = _httpL5Service;
        this.images = [];
        this.selectedImages = [];
        this.search_panelChange = new core_1.EventEmitter();
        this.ibpSelection = new core_1.EventEmitter();
        this.searchTermStream = new Rx_1.Subject();
        this.items = null;
        this.searchTermControl = new forms_1.FormControl('');
        this.searchTermControl.valueChanges.subscribe(function (subject) {
            _this.searchTermStream.next(subject);
        });
        this.items = this.searchTermStream
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(function (subject) {
            _this.searchTermStream.next(subject);
            _this.onTheFySearch(subject);
            return [];
        });
    }
    IbpSearchComponent.prototype.ngOnInit = function () {
    };
    IbpSearchComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.search_panel) {
            console.log('ibp ');
            this._httpL5Service.getCached('/pulse/ibp-search?proxyUrl=search/images').subscribe(function (data) {
                if (data.images) {
                    _this.images = data.images.map(function (image) {
                        image.src = GLOBAL_CONFIG['ibp_url'] + 'images/view/' + image.id + '/ibp_square';
                        return image;
                    });
                }
            });
            this.items.subscribe();
        }
        this.search_panelChange.emit(this.search_panel);
    };
    IbpSearchComponent.prototype.onSubmit = function () {
        this.ibpSelection.emit(this.selectedImages);
        this.toggleSearchPanel();
    };
    IbpSearchComponent.prototype.onChange = function (is_checked, img) {
        if (is_checked) {
            this.selectedImages.push(img.id);
        }
        else {
            var index = this.selectedImages.indexOf(img.id);
            this.selectedImages.splice(index, 1);
        }
    };
    IbpSearchComponent.prototype.onTheFySearch = function (subject) {
        var _this = this;
        this._httpL5Service.getCached('/pulse/ibp-search?proxyUrl=search/images&term=' + subject).subscribe(function (data) {
            if (data.images) {
                _this.images = data.images.map(function (image) {
                    image.src = GLOBAL_CONFIG['ibp_url'] + 'images/view/' + image.id + '/ibp_square';
                    return image;
                });
            }
        });
    };
    IbpSearchComponent.prototype.toggleSearchPanel = function () {
        this.search_panel = !this.search_panel;
        this.search_panelChange.emit(this.search_panel);
        if (!this.search_panel) {
            this.searchTermControl.setValue('');
        }
    };
    IbpSearchComponent = __decorate([
        core_1.Component({
            selector: 'ibp-search',
            templateUrl: './ibp-search.html',
            styleUrls: ['./ibp-search.css'],
            inputs: ['search_panel'],
            outputs: ['search_panelChange', 'ibpSelection']
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_l5_1.HttpL5Service !== 'undefined' && http_l5_1.HttpL5Service) === 'function' && _a) || Object])
    ], IbpSearchComponent);
    return IbpSearchComponent;
    var _a;
}());
exports.IbpSearchComponent = IbpSearchComponent;
//# sourceMappingURL=ibp-search.js.map