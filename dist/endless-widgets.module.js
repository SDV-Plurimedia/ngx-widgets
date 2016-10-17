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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var autocomplete_1 = require("./_widgets/autocomplete/autocomplete");
var bloc_card_1 = require("./_widgets/bloc-card/bloc-card");
var button_3d_1 = require("./_widgets/button-3d/button-3d");
var chevron_1 = require("./_widgets/chevron/chevron");
var ckeditor_1 = require("./_widgets/ckeditor/ckeditor");
var corner_button_1 = require("./_widgets/corner-button/corner-button");
var datatable_1 = require("./_widgets/datatable/datatable");
var datepicker_1 = require("./_widgets/datepicker/datepicker");
var hierarchie_list_1 = require("./_widgets/hierarchie-list/hierarchie-list");
var loader_1 = require("./_widgets/loader/loader");
var menu_interne_1 = require("./_widgets/menu-interne/menu-interne");
var pager_1 = require("./_widgets/pager/pager");
var progress_bar_1 = require("./_widgets/progress-bar/progress-bar");
var status_bar_1 = require("./_widgets/status-bar/status-bar");
var switch_1 = require("./_widgets/switch/switch");
var tabpane_1 = require("./_widgets/tabpane/tabpane");
var tab_1 = require("./_widgets/tabpane/tab");
var touch_button_1 = require("./_widgets/touch-button/touch-button");
var treeview_1 = require("./_widgets/treeview/treeview");
var wizard_1 = require("./_widgets/wizard/wizard");
var widgets = [
    autocomplete_1.AutocompleteComponent,
    bloc_card_1.BlocCardComponent,
    button_3d_1.Button3dComponent,
    chevron_1.ChevronComponent,
    ckeditor_1.CkeditorComponent,
    corner_button_1.CornerButtonComponent,
    datatable_1.DatatableComponent,
    datepicker_1.DatepickerComponent,
    hierarchie_list_1.HierarchieListComponent,
    loader_1.LoaderComponent,
    menu_interne_1.MenuInterneComponent, menu_interne_1.MenuItem, menu_interne_1.MenuItemBadge,
    pager_1.PagerComponent, pager_1.Pager,
    progress_bar_1.ProgressBarComponent,
    status_bar_1.StatusBarComponent,
    switch_1.SwitchComponent,
    tabpane_1.TabpaneComponent,
    tab_1.TabComponent,
    touch_button_1.TouchButtonComponent,
    treeview_1.TreeviewComponent,
    wizard_1.WizardComponent
];
var dnd_1 = require("./_directives/dnd");
var lazyload_1 = require("./_directives/lazyload");
var directives = [
    dnd_1.DNDDirective,
    lazyload_1.LazyloadDirective
];
var string_shortened_1 = require("./_pipes/string-shortened");
var timestamp_to_date_1 = require("./_pipes/timestamp-to-date");
var bootstrap_class_1 = require("./_pipes/bootstrap-class");
var pipes = [
    string_shortened_1.StringShortenedPipe,
    timestamp_to_date_1.TimestampToDatePipe,
    bootstrap_class_1.BootstrapClassPipe
];
var static_loader_1 = require("./_services/static-loader");
var loader_2 = require("./_services/loader");
var services = [
    static_loader_1.StaticLoaderService,
    loader_2.LoaderService
];
var EndlessWidgetsModule = (function () {
    function EndlessWidgetsModule() {
    }
    EndlessWidgetsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                http_1.JsonpModule
            ],
            declarations: widgets.concat(pipes, directives),
            exports: widgets.concat(pipes, directives, [
                common_1.CommonModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                http_1.JsonpModule
            ]),
            providers: services.slice()
        }), 
        __metadata('design:paramtypes', [])
    ], EndlessWidgetsModule);
    return EndlessWidgetsModule;
}());
exports.EndlessWidgetsModule = EndlessWidgetsModule;
//# sourceMappingURL=endless-widgets.module.js.map