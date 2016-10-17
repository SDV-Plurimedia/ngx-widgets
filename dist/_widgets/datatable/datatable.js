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
var loader_1 = require("../../_services/loader");
var DatatableComponent = (function () {
    function DatatableComponent(_element, renderer, differs) {
        var _this = this;
        this._element = _element;
        this.renderer = renderer;
        this.differs = differs;
        this.language = {
            "sProcessing": "Traitement en cours...",
            "sSearch": "Rechercher&nbsp;:",
            "sLengthMenu": "Afficher _MENU_ &eacute;l&eacute;ments",
            "sInfo": "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            "sInfoEmpty": "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
            "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            "sInfoPostFix": "",
            "sLoadingRecords": "Chargement en cours...",
            "sZeroRecords": "Aucun &eacute;l&eacute;ment &agrave; afficher",
            "sEmptyTable": "Aucune donn&eacute;e disponible dans le tableau",
            "oPaginate": {
                "sFirst": "Premier",
                "sPrevious": "Pr&eacute;c&eacute;dent",
                "sNext": "Suivant",
                "sLast": "Dernier"
            },
            "oAria": {
                "sSortAscending": ": activer pour trier la colonne par ordre croissant",
                "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
            }
        };
        this.footer = false;
        this.header = true;
        this.paging = true;
        this.ordering = true;
        this.info = true;
        this.columnDefs = [];
        this.buttons = null;
        this.differ = differs.find([]).create(null);
        loader_1.LoaderService.getInstance().start();
        this.dependenciesAreLoaded = false;
        this.dependenciesAreLoadedPromise = static_loader_1.StaticLoaderService.getInstance().require_once_ordered([
            "/assets/datatables.net/js/jquery.dataTables.js",
            "/assets/datatables.net-bs/js/dataTables.bootstrap.js",
            "/assets/datatables.net-bs/css/dataTables.bootstrap.css"
        ]).then(function () {
            _this.dependenciesAreLoaded = true;
            loader_1.LoaderService.getInstance().stop();
        });
    }
    DatatableComponent.prototype.destroyTable = function (JQdestroy) {
        if (JQdestroy === void 0) { JQdestroy = false; }
        if (typeof this.table !== "undefined") {
            console.log('suppression propre de la table');
            this.table.destroy(JQdestroy);
        }
    };
    DatatableComponent.prototype.buildTable = function () {
        var _this = this;
        console.log('construction du datatable');
        this.table_elem = jQuery(this._element.nativeElement).find('table');
        this.table = this.table_elem.DataTable({
            language: this.language,
            paging: this.paging,
            ordering: this.ordering,
            info: this.info,
            initComplete: function (settings, json) {
                jQuery(_this._element.nativeElement).find('.dataTables_paginate li').addClass('page-item');
                jQuery(_this._element.nativeElement).find('.dataTables_paginate li a').addClass('page-link');
            }
        });
        if (document.querySelector('.dataTables_paginate') != null) {
            var mut = new MutationObserver(function (mutations, mut) {
                jQuery(_this._element.nativeElement).find('.dataTables_paginate li').addClass('page-item');
                jQuery(_this._element.nativeElement).find('.dataTables_paginate li a').addClass('page-link');
            });
            mut.observe(document.querySelector('.dataTables_paginate'), {
                subtree: true,
                childList: true
            });
        }
    };
    DatatableComponent.prototype.ngOnDestroy = function () {
        this.destroyTable(true);
    };
    DatatableComponent.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.differ.diff(this.data);
        if (changes) {
            var init = function () {
                _this.destroyTable();
                setTimeout(function () {
                    setTimeout(function () {
                        _this.buildTable();
                    }, 1);
                }, 1);
            };
            if (this.dependenciesAreLoaded) {
                init();
            }
            else {
                this.dependenciesAreLoadedPromise.then(init);
            }
        }
    };
    DatatableComponent.prototype.getValue = function (ligne, id) {
        try {
            if (id.indexOf('.') == -1)
                return ligne[id];
            else {
                var res_1 = ligne;
                id.split('.').forEach(function (value) {
                    res_1 = res_1[value];
                });
                return res_1;
            }
        }
        catch (e) {
            return "-- valeur introuvable --";
        }
    };
    DatatableComponent = __decorate([
        core_1.Component({
            selector: 'datatable',
            templateUrl: "./datatable.html",
            styleUrls: ['./datatable.css'],
            inputs: ['data', 'structure', 'footer', 'header', 'paging', 'ordering', 'columnDefs', 'info', 'buttons', 'parent_scope']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
    ], DatatableComponent);
    return DatatableComponent;
}());
exports.DatatableComponent = DatatableComponent;
//# sourceMappingURL=datatable.js.map