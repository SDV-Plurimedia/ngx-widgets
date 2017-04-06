import {Component, Input, Output, EventEmitter, ElementRef, HostListener, OnInit, OnChanges}     from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Component({
    selector: 'autocomplete',
    templateUrl: './autocomplete.html',
    styleUrls: ['./chosen.scss', './autocomplete.css'],
})

export class AutocompleteComponent implements OnInit, OnChanges {
  @Input() data; // Tableau de données dans lequel l'autocomplete va rechercher
  @Input() config;
  @Input() icon = '';
  @Input() displayItems; // Tableau qui contient les différents élements à afficher.

  @Output() valid = new EventEmitter(); // Evenement emit lorsque le champ d'autocomplétion est validé sur un existant
  @Output() create = new EventEmitter(); // Evenement emit lorsque le champ d'autocomplétion est validé sur un texte inexistant
  @Output() delete = new EventEmitter(); // Evenement émit lors de la suppression.

  private results: Array<string> = [];
  private placeholder: string = '';

  private inputValue: string = '';
  public isActive: boolean = false;
  private inputForm;
  private removeData: any;

  private nb_threads = 1;
  private searchStream = new Subject<string>();
  private items: Observable<string[]> = this.searchStream
      .debounceTime(400) // Temporisation en millisecondes.
      .distinctUntilChanged()
      .switchMap((subject: string) => {
          // Execution de la requete Elasticsearch.
          this.reduceResultList();
          return [];
      });

  constructor(private _eref: ElementRef) {
    //
  }

  ngOnInit() {
    this.removeData = {};
    this.removeData[this.config.fieldSearch] = this.config.fieldDefault ? this.config.fieldDefault : 'Aucun';
    this.removeData[this.config.fieldDisplayed] = this.config.fieldDefault ? this.config.fieldDefault : 'Aucun';
    this.placeholder = this.config.placeholder;
    if (this.config.defaultValue !== '') {
      this.inputValue = this.config.defaultValue;
    }
    this.reduceResultList();
    this.items.subscribe();

    // Pour modifier le nom de l'autocomplete lors de la selection d'un champs
    if (typeof this.config.modifyPlaceholder === 'undefined') {
      this.config.modifyPlaceholder = true;
    }

    // Pour afficher les items séléctionnés à droite du placeholder.
    if (typeof this.config.displayAddedItem === 'undefined') {
      this.config.displayAddedItem = false;
    }
  }

  ngOnChanges(changes) {
    if (changes.data) {
      this.nb_threads = Math.floor(this.data.length / 1000) + 1;
      // console.log('nb de threads ', this.nb_threads);
    }
  }

  onInputChange(input) {
    this.inputValue = input;
    if (this.inputValue.length >= this.config.begin) {
      this.searchStream.next(input);
    }
  }

  // reduit le nombre de resultat, en fonction de la valeur tapé
  reduceResultList() {
    this.results = [];
    if (this.inputValue && this.inputValue.length >= this.config.begin) {
          // filtre simple
          // this.results = this.data.filter(item => item.complete_label.toLowerCase().includes(this.inputValue.toLowerCase()));

      if (this.config.customSearch) {
        this.config.customSearch.apply(this.config.scope, [this.inputValue]).subscribe(res => {
          this.results = res;
          this.addRemoveData();
        });
      } else {
        for (let i = 0; i < this.nb_threads; i++) {
          let slice = this.data.slice(i * 1000, (i + 1) * 1000);
          let sub = new Observable(observer => {
            let res = slice.filter(item => {
                let searchable_text = this.config.fieldSearch ? item[this.config.fieldSearch] : item[this.config.fieldDisplayed];
              return this.slugify(searchable_text).includes(this.slugify(this.inputValue));
            });
            observer.next(res);
            observer.complete();
          }).subscribe((res: Array<any>) => {
            res.forEach(item => this.results.push(item));
            this.addRemoveData();
          });
        }
      }

    } else if (this.config.begin === 0) {
      if (this.data[0] !== this.removeData) {
        this.data.splice(0, 0, this.removeData);
      }
      this.results = this.data;
    }
  }

  addRemoveData() {
    if (this.results.length > 0) {
      this.results.splice(0, 0, this.removeData);
    }
  }

  // change l'etat du menu deroulant
  toggleDropdown() {
    if (!this.isActive) {
      this.inputForm = this._eref.nativeElement.querySelector('.inputField');
      this.isActive = true;
      this.inputForm.focus();
    } else {
      this.isActive = false;
    }
  }

  // retourne le type de donnée voulue
  getValue(item) {
    if (typeof this.config.fieldValue !== 'undefined' && typeof item[this.config.fieldValue] !== 'undefined') {
      return item[this.config.fieldValue];
    } else {
      return item;
    }
  }

  // aucun item n'existe, donc on envoi la chaine (si quelqu'un veut ecouter pour en cree un)
  private newItem() {
    this.create.emit(this.inputValue);
    this.toggleDropdown();
    this.inputValue = '';
    this.setCursorPosition(0);
  }

  // emet l'item selectionné
  private valideItem(item) {
    this.valid.emit(this.getValue(item));
    this.toggleDropdown();
    this.inputValue = '';
    this.reduceResultList();
    this.setCursorPosition(0);
    if (this.config.modifyPlaceholder) {
      this.placeholder = this.config.fieldInsert ? item[this.config.fieldInsert] : item[this.config.fieldDisplayed];
    }
  }

  // Renvoie l'item que l'on veut supprimer.
  deleteItem(item) {
    this.delete.emit(this.getValue(item));
  }

  // GESTION DU CLIC EN DEHORS DU CHAMP
  @HostListener('mouse:click', ['$event'])
  onClick(event) {
    let spanElement = this._eref.nativeElement.querySelector('.spanClick');
    let inputElement = this._eref.nativeElement.querySelector('.inputField');
    let formControl = this._eref.nativeElement.querySelector('.form-control');

    if ((spanElement !== event.target && inputElement !== event.target && formControl !== event.target)
        && this.inputForm !== event.target && this.isActive) {
      this.toggleDropdown();
    }
  }

  // fixe la position du curseur
  private setCursorPosition(pos: number) {
    let current = this._eref.nativeElement.querySelector('.elem' + pos);
    if (current != null) {
      current.setAttribute('class', 'active-result elem' + pos + ' highlighted');
      current.focus();
    }
  }

  // retire les classes css aux anciennes positions
  private removeHighlight(pos: number) {
    let className = 'elem' + (pos);
    this._eref.nativeElement.querySelector('.' + className).setAttribute('class', 'active-result ' + className);
  }

  // recupere la position courante du curseur
  private getCurrentPosition() {
    let pos = 0;
    let elem = this._eref.nativeElement.querySelector('.highlighted');
    if (elem != null) {
      pos = Number(elem.getAttribute('class').split('elem')[1].split(' ')[0]);
    }
    return pos;
  }

  onKey(event) {
    let pos = this.getCurrentPosition();

    if (event.keyCode === 27) { // ESC
      this.toggleDropdown();
    } else if (event.keyCode === 13) {// ENTER
      if (pos > 0 && typeof this.results[pos] !== 'undefined') {
        this.removeHighlight(pos);
        this.valideItem(this.results[pos]);
      } else {
        // si on est sur la position 0 (Aucun), on envoi la valeur du champ au cas où il faut créer
        this.newItem();
      }
    } else if (event.keyCode === 38) { // UP
      if (pos > 0) {
        this.removeHighlight(pos);
        this.setCursorPosition(pos - 1);
      }
    } else if (event.keyCode === 40) { // DOWN
      if (pos < (this.results.length - 1)) {
        this.removeHighlight(pos);
        this.setCursorPosition(pos + 1);
      }
    }
  }

  slugify(str: string) {
    return str.toLowerCase()
        .replace(/[\u00C0-\u00C5]/ig, 'a') // remplace les 'a accentués
        .replace(/[\u00C8-\u00CB]/ig, 'e') // remplace les 'e' accentués
        .replace(/[\u00CC-\u00CF]/ig, 'i') // remplace les 'i' accentués
        .replace(/[\u00D2-\u00D6]/ig, 'o') // remplace les 'o' accentués
        .replace(/[\u00D9-\u00DC]/ig, 'u') // remplace les 'u' accentués
        .replace(/[\u00D1]/ig, 'n') // remplace les '~n' accentués
        .replace(/[^a-z0-9 ]+/gi, '')
        .trim().replace(/ /g, '-')
        .replace(/[\-]{2}/g, '')
        .replace(/[^a-z\- ]*/gi, '');

  }
}
