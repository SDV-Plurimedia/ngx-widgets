import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    inputs: ['item_per_page', 'page', 'max_page', 'callback', 'parent_scope', 'delta'],
    styleUrls: ['./pagination.component.css']
})

/**
 * Composant permettant de gérer une pagination. Lors d'un changement de page, une fonction de callback est appellée.
 */

export class PaginationComponent implements OnInit {

    private item_per_page:number = 10; // Le nombre d'item par page.
    private page:number          = 1;  // La page actuelle.
    private max_page:number      = 1;  // Le nombre maximum de pages.
    private callback;                  // La fonction de callback a appeller en cas de changement de page.
    private parent_scope;              // L'objet sur lequel la fonction de callback est appliquée.
    private delta:number         = 5;  // L'intervalle de vision de page. (Avec 5, on voit les 5 pages et les 5 pages après this.page).

    constructor() { }

    ngOnInit() {}

    /**
     * Génère la pagination.
     * @returns {Array}
     */
    public get pagination() {
        let pagination = [];

        if(this.max_page < (this.delta * 2) + 1) {
            for(let i = 1; i <= this.max_page; i++) {
                pagination.push({ 'page': i, 'disabled': false, 'active': (i === this.page)});
            }
        }else {

            let i = this.page - this.delta;

            if(i > 2) {
                pagination.push({ 'page': 1, 'disabled': false, 'active': false});
                pagination.push({ 'page': '...', 'disabled': true, 'active': false});
            }else if(i <= 0) {
                i = 1;
            }

            for(i; i < this.page; i++) {
                pagination.push({ 'page': i, 'disabled': false, 'active': false});
            }

            pagination.push({ 'page': this.page, 'disabled': false, 'active': true});

            i = this.page + 1;

            if(i < this.max_page) {
                for(i; i <= this.page + this.delta; i++) {
                    pagination.push({ 'page': i, 'disabled': false, 'active': false});
                    if(i > this.max_page) break;
                }
            }

            if(i <= this.max_page) {
                if(i === this.max_page) {
                    pagination.push({'page': this.max_page, 'disabled': false, 'active': false});
                }else {
                    pagination.push({'page': '...', 'disabled': true, 'active': false});
                    pagination.push({'page': this.max_page, 'disabled': false, 'active': false});
                }
            }
        }

        return pagination;
    }

    /**
     * Va a la page "page".
     * @param page
     */
    public goto(page:number) {
        if(page < 1) page = 1;
        else if(page > this.max_page) page = this.max_page;
        if(page !== this.page) {
            this.page = page;
            this.callback.apply(this.parent_scope, [this.page]);
        }
    }

    /**
     * Va à la première page.
     */
    public gotoFirst() {
        this.goto(1);
    }

    /**
     * Va à la dernière page.
     */
    public gotoLast() {
        this.goto(this.max_page);
    }

    /**
     * Va à la page suivante.
     */
    public gotoNext() {
        this.goto(this.page + 1);
    }

    /**
     * Va à la page précédente.
     */
    public gotoPrevious() {
        this.goto(this.page - 1);
    }

}
