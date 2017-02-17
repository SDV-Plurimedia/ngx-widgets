import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
// import {NotificationService}          from '../../_core/_services/notification';

@Component({
    selector: 'data-autocomplete',
    templateUrl: './data-autocomplete.component.html',
    inputs: ['config'],
    outputs: ['valid'],
    styleUrls: ['./data-autocomplete.component.css', './choosen.min.css'],
    host: { '(document:click)': 'onClick($event)' }//ici on capture le click en dehors de l'autocomplete, pour savoir quand fermer la popup
})
export class DataAutocompleteComponent implements OnInit {

    private subscriptions = [] ;

    private data               = []; // les différents items qui seront ciblés par l'autocomplete
    private config             = []; // les données de config entrantes
    private _service           = null; // le service utilisé
    private fieldName:string   = ''; // le champs qu'il faut afficher
    private presentItems       = []; // les items déjà choisis par l'utilisateur
    private begin:number       = 2;  // à partir de combien commence l'autocomplete
    private results            = []; // les items matchant
    private inputValue:string  = ''; // value dans l'input
    public  placeholder:string = '...'; // Le "nom" de l'autocomplete

    private inputForm;              // L'input.

    public isActive: boolean  = false; // Autocomplete caché par défaut.

    public valid: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _eref: ElementRef,) {
    }

    ngOnInit() {

        this._service     = (this.config['_service'] ? this.config['_service'] : null); // TODO : DECLENCHER ERREUR ?
        this.fieldName    = (this.config['fieldName'] ? this.config['fieldName'] : 'name');
        this.presentItems = (this.config['presentItems'] ? this.config['presentItems'] : []);
        this.begin        = (this.config['begin']  ? this.config['begin'] : 3);
        this.placeholder  = (this.config['placeholder'] ? this.config['placeholder'] : '...');

        // On récupère les données à insérer dans l'autocomplete
        let sub = this._service.get().subscribe(
            response => {
                if (response != null){
                    this.data = response;
                    if(this.presentItems.length > 0) {
                        let ids_tmp = [];
                        let tmp     = [];
                        for (let item of this.presentItems) {
                            ids_tmp.push(item.id);
                        }
                        for (let item of this.data) {
                            if (ids_tmp.indexOf(item.id) > -1) {
                                item.alreadyIn = true;
                                tmp.push(item);
                                if(tmp.length === this.presentItems.length) break; // si on a déjà tous récup', plus la peine de continuer la boucle.
                            }
                        }
                        this.presentItems = tmp;
                    }
                }
            },
            err => {
            }
        );

        this.subscriptions.push(sub);
    }

    onInputChange(input) {
        this.inputValue= input;
        if (this.inputValue.length >= this.begin) {
            this.reduceResultList();
        }
    }

    //reduit le nombre de resultat, en fonction de la valeur tapé
    reduceResultList() {
        this.results = [];

        for(let i = 0; i < this.data.length; i++) {
            let item = this.data[i];

            if(!item.alreadyIn) {
                if (this.slugify(item[this.fieldName]).indexOf(this.slugify(this.inputValue)) > -1) {
                    this.results.push(item);
                }
            }
        }
    }


    //change l'etat du menu deroulant
    toggleDropdown() {
        if (!this.isActive) {
            this.inputForm = this._eref.nativeElement.querySelector('#inputField');
            this.isActive = true;
            this.inputForm.focus();
        }
        else
            this.isActive = false;
    }

    /**
     * Appellé lors du clic sur un element matchant.
     * @param item
     */
    valideItem(item) {
        item.alreadyIn = true; // Pour qu'il n'apparaisse plus dans l'autocomplétion
        this.presentItems.push(item); // ajout dans les items ajoutés
        this.valid.emit(this.presentItems); // on signale le changement au parent.
        this.results = []; // on initialise les résults
        this.inputValue = ""; // on vide l'input
        this.setCursorPosition(0); // on replace le curseur
    }

    /**
     * Appellée lors du clic sur le bouton pour ajouter l'item en BDD.
     */
    addItem() {
        if(this.inputValue !== '') {
            if (!this.checkItemExist(this.inputValue)) {
                let sub = this._service.create({'name': this.inputValue}).subscribe(
                    result => {
                        if (result) {
                            // this._notifService.success("Création réussie.");
                            this.data.push(result);
                            this.valideItem(result);
                        } else {
                            // this._notifService.error("Une erreur est survenue lors de l'enregistrement.");
                        }
                    },
                    err => {
                        // this._notifService.error("Une erreur est survenue lors de l'enregistrement.")
                    }
                );
                this.subscriptions.push(sub);
            } else {
                // this._notifService.error('Le nom "' + this.inputValue + '" est déjà pris.');
            }
        }
    }

    /**
     * Supprime un item des items déjà ajoutés.
     */
    deleteItem(itemDelete) {
        let newArray = [];
        for(let item of this.presentItems) {
            if(item.id !== itemDelete.id) {
                newArray.push(item);
            }
        }
        itemDelete.alreadyIn = false;
        this.presentItems = newArray;
        this.valid.emit(this.presentItems); // on signale le changement au parent.
    }

    /**
     * Vérifie si le nom de l'item qu'on veut ajouter n'existe pas.
     */
    checkItemExist(name: string) {
        let exist = false;
        // D'abord on vérifie dans le tableau contenant les tags déjà ajoutés.
        for(let item of this.presentItems) {
            if(this.slugify(name) === this.slugify(item[this.fieldName])) {
                exist = true;
                break;
            }
        }
        // Ensuite dans le tableau contenant toutes les datas.
        if(!exist) {
            for(let item of this.data) {
                if(this.slugify(name) === this.slugify(item[this.fieldName])) {
                    exist = true;
                    break;
                }
            }
        }
        return exist;
    }


    /**
     * Event lié au click & déplacement sur les résultats
     * @param event
     */
    //GESTION DU CLIC EN DEHORS DU CHAMP
    onClick(event) {
        let spanElement = this._eref.nativeElement.querySelector('.spanClick');
        let inputElement = this._eref.nativeElement.querySelector('#inputField');
        let formControl = this._eref.nativeElement.querySelector('.form-control');
        let btnAdd = this._eref.nativeElement.querySelector('#btnAdd');

        if ((spanElement !== event.target && inputElement !== event.target && formControl !== event.target && btnAdd !== event.target)
            && this.inputForm !== event.target && this.isActive) {
            this.toggleDropdown();
        }
    }

    //fixe la position du curseur
    private setCursorPosition(pos: number) {
        let current = this._eref.nativeElement.querySelector('.elem' + pos);
        if (current != null) {
            current.setAttribute("class", "active-result elem" + pos + " highlighted");
            current.focus();
        }
    }

    //retire les classes css aux anciennes positions
    private removeHighlight(pos: number) {
        let className = "elem" + (pos);
        this._eref.nativeElement.querySelector('.' + className).setAttribute("class", "active-result " + className);
    }

    //recupere la position courante du curseur
    private getCurrentPosition() {
        let pos = 0;
        let elem = this._eref.nativeElement.querySelector('.highlighted');
        if (elem != null) {
            pos = Number(elem.getAttribute("class").split("elem")[1].split(' ')[0]);
        }
        return pos;
    }

    // Lors d'appuie sur une touche
    onKey(event) {
        let pos = this.getCurrentPosition();

        if (event.keyCode == 27) { //ESC
            this.toggleDropdown();
        } else if (event.keyCode == 13) //ENTER
        {
            let item = this.results[pos];
            if(typeof item !== 'undefined') {
                this.valideItem(item);
            }else {
                this.addItem();
            }
        }
        else if (event.keyCode == 38) { //UP
            if (pos > 0) {
                this.removeHighlight(pos);
                this.setCursorPosition(pos - 1);
            }
        }
        else if (event.keyCode == 40) { //DOWN
            if (pos < (this.results.length - 1)) {
                this.removeHighlight(pos);
                this.setCursorPosition(pos + 1);
            }
        }
    }

    /**
     * Fonctions utilitaires
     * @param str
     * @returns {string}
     */
    slugify(str: string) {
        return str.toLowerCase()
            .replace(/[\u00C0-\u00C5]/ig,'a') //remplace les 'a accentués
            .replace(/[\u00C8-\u00CB]/ig,'e') //remplace les 'e' accentués
            .replace(/[\u00CC-\u00CF]/ig,'i') //remplace les 'i' accentués
            .replace(/[\u00D2-\u00D6]/ig,'o') //remplace les 'o' accentués
            .replace(/[\u00D9-\u00DC]/ig,'u') //remplace les 'u' accentués
            .replace(/[\u00D1]/ig,'n') //remplace les '~n' accentués
            .replace(/[^a-z0-9 ]+/gi,'')
            .trim().replace(/ /g,'-')
            .replace(/[\-]{2}/g,'')
            .replace(/[^a-z\- ]*/gi,'');

    }

    ngOnDestroy(){
        this.subscriptions.forEach((sub)=>{
            sub.unsubscribe();
        });
    }

}
