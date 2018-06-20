import { Component, OnInit, EventEmitter, Input, Output, OnDestroy, ElementRef, OnChanges, AfterViewInit, AfterViewChecked, DoCheck } from '@angular/core';
import { Filter } from '../filter/filter.component';
import { Pager } from '../pager/pager';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


/**
 * Datatable à utiliser au lieu des datatables classiques lorsque le volume des données est trop important.
 * Pour la structure, plusieurs états de "cellule" sont possible :
 *    state = 1 => Etat normal, on affiche simplement le texte dans le "<th>"
 *    state = 2 => Etat html, on affiche du HTML (avec innerHTML)
 *    state = 3 => On applique une fonction de callback sur le(s) élement(s). Possibilité d'appliquer un split sur une chaîne.
 *
 * Il est également possible de définir une taille au celule, les différentes valeurs actuellement possible (en %) sont :
 *  - 1
 *  - 2
 *  - 3
 *  - 5
 *  - 7
 *  - 10
 *  - 15
 *  - 20
 *  - 25
 *  Si des boutons sont renseignés, une colonne d'une taille fixe de 7% leur sera attribué.
 *
 *  Exemple de configuration :
 *
 *  public config = {
        _service: this._ShortcutService,                        // Le service qui postera les données.
        _service_method: this._ShortcutService.postFilter,      // La méthode qui est appellée par le service ci-dessus.
        filter_has_display_items: true,                         // FACULTATIF, DEFAULT = false, Si true, alors dans le filtre
                                                                // il y a un champs de type number qui contient le nombre d'élement/page.
        display_items_name                                      // FACULTATIF, DEFAULT = display_items. C'est le nom du champs qui contient
                                                                // le nombre d'élement par page.
        is_filter: false,                                       // FACULTATIF, DEFAULT = true.
                                                                // Si false, alors on n'aura pas de filtre à l'écran.
        pagination_config: {                                    // FACULTATIF, Attention, une pagination sera quand même mise en place
                                                                // en prenant les propriétés par défaut du composant Pagination.
            'pagination_top': true,                             // FACULTATIF, DEFAULT = false. Si true, la pagination apparaitra en haut.
            'pagination_bottom': true,                          // FACULTATIF, DEFAULT = true. Si true, la pagination apparaitra en bas.
            'max_page': 271,                                    // FACULTATIF, DEFAULT = 1. Le nombre de page.
            'item_per_page': 10,                                // FACULTATIF, DEFAULT = 10. Le nombre d'élement par page.
            'page':1,                                           // FACULTATIF, DEFAULT = 1. La page courante.
            'delta':5,                                          // FACULTATIF, DEFAULT = 5. Le nombre de page affiché.
        },

        buttons:                                                // Tableau contenant les boutons.
            [
                {
                    'text': '<span class="iconclasses fa fa-pencil" aria-hidden="true"></span>',  // Le texte du bouton.
                    'action': this.edit,   // La méthode appellée lors du clic sur le bouton. (appellée sur bigdata.parent_scope)
                    'class': "btn btn-warning" // La classe du bouton.
                }
            ],


        structure:                                              // La structure du tableau.
        [
            // Champs avec une pipe :
            { id: "url_source",        label: "URL Source",    size: 15, pipe: new TruncateWithTooltipPipe, params: 50, state: 2},

            // Champs "normale" :
            { id: 'redirection_label', label: 'Redirection',   size: 11},

            // Champs avec function :
            { id: 'tags_list',  label: 'Tag(s)',    size: 10, function_type: 'split', separator:',',
                    class:'tag_list hover', function: this.addFilterTag, state:3},
        ],

        can_sort:true, // Si on peut trier. (Facultatif, default = false)
        sort: { // objet contenant le nom du champs sur lequel appliquer le filtre.
            field: 'updated_at', // facultatif.
            asc: false  // facultatif (si true alors tri croissant).
        },


        filter_config: {}   // FACULTATIF (Seulement si on a définit is_filter à false).
                            // pour voir comment le configurer => Composant Filter.
 *
 */

export class BigDatatable {

    public subscriptions = [];            // Le tableau des subscriptions.
    public colspan: number;               // Le nombre de colonne que y a dans le tableau.

    // Config global
    public parent_scope;                  // L'objet parent (dans lequel on appelle ce composant).
    public scope = this;                  // L'objet this.
    public config;                        // La config globale.

    // Tous ce qui est configuration de la pagination.
    public pagination_config;             // La configuration du composant <pagination> (contient max_page, item_per_page
    public pagination_top = false;        // Si false, on aura une pagination en haut.
    public pagination_bottom = true;      // Si true, on aura une pagination en bas.

    // Le filtre.
    public filter: Filter;                // Le filtre.
    public filter_config;                 // La configuration du filtre.
    public is_filter: boolean = true;     // Si true, alors le filtre est présent. Sinon on laisse juste en place une pagination basique.

    // Le tri
    public sort: any;                      // Les parametres du tri
    public can_sort: boolean = true;        // Si true, alors les flèches de tri s'affichent

    // Classe pour les tr.
    public tr;

    // Config de la datatable.
    public structure;                     // Les noms des champs.
    public data = [];                     // Les données qui vont être affichées.
    public buttons;                       // Les boutons qui seront TOUJOURS dans la dernière colonne.

    private _service;                     // Le service qui est utilisé pour récupérer les ressources.
    private _service_method;              // La méthode qu'il faut appeller du service pour récupérer les ressources.

    private message: EventEmitter<any>;    // Renvoie une string success ou error.

    private default_pagination = {        // Les propriétés de la pagination de base si on en a pas précisé.
        delta: 5,
        max_page: 1,
        current_page: 1,
    };

    public pager: Pager = null;
    public loading_datas = false;

    public searched: boolean = false; // Passe à true lors de la première recherche.

    // Checkboxes
    public checkboxes: boolean = false;
    // Champ a placer dans la value des checkboxes pour chaque ligne. Exemple : id_element.
    public checkboxes_value: string = null;

    constructor(config, structure, scope) {
        this.config = config;
        this.structure = structure;
        this.parent_scope = scope;

        // Si on a pas d'état dans les celules, alors on le mets à 1 par défaut.
        this.checkStructure();

        if (this.config.tr) {
            this.tr = this.config.tr;
        } else {
            this.tr = { class: '' };
        }

        // On récupère la config de la pagination.
        if (!this.config.pagination_config) { this.config.pagination_config = this.default_pagination; }
        this.pagination_config = this.config.pagination_config;
        //  this.pagination_config.callback = this.pageChange;

        // On récupère la config du filtre.
        if (this.config.filter_config) { this.filter_config = this.config.filter_config; }
        if (this.config.filter_config) { this.filter_config.callback = this.triggerSearch; }
        if (typeof this.config.is_filter === 'boolean') { this.is_filter = this.config.is_filter; }

        // On prépare le tri
        if (this.config.can_sort !== undefined) {
            this.can_sort = this.config.can_sort;
        }
        if (this.can_sort) {
            if (this.config.sort) {
                this.sort = {
                    field: this.config.sort.field || null,
                    asc: (typeof (this.config.sort.asc) === 'boolean' ? this.config.sort.asc : true)
                };
            } else {
                this.sort = {
                    field: null,
                    asc: true
                };
            }
        }

        // Le service & sa méthode.
        this._service = this.config._service;
        this._service_method = this.config._service_method;

        // On vérifie quelques petits détails de configuration.
        // Delta de base : 5.
        if (!this.config.pagination_config.delta) { this.config.pagination_config.delta = 5; }
        // Pagination du haut.
        if (this.config.pagination_config.pagination_top) { this.pagination_top = this.config.pagination_config.pagination_top; }
        // Pagination du bas.
        if (this.config.pagination_config.pagination_bottom) { this.pagination_bottom = this.config.pagination_config.pagination_bottom; }
        // Si on veut permettre à l'utilisateur de changer le nombre d'élement par page.
        if (!this.config.filter_has_display_items) { this.config.filter_has_display_items = false; }
        // Le nom du champs dans le filtre qui contient le nombre d'élement par page.
        if (!this.config.display_items_name) { this.config.display_items_name = 'display_items'; }
        this.colspan = this.structure.length + (this.config.buttons ? 1 : 0);

        // Les boutons
        if (this.config.buttons) { this.buttons = this.config.buttons; }

        if (this.config.checkboxes) { this.checkboxes = this.config.checkboxes; }
        if (this.config.checkboxes_value) { this.checkboxes_value = this.config.checkboxes_value; }

        // Création du filtre.
        this.filter = new Filter(this.scope, this.filter_config);
    }

    /**
     * La fonction de callback de la pagination.
     * @param page
     */
    public pageChange(from, to: number) {
        let page = Math.floor(from / this.pagination_config.per_page) + 1;
        if (page !== this.pagination_config.current_page) {
            this.pagination_config.current_page = page;
            this.postFilter();
        }
    }


    /**
     * Lance la recherche depuis les filtres
     */
    public triggerSearch() {
        this.searched = true;
        this.pagination_config.current_page = 1;
        this.postFilter(true);
    }

    /**
     * La fonction qui s'occupe de poster le filtre & la pagination.
     */
    public postFilter(reset_pager: boolean = false) {

        if (this.config.filter_has_display_items) {
            // Pas besoin de vérifier du côté serveur qu'on divise par un nombre négatif ou par 0.
            if (this.filter_config.property[this.config.display_items_name].value > 0) {
                this.pagination_config.item_per_page = this.filter_config.property[this.config.display_items_name].value;
            }
        }

        // On ajoute dans la config le nb d'élement par page (celui du select si il est défini).
        if (this.filter_config.select_item_per_page) {
            if (!this.filter_config.select_item_per_page.value) {
                if (this.filter_config.select_item_per_page.default) {
                    this.filter_config.select_item_per_page.value = this.filter_config.select_item_per_page.default;
                } else {
                    this.filter_config.select_item_per_page.value = this.filter_config.select_item_per_page.values[0];
                }
            }
            this.filter_config.property.select_display_items = {
                value: this.filter_config.select_item_per_page.value
            };
            this.pagination_config.item_per_page = this.filter_config.select_item_per_page.value;
        }

        this.loading_datas = true;
        let sub = this._service_method.apply(this._service, [this.filter_config, this.sort, this.pagination_config.current_page]).subscribe(
            result => {
                this.data = [];
                this.pagination_config = result['meta']['pagination'];
                // this.pagination_config.callback = this.pageChange;
                // On instancie le pager si ce n'est pas encore fait
                if (this.pager === null || reset_pager) {
                    this.pager = new Pager(this,
                        this.pagination_config.total,
                        this.pagination_config.per_page,
                        this.config.pagination_config.delta,
                        this.pageChange,
                        this.pagination_config.current_page);
                }
                for (let object of result['data']) {
                    this.data.push(object);
                }
                this.message.emit('success');
                this.loading_datas = false;
            },
            err => {
                this.loading_datas = false;
                this.data = [];
                this.message.emit('error');
            }
        );
        this.subscriptions.push(sub);
    }

    /**
     * Change le critere de tri du tatableau
     **/
    public changeTri(column_id) {
        if (this.sort.field !== column_id) {
            this.sort.field = column_id;
            this.sort.asc = true;
        } else {
            this.sort.asc = !this.sort.asc;
        }
        this.pagination_config.current_page = 1;
        this.postFilter(true);
    }

    /**
     * Vérifie la structure.
     * Enfaite, si on a pas renseigné "state" pour une celule, on le définit à 1 par défaut.
     */
    private checkStructure() {
        for (let i = 0; i < this.structure.length; i++) {
            if (typeof this.structure[i].state === 'undefined') {
                this.structure[i].state = 1;
            }
        }
    }

    public setMessage(message: EventEmitter<any>) {
        this.message = message;
    }

    /**
     * Déclenchée lors du clic sur une ligne.
     * @param object
     */
    public clickOnRow(object) {
        if (this.tr.rowCallback) {
            this.tr.rowCallback.apply(this.parent_scope, [object]);
        }
    }
}


@Component({
    selector: 'big-datatable',
    templateUrl: './big-datatable.component.html',
    styleUrls: ['./big-datatable.component.css']
})
export class BigDatatableComponent implements OnInit, OnDestroy {

    @Input() bigdata: BigDatatable;
    @Output() message = new EventEmitter();  // Renvoie une string success ou error.
    @Output() checkedRows: EventEmitter<any> = new EventEmitter();

    private checkedData = [];
    private newState: boolean = null;
    public allVisibleRowsAreChecked: boolean = false;

    constructor(private _sanitizer: DomSanitizer, private _element: ElementRef) { }

    ngOnInit() {
        if (this.bigdata.checkboxes) {
            this.initMainCheckbox();
        }
        this.bigdata.setMessage(this.message);
    }

    ngOnDestroy() {
        this.bigdata.subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    /**
     * On rends le html safe pour l'affichage sinon certaines balises (button par ex) ne passent pas.
     * @param html
     * @returns
     */
    public sanitizeHtml(html): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    /**
     * On réinitialise les données liées aux checkboxes.
     */
    private initMainCheckbox() {
        this.allVisibleRowsAreChecked = this.getAllVisibleRowsAreChecked();
        this._element.nativeElement.querySelectorAll('.check-all').forEach(elem => {
            elem.setAttribute('checked', this.allVisibleRowsAreChecked.toString());
        });
    }

    /**
     * Séléctionne ou déséléctionne toutes les lignes de la page courante.
     */
    public checkAll(event) {
        event.stopPropagation();
        this.newState = event.target.checked;
        this.allVisibleRowsAreChecked = event.target.checked;
        this._element.nativeElement.querySelectorAll('input.row-checkbox[type="checkbox"]').forEach(elem => {
            if (elem.checked !== this.newState) {
                elem.click();
            }
            elem.setAttribute('checked', this.newState);
        });
        this.checkedRows.emit(this.checkedData);
        this.newState = null;
    }

    /**
     * Coche la checkbox de la ligne passée en param.
     * @param ligne
     */
    public checkOne(row) {
        if (this.bigdata.checkboxes) {
            if (this.newState !== null) { // On coche (si newState est différent de null c'est qu'on a coché un bouton pour
                // tous cocher).
                if (this.newState) {
                    if (!this.isChecked(row)) { // Si elle est pas encore cochée, on la coche
                        this.checkedData.push(row);
                    }
                } else {
                    if (this.isChecked(row)) {
                        this.checkedData.splice(this.checkedData.indexOf(row), 1);
                    }
                }
            } else if (!this.isChecked(row)) {
                this.checkedData.push(row);
                this.checkedRows.emit(this.checkedData);
            } else { // On décoche
                this.checkedData.splice(this.checkedData.indexOf(row), 1);
                this.checkedRows.emit(this.checkedData);
            }
        }
    }

    /**
      * Délenché lors du clic sur une checkbox dans une ligne. Pour que la case soit bien cochée.
      * @param event
      * @param row
      */
    public clickRowCheckbox(event, row) {
        event.stopPropagation();
        this.checkOne(row);
    }

    /**
      * Quand on clic sur une autre case du tr, on déclenche l'event de la checkbox correspondante.
      * @param i
      */
    public callClickCb(i) {
        this._element.nativeElement.querySelectorAll('#checkbox_' + i).forEach(elem => {
            elem.click();
        });
    }

    /**
      * Retourne true si toutes les lignes sont cochées
      * @returns
      */
    public getAllVisibleRowsAreChecked(): boolean {
        if (this.bigdata) {
            let nbRowWithCheckbox = document.querySelectorAll('.row-checkbox').length;
            let nbRowChecked = document.querySelectorAll('.row-checkbox:checked').length;
            return nbRowChecked ===
                nbRowWithCheckbox && nbRowWithCheckbox !== 0;
        } else {
            return false;
        }
    }

    /**
      * Retourne true si la ligne passée en param est cochée.
      * @param ligne
      * @returns
      */
    public isChecked(ligne): boolean {
        return this.checkedData.indexOf(ligne) !== -1;
    }

}
