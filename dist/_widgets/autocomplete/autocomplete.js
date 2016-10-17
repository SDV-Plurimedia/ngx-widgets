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
var AutocompleteComponent = (function () {
    function AutocompleteComponent(_eref) {
        this._eref = _eref;
        this.icon = "";
        this.valid = new core_1.EventEmitter();
        this.results = [];
        this.placeholder = "";
        this.inputValue = "";
        this.isActive = false;
    }
    AutocompleteComponent.prototype.ngOnInit = function () {
        this.placeholder = this.config.placeholder;
        if (this.config.defaultValue !== "")
            this.inputValue = this.config.defaultValue;
    };
    AutocompleteComponent.prototype.reduceResultList = function (value) {
        var _this = this;
        this.results = [];
        if (value && value.length >= this.config.begin) {
            this.data.forEach(function (item, index) {
                if (_this.getDisplayLabel(item).substring(0, value.length).toLowerCase() == value.toLowerCase()) {
                    _this.results.push(item);
                }
            });
        }
        return this.results;
    };
    AutocompleteComponent.prototype.toggleDropdown = function () {
        if (!this.isActive) {
            this.inputForm = this._eref.nativeElement.querySelector('.form-control');
            this.isActive = true;
            this.inputForm.focus();
        }
        else
            this.isActive = false;
    };
    AutocompleteComponent.prototype.getValue = function (item) {
        if (typeof this.config.fieldValue !== 'undefined' && typeof item[this.config.fieldValue] !== 'undefined')
            return item[this.config.fieldValue];
        else
            return item;
    };
    AutocompleteComponent.prototype.getDisplayLabel = function (item) {
        var res = "";
        if (this.config.fieldName.constructor === Array) {
            this.config.fieldName.forEach(function (field) {
                if (res == "")
                    res += item[field];
                else
                    res += " - " + item[field];
            });
        }
        else {
            res = item[this.config.fieldName];
        }
        return res;
    };
    AutocompleteComponent.prototype.valideItem = function (item) {
        this.valid.emit(this.getValue(item));
        this.toggleDropdown();
        this.inputValue = "";
        this.setCursorPosition(0);
        this.placeholder = this.getDisplayLabel(item);
    };
    AutocompleteComponent.prototype.onClick = function (event) {
        var spanElement = this._eref.nativeElement.querySelector('.spanClick');
        var inputElement = this._eref.nativeElement.querySelector('.inputField');
        var formControl = this._eref.nativeElement.querySelector('.form-control');
        if ((spanElement !== event.target && inputElement !== event.target && formControl !== event.target) && this.inputForm !== event.target && this.isActive) {
            this.toggleDropdown();
        }
    };
    AutocompleteComponent.prototype.setCursorPosition = function (pos) {
        var current = this._eref.nativeElement.querySelector('.elem' + pos);
        if (current != null) {
            current.setAttribute("class", "active-result elem" + pos + " highlighted");
            current.focus();
        }
    };
    AutocompleteComponent.prototype.removeHighlight = function (pos) {
        var className = "elem" + (pos);
        this._eref.nativeElement.querySelector('.' + className).setAttribute("class", "active-result " + className);
    };
    AutocompleteComponent.prototype.getCurrentPosition = function () {
        var pos = 0;
        var elem = this._eref.nativeElement.querySelector('.highlighted');
        if (elem != null) {
            pos = Number(elem.getAttribute("class").split("elem")[1].split(' ')[0]);
        }
        return pos;
    };
    AutocompleteComponent.prototype.onKey = function (event) {
        var pos = this.getCurrentPosition();
        if (event.keyCode == 27)
            this.toggleDropdown();
        else if (event.keyCode == 13) {
            this.valideItem(this.results[pos]);
        }
        else if (event.keyCode == 38) {
            if (pos > 0) {
                this.removeHighlight(pos);
                this.setCursorPosition(pos - 1);
            }
        }
        else if (event.keyCode == 40) {
            if (pos < (this.results.length - 1)) {
                this.removeHighlight(pos);
                this.setCursorPosition(pos + 1);
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutocompleteComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutocompleteComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutocompleteComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AutocompleteComponent.prototype, "valid", void 0);
    AutocompleteComponent = __decorate([
        core_1.Component({
            selector: 'autocomplete',
            templateUrl: './autocomplete.html',
            styleUrls: ['./chosen.min.css', './autocomplete.css'],
            host: { '(document:click)': 'onClick($event)' }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AutocompleteComponent);
    return AutocompleteComponent;
}());
exports.AutocompleteComponent = AutocompleteComponent;
//# sourceMappingURL=autocomplete.js.map