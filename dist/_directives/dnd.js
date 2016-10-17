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
var DNDDirective = (function () {
    function DNDDirective(_el, renderer) {
        this._el = _el;
        this.renderer = renderer;
        this.dropZoneClass = 'dropzone';
        this.targetClass = 'target';
        this._isTarget = true;
        if (this._el.nativeElement.classList.contains(this.dropZoneClass)) {
            this._isTarget = false;
            this.defaultBackground = this._el.nativeElement.style.background;
        }
        else {
            this._el.nativeElement.draggable = true;
            this._el.nativeElement.classList.add('target');
        }
        this.defaultBackground = this._el.nativeElement.style.background;
    }
    DNDDirective.prototype.dragStart = function (event) {
        if (this._isTarget) {
            event.dataTransfer.setData("Text", event.target.id);
            this._el.nativeElement.style.background = '#ffccff';
        }
    };
    DNDDirective.prototype.drag = function () {
    };
    DNDDirective.prototype.dragEnd = function (event) {
        if (this._isTarget)
            this._el.nativeElement.style.background = this.defaultBackground;
    };
    DNDDirective.prototype.dragEnter = function (event) {
        if (this.isConcerned(event.target)) {
            if (this.isTarget(event.target)) {
                var data = event.dataTransfer.getData("Text");
                event.target.parentElement.appendChild(document.getElementById(data));
            }
            else {
            }
        }
    };
    DNDDirective.prototype.dragOver = function (event) {
        if (this.isConcerned(event.target)) {
            if (!this._isTarget)
                event.preventDefault();
        }
    };
    DNDDirective.prototype.dragLeave = function (event) {
        if (this.isConcerned(event.target)) {
            if (!this._isTarget)
                this._el.nativeElement.style.background = this.defaultBackground;
            else {
            }
        }
    };
    DNDDirective.prototype.drop = function (event) {
        event.preventDefault();
        if (event.target.classList.contains(this.dropZoneClass)) {
            var data = event.dataTransfer.getData("Text");
            event.target.appendChild(document.getElementById(data));
        }
        if (!this._isTarget) {
            event.currentTarget.style.background = "#CCC";
        }
    };
    DNDDirective.prototype.setDropZoneExtra = function (name) {
        var dze = document.createElement("div");
        dze.className = 'dropzone extra ' + name;
        dze.setAttribute('dnd', '');
        return dze;
    };
    DNDDirective.prototype.isConcerned = function (target) {
        if ('classList' in target) {
            if (target.classList.contains(this.targetClass) || target.classList.contains(this.dropZoneClass))
                return true;
        }
        else
            return false;
    };
    DNDDirective.prototype.isTarget = function (target) {
        if ('classList' in target) {
            return target.classList.contains(this.targetClass);
        }
        else
            return false;
    };
    DNDDirective.prototype.appendGrid = function () {
        var next = document.createElement("div");
        var child = document.createElement("div");
        var grid = document.createElement("div");
        next.className = 'dropzone next';
        next.setAttribute('dnd', '');
        child.className = 'dropzone child';
        child.setAttribute('dnd', '');
        grid.className = 'append-grid';
        grid.appendChild(next);
        grid.appendChild(child);
        return grid;
    };
    DNDDirective = __decorate([
        core_1.Directive({
            selector: '[dnd]',
            host: {
                '(dragstart)': 'dragStart($event)',
                '(drag)': 'drag()',
                '(dragend)': 'dragEnd($event)',
                '(dragenter)': 'dragEnter($event)',
                '(dragover)': 'dragOver($event)',
                '(dragleave)': 'dragLeave($event)',
                '(drop)': 'drop($event)',
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DNDDirective);
    return DNDDirective;
}());
exports.DNDDirective = DNDDirective;
//# sourceMappingURL=dnd.js.map