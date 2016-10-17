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
var forms_1 = require('@angular/forms');
var DatepickerComponent = (function () {
    function DatepickerComponent(cd, viewContainer) {
        this.changed = new core_1.EventEmitter();
        cd.valueAccessor = this;
        this.cd = cd;
        this.viewContainer = viewContainer;
        this.el = viewContainer.element.nativeElement;
        this.init();
        moment.locale('fr');
    }
    DatepickerComponent.prototype.ngAfterViewInit = function () {
        this.initValue();
    };
    DatepickerComponent.prototype.openDatepicker = function () {
        this.isOpened = true;
    };
    DatepickerComponent.prototype.closeDatepicker = function () {
        this.isOpened = false;
    };
    DatepickerComponent.prototype.prevYear = function () {
        this.date.subtract(1, 'Y');
        this.generateCalendar(this.date);
    };
    DatepickerComponent.prototype.prevMonth = function () {
        this.date.subtract(1, 'M');
        this.generateCalendar(this.date);
    };
    DatepickerComponent.prototype.nextYear = function () {
        this.date.add(1, 'Y');
        this.generateCalendar(this.date);
    };
    DatepickerComponent.prototype.nextMonth = function () {
        this.date.add(1, 'M');
        this.generateCalendar(this.date);
    };
    DatepickerComponent.prototype.selectDate = function (e, date) {
        e.preventDefault();
        if (this.isSelected(date))
            return;
        var selectedDate = moment(date.day + '.' + date.month + '.' + date.year, 'DD.MM.YYYY');
        this.setValue(selectedDate);
        this.closeDatepicker();
        this.changed.emit(selectedDate.toDate());
    };
    DatepickerComponent.prototype.generateCalendar = function (date) {
        var lastDayOfMonth = date.endOf('month').date();
        var month = date.month();
        var year = date.year();
        var n = 1;
        var firstWeekDay = null;
        this.dateValue = date.format('MMMM YYYY');
        this.days = [];
        if (this.firstWeekDaySunday === true) {
            firstWeekDay = date.set('date', 2).day();
        }
        else {
            firstWeekDay = date.set('date', 1).day();
        }
        if (firstWeekDay !== 1) {
            n -= (firstWeekDay + 6) % 7;
        }
        for (var i = n; i <= lastDayOfMonth; i += 1) {
            if (i > 0) {
                this.days.push({ day: i, month: month + 1, year: year, enabled: true });
            }
            else {
                this.days.push({ day: null, month: null, year: null, enabled: false });
            }
        }
    };
    DatepickerComponent.prototype.isSelected = function (date) {
        var selectedDate = moment(date.day + '.' + date.month + '.' + date.year, 'DD.MM.YYYY');
        return selectedDate.toDate().getTime() === this.cannonical;
    };
    DatepickerComponent.prototype.generateDayNames = function () {
        this.dayNames = [];
        var date = this.firstWeekDaySunday === true ? moment('2015-06-07') : moment('2015-06-01');
        for (var i = 0; i < 7; i += 1) {
            this.dayNames.push(date.format('ddd'));
            date.add('1', 'd');
        }
    };
    DatepickerComponent.prototype.initMouseEvents = function () {
        var _this = this;
        var body = document.getElementsByTagName('body')[0];
        body.addEventListener('click', function (e) {
            if (!_this.isOpened || !e.target)
                return;
            if (_this.el !== e.target && !_this.el.contains(e.target)) {
                _this.closeDatepicker();
            }
        }, false);
    };
    Object.defineProperty(DatepickerComponent.prototype, "value", {
        set: function (value) {
            this.setValue(value);
        },
        enumerable: true,
        configurable: true
    });
    DatepickerComponent.prototype.setValue = function (value) {
        var val = moment(value, this.modelFormat || 'YYYY-MM-DD');
        this.viewValue = val.format(this.viewFormat || 'Do MMMM YYYY');
        this.cd.viewToModelUpdate(val.format(this.modelFormat || 'YYYY-MM-DD'));
        this.cannonical = val.toDate().getTime();
    };
    DatepickerComponent.prototype.initValue = function () {
        var _this = this;
        setTimeout(function () {
            if (!_this.initDate) {
                _this.setValue(moment().format(_this.modelFormat || 'YYYY-MM-DD'));
            }
            else {
                _this.setValue(moment(_this.initDate, _this.modelFormat || 'YYYY-MM-DD'));
            }
        });
    };
    DatepickerComponent.prototype.writeValue = function (value) {
        if (!value)
            return;
        this.setValue(value);
    };
    DatepickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DatepickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    DatepickerComponent.prototype.init = function () {
        this.isOpened = false;
        this.date = moment();
        this.firstWeekDaySunday = false;
        this.generateDayNames();
        this.generateCalendar(this.date);
        this.initMouseEvents();
    };
    __decorate([
        core_1.Input('model-format'), 
        __metadata('design:type', String)
    ], DatepickerComponent.prototype, "modelFormat", void 0);
    __decorate([
        core_1.Input('view-format'), 
        __metadata('design:type', String)
    ], DatepickerComponent.prototype, "viewFormat", void 0);
    __decorate([
        core_1.Input('init-date'), 
        __metadata('design:type', String)
    ], DatepickerComponent.prototype, "initDate", void 0);
    __decorate([
        core_1.Input('first-week-day-sunday'), 
        __metadata('design:type', Boolean)
    ], DatepickerComponent.prototype, "firstWeekDaySunday", void 0);
    __decorate([
        core_1.Input('static'), 
        __metadata('design:type', Boolean)
    ], DatepickerComponent.prototype, "isStatic", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatepickerComponent.prototype, "changed", void 0);
    DatepickerComponent = __decorate([
        core_1.Component({
            selector: 'datepicker',
            templateUrl: './datepicker.html',
            styleUrls: ['./datepicker.css']
        }), 
        __metadata('design:paramtypes', [forms_1.NgModel, core_1.ViewContainerRef])
    ], DatepickerComponent);
    return DatepickerComponent;
}());
exports.DatepickerComponent = DatepickerComponent;
//# sourceMappingURL=datepicker.js.map