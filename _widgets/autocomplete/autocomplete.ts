import {Component, Input, Output, EventEmitter, ElementRef}     from '@angular/core';
//import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'autocomplete',
    templateUrl: './autocomplete.html',
    styleUrls: ['./chosen.min.css', './autocomplete.css'],
    host: { '(document:click)': 'onClick($event)' }//ici on capture le click en dehors de l'autocomplete, pour savoir quand fermer la popup
})
export class AutocompleteComponent {
    @Input() data; //Tableau de données dans lequel l'autocomplete va rechercher
    @Input() config;
    @Input() icon = "";
    @Output() valid = new EventEmitter(); //Variable remplie lorsque le champ d'autocomplétion est validé

    private results: Array<string> = [];
    private placeholder: string = "";

    private inputValue: string = "";
    public isActive: boolean = false;
    private inputForm;
    private removeData: any;

    //autocompleteForm: ControlGroup;
    //autoControl: AbstractControl;

    constructor(/*fb: FormBuilder,*/ private _eref: ElementRef) {
        /*this.autocompleteForm = fb.group({
            'auto': ['', Validators.required]
        });
        this.autoControl = this.autocompleteForm.controls['auto'];*/
    }

    ngOnInit() {
        this.addRemovalData();
        this.placeholder = this.config.placeholder;
        if (this.config.defaultValue !== "")
            this.inputValue = this.config.defaultValue;
        this.reduceResultList();
    }

    addRemovalData() {
      this.removeData = {};
      if(this.config.fieldName.constructor === Array) {
        this.config.fieldName.forEach((field, index) => {
          if(index == 0)
            this.removeData[field] = "Aucun";
          else this.removeData[field] = null;
        });
      }
      else {
        this.removeData[this.config.fieldName] = "Aucun";
      }
    }

    //reduit le nombre de resultat, en fonction de la valeur tapé
    reduceResultList() {
        this.results = [];
        if (this.inputValue && this.inputValue.length >= this.config.begin) {
            this.data.forEach((item, index) => {
                if (this.getDisplayLabel(item).indexOf(this.inputValue.toLowerCase()) != -1 ) {
                    this.results.push(item);
                }
            });
            if(this.results.length > 0) {
              this.results.splice(0,0, this.removeData);
            }
        }
        else if(this.config.begin == 0){
          if(this.data[0] != this.removeData) {
            this.data.splice(0,0, this.removeData);
          }
          this.results = this.data;
        }


    }

    //change l'etat du menu deroulant
    toggleDropdown() {
        if (!this.isActive) {
            this.inputForm = this._eref.nativeElement.querySelector('.form-control');
            this.isActive = true;
            this.inputForm.focus();
        }
        else
            this.isActive = false;
    }

    //retourne le type de donnée voulue
    getValue(item) {
        if (typeof this.config.fieldValue !== 'undefined' && typeof item[this.config.fieldValue] !== 'undefined')
            return item[this.config.fieldValue];
        else
            return item;
    }

    getDisplayLabel(item) {
      let res = ""
      if(this.config.fieldName.constructor === Array) {
        this.config.fieldName.forEach(field => {
          if(item[field] != "Aucun"){
            let val = this.getLabelValue(item, field);
            if(val) {
              if(res == "")
                res += val;
              else res += " - "+val;
            }
          }
          else {
            res = 'Aucun';
          }
        });
      }
      else {
        res = this.getLabelValue(item, this.config.fieldName);
      }
      return res;
    }

    getLabelValue(item, field) {
      if(field.indexOf('.') == -1){
        return item[field];
      }
      else {
        let parts = field.split('.');
        let value = item;
        parts.forEach(part => {
          if(value[part])
            value = value[part];
          else value = "Indéfini";
        });
        return value;
      }
    }

    valideItem(item) {
        this.valid.emit(this.getValue(item));
        this.toggleDropdown();
        this.inputValue = "";
        this.setCursorPosition(0);
        this.placeholder = this.getDisplayLabel(item);//item[this.config.fieldName];
    }

    //GESTION DU CLIC EN DEHORS DU CHAMP
    onClick(event) {
        let spanElement = this._eref.nativeElement.querySelector('.spanClick');
        let inputElement = this._eref.nativeElement.querySelector('.inputField');
        let formControl = this._eref.nativeElement.querySelector('.form-control');

        if ((spanElement !== event.target && inputElement !== event.target && formControl !== event.target) && this.inputForm !== event.target && this.isActive) {
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

    onKey(event) {
        let pos = this.getCurrentPosition();

        if (event.keyCode == 27) //ESC
            this.toggleDropdown();
        else if (event.keyCode == 13) //ENTER
        {
            this.valideItem(this.results[pos]);
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

}
