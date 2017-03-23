import { Component, OnInit } from '@angular/core';

/**
 * Configuration du filtre.
 * filter_config: {
            config_column: [4, 8],          // Tableau contenant la taille de la classe bootstrap à utliser (la somme maximum doit faire 12).
            callback: this.method,          // La méthode a appeller lorsque l'on veut appliquer le filtre.
            parent_scope: this,             // Le parent de ce composant. (celui qui contient la méthode callback.
            order_by_column: 'updated_at',  // FACULTATIF, DEFAULT = id : La colonne qui sera utilisée de base pour l'order by.
            order_by_type: 'DESC',          // FACULTATIF, DEFAULT = ASC : Si l'order by est croissant ou décroissant.
            advanced_mode: false,           // FACULTATIF, DEFAULT = false : Pour activer ou désactiver le mode avancé.

            // Les différents type de champs possible.
            property: {
             // INPUT TEXT
                url_source: {                // Sa clé.
                    id: 'url_source',        // Son id.
                    label: 'Url source : ',  // Le label souhaité.
                    type: 'text',            // Le type de champs
                    value: '',               // Sa valeur.
                    column: 0                // Dans quelle colonne il faut le mettre.
                },

            // INPUT NUMBER
                display_item: {               // Sa clé.
                    id: 'display_item',       // Son id.
                    label: 'Nb element : ',   // Le label souhaité.
                    type: 'number',           // Le type de champs
                    value: '',                // Sa valeur.
                    column: 0,                // Dans quelle colonne il faut le mettre.
                    min: 1,                   // FACULTATIF : La valeur minimum du champs.
                    max: 10000000             // FACULTATIF : La valeur maximal du champs.
                },

            // LISTE DÉROULANTE
                redirection_id: {
                    id: 'redirection_label',
                    label: 'Redirection : ',
                    type: 'select',
                    value: 0,
                    column: 0,
                    propositions: this.redirections // Les différentes propositions. Tableau d'objet : { label : 'label', id: 'id' } (où id est la value).
                    default_label: 'Toutes',        // FACULTATIF : Le label de la proposition par défaut
                    default_value: 0                // FACULTATIF : Sa value.
                },

            // DATE INTERVALLE
                Date a passer au format YYYY-MM-DD. Le résultat sera renvoyé au format YYYY-MM-DD.
                L'affichage quant à lui sera au format : DD-MM-YYYY.
                created_at: {
                    id: 'created_at',
                    label: 'Date de création entre : ',
                    type: 'date-intervale',
                    value: {'min' : '2000-01-01', 'max': this.today}, // Doit contenir une valeur minimal et une valeur maximale.
                    column: 0
                },
            // DATE
                Date a passer au format YYYY-MM-DD. Le résultat sera renvoyé au format YYYY-MM-DD.
                L'affichage quant à lui sera au format : DD-MM-YYYY.
                created_at: {
                    id: 'created_at',
                    label: 'Crée le : ',
                    type: 'date',
                    value: '2000-01-01',
                    column: 0
                },

            // AUTOCOMPLETE
                tags: {
                    config: { // La config de l'autocomplete fournit pas sdv-ng2-widgets. Liens vers la doc : https://sdv-plurimedia.github.io/sdv-ng2-widgets/index.html#autocomplete
                        'fieldSearch' : 'name',
                        'fieldDisplayed': 'name',
                        'begin' : 1,
                        'placeholder': 'Tags',
                        'modifyPlaceholder': false,
                        'displayItem': true,
                        'displayItemClass': 'label-primary mon-badge'
                    },
                    id: 'tags_list',
                    type: 'autocomplete',
                    value: [],                  // Les/la valeur(s) de l'autocomplete.
                    column: 1,
                    delete: this.deleteTag,     // La fonction a appeller en cas de delete d'item. Sera appellé sur parent_scope.
                    add: this.addTag,           // La fonction a appeller en cas d'ajout d'item. Sera appellé sur parent_scope.
                    data: [],
                },

 */

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
    inputs: ['filter'],
    styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {

    public filter: Filter;

    constructor() {}

    ngOnInit() {}

    /**
     * Si on est en mode avancé par défaut, on retire la classe collapse_class car on on en a plus besoin.
     */
    ngAfterContentInit() {
        if(this.filter.config.advanced_mode) this.filter.collapse_class = '';
    }

}

export class Filter {

    // Config global.
    public config;                // La config global du composant.
    public callback:any;          // La fonction de callback a appeller.
    public parent_scope:any;      // Le parent de ce composant.
    public config_column;         // Les colonnes, tableau contenant uniquement leur "taille" bootstrap (la somme doit faire 12 au max!).
    public collapse_class:string; // Si config.advanced_mode alors collapse_class = 'in'.

    constructor(parent_scope: any, config) {
        this.config = config;
        this.parent_scope = parent_scope;

        this.callback = this.config.callback;
        this.config_column = this.config.config_column;

        if(!this.config.order_by_column) this.config.order_by_column = 'id'; // Order By sur la colonne id par défaut.
        if(!this.config.order_by_type) this.config.order_by_type = 'ASC';    // Order By croissant par défaut.
        if(!this.config.advanced_mode) this.config.advanced_mode = false;    // Mode simplifié affiché par défaut.
        if(this.config.advanced_mode) this.collapse_class = ' in';           // Pour ouvrir le collapse de base.
        if(!this.config.global_search) this.config.global_search = '';       // Champs de texte pour la recherche simplifié vide par défaut.

        this.callback.apply(this.parent_scope, []);  // On lance le filtre !
    }

    /**
     * Inverse le type du filtre (avancé/simple).
     */
    public changeFilterMode() {
        if(this.config.advanced_mode) this.config.advanced_mode = false;
        else this.config.advanced_mode = true;
    }

    /**
     * Evenement déclenché lors du clic sur le bouton "Appliquer".
     * On repasse la page courante à 1.
     */
    public btnFilter() {
        this.parent_scope.pagination_config.page = 1;
        this.callback.apply(this.parent_scope, []);
    }

    /**
     * Change la colonne et/ou le type d'order by.
     * Applique le filtre.
     * @param attribute
     */
    public changeOrderBy(attribute) {
        if(this.config.order_by_column === attribute) {
            if(this.config.order_by_type === 'ASC') this.config.order_by_type = 'DESC';
            else this.config.order_by_type = 'ASC';
        }else {
            this.config.order_by_column = attribute;
            this.config.order_by_type   = 'DESC';
        }
        this.callback.apply(this.parent_scope, []);
    }

    /**
     * Renvoie true si on est en mode avancée, false sinon.
     * @returns boolean
     */
    public get advanced_mode() {
        return this.config.advanced_mode;
    }

    /**
     * Renvoie le tableau des propriétés (c'est à dire, tous les champs qui sont dans notre filtre.)
     */
    public get property() {
        return this.config.property;
    }
}