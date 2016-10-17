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
var TreeviewComponent = (function () {
    function TreeviewComponent() {
        this.sorted_datas = [];
        this.states = [];
        this.indents = {};
    }
    TreeviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.root_id = this.params.root_id;
        this.name_column = this.params.name_column;
        this.indents = {};
        this.datas.forEach(function (data) {
            if (_this.hasChildren(data[_this.params.primary_key])) {
                _this.states[data[_this.params.primary_key]] = {
                    "id": data[_this.params.primary_key],
                    "open": (data.parent == _this.root_id) ? true : false
                };
            }
            _this.indents[data[_this.params.primary_key]] = _this.getDeepIndent(data[_this.params.primary_key]);
        });
        this.sortDatas(this.root_id);
        this.parent_scope = this.params.scope;
        this.buttons = this.params.buttons;
        this.checkbox = this.params.checkbox;
    };
    TreeviewComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.datas && changes.datas.previousValue.length > 0)
            this.datas = changes.datas.currentValue;
        if (changes.params)
            this.params = changes.params.currentValue;
        this.sorted_datas = [];
        this.states = [];
        this.indents = {};
        this.root_id = this.params.root_id;
        this.datas.forEach(function (data) {
            if (_this.hasChildren(data[_this.params.primary_key])) {
                _this.states[data[_this.params.primary_key]] = {
                    "id": data[_this.params.primary_key],
                    "open": (data.parent == _this.root_id) ? true : false
                };
            }
            _this.indents[data[_this.params.primary_key]] = _this.getDeepIndent(data[_this.params.primary_key]);
        });
        this.sortDatas(this.root_id);
    };
    TreeviewComponent.prototype.hasChildren = function (id) {
        return this.datas.filter(function (data) { return data.parent == id; }).length > 0 ? true : false;
    };
    TreeviewComponent.prototype.sortDatas = function (id) {
        var _this = this;
        var tmp = this.datas.filter(function (data) { return data.parent == id; });
        this.datas.filter(function (data) { return data.parent == id; }).map(function (data) {
            _this.sorted_datas.push(data);
            if (_this.hasChildren(data[_this.params.primary_key])) {
                _this.sortDatas(data[_this.params.primary_key]);
            }
        });
    };
    TreeviewComponent.prototype.getDeepIndent = function (id) {
        var _this = this;
        var data = this.datas.filter(function (data) { return data[_this.params.primary_key] == id; })[0];
        var indentation = 0;
        if (data.parent != null) {
            while (data.parent != this.root_id) {
                indentation++;
                data = this.datas.filter(function (newdata) { return newdata[_this.params.primary_key] == data.parent; })[0];
            }
        }
        return indentation;
    };
    TreeviewComponent.prototype.toggle = function (id) {
        this.states[id].open = !this.states[id].open;
    };
    TreeviewComponent.prototype.isHidden = function (id) {
        var _this = this;
        var res = true;
        var data = this.datas.filter(function (data) { return data[_this.params.primary_key] === id; })[0];
        while (data.parent != this.root_id) {
            if (this.states[data.parent] != undefined) {
                res = res && this.states[data.parent].open;
            }
            data = this.datas.filter(function (newdata) { return newdata[_this.params.primary_key] === data.parent; })[0];
        }
        return !res;
    };
    TreeviewComponent.prototype.isChecked = function (item) {
        return this.checkbox.checked.indexOf(item[this.checkbox.column_value]) >= 0;
    };
    TreeviewComponent = __decorate([
        core_1.Component({
            selector: 'treeview',
            templateUrl: './treeview.html',
            styleUrls: ['./treeview.css'],
            inputs: ['datas', 'params']
        }), 
        __metadata('design:paramtypes', [])
    ], TreeviewComponent);
    return TreeviewComponent;
}());
exports.TreeviewComponent = TreeviewComponent;
//# sourceMappingURL=treeview.js.map