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
var HierarchieListComponent = (function () {
    function HierarchieListComponent() {
    }
    HierarchieListComponent.prototype.ngOnInit = function () {
        this.root_id = this.params.root_id;
        this.name_column = this.params.name_column;
        this.parent_scope = this.params.scope;
        this.buttons = this.params.buttons;
        this.level = [];
        this.datas_level = [];
        this.level[0] = this.root_id;
        this.datas_level[0] = this.getListLevel(0);
        this.getDisplayedLevel();
    };
    HierarchieListComponent.prototype.ngOnChanges = function (changes) {
        if (changes.datas && changes.datas.previousValue.length > 0)
            this.datas = changes.datas.currentValue;
        if (changes.params)
            this.params = changes.params.currentValue;
        this.root_id = this.params.root_id;
        this.level = [];
        this.datas_level = [];
        this.level[0] = this.root_id;
        this.datas_level[0] = this.getListLevel(0);
        this.getDisplayedLevel();
    };
    HierarchieListComponent.prototype.selectLevel = function (num, id) {
        if (num > 0) {
            this.selectLevel((num - 1), this.datas.filter(function (item) {
                return (item.id_hierarchie == id);
            })[0].parent);
        }
        console.log('TODO -> selection du level ', num, id);
        this.getNextLevel(num, id);
    };
    HierarchieListComponent.prototype.getListLevel = function (num) {
        var root = this.level[num];
        var res = this.datas.filter(function (data) { return data.parent == root; });
        return res;
    };
    HierarchieListComponent.prototype.getNextLevel = function (num, id) {
        if (this.hasChildren(id)) {
            this.last_selected_level = {
                "num": num,
                "id": id
            };
            this.level[num] = id;
            this.datas_level[num] = this.getListLevel(num);
            if (this.level.length > num + 1) {
                var level = [];
                var datas_level = [];
                var i = 0;
                for (i = 0; i <= num; i++) {
                    level[i] = this.level[i];
                    datas_level[i] = this.datas_level[i];
                }
                this.level = level;
                this.datas_level = datas_level;
            }
            this.getDisplayedLevel();
        }
    };
    HierarchieListComponent.prototype.getDisplayedLevel = function () {
        if (this.level.length < 4)
            this.level_displayed = this.level;
        else {
            this.level_displayed = this.level.slice(this.level.length - 4);
        }
    };
    HierarchieListComponent.prototype.hasChildren = function (id) {
        return this.datas.filter(function (data) { return data.parent == id; }).length > 0 ? true : false;
    };
    HierarchieListComponent = __decorate([
        core_1.Component({
            selector: 'hierarchie-list',
            templateUrl: './hierarchie-list.html',
            styleUrls: ['./hierarchie-list.css'],
            inputs: ['datas', 'params']
        }), 
        __metadata('design:paramtypes', [])
    ], HierarchieListComponent);
    return HierarchieListComponent;
}());
exports.HierarchieListComponent = HierarchieListComponent;
//# sourceMappingURL=hierarchie-list.js.map